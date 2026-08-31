export type StockLevel = 'Entero' | 'Medio' | 'Poco' | 'Agotado';

export type PantryCategory =
  | 'Vegetables'
  | 'Proteins'
  | 'Grains'
  | 'Dairy'
  | 'Pantry'
  | 'Verduras'
  | 'Proteínas'
  | 'Cereales'
  | 'Lácteos'
  | 'Despensa';

export interface PantryItem {
  id: string;
  name: string;
  category: PantryCategory;
  stock: StockLevel;
  imageUrl: string;
  quantity?: string;
  lastUpdated?: string;
}

export type MealType =
  | 'Breakfast'
  | 'Lunch'
  | 'Dinner'
  | 'Snack'
  | 'Desayuno'
  | 'Almuerzo'
  | 'Cena'
  | 'Merienda';

export interface Recipe {
  id: string;
  title: string;
  mealType: MealType;
  description: string;
  imageUrl: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  timeMinutes: number;
  matchPercentage: number;
  isFavorite: boolean;
  tags: string[];
  inStockIngredients: string[];
  missingIngredients: string[];
  allIngredients: { name: string; amount: string; inStock: boolean }[];
  instructions: string[];
  servings: number;
  calories?: number;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: 'Pantry' | 'Manual' | 'Despensa' | 'Manual';
  stockStatus?: 'Vacío' | 'Poco';
  estimatedPrice: number;
  checked: boolean;
  imageUrl?: string;
  unit?: string;
}

export type HouseholdRole =
  | 'Administrador Familiar'
  | 'Comprador Principal'
  | 'Colaborador'
  | 'Miembro Familiar';

export interface HouseholdMember {
  id: string;
  name: string;
  role: HouseholdRole | string;
  avatarUrl: string;
  lastActivity: string;
  email?: string;
  notes?: string;
  isCurrentUser?: boolean;
}

export interface FamilyPreferences {
  dinersCount: number | '5+';
  allergies: {
    gluten: boolean;
    lactosa: boolean;
    frutosSecos: boolean;
    mariscos: boolean;
    huevo: boolean;
    soja: boolean;
  };
  specialConditions: {
    embarazadas: boolean;
    vegetariano: boolean;
    bajoEnSodio: boolean;
  };
}

export interface AppNotification {
  id: string;
  user: string;
  action: string;
  target: string;
  timeAgo: string;
  type: 'add' | 'purchase' | 'alert' | 'shopping';
  read: boolean;
}

export type ScanMode = 'fridge' | 'cupboard' | 'product' | 'receipt';

export interface VisualDetectedItem {
  id: string;
  name: string;
  category: PantryCategory;
  stock: StockLevel;
  quantity?: string;
  estimatedExpiryDays?: number;
  confidence?: number;
  price?: number;
  selected: boolean;
  imageUrl?: string;
  icon?: string;
}

export interface SpendingCategory {
  name: string;
  icon: string;
  amount: number;
  percentage: number;
  barColorClass: string;
}

export interface SpendingTrend {
  month: string;
  amount: number;
  percentageHeight: number;
  isCurrent?: boolean;
}

export interface TopSpend {
  id: string;
  title: string;
  category: string;
  amount: number;
  imageUrl: string;
}
