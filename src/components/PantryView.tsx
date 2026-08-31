import React, { useState } from 'react';
import { PantryItem, StockLevel, ScanMode } from '../types';

interface PantryViewProps {
  items: PantryItem[];
  onUpdateStock: (itemId: string, newStock: StockLevel) => void;
  onOpenAddItem: () => void;
  onOpenScanner: () => void;
  onOpenScannerMode?: (mode: ScanMode) => void;
  onSendToShopping: (itemName: string) => void;
}

const STOCK_CYCLE: StockLevel[] = ['Entero', 'Medio', 'Poco', 'Agotado'];

export const PantryView: React.FC<PantryViewProps> = ({
  items,
  onUpdateStock,
  onOpenAddItem,
  onOpenScanner,
  onOpenScannerMode,
  onSendToShopping,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState('');

  const triggerScan = (mode: ScanMode) => {
    if (onOpenScannerMode) {
      onOpenScannerMode(mode);
    } else {
      onOpenScanner();
    }
  };

  const categories = [
    { key: 'All', label: 'Todos' },
    { key: 'Vegetables', label: 'Vegetables' },
    { key: 'Proteins', label: 'Proteins' },
    { key: 'Grains', label: 'Grains' },
    { key: 'Dairy', label: 'Dairy' },
    { key: 'Pantry', label: 'Despensa' },
  ];

  const filteredItems = items.filter((item) => {
    const matchesCat =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryItems = (cat: string) => {
    return filteredItems.filter((i) => i.category === cat);
  };

  const handleCycleStock = (item: PantryItem) => {
    const currentIndex = STOCK_CYCLE.indexOf(item.stock);
    const nextIndex = (currentIndex + 1) % STOCK_CYCLE.length;
    const nextStock = STOCK_CYCLE[nextIndex];
    onUpdateStock(item.id, nextStock);
  };

  const handleVoiceSimulation = () => {
    setVoiceActive(true);
    setVoiceMessage('Escuchando... "Añadir 1 cartón de leche a la despensa"');
    setTimeout(() => {
      setVoiceMessage('¡Añadido! Despensa actualizada con éxito.');
      setTimeout(() => {
        setVoiceActive(false);
        setVoiceMessage('');
      }, 2500);
    }, 2000);
  };

  const renderStockBadge = (stock: StockLevel) => {
    switch (stock) {
      case 'Entero':
        return (
          <div className="absolute top-2 right-2 z-10 bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30 font-['Work_Sans'] text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Entero
          </div>
        );
      case 'Medio':
        return (
          <div className="absolute top-2 right-2 z-10 bg-amber-500/20 backdrop-blur-md text-amber-300 border border-amber-500/30 font-['Work_Sans'] text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Medio
          </div>
        );
      case 'Poco':
        return (
          <div className="absolute top-2 right-2 z-10 bg-rose-500/20 backdrop-blur-md text-rose-300 border border-rose-500/30 font-['Work_Sans'] text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
            Poco
          </div>
        );
      case 'Agotado':
        return (
          <div className="absolute top-2 right-2 z-10 bg-zinc-800/80 backdrop-blur-md text-zinc-400 border border-zinc-700 font-['Work_Sans'] text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
            Agotado
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 py-6 pb-28">
      {/* Top Banner & Search */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-semibold block mb-1">
            Inventario en Vivo
          </span>
          <h2 className="font-['Epilogue'] text-2xl md:text-3xl font-light text-white tracking-tight">
            Mi Despensa
          </h2>
          <p className="font-['Work_Sans'] text-sm text-white/60 mt-0.5">
            Gestiona tus existencias en tiempo real y evita desperdicios.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-[18px]">
            search
          </span>
          <input
            id="input-search-pantry"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en despensa..."
            className="w-full bg-[#121212] border border-white/10 focus:border-white/40 focus:ring-1 focus:ring-white/20 rounded-full pl-11 pr-4 py-2.5 text-sm text-white placeholder-white/40 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual AI Scan Quick Hub Banner */}
      <div className="mb-6 bg-gradient-to-r from-[#141414] via-[#121212] to-[#161616] rounded-3xl p-4 md:p-5 border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            </div>
            <div>
              <h3 className="font-['Epilogue'] text-sm md:text-base font-medium text-white">
                Escaneo Inteligente con Cámara / Foto
              </h3>
              <p className="font-['Work_Sans'] text-xs text-white/50">
                Haz una foto a tu frigorífico, alacena o producto y la IA registrará los alimentos automáticamente.
              </p>
            </div>
          </div>

          <span className="self-start md:self-auto text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
            Gemini Vision
          </span>
        </div>

        {/* 4 Direct Scanning Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          <button
            onClick={() => triggerScan('fridge')}
            className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#1c1c1c] hover:bg-[#252525] border border-white/10 hover:border-emerald-500/40 text-left transition-all group active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">kitchen</span>
            </div>
            <div>
              <span className="font-['Work_Sans'] text-xs font-semibold text-white block">
                Foto Frigo
              </span>
              <span className="text-[10px] text-white/40 block">
                Nevera completa
              </span>
            </div>
          </button>

          <button
            onClick={() => triggerScan('cupboard')}
            className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#1c1c1c] hover:bg-[#252525] border border-white/10 hover:border-emerald-500/40 text-left transition-all group active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">shelves</span>
            </div>
            <div>
              <span className="font-['Work_Sans'] text-xs font-semibold text-white block">
                Foto Armario
              </span>
              <span className="text-[10px] text-white/40 block">
                Alacena / Despensa
              </span>
            </div>
          </button>

          <button
            onClick={() => triggerScan('product')}
            className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#1c1c1c] hover:bg-[#252525] border border-white/10 hover:border-emerald-500/40 text-left transition-all group active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
            <div>
              <span className="font-['Work_Sans'] text-xs font-semibold text-white block">
                Foto Producto
              </span>
              <span className="text-[10px] text-white/40 block">
                Envase individual
              </span>
            </div>
          </button>

          <button
            onClick={() => triggerScan('receipt')}
            className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#1c1c1c] hover:bg-[#252525] border border-white/10 hover:border-emerald-500/40 text-left transition-all group active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-300 border border-rose-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            </div>
            <div>
              <span className="font-['Work_Sans'] text-xs font-semibold text-white block">
                Foto Ticket
              </span>
              <span className="text-[10px] text-white/40 block">
                Ticket con precios
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`shrink-0 px-4 py-1.5 rounded-full font-['Work_Sans'] text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              selectedCategory === cat.key
                ? 'bg-white text-black shadow-sm font-bold'
                : 'bg-[#121212] border border-white/10 text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Voice Assistant banner if activated */}
      {voiceActive && (
        <div className="mb-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex items-center justify-between animate-fade-in shadow-sm">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
            <span className="font-['Work_Sans'] text-sm font-medium text-white">
              {voiceMessage}
            </span>
          </div>
          <button
            onClick={() => setVoiceActive(false)}
            className="text-xs text-white/60 hover:text-white font-semibold"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Content by Category */}
      {(selectedCategory === 'All' ? ['Vegetables', 'Proteins', 'Grains', 'Dairy', 'Pantry'] : [selectedCategory]).map(
        (catName) => {
          const itemsInCat = getCategoryItems(catName);
          if (itemsInCat.length === 0) return null;

          return (
            <section key={catName} className="mb-8">
              <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                <h3 className="font-['Epilogue'] text-lg md:text-xl font-medium text-white capitalize tracking-wide">
                  {catName === 'Vegetables'
                    ? 'Vegetales & Verduras'
                    : catName === 'Proteins'
                    ? 'Proteínas & Carnes'
                    : catName === 'Grains'
                    ? 'Granos & Cereales'
                    : catName === 'Dairy'
                    ? 'Lácteos & Huevos'
                    : 'Despensa & Especias'}
                </h3>
                <span className="font-['Work_Sans'] text-xs font-medium text-white/40">
                  {itemsInCat.length} {itemsInCat.length === 1 ? 'artículo' : 'artículos'}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {itemsInCat.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#121212] rounded-2xl overflow-hidden shadow-lg border border-white/5 relative group hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Badge */}
                    {renderStockBadge(item.stock)}

                    {/* Image container */}
                    <div className="h-36 md:h-44 w-full relative overflow-hidden bg-[#181818]">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      {/* Hover / Tap cycle overlay */}
                      <button
                        onClick={() => handleCycleStock(item)}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity font-['Work_Sans'] text-xs font-semibold backdrop-blur-xs"
                        title="Click para cambiar estado"
                      >
                        <span className="bg-white text-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md font-bold text-xs">
                          <span className="material-symbols-outlined text-[15px]">sync</span>
                          Cambiar estado
                        </span>
                      </button>
                    </div>

                    {/* Card details */}
                    <div className="p-3.5 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-['Work_Sans'] text-sm md:text-base font-semibold text-white leading-snug">
                            {item.name}
                          </h4>
                        </div>
                        {item.quantity && (
                          <p className="font-['Work_Sans'] text-xs text-white/50 mt-0.5">
                            {item.quantity}
                          </p>
                        )}
                      </div>

                      {/* Bottom quick actions */}
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                        <button
                          onClick={() => handleCycleStock(item)}
                          className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5"
                        >
                          <span>{item.stock}</span>
                          <span className="material-symbols-outlined text-[14px]">expand_more</span>
                        </button>

                        {(item.stock === 'Poco' || item.stock === 'Agotado') && (
                          <button
                            onClick={() => onSendToShopping(item.name)}
                            className="text-[11px] bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 transition-colors"
                            title="Añadir a lista de compras"
                          >
                            <span className="material-symbols-outlined text-[12px]">add_shopping_cart</span>
                            Comprar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        }
      )}

      {filteredItems.length === 0 && (
        <div className="py-16 text-center bg-[#121212] rounded-2xl border border-dashed border-white/10 p-8">
          <span className="material-symbols-outlined text-4xl text-white/30 mb-2">
            search_off
          </span>
          <h3 className="font-['Epilogue'] text-lg font-light text-white">
            No se encontraron ingredientes
          </h3>
          <p className="font-['Work_Sans'] text-sm text-white/50 mt-1">
            Prueba a buscar con otro nombre o añade un nuevo artículo a la despensa.
          </p>
          <button
            onClick={onOpenAddItem}
            className="mt-4 px-6 py-2 rounded-full bg-white text-black font-['Work_Sans'] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-white/90"
          >
            Añadir artículo
          </button>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 flex flex-col gap-3 z-30">
        {/* Voice Assistant button */}
        <button
          id="btn-voice-assistant"
          onClick={handleVoiceSimulation}
          className="w-12 h-12 md:w-13 md:h-13 bg-[#181818] border border-white/20 text-rose-400 hover:text-rose-300 hover:border-rose-400/50 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-all"
          title="Asistente de voz por IA"
          aria-label="Asistente de voz"
        >
          <span className="material-symbols-outlined text-2xl">mic</span>
        </button>

        {/* Scan receipt floating quick button */}
        <button
          id="btn-scan-receipt-quick"
          onClick={onOpenScanner}
          className="w-12 h-12 md:w-13 md:h-13 bg-[#181818] border border-white/20 text-white hover:border-white/50 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-all"
          title="Escanear Ticket de Compra"
          aria-label="Escanear ticket"
        >
          <span className="material-symbols-outlined text-2xl">receipt_long</span>
        </button>

        {/* Add item floating button */}
        <button
          id="btn-add-pantry-item"
          onClick={onOpenAddItem}
          className="w-14 h-14 md:w-15 md:h-15 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:bg-white/90 active:scale-95 transition-all border border-white"
          title="Añadir a la despensa"
          aria-label="Añadir alimento"
        >
          <span className="material-symbols-outlined text-3xl font-bold">add</span>
        </button>
      </div>
    </div>
  );
};
