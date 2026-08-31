import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64 captured images
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Lazy Gemini AI Client Initialization
  let aiClient: GoogleGenAI | null = null;
  function getAI(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // Health API
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      geminiConfigured: !!process.env.GEMINI_API_KEY,
      timestamp: new Date().toISOString(),
    });
  });

  // Visual AI Detection Endpoint
  app.post("/api/scan-visual", async (req, res) => {
    try {
      const { imageBase64, mimeType = "image/jpeg", mode = "fridge" } = req.body;

      if (!imageBase64) {
        return res.status(400).json({ error: "No image data provided" });
      }

      // Clean base64 data if it contains data URI prefix
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");

      const ai = getAI();

      if (ai) {
        let systemPrompt = "";
        let userPrompt = "";

        if (mode === "fridge") {
          systemPrompt =
            "Eres un asistente culinario experto en visión por computador. Tu tarea es analizar fotografías del interior de un frigorífico/nevera y detectar todos los ingredientes y alimentos presentes con precisión.";
          userPrompt =
            "Identifica todos los alimentos visibles en esta foto del frigorífico (frutas, verduras, lácteos, huevos, bebidas, carnes, embutidos, sobras, salsas, etc.). Para cada alimento, devuelve su nombre en español conciso, su categoría ('Vegetables', 'Proteins', 'Grains', 'Dairy', 'Pantry'), su estado de stock ('Entero', 'Medio', 'Poco'), cantidad aproximada estimada (ej. '4 unidades', '1 brick 1L', '1 bandeja 500g', '1 tarro'), y días estimados de vida útil restante recomendada.";
        } else if (mode === "cupboard") {
          systemPrompt =
            "Eres un asistente culinario experto en visión por computador. Tu tarea es analizar fotografías de armarios de cocina, alacenas o estanterías de despensa.";
          userPrompt =
            "Identifica todos los productos secos o no perecederos visibles en esta foto de la despensa/armario (pastas, arroz, legumbres, latas de conserva, aceites, especias, cereales, galletas, harinas, salsas, botes). Para cada producto, devuelve su nombre en español conciso, categoría ('Vegetables', 'Proteins', 'Grains', 'Dairy', 'Pantry'), nivel de stock ('Entero', 'Medio', 'Poco'), cantidad aproximada estimada, y días estimados de vida útil.";
        } else if (mode === "product") {
          systemPrompt =
            "Eres un asistente culinario experto en visión por computador. Tu tarea es analizar una fotografía de un producto alimenticio individual (envase, fruta, verdura, carne, etc.).";
          userPrompt =
            "Identifica con precisión este producto alimenticio. Devuelve su nombre exacto en español, su categoría ('Vegetables', 'Proteins', 'Grains', 'Dairy', 'Pantry'), stock ('Entero'), cantidad/peso o formato aproximado, y días estimados de caducidad o conservación óptima.";
        } else {
          // receipt
          systemPrompt =
            "Eres un asistente culinario experto en OCR y extracción de tickets de compra de supermercado.";
          userPrompt =
            "Extrae todos los artículos de alimentación comprados en este ticket de supermercado, con su nombre en español, categoría adecuada ('Vegetables', 'Proteins', 'Grains', 'Dairy', 'Pantry'), precio individual numérico en euros (€), y cantidad estimada.";
        }

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: {
            parts: [
              {
                inlineData: {
                  data: cleanBase64,
                  mimeType: mimeType || "image/jpeg",
                },
              },
              {
                text: userPrompt,
              },
            ],
          },
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                detectedLocation: {
                  type: Type.STRING,
                  description: "Breve descripción de lo detectado (ej. Frigorífico familiar con vegetales y lácteos)",
                },
                items: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: {
                        type: Type.STRING,
                        description: "Nombre del alimento en español (ej. Tomates frescos, Leche entera)",
                      },
                      category: {
                        type: Type.STRING,
                        description: "Categoría: 'Vegetables' | 'Proteins' | 'Grains' | 'Dairy' | 'Pantry'",
                      },
                      stock: {
                        type: Type.STRING,
                        description: "Estado de stock: 'Entero' | 'Medio' | 'Poco'",
                      },
                      quantity: {
                        type: Type.STRING,
                        description: "Cantidad estimada (ej. '6 unidades', '1L', '500g')",
                      },
                      estimatedExpiryDays: {
                        type: Type.INTEGER,
                        description: "Días estimados antes de caducar (ej. 7)",
                      },
                      price: {
                        type: Type.NUMBER,
                        description: "Precio estimado o detectado en ticket (ej. 3.50)",
                      },
                    },
                    required: ["name", "category", "stock"],
                  },
                },
              },
              required: ["items"],
            },
          },
        });

        const textOutput = response.text;
        if (textOutput) {
          const parsed = JSON.parse(textOutput);
          return res.json({
            success: true,
            source: "gemini-vision",
            detectedLocation: parsed.detectedLocation || "Detección visual IA",
            items: parsed.items || [],
          });
        }
      }

      // Fallback if AI not available or fallback simulation
      let fallbackItems = [];
      if (mode === "fridge") {
        fallbackItems = [
          { name: "Huevos Camperos", category: "Dairy", stock: "Entero", quantity: "1 docena", estimatedExpiryDays: 14, price: 3.2 },
          { name: "Leche Entera", category: "Dairy", stock: "Entero", quantity: "2 botellas 1L", estimatedExpiryDays: 8, price: 2.1 },
          { name: "Tomates Frescos", category: "Vegetables", stock: "Medio", quantity: "4 unidades", estimatedExpiryDays: 5, price: 2.8 },
          { name: "Pechuga de Pollo", category: "Proteins", stock: "Entero", quantity: "500g", estimatedExpiryDays: 3, price: 5.4 },
          { name: "Aguacates Hass", category: "Vegetables", stock: "Poco", quantity: "2 unidades", estimatedExpiryDays: 4, price: 3.5 },
          { name: "Yogur Griego Natural", category: "Dairy", stock: "Entero", quantity: "4 tarrinas", estimatedExpiryDays: 12, price: 2.9 },
        ];
      } else if (mode === "cupboard") {
        fallbackItems = [
          { name: "Pasta Fusilli Integral", category: "Grains", stock: "Entero", quantity: "500g", estimatedExpiryDays: 180, price: 1.6 },
          { name: "Arroz Basmati", category: "Grains", stock: "Entero", quantity: "1 kg", estimatedExpiryDays: 240, price: 2.4 },
          { name: "Aceite de Oliva Virgen Extra", category: "Pantry", stock: "Medio", quantity: "750 ml", estimatedExpiryDays: 300, price: 9.2 },
          { name: "Garbanzos Cocidos en Tarro", category: "Pantry", stock: "Entero", quantity: "2 tarros 400g", estimatedExpiryDays: 365, price: 1.8 },
          { name: "Salsa de Tomate Casera", category: "Pantry", stock: "Entero", quantity: "1 tarro 350g", estimatedExpiryDays: 90, price: 1.9 },
          { name: "Orégano y Especias", category: "Pantry", stock: "Entero", quantity: "1 especiero", estimatedExpiryDays: 365, price: 1.2 },
        ];
      } else if (mode === "product") {
        fallbackItems = [
          { name: "Aceite de Oliva Virgen Extra", category: "Pantry", stock: "Entero", quantity: "1 botella 1L", estimatedExpiryDays: 365, price: 9.5 },
        ];
      } else {
        fallbackItems = [
          { name: "Leche Orgánica", category: "Dairy", stock: "Entero", quantity: "1L", estimatedExpiryDays: 7, price: 4.5 },
          { name: "Pollo Entero", category: "Proteins", stock: "Entero", quantity: "1.2 kg", estimatedExpiryDays: 3, price: 12.0 },
          { name: "Tomates Roma", category: "Vegetables", stock: "Entero", quantity: "1 kg", estimatedExpiryDays: 6, price: 3.5 },
          { name: "Cilantro Fresco", category: "Vegetables", stock: "Entero", quantity: "1 manojo", estimatedExpiryDays: 4, price: 1.2 },
        ];
      }

      return res.json({
        success: true,
        source: "smart-fallback",
        detectedLocation: `Escaneo de ${mode === "fridge" ? "Frigorífico" : mode === "cupboard" ? "Armario" : mode === "product" ? "Producto" : "Ticket"}`,
        items: fallbackItems,
      });
    } catch (error: any) {
      console.error("Error in /api/scan-visual:", error);
      return res.status(500).json({
        error: error.message || "Failed to process visual scan",
        fallbackAvailable: true,
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
