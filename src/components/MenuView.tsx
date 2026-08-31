import React, { useState } from 'react';
import { Recipe } from '../types';

interface MenuViewProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onRefreshSuggestions: () => void;
  isRefreshing?: boolean;
}

export const MenuView: React.FC<MenuViewProps> = ({
  recipes,
  onSelectRecipe,
  onRefreshSuggestions,
  isRefreshing = false,
}) => {
  const [activeMealFilter, setActiveMealFilter] = useState<string>('All');

  const menuRecipes = recipes.filter((r) => {
    if (activeMealFilter === 'All') return true;
    return r.mealType === activeMealFilter || 
      (activeMealFilter === 'Desayuno' && (r.mealType === 'Breakfast' || r.mealType === 'Desayuno')) ||
      (activeMealFilter === 'Almuerzo' && (r.mealType === 'Lunch' || r.mealType === 'Almuerzo')) ||
      (activeMealFilter === 'Cena' && (r.mealType === 'Dinner' || r.mealType === 'Cena'));
  });

  const getMealLabel = (mealType: string) => {
    if (mealType === 'Breakfast' || mealType === 'Desayuno') return 'DESAYUNO';
    if (mealType === 'Lunch' || mealType === 'Almuerzo') return 'ALMUERZO';
    if (mealType === 'Dinner' || mealType === 'Cena') return 'CENA';
    return mealType.toUpperCase();
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 py-6 pb-28">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-semibold block">
              Planificación Inteligente
            </span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-['Work_Sans'] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
              IA Curada
            </span>
          </div>
          <h2 className="font-['Epilogue'] text-2xl md:text-3xl font-light text-white tracking-tight mt-1">
            Menú del Día
          </h2>
          <p className="font-['Work_Sans'] text-sm md:text-base text-white/60 mt-1">
            Recomendaciones culinarias optimizadas para consumir lo que tienes en la despensa.
          </p>
        </div>

        <button
          id="btn-refresh-suggestions-desktop"
          onClick={onRefreshSuggestions}
          disabled={isRefreshing}
          className="hidden md:flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-['Work_Sans'] text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-white/90 active:scale-95 transition-all disabled:opacity-60 border border-white"
        >
          <span className={`material-symbols-outlined text-sm ${isRefreshing ? 'animate-spin' : ''}`}>
            refresh
          </span>
          <span>{isRefreshing ? 'Actualizando...' : 'Recalcular Sugerencias'}</span>
        </button>
      </div>

      {/* Meal Type Quick Filter Pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { key: 'All', label: 'Día Completo' },
          { key: 'Desayuno', label: 'Desayuno' },
          { key: 'Almuerzo', label: 'Almuerzo' },
          { key: 'Cena', label: 'Cena' },
        ].map((type) => (
          <button
            key={type.key}
            onClick={() => setActiveMealFilter(type.key)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-['Work_Sans'] transition-all ${
              activeMealFilter === type.key
                ? 'bg-white text-black shadow-sm font-bold'
                : 'bg-[#121212] border border-white/10 text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {menuRecipes.map((recipe) => (
          <article
            key={recipe.id}
            onClick={() => onSelectRecipe(recipe)}
            className="bg-[#121212] rounded-2xl shadow-xl border border-white/10 overflow-hidden flex flex-col group cursor-pointer hover:border-white/25 hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image Header with Match pill */}
            <div className="relative h-52 md:h-60 w-full overflow-hidden bg-[#181818]">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />

              {/* 100% Match pill */}
              <div className="absolute top-3 right-3 bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30 px-3.5 py-1 rounded-full font-['Work_Sans'] text-xs font-bold flex items-center gap-1.5 shadow-md">
                <span className="material-symbols-outlined text-[15px] fill-icon text-emerald-400">
                  check_circle
                </span>
                {recipe.matchPercentage}% Despensa
              </div>

              {/* Meal Tag Overlay */}
              <div className="absolute bottom-3 left-3 bg-black/70 text-white/90 border border-white/10 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {getMealLabel(recipe.mealType)}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-grow justify-between">
              <div>
                <div className="text-emerald-400 font-['Work_Sans'] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                  {getMealLabel(recipe.mealType)}
                </div>
                <h3 className="font-['Epilogue'] text-xl font-medium text-white mb-2 leading-snug group-hover:text-emerald-300 transition-colors">
                  {recipe.title}
                </h3>
                <p className="font-['Work_Sans'] text-sm text-white/60 leading-relaxed mb-4">
                  {recipe.description}
                </p>
              </div>

              {/* Metadata Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-white/50 font-['Work_Sans'] text-xs font-medium">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-white/60">
                    schedule
                  </span>
                  {recipe.timeMinutes} min
                </span>

                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-white/60">
                    restaurant
                  </span>
                  {recipe.difficulty}
                </span>

                <span className="flex items-center gap-1 text-white font-semibold group-hover:translate-x-1 transition-transform">
                  Ver receta
                  <span className="material-symbols-outlined text-[14px]">
                    arrow_forward
                  </span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Mobile Refresh Button */}
      <div className="mt-8 flex justify-center md:hidden">
        <button
          id="btn-refresh-suggestions-mobile"
          onClick={onRefreshSuggestions}
          disabled={isRefreshing}
          className="w-full max-w-sm flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 rounded-full font-['Work_Sans'] text-xs font-bold uppercase tracking-wider shadow-2xl active:scale-95 transition-all disabled:opacity-60"
        >
          <span className={`material-symbols-outlined text-base ${isRefreshing ? 'animate-spin' : ''}`}>
            refresh
          </span>
          <span>{isRefreshing ? 'Actualizando Menú...' : 'Recalcular Sugerencias'}</span>
        </button>
      </div>
    </div>
  );
};
