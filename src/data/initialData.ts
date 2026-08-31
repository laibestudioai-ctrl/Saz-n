import {
  PantryItem,
  Recipe,
  ShoppingItem,
  HouseholdMember,
  FamilyPreferences,
  AppNotification,
  SpendingCategory,
  SpendingTrend,
  TopSpend,
} from '../types';

export const INITIAL_PANTRY: PantryItem[] = [
  {
    id: 'p1',
    name: 'Brócoli Fresco',
    category: 'Vegetables',
    stock: 'Entero',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNI2jPgy-_BiyT3NIH99YdRb9pIbwhYXxPIaFOaWAmaAwZ2Qr6TNGk3K3-5ii3iywwvdxe1WmhB_LsaijFT--VW-LHeLpOVOLgMJprdWZIWqunk9Ebpbu_DizQiddF9M55_pjEZ0l9eU6t6ZlB_HFDvAzkRHyc7spWJcxH6XRDxeTOejvwTIKHm-hctJe7augOZkgGPSW_IgzvFdC_l6o3iYcNlqZUfAae0woaPiLDVmRGGpjP-JgvCQ',
    quantity: '2 cabezas frescas',
    lastUpdated: 'Ayer',
  },
  {
    id: 'p2',
    name: 'Pimientos Rojos y Verdes',
    category: 'Vegetables',
    stock: 'Agotado',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfUjZRJ9GXytrw_PXb1npDNDRCvPdhuckriM4Mh2TI2S94dlqTJL_RvZUmDWUrerMtiO68sC5_j8iPSzyK3rgJ-X2KIykiKlPPoyJ8nhswXf-FxPcgyssWwyFOMT67-qms6SXnkW8VeQa6t5MmXJpvvW-sQZiFNS5yd348gQRs5j5Q8xGhtcDykiJ4FBvt-otuI3Dqy_nc1tRtXg_6TU0IC1HzGhGpnU8g5xn03E2wzBwVBleD9vV5eQ',
    quantity: '0 unidades',
    lastUpdated: 'Hace 3h',
  },
  {
    id: 'p3',
    name: 'Pechuga de Pollo',
    category: 'Proteins',
    stock: 'Poco',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCgl9oZfLSi3HZd5j3RX0_t0FzqqC8eMn9MY-SN_1RwArKLit4O-EUdXPcoV9olxfxsJlhT9DqunLz0DquyXcfCsY4ZhKwes-ybm3dcDhEYi4fEqHUDVlCDIsdV9f0_0Xzf49Wjys0Fa8ClPjUgvzXBCGc9u2d2Fmb1NYWZE5USlyAgyO6VfxsQ_RCIUGJXiP76XFtb54WoecD8T5msawo8LMWNyBjoUrmopJY0f-XNr7KbcLLDNwRBlg',
    quantity: '300g restantes',
    lastUpdated: 'Hace 5h',
  },
  {
    id: 'p4',
    name: 'Leche Entera',
    category: 'Dairy',
    stock: 'Medio',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAOIT67qHJQqPiaXP5Pr_FAMVm60hFb6ABtC6KsCwlTOutoOACZsY-PzvAQEGODyAWoGxUR7TXL_c0TN8N8RowP3Nk4vkXJLW-ZfwBCkyc14AISUovdmhWmwLY3eNAE88Hxb53hQDi8a7qmbS4VBwnt0xuVFk81UXYU4Ukm8xaJpkxFeU1fHXbsQtSSkoVlyGwiRRnAITO41FF88qliJT-_uqRXgSagMw0GANAnRY-0el8FUPKIzei3gg',
    quantity: '750ml (1 botella)',
    lastUpdated: 'Hace 2h',
  },
  {
    id: 'p5',
    name: 'Huevos Camperos',
    category: 'Proteins',
    stock: 'Entero',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAau30orKcZX1IwPwYAcZhyZmAxu3c034-0xl3c9LAzm8EsdSt5NmBN3670EyNiblD1FDjkYM2PQ5g4o4kA3oGxhXy7_14-MXWEHbXsIqbIL92s4Ig2T0KFTZ4e9AWUAibhJySE8cgfawXjLkvAXkY2EsqZM7mNIbnL1aJ7S-8MZ4TeGl6Er0OzJzS4OP795iEepFQAax96uuqSSVrSSXwIiA-AHAGoo1b1gCf1ZLa0xCBbzROuBzYz4w',
    quantity: '12 huevos de campo',
    lastUpdated: 'Ayer',
  },
  {
    id: 'p6',
    name: 'Arroz Jazmín',
    category: 'Grains',
    stock: 'Medio',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCI_cCwPx4Yb9SjBVf61GCSWliP8QDqMKgb9jm5bIzIkLYmwQjpDFeusxjSj7MKjwPPSRPSX9CBj-fkog0kQ8zMOzFWklOkGRsJuP1srSYD2eX4gVamyBEIFnl-qJ76XjA07eXFmSjv1f0oZdJSk58ZLvjgyYSRhZk6n_vzcw6CHQOnlSKOzPeY7f4mGoa5EKNT8MEtki0TckPXd7c9b_CQlgpwN2Ow4QxMvh_ipcwLTJvqOFQAGlZrjQ',
    quantity: '1kg Jazmín',
    lastUpdated: 'Hace 2 días',
  },
  {
    id: 'p7',
    name: 'Pasta Orecchiette',
    category: 'Grains',
    stock: 'Poco',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCht0qiznrNHrhrLcPWmg0kFMmrw-D-kyhFdekGH1f84FyxzFU8iHVCO9ythK4BP9g-eISaSxfPPT45dkoeErPrcxCDJrBbm_GBDUtx4q4lWWiOZ_52-KHLlhanQW78OOzZXmt37EJTOgVKVoOVw2mNE_GTAGXsknDUV0cICUvQgka6enelhJkRjuVI0hlJ7b5sbmYATvF2QwcPYlsvuA_o_K94284AY4q1jJuB-ms86fgEiPtkYvSZjw',
    quantity: '150g Orecchiette',
    lastUpdated: 'Hace 3 días',
  },
  {
    id: 'p8',
    name: 'Aceite de Oliva Virgen Extra',
    category: 'Pantry',
    stock: 'Poco',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAwv4pjK9ZAtcoE2lPwrTZCIfDP5Z9natNOTYrx7eIXF2LRveCRyeyyR9pWRC5wO39RJ1ECOYcK1Rixvhf4FlOYLpTP2RDbyMcO2g7e5gEvM9P4zb8sl3nqSm6PRve-3XYyhb_nNFrL8wAVcYDCBsZq5mN3psfusJpdwu5qoIcD446oleGssdQ3M3bWA0IuBnPmywg1OkWOb6PmGjhKPKKvR8ksV-VEWEw9d1JXFQgmb1tcTFzlYmQ9WA',
    quantity: '100ml restante',
    lastUpdated: 'Hoy',
  },
];

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'r1',
    title: 'Tostada con Aguacate y Huevo Escalfado',
    mealType: 'Desayuno',
    description:
      'Un comienzo vibrante del día con huevos escalfados tiernos, aguacate cremoso y hierbas frescas sobre pan rústico.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAY-JZGeQ_4zEKw3UOLgsu1L9434fCPuY0_Z_ChETlGCtFDqZjebo1P8593arilpsLmLsE61zqPazMidLNPpnrDKs5zuVhHWRNI9XyRj5Y7WtWQOTdNlN3ZD4QWFiTIDyRWCch8NHGUm-WmVn6h_Dvl1YYp97r5kTESv7_-UGV51UAbtF8dGGDuJ194SK4Szqvk5NnQu2B6vs-AVv7FwupRiX2XuBG1T_H05BoghtWYqNwGM8T_fObSFg',
    difficulty: 'Fácil',
    timeMinutes: 15,
    matchPercentage: 100,
    isFavorite: false,
    tags: ['Vegetariano', 'Rápido (< 20 min)', 'Desayuno'],
    inStockIngredients: ['Huevos', 'Pan Rústico', 'Aceite de Oliva', 'Pimienta'],
    missingIngredients: [],
    allIngredients: [
      { name: 'Huevos de campo', amount: '2 unidades', inStock: true },
      { name: 'Aguacate maduro', amount: '1 unidad', inStock: true },
      { name: 'Pan de masa madre', amount: '2 rebanadas', inStock: true },
      { name: 'Aceite de oliva virgen', amount: '1 cda', inStock: true },
      { name: 'Sal marina y pimienta', amount: 'al gusto', inStock: true },
    ],
    instructions: [
      'Tostar las rebanadas de pan de masa madre hasta dorar crujientes.',
      'En un cazo con agua caliente a punto de hervir y un toque de vinagre, pochar los huevos durante 3 minutos.',
      'Chafar el aguacate con sal, pimienta y unas gotas de limón sobre las tostadas.',
      'Colocar el huevo pochado encima, espolvorear sésamo negro y hierbas frescas.',
    ],
    servings: 2,
    calories: 380,
  },
  {
    id: 'r2',
    title: 'Bowl Mediterráneo de Quinoa y Verduras',
    mealType: 'Almuerzo',
    description:
      'Ligero, refrescante y repleto de proteínas para el mediodía con verduras asadas y garbanzos.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLR3hHV7qEaGNbYQwI1_20RR6unzPoqI4w6frabzR60ZRC2lcX9Pl6Uq7viQlyL48aEjDP2C0FwvD_-wOI8W1FP6ECa_n0SdB7O-iyFUgri49q1fWv0tL-4A6kK1eCq_xwAsC7D4_EypCcVZEqDzcTp-21ThbuHts6mdey-C3hBY6p2B5KADZYCZwSuid3xY2nhAhqGVwpvGslMnECeGvriVmU8QThChtw50YTbEfgZaGSs1_HKcT0JA',
    difficulty: 'Medio',
    timeMinutes: 25,
    matchPercentage: 100,
    isFavorite: false,
    tags: ['Vegetariano', 'Alto en Proteínas', 'Almuerzo'],
    inStockIngredients: ['Quinoa', 'Tomates Cherry', 'Aceite de Oliva', 'Pepino'],
    missingIngredients: [],
    allIngredients: [
      { name: 'Quinoa cocida', amount: '1 taza', inStock: true },
      { name: 'Tomates cherry', amount: '150g', inStock: true },
      { name: 'Pepino cortado', amount: '1/2 unidad', inStock: true },
      { name: 'Garbanzos cocidos', amount: '100g', inStock: true },
      { name: 'Salsa Tahini con limón', amount: '2 cdas', inStock: true },
    ],
    instructions: [
      'Cocer la quinoa en caldo suave de verduras hasta que esté esponjosa.',
      'Saltear los tomates cherry y cebolla morada con aceite de oliva.',
      'Armar el bowl con base de quinoa, garbanzos, verduras y pepino fresco.',
      'Bañar con el aderezo de tahini y limón y terminar con aceitunas.',
    ],
    servings: 2,
    calories: 450,
  },
  {
    id: 'r3',
    title: 'Salmón Glaseado con Espárragos',
    mealType: 'Cena',
    description:
      'Una cena sofisticada pero sencilla con sabores equilibrados sobre risotto cremoso.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBe5bcI_CqFM0dfkMGoNYXt4uOywuivZEMMgNGHzm1dsPkillmS-CAMRYXqUoK3-SxqkWNClklrOPfNJ_DuFfphQmzdqzyhEs3GCPaqiHMPxLNkTGxtizZzz6OTkGytH6xC4ywizELWtxZS46KMU8THRanoS0Eid0fbBU4tTkeLZQmYzxvIhmNFPkkdFr--f64r1yIRhTQd4mxLu5ur92NVWstcbZE_d1m7p3Tk4Lomnz_8qyB7PXEb_A',
    difficulty: 'Medio',
    timeMinutes: 40,
    matchPercentage: 100,
    isFavorite: false,
    tags: ['Alto en Proteínas', 'Bajo en Carbohidratos', 'Cena'],
    inStockIngredients: ['Salmón', 'Arroz', 'Ajo', 'Aceite'],
    missingIngredients: [],
    allIngredients: [
      { name: 'Filetes de salmón fresco', amount: '2 filetes', inStock: true },
      { name: 'Espárragos verdes', amount: '1 manojo', inStock: true },
      { name: 'Arroz arborio / risotto', amount: '150g', inStock: true },
      { name: 'Glaseado de soja y miel', amount: '3 cdas', inStock: true },
      { name: 'Parmesano rallado', amount: '30g', inStock: true },
    ],
    instructions: [
      'Preparar el risotto cremoso con caldo caliente y añadir espárragos troceados.',
      'Sellar el salmón en sartén bien caliente por el lado de la piel hasta que quede crujiente.',
      'Pincelar con el glaseado aromático y terminar en horno 4 minutos.',
      'Servir sobre el lecho de risotto y decorar con microvegetales.',
    ],
    servings: 2,
    calories: 560,
  },
  {
    id: 'r4',
    title: 'Tazón Griego con Queso Feta',
    mealType: 'Almuerzo',
    description:
      'Un plato fresco y nutritivo con quinoa, verduras asadas y queso feta desmenuzado.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhjJYZvPg3zIKJc93xv8S-xExZUuR06AEYS7kURhj17MjPFLkxx8xkEcUMtBx3m8mtD4wJmT393eKqEvWbpUaWx_MeuPYvUzyzMAnFd8HUMO4lUi3n42QtadzP8GxbMUkgt0Kx6B1zYvygC7Bp9XKTkDearaHW6W1C4GwHXZlxYDghs6H8aY2UXUBnuVztjWHfVk2i12mtIo5TFi0v5Ep3Jihu3DZPrubPS3KMJXDTWMzQZCECNGM5Nw',
    difficulty: 'Medio',
    timeMinutes: 25,
    matchPercentage: 75,
    isFavorite: true,
    tags: ['Vegetariano', 'Rápido (< 20 min)', 'Bajo en Carbohidratos'],
    inStockIngredients: ['Quinoa', 'Tomates', 'Aceite'],
    missingIngredients: ['Queso Feta', 'Calabacín'],
    allIngredients: [
      { name: 'Quinoa', amount: '200g', inStock: true },
      { name: 'Tomates asados', amount: '150g', inStock: true },
      { name: 'Aceite de oliva virgen', amount: '2 cdas', inStock: true },
      { name: 'Queso Feta griego', amount: '80g', inStock: false },
      { name: 'Calabacín en rodajas', amount: '1 unidad', inStock: false },
    ],
    instructions: [
      'Cocinar la quinoa y dejar templar.',
      'Asar el calabacín y tomates con orégano y aceite de oliva.',
      'Integrar todo en un bol amplio.',
      'Desmenuzar el queso feta por encima con un toque de pimienta negra recién molida.',
    ],
    servings: 2,
    calories: 420,
  },
  {
    id: 'r5',
    title: 'Crema Suave de Tomate y Albahaca',
    mealType: 'Cena',
    description:
      'Clásica y reconfortante, lista en menos de 20 minutos con pan tostado crujiente.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCOAgZYbv1OjJmzp5YhpCmACrfJBdQv-57fRLwvq68VOAvRE769wbuAZGOdJP5R8v7lmlU2swe67KvHTpvOweqqB5hnOdkXlpO-KCJJ_lshMcDM7fMbOXtYKXWz7mlSK9_5Z5ajo3xzgsIF9-EfWiHCOuho1N4KwuRLoFzi4diY8cpoDHRLYqc6RMZD4hHbdUZiZmKLBG_d_6h8K8JPOFscKUCFlAxVC5dNJXig1ltaXHdXRh0GY5xb0Q',
    difficulty: 'Fácil',
    timeMinutes: 18,
    matchPercentage: 70,
    isFavorite: true,
    tags: ['Vegetariano', 'Rápido (< 20 min)', 'Reconfortante'],
    inStockIngredients: ['Tomates', 'Cebolla', 'Ajo', 'Pan'],
    missingIngredients: ['Nata fresca', 'Albahaca fresca'],
    allIngredients: [
      { name: 'Tomates maduros', amount: '600g', inStock: true },
      { name: 'Cebolla picada', amount: '1 unidad', inStock: true },
      { name: 'Dientes de ajo', amount: '2 unidades', inStock: true },
      { name: 'Pan rústico tostado', amount: '2 rebanadas', inStock: true },
      { name: 'Nata fresca para cocinar', amount: '100ml', inStock: false },
      { name: 'Albahaca fresca', amount: '1 ramillete', inStock: false },
    ],
    instructions: [
      'Pochar cebolla y ajo con aceite de oliva en cazuela.',
      'Añadir tomates troceados y cocinar a fuego medio 12 minutos.',
      'Triturar con batidora hasta textura aterciopelada y añadir la nata.',
      'Acompañar con pan tostado con hierbas provenzales.',
    ],
    servings: 2,
    calories: 340,
  },
];

