import React, { useState } from 'react';
import { ShoppingItem } from '../types';

interface ShoppingViewProps {
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (name: string, price?: number) => void;
  onRemoveItem: (id: string) => void;
  onCompletePurchase: () => void;
}

export const ShoppingView: React.FC<ShoppingViewProps> = ({
  items,
  onToggleItem,
  onAddItem,
  onRemoveItem,
  onCompletePurchase,
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const pantrySuggestedItems = items.filter((i) => i.category === 'Pantry');
  const manualItems = items.filter((i) => i.category === 'Manual');

  const totalEstimated = items
    .filter((i) => !i.checked)
    .reduce((sum, item) => sum + (item.estimatedPrice || 0), 0);

  const checkedCount = items.filter((i) => i.checked).length;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const parsedPrice = parseFloat(newItemPrice) || 3.5;
    onAddItem(newItemName.trim(), parsedPrice);
    setNewItemName('');
    setNewItemPrice('');
  };

  return (
    <div className="w-full max-w-screen-md mx-auto px-4 md:px-0 py-6 pb-28">
      {/* Title Header */}
      <div className="mb-6 text-center md:text-left">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-semibold block mb-1">
          Lista de Compras
        </span>
        <h2 className="font-['Epilogue'] text-2xl md:text-3xl font-light text-white tracking-tight mb-1">
          Lista de Compra
        </h2>
        <p className="font-['Work_Sans'] text-sm text-white/60">
          Artículos sugeridos de tu despensa y añadidos manualmente.
        </p>
      </div>

      {/* Add Item Form */}
      <form
        onSubmit={handleAddSubmit}
        className="bg-[#121212] rounded-2xl shadow-xl p-2.5 mb-6 flex flex-col sm:flex-row items-center gap-2 border border-white/10 focus-within:border-white/30 transition-all"
      >
        <div className="flex items-center flex-grow w-full px-2">
          <span className="material-symbols-outlined text-white/40 mr-2 text-[18px]">
            add_shopping_cart
          </span>
          <input
            id="input-add-shopping-item"
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Añadir artículo a comprar..."
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 font-['Work_Sans'] text-sm text-white placeholder-white/40 h-10"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <input
            type="number"
            step="0.1"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
            placeholder="~Precio (€)"
            className="w-28 bg-[#181818] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40"
          />
          <button
            type="submit"
            className="bg-white text-black rounded-xl px-5 py-2 font-['Work_Sans'] text-xs font-bold uppercase tracking-wider hover:bg-white/90 shadow-sm transition-all whitespace-nowrap active:scale-95 border border-white"
          >
            Añadir
          </button>
        </div>
      </form>

      {/* Section 1: De la Despensa (Poco o Vacío) */}
      {pantrySuggestedItems.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <h3 className="font-['Work_Sans'] text-[11px] font-bold text-emerald-400 uppercase tracking-[0.2em]">
              De la Despensa (Poco o Vacío)
            </h3>
            <span className="text-[11px] text-white/40">
              {pantrySuggestedItems.length} sugeridos
            </span>
          </div>

          <div className="space-y-2 bg-[#121212] rounded-2xl shadow-xl border border-white/10 p-2">
            {pantrySuggestedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleItem(item.id)}
                className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer group ${
                  item.checked
                    ? 'bg-white/5 opacity-50'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Custom Checkbox */}
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      item.checked
                        ? 'bg-white border-white text-black'
                        : 'border-white/40 group-hover:border-white bg-transparent'
                    }`}
                  >
                    {item.checked && (
                      <span className="material-symbols-outlined text-[15px] font-bold">
                        check
                      </span>
                    )}
                  </div>

                  {/* Avatar & Label */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center text-white/50 overflow-hidden border border-white/10">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover opacity-90"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="material-symbols-outlined text-[18px]">
                          kitchen
                        </span>
                      )}
                    </div>

                    <span
                      className={`font-['Work_Sans'] text-sm md:text-base font-medium transition-colors ${
                        item.checked
                          ? 'line-through text-white/40'
                          : 'text-white'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>

                {/* Status and Price */}
                <div className="flex items-center gap-2.5">
                  {item.stockStatus && (
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-['Work_Sans'] text-[10px] font-bold uppercase tracking-wider ${
                        item.stockStatus === 'Vacío'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-white/10 text-white/70 border border-white/10'
                      }`}
                    >
                      {item.stockStatus}
                    </span>
                  )}
                  <span className="font-['Work_Sans'] text-sm font-semibold text-white">
                    ~{item.estimatedPrice.toFixed(2)} €
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveItem(item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-white/40 hover:text-rose-400 transition-all"
                    title="Eliminar de lista"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 2: Añadidos Manualmente */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
          <h3 className="font-['Work_Sans'] text-[11px] font-bold text-white/50 uppercase tracking-[0.2em]">
            Añadidos Manualmente
          </h3>
          <span className="text-[11px] text-white/40">
            {manualItems.length} artículos
          </span>
        </div>

        <div className="space-y-2 bg-[#121212] rounded-2xl shadow-xl border border-white/10 p-2">
          {manualItems.length === 0 ? (
            <div className="py-4 text-center text-xs text-white/40">
              No tienes artículos manuales en la lista.
            </div>
          ) : (
            manualItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleItem(item.id)}
                className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer group ${
                  item.checked
                    ? 'bg-white/5 opacity-50'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Custom Checkbox */}
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      item.checked
                        ? 'bg-white border-white text-black'
                        : 'border-white/40 group-hover:border-white bg-transparent'
                    }`}
                  >
                    {item.checked && (
                      <span className="material-symbols-outlined text-[15px] font-bold">
                        check
                      </span>
                    )}
                  </div>

                  {/* Avatar & Label */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center text-white/50 border border-white/10">
                      <span className="material-symbols-outlined text-[18px]">
                        nutrition
                      </span>
                    </div>

                    <div>
                      <span
                        className={`font-['Work_Sans'] text-sm md:text-base font-medium transition-colors block ${
                          item.checked
                            ? 'line-through text-white/40'
                            : 'text-white'
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price and Remove */}
                <div className="flex items-center gap-2.5">
                  <span className="font-['Work_Sans'] text-sm font-semibold text-white">
                    ~{item.estimatedPrice.toFixed(2)} €
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveItem(item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-white/40 hover:text-rose-400 transition-all"
                    title="Eliminar de lista"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Total Section matching screenshot */}
      <div className="mt-8 border-t border-white/10 pt-5 flex justify-between items-end pb-6">
        <div>
          <p className="font-['Work_Sans'] text-[10px] font-bold text-white/50 uppercase tracking-[0.25em] mb-1">
            Total Estimado
          </p>
          <p className="font-['Work_Sans'] text-xs text-white/50">
            Basado en compras anteriores
          </p>
        </div>
        <div className="font-['Epilogue'] text-4xl md:text-5xl font-light text-white tracking-tight">
          {totalEstimated.toFixed(2)} €
        </div>
      </div>

      {/* Action to complete purchase and move to pantry */}
      {checkedCount > 0 && (
        <div className="bg-[#181818] border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl animate-fade-in">
          <div>
            <h4 className="font-['Epilogue'] text-sm font-medium text-emerald-300">
              {checkedCount} {checkedCount === 1 ? 'artículo comprado' : 'artículos comprados'}
            </h4>
            <p className="font-['Work_Sans'] text-xs text-white/60">
              ¿Quieres transferirlos directamente a tu despensa como "Entero"?
            </p>
          </div>
          <button
            onClick={onCompletePurchase}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white text-black font-['Work_Sans'] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-white/90 transition-all active:scale-95 flex items-center justify-center gap-1.5 border border-white"
          >
            <span className="material-symbols-outlined text-[16px]">inventory_2</span>
            <span>Mover a Despensa</span>
          </button>
        </div>
      )}
    </div>
  );
};
