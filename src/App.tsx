import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNavBar, NavTab } from './components/BottomNavBar';
import { PantryView } from './components/PantryView';
import { MenuView } from './components/MenuView';
import { RecipesView } from './components/RecipesView';
import { ShoppingView } from './components/ShoppingView';
import { SpendingView } from './components/SpendingView';
import { ScannerModal } from './components/ScannerModal';
import { FamilyProfileModal } from './components/FamilyProfileModal';
import { NotificationsModal } from './components/NotificationsModal';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { AddItemModal } from './components/AddItemModal';

import {
  INITIAL_PANTRY,
  INITIAL_RECIPES,
  INITIAL_SHOPPING,
  INITIAL_MEMBERS,
  INITIAL_PREFERENCES,
  INITIAL_NOTIFICATIONS,
} from './data/initialData';

import {
  PantryItem,
  Recipe,
  ShoppingItem,
  HouseholdMember,
  FamilyPreferences,
  AppNotification,
  StockLevel,
  ScanMode,
  VisualDetectedItem,
} from './types';

export function App() {
  // State management
  const [activeTab, setActiveTab] = useState<NavTab>('pantry');
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(INITIAL_PANTRY);
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(INITIAL_SHOPPING);
  const [householdMembers, setHouseholdMembers] = useState<HouseholdMember[]>(INITIAL_MEMBERS);
  const [preferences, setPreferences] = useState<FamilyPreferences>(INITIAL_PREFERENCES);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // Modals state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerMode, setScannerMode] = useState<ScanMode>('fridge');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isRefreshingMenu, setIsRefreshingMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenScannerWithMode = (mode: ScanMode = 'fridge') => {
    setScannerMode(mode);
    setIsScannerOpen(true);
  };

  // Pantry handlers
  const handleUpdateStock = (itemId: string, newStock: StockLevel) => {
    setPantryItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              stock: newStock,
              lastUpdated: 'Ahora',
            }
          : item
      )
    );

    // If marked as Poco or Agotado, suggest to shopping list
    if (newStock === 'Agotado' || newStock === 'Poco') {
      const targetItem = pantryItems.find((i) => i.id === itemId);
      if (targetItem) {
        setNotifications((prev) => [
          {
            id: 'n_' + Date.now(),
            user: 'Tú',
            action: 'marcaste',
            target: `${targetItem.name} como ${newStock.toLowerCase()}`,
            timeAgo: 'ahora',
            type: 'alert',
            read: false,
          },
          ...prev,
        ]);
      }
    }
  };

  const handleAddPantryItem = (newItem: Omit<PantryItem, 'id' | 'lastUpdated'>) => {
    const created: PantryItem = {
      ...newItem,
      id: 'p_' + Date.now(),
      lastUpdated: 'Ahora',
    };
    setPantryItems((prev) => [created, ...prev]);
    showToast(`"${newItem.name}" añadido a tu despensa.`);
  };

  const handleSendToShopping = (itemName: string) => {
    const exists = shoppingItems.some(
      (i) => i.name.toLowerCase() === itemName.toLowerCase()
    );
    if (!exists) {
      const pItem = pantryItems.find(
        (i) => i.name.toLowerCase() === itemName.toLowerCase()
      );
      setShoppingItems((prev) => [
        {
          id: 's_' + Date.now(),
          name: itemName,
          category: 'Pantry',
          stockStatus: pItem?.stock === 'Agotado' ? 'Vacío' : 'Poco',
          estimatedPrice: 4.0,
          checked: false,
          imageUrl: pItem?.imageUrl,
        },
        ...prev,
      ]);
      showToast(`"${itemName}" añadido a la lista de compra.`);
    } else {
      showToast(`"${itemName}" ya está en tu lista de compra.`);
    }
  };

  // Shopping handlers
  const handleToggleShoppingItem = (id: string) => {
    setShoppingItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAddShoppingItem = (name: string, price?: number) => {
    const newItem: ShoppingItem = {
      id: 's_' + Date.now(),
      name,
      category: 'Manual',
      estimatedPrice: price || 3.5,
      checked: false,
    };
    setShoppingItems((prev) => [...prev, newItem]);
    showToast(`"${name}" añadido a la lista de compra.`);
  };

  const handleRemoveShoppingItem = (id: string) => {
    setShoppingItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCompletePurchase = () => {
    const checked = shoppingItems.filter((i) => i.checked);
    if (checked.length === 0) return;

    // Update or add corresponding items to pantry as 'Entero'
    checked.forEach((item) => {
      const matchPantry = pantryItems.find(
        (p) => p.name.toLowerCase() === item.name.toLowerCase()
      );
      if (matchPantry) {
        handleUpdateStock(matchPantry.id, 'Entero');
      } else {
        handleAddPantryItem({
          name: item.name,
          category: 'Vegetables',
          stock: 'Entero',
          quantity: item.unit || '1 unidad',
          imageUrl:
            item.imageUrl ||
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCNI2jPgy-_BiyT3NIH99YdRb9pIbwhYXxPIaFOaWAmaAwZ2Qr6TNGk3K3-5ii3iywwvdxe1WmhB_LsaijFT--VW-LHeLpOVOLgMJprdWZIWqunk9Ebpbu_DizQiddF9M55_pjEZ0l9eU6t6ZlB_HFDvAzkRHyc7spWJcxH6XRDxeTOejvwTIKHm-hctJe7augOZkgGPSW_IgzvFdC_l6o3iYcNlqZUfAae0woaPiLDVmRGGpjP-JgvCQ',
        });
      }
    });

    // Remove checked from shopping list
    setShoppingItems((prev) => prev.filter((i) => !i.checked));

    // Register notification
    setNotifications((prev) => [
      {
        id: 'n_' + Date.now(),
        user: 'Elena (Tú)',
        action: 'completó una compra y pasó',
        target: `${checked.length} artículos a la despensa`,
        timeAgo: 'ahora',
        type: 'purchase',
        read: false,
      },
      ...prev,
    ]);

    showToast(`✓ ¡${checked.length} artículos transferidos a la despensa!`);
  };

  // Recipe handlers
  const handleToggleFavorite = (recipeId: string) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === recipeId ? { ...r, isFavorite: !r.isFavorite } : r
      )
    );
    if (selectedRecipe && selectedRecipe.id === recipeId) {
      setSelectedRecipe((prev) =>
        prev ? { ...prev, isFavorite: !prev.isFavorite } : null
      );
    }
  };

  const handleRefreshMenuSuggestions = () => {
    setIsRefreshingMenu(true);
    setTimeout(() => {
      // Rotate / Shuffle recipes or update match
      setRecipes((prev) => [...prev].reverse());
      setIsRefreshingMenu(false);
      showToast('¡Menú del día actualizado según tu despensa y comensales!');
    }, 900);
  };

  const handleAddMissingToShoppingList = (missingItems: string[]) => {
    missingItems.forEach((name) => {
      handleAddShoppingItem(name, 4.0);
    });
  };

  // Scanner confirmation handler for photos of fridge, cupboard, product, or receipt
  const handleScannerConfirm = (
    detected: VisualDetectedItem[],
    mode: ScanMode,
    summaryText?: string
  ) => {
    if (detected.length === 0) return;

    let addedCount = 0;
    let updatedCount = 0;

    detected.forEach((item) => {
      const matchPantry = pantryItems.find(
        (p) => p.name.toLowerCase() === item.name.toLowerCase()
      );

      if (matchPantry) {
        handleUpdateStock(matchPantry.id, item.stock || 'Entero');
        updatedCount++;
      } else {
        handleAddPantryItem({
          name: item.name,
          category: item.category || 'Vegetables',
          stock: item.stock || 'Entero',
          quantity: item.quantity || '1 unidad',
          imageUrl:
            item.imageUrl ||
            'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
        });
        addedCount++;
      }
    });

    const modeLabels: Record<ScanMode, string> = {
      fridge: 'el frigorífico',
      cupboard: 'el armario/despensa',
      product: 'un producto',
      receipt: 'un ticket de compra',
    };

    const actionDescription = `escaneó ${modeLabels[mode] || 'alimentos'} y guardó`;
    const targetDescription = `${detected.length} artículos en la despensa (${addedCount} nuevos, ${updatedCount} actualizados)`;

    // Register notification
    setNotifications((prev) => [
      {
        id: 'n_' + Date.now(),
        user: 'Elena (Tú)',
        action: actionDescription,
        target: targetDescription,
        timeAgo: 'ahora',
        type: 'purchase',
        read: false,
      },
      ...prev,
    ]);

    showToast(`✓ ¡${detected.length} alimentos integrados en tu despensa!`);
  };

  // Household handlers
  const handleAddMember = (newMem: Omit<HouseholdMember, 'id'>) => {
    const member: HouseholdMember = {
      ...newMem,
      id: 'm_' + Date.now(),
    };
    setHouseholdMembers((prev) => [...prev, member]);
    showToast(`Miembro ${newMem.name} añadido.`);
  };

  const handleDeleteMember = (id: string) => {
    setHouseholdMembers((prev) => prev.filter((m) => m.id !== id));
    showToast('Miembro eliminado.');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const uncheckedShoppingCount = shoppingItems.filter((s) => !s.checked).length;

  return (
    <div className="min-h-screen bg-[#080808] text-[#e0e0e0] font-['Work_Sans'] flex flex-col selection:bg-white selection:text-black">
      {/* Global Header */}
      <Header
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        unreadNotificationsCount={unreadNotificationsCount}
      />

      {/* Main Content Rendered according to active tab */}
      <main className="flex-grow">
        {activeTab === 'pantry' && (
          <PantryView
            items={pantryItems}
            onUpdateStock={handleUpdateStock}
            onOpenAddItem={() => setIsAddItemOpen(true)}
            onOpenScanner={() => handleOpenScannerWithMode('fridge')}
            onOpenScannerMode={handleOpenScannerWithMode}
            onSendToShopping={handleSendToShopping}
          />
        )}

        {activeTab === 'menu' && (
          <MenuView
            recipes={recipes}
            onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
            onRefreshSuggestions={handleRefreshMenuSuggestions}
            isRefreshing={isRefreshingMenu}
          />
        )}

        {activeTab === 'recipes' && (
          <RecipesView
            recipes={recipes}
            onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activeTab === 'shopping' && (
          <ShoppingView
            items={shoppingItems}
            onToggleItem={handleToggleShoppingItem}
            onAddItem={handleAddShoppingItem}
            onRemoveItem={handleRemoveShoppingItem}
            onCompletePurchase={handleCompletePurchase}
          />
        )}

        {activeTab === 'spending' && <SpendingView />}
      </main>

      {/* Navigation (Bottom Bar for Mobile & Top subbar for desktop) */}
      <BottomNavBar
        activeTab={activeTab}
        onChangeTab={(tab) => setActiveTab(tab)}
        onOpenScanner={() => handleOpenScannerWithMode('fridge')}
        shoppingItemsCount={uncheckedShoppingCount}
      />

      {/* Modals */}
      <ScannerModal
        isOpen={isScannerOpen}
        initialMode={scannerMode}
        onClose={() => setIsScannerOpen(false)}
        onConfirmItems={handleScannerConfirm}
      />

      <FamilyProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        preferences={preferences}
        onSavePreferences={(prefs) => {
          setPreferences(prefs);
          showToast('Preferencias familiares actualizadas.');
        }}
        members={householdMembers}
        onAddMember={handleAddMember}
        onDeleteMember={handleDeleteMember}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
        onClearAll={() => setNotifications([])}
      />

      <RecipeDetailModal
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onToggleFavorite={handleToggleFavorite}
        onAddMissingToShoppingList={handleAddMissingToShoppingList}
      />

      <AddItemModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onAddItem={handleAddPantryItem}
      />

      {/* Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#121212] text-white border border-white/10 px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce backdrop-blur-md">
          <span className="material-symbols-outlined text-[16px] text-emerald-400">
            info
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