export const INITIAL_SHOPPING: ShoppingItem[] = [
  {
    id: 's1',
    name: 'Aceite de Oliva Extra Virgen',
    category: 'Pantry',
    stockStatus: 'Vacío',
    estimatedPrice: 8.5,
    checked: false,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAwv4pjK9ZAtcoE2lPwrTZCIfDP5Z9natNOTYrx7eIXF2LRveCRyeyyR9pWRC5wO39RJ1ECOYcK1Rixvhf4FlOYLpTP2RDbyMcO2g7e5gEvM9P4zb8sl3nqSm6PRve-3XYyhb_nNFrL8wAVcYDCBsZq5mN3psfusJpdwu5qoIcD446oleGssdQ3M3bWA0IuBnPmywg1OkWOb6PmGjhKPKKvR8ksV-VEWEw9d1JXFQgmb1tcTFzlYmQ9WA',
  },
  {
    id: 's2',
    name: 'Sal Marina Gruesa',
    category: 'Pantry',
    stockStatus: 'Poco',
    estimatedPrice: 3.2,
    checked: false,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCzARCdwyDCU_IBbGqPTRINbosGjBgQq6S1q8B59gq6bUlyd1I7RAflYJSOZmL-dMfLpcw_iEobTiSkswhDzuY0JyDCyOAfRgbcdA09pMLAV3grEJFDJMr3ZCzIGqmHsQ9c-hmwTf70hafm1Zl1usGZ9WG15gBnjVoSCm9oLM2hMVVbheo3AEh1ZBIFqy6Yj64wCepZj3wYhQLn4PT-E1I0T7o_jAljzIM4vL7ZT8yCXNvVGQ15SXzIyQ',
  },
  {
    id: 's3',
    name: 'Aguacates Hass (3x)',
    category: 'Manual',
    estimatedPrice: 4.5,
    checked: false,
    unit: '3 unidades',
  },
];

