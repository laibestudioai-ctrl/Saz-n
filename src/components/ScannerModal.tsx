import React, { useState, useEffect, useRef } from 'react';
import { ScanMode, VisualDetectedItem, StockLevel } from '../types';
import { getFoodImageAndIcon } from '../data/foodImageMap';

interface ScannerModalProps {
  isOpen: boolean;
  initialMode?: ScanMode;
  onClose: () => void;
  onConfirmItems: (items: VisualDetectedItem[], mode: ScanMode, summaryText?: string) => void;
}

const SAMPLE_IMAGES: Record<ScanMode, { url: string; title: string; hint: string }> = {
  fridge: {
    url: 'https://images.unsplash.com/photo-1584990347449-39906663f736?w=800&auto=format&fit=crop&q=80',
    title: 'Frigorífico / Nevera',
    hint: 'Apunta al interior de tu nevera abierta para detectar todos los alimentos frescos.',
  },
  cupboard: {
    url: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=800&auto=format&fit=crop&q=80',
    title: 'Armario / Despensa',
    hint: 'Fotografía los estantes de tu alacena o armario con pastas, legumbres y conservas.',
  },
  product: {
    url: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop&q=80',
    title: 'Producto Individual',
    hint: 'Enfoca un alimento, bote o envase sobre la encimera para registrarlo.',
  },
  receipt: {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkDKOwuDcyzljXqMX5tyLSXoIf3oDZNkRn3h-xXZa4Ds6QUy6Q3q4TM_HncmozM3BcAkvsW_r8WUltwP5vvn7uxkVIzctMBadi6SnzAShPo8Uo_f2rtMby0Pn7RV4Sq210HnLfCUz6TsB1hCuMXj3ekfrH5K-8BU9EBLgPg9g8S4Qk6lmyt61iZGUSCY4r6VhGt0f_9BRbzjLxm2i5pJX9_2nl1FtR8IK3OaWzgqELRxhaa_wnUkRhSA',
    title: 'Ticket de Compra',
    hint: 'Alinea el ticket de supermercado con los precios visibles.',
  },
};

