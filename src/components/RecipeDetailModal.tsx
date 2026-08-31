import React, { useState } from 'react';
import { Recipe } from '../types';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (recipeId: string) => void;
  onAddMissingToShoppingList: (missingItems: string[]) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  isOpen,
  onClose,
  onToggleFavorite,
  onAddMissingToShoppingList,
}) => {
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState('');

  if (!isOpen || !recipe) return null;

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleAddMissing = () => {
    if (recipe.missingIngredients.length > 0) {
      onAddMissingToShoppingList(recipe.missingIngredients);
      setToastMessage('¡Ingredientes añadidos a tu lista de compras!');
      setTimeout(() => setToastMessage(''), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-0 md:p-4 overflow-y-auto">
      <div className="bg-[#0c0c0c] text-white w-full max-w-2xl min-h-screen md:min-h-0 md:max-h-[92vh] md:rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden relative border border-white/10">
        {/* Modal Image Header */}
        <div className="relative h-64 md:h-72 w-full flex-shrink-0 bg-[#121212]">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-black/40 to-black/60"></div>

          {/* Top Actions */}
          <div className="absolute top-4 inset-x-4 flex justify-between items-center z-10">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 shadow-md active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className={`w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md active:scale-95 transition-all ${
                recipe.isFavorite ? 'text-rose-400' : 'text-white/80'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] ${
                  recipe.isFavorite ? 'fill-icon' : ''
                }`}
              >
                favorite
              </span>
            </button>
          </div>

          {/* Title on image */}
          <div className="absolute bottom-4 inset-x-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-2.5 py-0.5 rounded-full font-['Work_Sans'] text-xs font-semibold shadow-sm">
                {recipe.matchPercentage || 100}% Despensa
              </span>
              <span className="bg-white/15 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full text-xs font-medium text-white">
                {recipe.difficulty}
              </span>
            </div>
            <h2 className="font-['Epilogue'] text-2xl md:text-3xl font-light leading-tight tracking-tight">
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-grow space-y-6">
          {toastMessage && (
            <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider animate-fade-in shadow-sm">
              {toastMessage}
            </div>
          )}

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-[#121212] p-3.5 rounded-2xl border border-white/10 text-center">
            <div>
              <span className="material-symbols-outlined text-white/60 text-[20px] block mb-0.5">
                schedule
              </span>
              <span className="text-[10px] text-white/40 uppercase tracking-wider block">Tiempo</span>
              <span className="font-['Work_Sans'] text-xs font-semibold text-white">
                {recipe.timeMinutes} min
              </span>
            </div>

            <div>
              <span className="material-symbols-outlined text-white/60 text-[20px] block mb-0.5">
                group
              </span>
              <span className="text-[10px] text-white/40 uppercase tracking-wider block">Porciones</span>
              <span className="font-['Work_Sans'] text-xs font-semibold text-white">
                {(recipe.servings || 2) * servingsMultiplier} pers.
              </span>
            </div>

            <div>
              <span className="material-symbols-outlined text-white/60 text-[20px] block mb-0.5">
                local_fire_department
              </span>
              <span className="text-[10px] text-white/40 uppercase tracking-wider block">Calorías</span>
              <span className="font-['Work_Sans'] text-xs font-semibold text-white">
                {(recipe.calories || 420) * servingsMultiplier} kcal
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="font-['Work_Sans'] text-sm text-white/70 leading-relaxed">
            {recipe.description}
          </p>

          {/* Ingredients Section */}
          <section>
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-1.5">
              <h3 className="font-['Epilogue'] text-base md:text-lg font-light text-white">
                Ingredientes
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setServingsMultiplier(Math.max(1, servingsMultiplier - 1))}
                  className="w-6 h-6 rounded-full bg-[#181818] border border-white/10 text-xs font-bold flex items-center justify-center hover:bg-white/10 text-white"
                >
                  -
                </button>
                <span className="text-xs font-semibold text-white">
                  {servingsMultiplier}x
                </span>
                <button
                  onClick={() => setServingsMultiplier(servingsMultiplier + 1)}
                  className="w-6 h-6 rounded-full bg-[#181818] border border-white/10 text-xs font-bold flex items-center justify-center hover:bg-white/10 text-white"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {recipe.allIngredients.map((ing, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl flex items-center justify-between border ${
                    ing.inStock
                      ? 'bg-[#121212] border-white/10'
                      : 'bg-rose-950/20 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        ing.inStock ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {ing.inStock ? 'check_circle' : 'cancel'}
                    </span>
                    <span className="font-['Work_Sans'] text-sm font-medium text-white">
                      {ing.name}
                    </span>
                  </div>

                  <span className="font-['Work_Sans'] text-xs font-semibold text-white/50">
                    {ing.amount}
                  </span>
                </div>
              ))}
            </div>

            {recipe.missingIngredients.length > 0 && (
              <button
                onClick={handleAddMissing}
                className="mt-3 w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-['Work_Sans'] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  add_shopping_cart
                </span>
                <span>Añadir {recipe.missingIngredients.length} faltantes a la lista de compra</span>
              </button>
            )}
          </section>

          {/* Step-by-Step Instructions */}
          <section>
            <h3 className="font-['Epilogue'] text-base md:text-lg font-light text-white mb-3 border-b border-white/10 pb-1.5">
              Instrucciones Paso a Paso
            </h3>

            <div className="space-y-3">
              {recipe.instructions.map((step, idx) => {
                const isDone = completedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-3.5 ${
                      isDone
                        ? 'bg-[#141414] border-emerald-500/30 opacity-60'
                        : 'bg-[#121212] border-white/10 hover:border-white/30 shadow-md'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isDone
                          ? 'bg-emerald-500 text-black'
                          : 'bg-[#181818] border border-white/20 text-white'
                      }`}
                    >
                      {isDone ? '✓' : idx + 1}
                    </div>

                    <div className="flex-1">
                      <p
                        className={`font-['Work_Sans'] text-sm leading-relaxed ${
                          isDone ? 'line-through text-white/40' : 'text-white'
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0c0c0c] border-t border-white/10 flex justify-between items-center">
          <div className="text-xs text-white/50">
            Paso {completedSteps.length} de {recipe.instructions.length} completados
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-white text-black font-['Work_Sans'] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-white/90 active:scale-95 transition-all"
          >
            Listo / Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