export const INITIAL_MEMBERS: HouseholdMember[] = [
  {
    id: 'm1',
    name: 'Elena Rodríguez',
    role: 'Administrador Familiar',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB3F1OiLKoWNzr4UqsUpBheZ0N4ImVBjwYeqWsjBbz85bu3UdWYKWXgXgbjhdDohtv3dHxrn5xLEB_1GWkYsnJoE7WtW30ksdbXpaElplGBIa9xd9Goce6u2xyP9nlKuKBuWtfemQFsCdglgGud4-LRLVeiMrsgaypWc-qlHyOYv5poI_IjuFwgN1L_NLXnyczxIkl0PWpPNdYSRd6b05Y-Ax5yjMNK1eoRdfN1-85jlQtaV1hNiCXdPg',
    lastActivity: 'Activa ahora',
    email: 'elena.rodriguez@familia.com',
    notes: 'Responsable de la organización semanal',
    isCurrentUser: true,
  },
  {
    id: 'm2',
    name: 'Mateo Rodríguez',
    role: 'Comprador Principal',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZzFJG58eskaJuGULCd0lDET2HdAiyotBQd93tmV8fI3ioM_Y55OLKNvbvXeeB19TGAP30iZd8Yto1wi9oXVioxAHJepl9e63GC7_M2LlK4EXHDhQnXSsSfi7qwMmwXv6H7aS5cGzYnrlr9fweziKW7_eIdAQPpj4lRbckDV79pVr2_6tjjpqDKQ80JRELuKu9t6UJLAbkqGwBkkJyMUBI3xs4lc3aNY0_GwOUyqU_ywRnR8q0YfhumQ',
    lastActivity: 'Última compra: 45.00€ en Supermercado (Ayer)',
    email: 'mateo.rodriguez@familia.com',
    notes: 'Encargado de compras en supermercado local',
  },
  {
    id: 'm3',
    name: 'Sofía Rodríguez',
    role: 'Colaborador',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8xaw8omwlYOkmDgCg8ITj0NoULTwK9_01BTb6fDRPmUf1wbnRA7ovi4eWFz9bFFM9nyulAftMUtwXSU_3iEm27F4VBtRLJaO1CdcnjS3aOQVwc67hqWg4Y0tRSaDv4hX2n_psqSlUTvD6gzt-l22vy3L19IkGxCDVyEQRumtzQxXd7AIupCw3T_A5yHfd67cr0T_D9dcDQV18MGLsM0FVb7afLvsVT7en7UzirEBAIA3GKulRNTx-qA',
    lastActivity: 'Añadió: Leche Orgánica (hace 2h)',
    email: 'sofia.rodriguez@familia.com',
    notes: 'Prepara las meriendas y actualiza consumos',
  },
];

