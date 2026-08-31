import React from 'react';

export type NavTab = 'pantry' | 'menu' | 'recipes' | 'shopping' | 'spending';

interface BottomNavBarProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  onOpenScanner: () => void;
  shoppingItemsCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onChangeTab,
  onOpenScanner,
  shoppingItemsCount,
}) => {
  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav
        id="mobile-bottom-nav"
        className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-[#0c0c0c]/95 backdrop-blur-lg border-t border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.8)] px-2 py-2 pb-safe flex justify-around items-center"
      >
        {/* Despensa */}
        <button
          id="tab-pantry"
          onClick={() => onChangeTab('pantry')}
          className={`flex flex-col items-center justify-center transition-all duration-200 ${
            activeTab === 'pantry'
              ? 'bg-white text-black font-bold rounded-full px-4 py-1 shadow-sm active:scale-95'
              : 'text-white/40 p-2 hover:bg-white/5 rounded-xl active:scale-90'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              activeTab === 'pantry' ? 'fill-icon' : ''
            }`}
          >
            inventory_2
          </span>
          <span className="font-['Work_Sans'] text-[10px] uppercase tracking-wider font-semibold mt-0.5">
            Despensa
          </span>
        </button>

        {/* Menú */}
        <button
          id="tab-menu"
          onClick={() => onChangeTab('menu')}
          className={`flex flex-col items-center justify-center transition-all duration-200 ${
            activeTab === 'menu'
              ? 'bg-white text-black font-bold rounded-full px-4 py-1 shadow-sm active:scale-95'
              : 'text-white/40 p-2 hover:bg-white/5 rounded-xl active:scale-90'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              activeTab === 'menu' ? 'fill-icon' : ''
            }`}
          >
            restaurant_menu
          </span>
          <span className="font-['Work_Sans'] text-[10px] uppercase tracking-wider font-semibold mt-0.5">
            Menú
          </span>
        </button>

        {/* Recetas */}
        <button
          id="tab-recipes"
          onClick={() => onChangeTab('recipes')}
          className={`flex flex-col items-center justify-center transition-all duration-200 ${
            activeTab === 'recipes'
              ? 'bg-white text-black font-bold rounded-full px-4 py-1 shadow-sm active:scale-95'
              : 'text-white/40 p-2 hover:bg-white/5 rounded-xl active:scale-90'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              activeTab === 'recipes' ? 'fill-icon' : ''
            }`}
          >
            menu_book
          </span>
          <span className="font-['Work_Sans'] text-[10px] uppercase tracking-wider font-semibold mt-0.5">
            Recetas
          </span>
        </button>

        {/* Compra */}
        <button
          id="tab-shopping"
          onClick={() => onChangeTab('shopping')}
          className={`relative flex flex-col items-center justify-center transition-all duration-200 ${
            activeTab === 'shopping'
              ? 'bg-white text-black font-bold rounded-full px-4 py-1 shadow-sm active:scale-95'
              : 'text-white/40 p-2 hover:bg-white/5 rounded-xl active:scale-90'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              activeTab === 'shopping' ? 'fill-icon' : ''
            }`}
          >
            shopping_cart
          </span>
          <span className="font-['Work_Sans'] text-[10px] uppercase tracking-wider font-semibold mt-0.5">
            Compra
          </span>
          {shoppingItemsCount > 0 && activeTab !== 'shopping' && (
            <span className="absolute top-1 right-2 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              {shoppingItemsCount}
            </span>
          )}
        </button>

        {/* Gastos */}
        <button
          id="tab-spending"
          onClick={() => onChangeTab('spending')}
          className={`flex flex-col items-center justify-center transition-all duration-200 ${
            activeTab === 'spending'
              ? 'bg-white text-black font-bold rounded-full px-4 py-1 shadow-sm active:scale-95'
              : 'text-white/40 p-2 hover:bg-white/5 rounded-xl active:scale-90'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              activeTab === 'spending' ? 'fill-icon' : ''
            }`}
          >
            query_stats
          </span>
          <span className="font-['Work_Sans'] text-[10px] uppercase tracking-wider font-semibold mt-0.5">
            Gastos
          </span>
        </button>
      </nav>

      {/* Desktop Header Nav Links bar */}
      <div className="hidden md:flex justify-center border-b border-white/10 bg-[#080808]/80 backdrop-blur-md py-3 px-6 sticky top-16 z-30">
        <div className="flex items-center gap-1.5 bg-[#121212] border border-white/10 p-1.5 rounded-full shadow-inner">
          <button
            onClick={() => onChangeTab('pantry')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-['Work_Sans'] text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'pantry'
                ? 'bg-white text-black shadow-md font-bold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">inventory_2</span>
            <span>Despensa</span>
          </button>

          <button
            onClick={() => onChangeTab('menu')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-['Work_Sans'] text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'menu'
                ? 'bg-white text-black shadow-md font-bold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">restaurant_menu</span>
            <span>Menú del Día</span>
          </button>

          <button
            onClick={() => onChangeTab('recipes')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-['Work_Sans'] text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'recipes'
                ? 'bg-white text-black shadow-md font-bold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span>Recetas</span>
          </button>

          <button
            onClick={() => onChangeTab('shopping')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-['Work_Sans'] text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'shopping'
                ? 'bg-white text-black shadow-md font-bold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
            <span>Lista de Compra</span>
            {shoppingItemsCount > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === 'shopping'
                    ? 'bg-black text-white'
                    : 'bg-white text-black font-bold'
                }`}
              >
                {shoppingItemsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onChangeTab('spending')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-['Work_Sans'] text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'spending'
                ? 'bg-white text-black shadow-md font-bold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">query_stats</span>
            <span>Gastos Mensuales</span>
          </button>

          <button
            onClick={onOpenScanner}
            className="flex items-center gap-2 px-4 py-2 rounded-full font-['Work_Sans'] text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-sm ml-2 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
            <span>Escanear</span>
          </button>
        </div>
      </div>
    </>
  );
};