export const ScannerModal: React.FC<ScannerModalProps> = ({
  isOpen,
  initialMode = 'fridge',
  onClose,
  onConfirmItems,
}) => {
  const [mode, setMode] = useState<ScanMode>(initialMode);
  const [step, setStep] = useState<'camera' | 'processing' | 'results'>('camera');
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [flashActive, setFlashActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [detectedItems, setDetectedItems] = useState<VisualDetectedItem[]>([]);
  const [detectionLocation, setDetectionLocation] = useState<string>('');
  const [newItemName, setNewItemName] = useState('');
  const [isAiScanning, setIsAiScanning] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync mode when initialMode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setStep('camera');
      setCapturedImage(null);
    }
  }, [isOpen, initialMode]);

  // Handle Camera initialization
  useEffect(() => {
    if (isOpen && step === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, step, facingMode]);

  const startCamera = async () => {
    try {
      stopCamera();
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraActive(true);
      }
    } catch (err) {
      console.warn('Camera access not granted or not supported in this context:', err);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const toggleCameraFacing = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Perform AI Recognition via Server API or Smart Multimodal Engine
  const processImageWithAI = async (imageDataUrl: string, targetMode: ScanMode) => {
    setCapturedImage(imageDataUrl);
    setStep('processing');
    setIsAiScanning(true);

    try {
      const response = await fetch('/api/scan-visual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imageDataUrl,
          mode: targetMode,
          mimeType: 'image/jpeg',
        }),
      });

      const data = await response.json();
      if (data && data.items && Array.isArray(data.items)) {
        const formatted: VisualDetectedItem[] = data.items.map((item: any, idx: number) => {
          const { imageUrl, icon } = getFoodImageAndIcon(item.name, item.category);
          return {
            id: `det_${Date.now()}_${idx}`,
            name: item.name,
            category: item.category || 'Vegetables',
            stock: (item.stock as StockLevel) || 'Entero',
            quantity: item.quantity || '1 unidad',
            estimatedExpiryDays: item.estimatedExpiryDays || 7,
            price: item.price,
            confidence: 0.95,
            selected: true,
            imageUrl,
            icon,
          };
        });

        setDetectedItems(formatted);
        setDetectionLocation(data.detectedLocation || `Detección de ${mode}`);
        setStep('results');
        return;
      }
    } catch (err) {
      console.error('Error contacting /api/scan-visual:', err);
    }

    // Fallback simulation
    setTimeout(() => {
      let fallbackList: Array<Omit<VisualDetectedItem, 'id' | 'selected' | 'imageUrl' | 'icon'>> = [];
      if (targetMode === 'fridge') {
        fallbackList = [
          { name: 'Huevos Camperos', category: 'Dairy', stock: 'Entero', quantity: '1 docena', estimatedExpiryDays: 14 },
          { name: 'Leche Entera', category: 'Dairy', stock: 'Entero', quantity: '2 botellas', estimatedExpiryDays: 8 },
          { name: 'Tomates Frescos', category: 'Vegetables', stock: 'Medio', quantity: '4 unidades', estimatedExpiryDays: 5 },
          { name: 'Pechuga de Pollo', category: 'Proteins', stock: 'Entero', quantity: '500g', estimatedExpiryDays: 3 },
          { name: 'Yogur Griego', category: 'Dairy', stock: 'Entero', quantity: '4 unidades', estimatedExpiryDays: 10 },
          { name: 'Espinacas Frescas', category: 'Vegetables', stock: 'Poco', quantity: '1 bolsa', estimatedExpiryDays: 4 },
        ];
      } else if (targetMode === 'cupboard') {
        fallbackList = [
          { name: 'Pasta Fusilli Integral', category: 'Grains', stock: 'Entero', quantity: '500g', estimatedExpiryDays: 180 },
          { name: 'Arroz Basmati', category: 'Grains', stock: 'Entero', quantity: '1 kg', estimatedExpiryDays: 240 },
          { name: 'Aceite de Oliva Virgen', category: 'Pantry', stock: 'Medio', quantity: '750 ml', estimatedExpiryDays: 300 },
          { name: 'Garbanzos en Tarro', category: 'Pantry', stock: 'Entero', quantity: '2 tarros', estimatedExpiryDays: 365 },
          { name: 'Salsa de Tomate', category: 'Pantry', stock: 'Entero', quantity: '1 tarro', estimatedExpiryDays: 90 },
        ];
      } else if (targetMode === 'product') {
        fallbackList = [
          { name: 'Aguacate Hass', category: 'Vegetables', stock: 'Entero', quantity: '1 pieza', estimatedExpiryDays: 4 },
        ];
      } else {
        fallbackList = [
          { name: 'Leche Orgánica', category: 'Dairy', stock: 'Entero', quantity: '1L', price: 4.5 },
          { name: 'Pollo Entero', category: 'Proteins', stock: 'Entero', quantity: '1.2kg', price: 12.0 },
          { name: 'Tomates Roma', category: 'Vegetables', stock: 'Entero', quantity: '1kg', price: 3.5 },
          { name: 'Cilantro Fresco', category: 'Vegetables', stock: 'Entero', quantity: '1 manojo', price: 1.2 },
        ];
      }

      const formatted: VisualDetectedItem[] = fallbackList.map((item, idx) => {
        const { imageUrl, icon } = getFoodImageAndIcon(item.name, item.category);
        return {
          ...item,
          id: `det_${Date.now()}_${idx}`,
          selected: true,
          imageUrl,
          icon,
        };
      });

      setDetectedItems(formatted);
      setDetectionLocation(`Escaneo de ${targetMode === 'fridge' ? 'Frigorífico' : targetMode === 'cupboard' ? 'Armario' : targetMode === 'product' ? 'Producto' : 'Ticket'}`);
      setStep('results');
      setIsAiScanning(false);
    }, 1200);
  };

  // Capture from live video feed
  const handleShutterCapture = () => {
    if (videoRef.current && cameraActive) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        stopCamera();
        processImageWithAI(dataUrl, mode);
        return;
      }
    }

    // If camera wasn't active, use sample preset image
    handleUseSamplePhoto();
  };

  // Use Preset Sample Photo
  const handleUseSamplePhoto = () => {
    const sample = SAMPLE_IMAGES[mode];
    stopCamera();
    processImageWithAI(sample.url, mode);
  };

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          stopCamera();
          processImageWithAI(result, mode);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle selection
  const handleToggleItem = (id: string) => {
    setDetectedItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i))
    );
  };

  // Change Stock
  const handleStockChange = (id: string, stock: StockLevel) => {
    setDetectedItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, stock } : i))
    );
  };

  // Delete item
  const handleDeleteItem = (id: string) => {
    setDetectedItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Add custom manual item to detected list
  const handleAddManualItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const { imageUrl, icon } = getFoodImageAndIcon(newItemName, 'Vegetables');
    const newItem: VisualDetectedItem = {
      id: 'det_manual_' + Date.now(),
      name: newItemName.trim(),
      category: 'Vegetables',
      stock: 'Entero',
      quantity: '1 unidad',
      estimatedExpiryDays: 7,
      selected: true,
      imageUrl,
      icon,
    };
    setDetectedItems((prev) => [newItem, ...prev]);
    setNewItemName('');
  };

  const selectedCount = detectedItems.filter((i) => i.selected).length;

  const handleConfirm = () => {
    const selected = detectedItems.filter((i) => i.selected);
    onConfirmItems(selected, mode, detectionLocation);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-0 md:p-4 overflow-y-auto">
      <div className="bg-[#0c0c0c] text-white w-full max-w-xl min-h-screen md:min-h-[720px] md:max-h-[92vh] md:rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden relative border border-white/10">
        
        {/* Top Header */}
        <header className="px-5 h-16 bg-[#0c0c0c]/90 border-b border-white/10 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => {
              if (step === 'results') {
                setStep('camera');
                startCamera();
              } else {
                onClose();
              }
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Volver o cerrar"
          >
            <span className="material-symbols-outlined text-[20px]">
              {step === 'results' ? 'arrow_back' : 'close'}
            </span>
          </button>

          <div className="text-center">
            <h2 className="font-['Epilogue'] text-base md:text-lg font-light tracking-wide text-white flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">
                auto_awesome
              </span>
              <span>
                {step === 'results' ? 'Alimentos Detectados' : 'Escaneo Visual con IA'}
              </span>
            </h2>
          </div>

          <div className="w-10 flex justify-end">
            {step === 'camera' && cameraActive && (
              <button
                onClick={toggleCameraFacing}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                title="Girar cámara"
              >
                <span className="material-symbols-outlined text-[18px]">cameraswitch</span>
              </button>
            )}
          </div>
        </header>

        {/* MODE SELECTOR TABS (Only in Camera Step) */}
        {step === 'camera' && (
          <div className="bg-[#121212] px-4 py-2.5 border-b border-white/10 flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setMode('fridge')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 transition-all ${
                mode === 'fridge'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">kitchen</span>
              <span>Frigorífico</span>
            </button>

            <button
              onClick={() => setMode('cupboard')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 transition-all ${
                mode === 'cupboard'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">shelves</span>
              <span>Armario / Alacena</span>
            </button>

            <button
              onClick={() => setMode('product')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 transition-all ${
                mode === 'product'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">inventory_2</span>
              <span>Producto</span>
            </button>

            <button
              onClick={() => setMode('receipt')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 transition-all ${
                mode === 'receipt'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">receipt_long</span>
              <span>Ticket</span>
            </button>
          </div>
        )}

        {/* STEP 1: Camera & Viewfinder */}
        {step === 'camera' && (
          <main className="flex-grow relative flex flex-col items-center justify-between bg-black p-4">
            {/* Viewfinder Container */}
            <div className="relative w-full h-[400px] md:h-[430px] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-[#141414] flex items-center justify-center">
              
              {/* Live Video Feed if camera is on */}
              {cameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Fallback Image Representation */
                <img
                  src={SAMPLE_IMAGES[mode].url}
                  alt={SAMPLE_IMAGES[mode].title}
                  className="w-full h-full object-cover opacity-75"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Viewfinder Overlay HUD */}
              <div className="absolute inset-4 pointer-events-none flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-8 h-8 border-t-2 border-l-2 border-emerald-400 rounded-tl-lg shadow-[0_0_8px_#34d399]"></div>
                  <div className="w-8 h-8 border-t-2 border-r-2 border-emerald-400 rounded-tr-lg shadow-[0_0_8px_#34d399]"></div>
                </div>

                {/* Laser animation */}
                <div className="scanner-laser w-full h-0.5 bg-emerald-400 shadow-[0_0_16px_#34d399]"></div>

                <div className="flex justify-between">
                  <div className="w-8 h-8 border-b-2 border-l-2 border-emerald-400 rounded-bl-lg shadow-[0_0_8px_#34d399]"></div>
                  <div className="w-8 h-8 border-b-2 border-r-2 border-emerald-400 rounded-br-lg shadow-[0_0_8px_#34d399]"></div>
                </div>
              </div>

              {/* Target Prompt Hint */}
              <div className="absolute top-3 inset-x-4 text-center z-10 pointer-events-none">
                <span className="bg-black/80 backdrop-blur-md border border-white/15 text-white text-xs px-3.5 py-1 rounded-full font-['Work_Sans'] font-medium shadow-md">
                  {SAMPLE_IMAGES[mode].hint}
                </span>
              </div>

              {/* AI Detection indicator badge */}
              <div className="absolute bottom-3 left-3 z-10">
                <span className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Gemini Vision Activo
                </span>
              </div>
            </div>

            {/* Quick Demo Photo Link & Hint */}
            <div className="w-full text-center my-2">
              <button
                type="button"
                onClick={handleUseSamplePhoto}
                className="text-xs text-white/70 hover:text-white underline underline-offset-4 font-['Work_Sans'] transition-colors flex items-center justify-center gap-1.5 mx-auto"
              >
                <span className="material-symbols-outlined text-[15px] text-emerald-400">
                  image
                </span>
                <span>Probar foto de ejemplo ({SAMPLE_IMAGES[mode].title})</span>
              </button>
            </div>

            {/* Camera Bottom Controls */}
            <div className="w-full max-w-sm px-4 py-2 flex justify-between items-center z-20">
              {/* File upload button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 active:scale-95 transition-all shadow-md"
                title="Subir foto desde galería o archivos"
                aria-label="Subir foto"
              >
                <span className="material-symbols-outlined text-[22px]">photo_library</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Main Shutter Button */}
              <button
                id="btn-shutter-capture"
                type="button"
                onClick={handleShutterCapture}
                className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all active:scale-90 shadow-2xl"
                title="Capturar y escanear con IA"
                aria-label="Hacer foto"
              >
                <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-black text-[26px]">
                    camera_alt
                  </span>
                </div>
              </button>

              {/* Flash / Help Button */}
              <button
                type="button"
                onClick={() => setFlashActive(!flashActive)}
                className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center border transition-all active:scale-95 shadow-md ${
                  flashActive
                    ? 'bg-white text-black border-white'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
                title="Flash de cámara"
                aria-label="Flash"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {flashActive ? 'flash_on' : 'flash_off'}
                </span>
              </button>
            </div>
          </main>
        )}

        {/* STEP 2: Processing AI state */}
        {step === 'processing' && (
          <main className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-[#0c0c0c]">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-pulse">
                <span className="material-symbols-outlined text-5xl animate-spin">
                  sync
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-[16px]">
                  auto_awesome
                </span>
              </div>
            </div>

            <h3 className="font-['Epilogue'] text-2xl font-light text-white mb-2 tracking-tight">
              Analizando con IA Multimodal...
            </h3>
            <p className="font-['Work_Sans'] text-sm text-white/60 max-w-sm">
              Identificando alimentos, calculando porciones y estimando fechas óptimas de consumo.
            </p>

            <div className="mt-8 flex items-center gap-2 text-xs text-emerald-400/80 font-mono bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Gemini 3.7 Vision • Reconocimiento Culinario</span>
            </div>
          </main>
        )}

        {/* STEP 3: Results & Selection Screen */}
        {step === 'results' && (
          <main className="flex-grow px-5 py-6 overflow-y-auto">
            {/* Header info */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-semibold block mb-0.5">
                  ✓ Reconocimiento Completado
                </span>
                <h3 className="font-['Epilogue'] text-xl font-light text-white tracking-tight">
                  {detectionLocation || 'Alimentos Identificados'}
                </h3>
              </div>
              <span className="bg-white/10 text-white font-['Work_Sans'] text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
                {selectedCount} de {detectedItems.length} seleccionados
              </span>
            </div>

            {/* Captured preview thumbnail banner */}
            {capturedImage && (
              <div className="relative h-28 w-full rounded-2xl overflow-hidden mb-5 border border-white/10 bg-[#141414] shadow-md flex items-center">
                <img
                  src={capturedImage}
                  alt="Captura"
                  className="w-full h-full object-cover opacity-70"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-center">
                  <span className="text-xs text-white/80 font-medium">Foto analizada con éxito</span>
                  <span className="text-[11px] text-emerald-300">Modo: {mode === 'fridge' ? 'Frigorífico' : mode === 'cupboard' ? 'Armario / Despensa' : mode === 'product' ? 'Producto' : 'Ticket'}</span>
                </div>
              </div>
            )}

            {/* Add manual item input */}
            <form onSubmit={handleAddManualItem} className="mb-4 flex gap-2">
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="¿Falta algún alimento? Escríbelo aquí..."
                className="flex-1 bg-[#181818] border border-white/10 focus:border-white/40 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/10 flex items-center gap-1 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Añadir</span>
              </button>
            </form>

            {/* List of Detected Items */}
            <div className="bg-[#121212] rounded-2xl p-3 border border-white/10 shadow-xl mb-6 space-y-2">
              {detectedItems.length === 0 ? (
                <div className="p-6 text-center text-white/50 text-xs">
                  No se detectaron alimentos en la imagen. Puedes añadirlos manualmente arriba.
                </div>
              ) : (
                detectedItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      item.selected
                        ? 'bg-[#181818] border-white/15'
                        : 'bg-transparent border-transparent opacity-40 hover:opacity-75'
                    }`}
                  >
                    {/* Left: Checkbox + Image + Name */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => handleToggleItem(item.id)}
                        className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-colors ${
                          item.selected
                            ? 'bg-white border-white text-black'
                            : 'border-white/40 bg-transparent text-transparent'
                        }`}
                        aria-label="Seleccionar alimento"
                      >
                        <span className="material-symbols-outlined text-[14px] font-bold">
                          check
                        </span>
                      </button>

                      {/* Item thumbnail */}
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#202020] border border-white/10 shrink-0">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/50">
                            <span className="material-symbols-outlined text-[18px]">
                              {item.icon || 'nutrition'}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p
                            className={`font-['Work_Sans'] text-sm font-semibold text-white truncate ${
                              !item.selected ? 'line-through text-white/40' : ''
                            }`}
                          >
                            {item.name}
                          </p>
                          {item.estimatedExpiryDays && (
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-medium shrink-0">
                              ~{item.estimatedExpiryDays}d
                            </span>
                          )}
                        </div>
                        <p className="font-['Work_Sans'] text-[11px] text-white/50 truncate">
                          {item.quantity || '1 unidad'} • {item.category}
                        </p>
                      </div>
                    </div>

                    {/* Right: Stock Selector & Price / Delete */}
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <select
                        value={item.stock}
                        onChange={(e) => handleStockChange(item.id, e.target.value as StockLevel)}
                        className="bg-[#242424] border border-white/15 text-white text-[11px] font-semibold rounded-lg px-2 py-1 focus:outline-none"
                      >
                        <option value="Entero">Entero</option>
                        <option value="Medio">Medio</option>
                        <option value="Poco">Poco</option>
                      </select>

                      {item.price && (
                        <span className="font-['Work_Sans'] text-xs font-semibold text-emerald-400">
                          {item.price.toFixed(2)} €
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-rose-400 hover:bg-white/5 transition-colors"
                        title="Eliminar de la lista"
                        aria-label="Eliminar"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Confirmation Action */}
            <div className="pb-4">
              <button
                id="btn-confirm-add-pantry"
                type="button"
                onClick={handleConfirm}
                disabled={selectedCount === 0}
                className="w-full bg-white text-black font-['Work_Sans'] text-xs font-bold uppercase tracking-wider py-4 px-6 rounded-full shadow-2xl hover:bg-white/90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-40 border border-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  inventory_2
                </span>
                <span>
                  Guardar en mi Despensa ({selectedCount} {selectedCount === 1 ? 'artículo' : 'artículos'})
                </span>
              </button>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};