export const INITIAL_PREFERENCES: FamilyPreferences = {
  dinersCount: 2,
  allergies: {
    gluten: true,
    lactosa: false,
    frutosSecos: false,
    mariscos: false,
    huevo: false,
    soja: false,
  },
  specialConditions: {
    embarazadas: true,
    vegetariano: false,
    bajoEnSodio: false,
  },
};

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    user: 'Elena',
    action: 'añadió',
    target: 'Leche Orgánica a la despensa',
    timeAgo: 'hace 10 min',
    type: 'add',
    read: false,
  },
  {
    id: 'n2',
    user: 'Mateo',
    action: 'completó una compra de',
    target: '45.00€ en Supermercado',
    timeAgo: 'hace 2h',
    type: 'purchase',
    read: false,
  },
  {
    id: 'n3',
    user: 'Sofía',
    action: 'marcó el',
    target: 'Pollo como agotado',
    timeAgo: 'hace 5h',
    type: 'alert',
    read: false,
  },
  {
    id: 'n4',
    user: 'Elena',
    action: 'añadió',
    target: 'Salmón Fresco a la lista de compra',
    timeAgo: 'ayer',
    type: 'shopping',
    read: true,
  },
];

export const SPENDING_CATEGORIES: SpendingCategory[] = [
  {
    name: 'Proteínas y Carnes',
    icon: 'set_meal',
    amount: 120.0,
    percentage: 35,
    barColorClass: 'bg-white',
  },
  {
    name: 'Frutas y Verduras',
    icon: 'eco',
    amount: 85.5,
    percentage: 25,
    barColorClass: 'bg-emerald-400',
  },
  {
    name: 'Despensa y Básicos',
    icon: 'kitchen',
    amount: 75.0,
    percentage: 22,
    barColorClass: 'bg-amber-400',
  },
  {
    name: 'Lácteos y Huevos',
    icon: 'water_drop',
    amount: 62.0,
    percentage: 18,
    barColorClass: 'bg-white/40',
  },
];

export const SPENDING_TRENDS: SpendingTrend[] = [
  { month: 'Ago', amount: 280, percentageHeight: 60 },
  { month: 'Sep', amount: 330, percentageHeight: 75 },
  { month: 'Oct', amount: 220, percentageHeight: 50 },
  { month: 'Nov', amount: 360, percentageHeight: 80 },
  { month: 'Dic', amount: 390, percentageHeight: 90 },
  { month: 'Ene', amount: 342.5, percentageHeight: 45, isCurrent: true },
];

export const TOP_SPENDS: TopSpend[] = [
  {
    id: 'ts1',
    title: 'Cortes de Ternera y Pollo',
    category: 'Proteínas y Carnes',
    amount: 45.0,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjTXBf952pWZWi4HS2KtmvesS8StG2PcKbqvJZLYQwonco3Z0pahlMLEXcdlc7hDRHacvtzIhMsaw6pmS28RVJdgNn2G7PV3oInCkvb7IK2lBkq7dEcqjWxU6AgYAQSnl9BCdsEEOqTGG0uv3_bQs7q_u4M-44LpY_6d64_3dCY03VJ2n5qOlAhzGlSrJ0fDiIwV2UJwm50rv5ACo0D95k9FhUgLSZLEGvGo67nSu48Qvoi-RuQF8Q6A',
  },
  {
    id: 'ts2',
    title: 'Aceite de Oliva Virgen Extra',
    category: 'Despensa y Básicos',
    amount: 32.5,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCgP0EYYvbavs49FcnXTq8FhTqyaKBbonUlMWE7Ulh9d2kPC1por8SdhS1ur2Y2UIewwiTAP9A_4KH-qCyPK0YpCuu3ipkEycdtxTUB2x4HFofYlbO3kAqOvJkZywO4V6n6oHYHc8G9z9erkj7x5vlIcwOK1TaUjFleyIIPVvZgubhQdk9vNXH_jaBqOUAkwEc25jZk_qnLk1OS3_EALd1N72f31tT11qr4o2sHmKqAps2vrX7jnHplng',
  },
  {
    id: 'ts3',
    title: 'Parmesano Curado y Quesos',
    category: 'Lácteos y Huevos',
    amount: 24.0,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBy2W-VNajp_sxZZkDeYQG3eqC7Mi_FXbmF5b19M4OuI18sjVIX7y29S22rXvnQUG1LTYdLhfF2vxOr02NMsBoBNeQxJ0S7HMwCT-iIJ_TvgLmgXNnZJikT0F8RBzPyP5g4MXQyRhPQR-oBZxUD2bcpx6NLjhlr2bNLQXHFgyrzQdvcye7IiK6jD5RKSYK-JSTWw2KMZUrniQaxtVK0Cq-eAueOvxLw48iDObzD_cXK3oihQ98rPLANUA',
  },
];
