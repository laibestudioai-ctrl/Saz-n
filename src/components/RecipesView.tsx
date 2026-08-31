import React, { useState } from 'react';
import { Recipe } from '../types';

interface RecipesViewProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleFavorite: (recipeId: string) => void;
}

const TAG_FILTERS = [
  'Todos',
  'Vegetariano',
  'Rápido (< 20 min)',
  'Bajo en Carbohidratos',
  'Alto en Proteína',
  'Desayuno',
  'Cena',
];

export const RecipesView: React.FC<RecipesViewProps> = ({
  recipes,
  onSelectRecipe,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('Todos');

  const favorites = recipes.filter((r) => r.isFavorite);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag =
      activeTag === 'Todos' ||
      recipe.tags.some((t) => {
        const lowerT = t.toLowerCase();
        const lowerTag = activeTag.toLowerCase();
        if (lowerTag === 'vegetariano') return lowerT.includes('veg');
        if (lowerTag === 'rápido (< 20 min)') return lowerT.includes('quick') || lowerT.includes('rápido') || recipe.timeMinutes <= 20;
        if (lowerTag === 'bajo en carbohidratos') return lowerT.includes('carb');
        if (lowerTag === 'alto en proteína') return lowerT.includes('protein') || lowerT.includes('proteína');
        return lowerT.includes(lowerTag);
      });

    return matchesSearch && matchesTag;
  });

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 py-6 pb-28">
      {/* Search & Filters Section */}
      <section className="mb-6">
        <div className="relative mb-3">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-[20px]">
            search
          </span>
          <input
            id="input-search-recipes"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar recetas por nombre o ingrediente..."
            className="w-full bg-[#121212] border-b-2 border-white/20 focus:border-white rounded-t-xl pl-12 pr-4 py-3 text-white placeholder-white/40 font-['Work_Sans'] text-base transition-colors focus:outline-none shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {TAG_FILTERS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`shrink-0 px-4 py-1.5 rounded-full font-['Work_Sans'] text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeTag === tag
                  ? 'bg-white text-black shadow-sm font-bold'
                  : 'bg-[#121212] border border-white/10 text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Favoritos Horizontal Slider */}
      {favorites.length > 0 && activeTag === 'Todos' && !searchQuery && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <h3 className="font-['Epilogue'] text-lg md:text-xl font-medium text-white">
              Favoritos
            </h3>
            <span className="font-['Work_Sans'] text-xs text-white/40">
              {favorites.length} guardadas
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                onClick={() => onSelectRecipe(fav)}
                className="shrink-0 w-44 md:w-52 bg-[#121212] rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:border-white/20 transition-all cursor-pointer group"
              >
                <div className="h-28 md:h-32 w-full relative overflow-hidden bg-[#181818]">
                  <img
                    src={fav.imageUrl}
                    alt={fav.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 border border-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-rose-400 flex items-center gap-0.5 shadow-sm">
                    <span className="material-symbols-outlined text-[12px] fill-icon text-rose-500">
                      favorite
                    </span>
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="font-['Work_Sans'] text-xs font-semibold text-white truncate group-hover:text-emerald-300">
                    {fav.title}
                  </p>
                  <p className="font-['Work_Sans'] text-[11px] text-white/40 mt-0.5">
                    {fav.timeMinutes} min • {fav.difficulty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recipes Main Feed List */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h3 className="font-['Epilogue'] text-lg md:text-xl font-medium text-white">
            {activeTag === 'Todos' ? 'Todas las Recetas' : `Recetas: ${activeTag}`}
          </h3>
          <span className="font-['Work_Sans'] text-xs text-white/40">
            {filteredRecipes.length} recetas disponibles
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecipes.map((recipe) => (
            <article
              key={recipe.id}
              className="bg-[#121212] rounded-2xl overflow-hidden shadow-xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group"
            >
              {/* Recipe Image with Overlays */}
              <div className="h-52 md:h-60 w-full relative overflow-hidden bg-[#181818]">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer opacity-90 group-hover:opacity-100"
                  onClick={() => onSelectRecipe(recipe)}
                  referrerPolicy="no-referrer"
                />

                {/* Difficulty Pill */}
                <div className="absolute top-4 right-4 bg-black/70 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <span
                    className={`material-symbols-outlined text-[15px] ${
                      recipe.difficulty === 'Fácil'
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {recipe.difficulty === 'Fácil'
                      ? 'speed'
                      : 'local_fire_department'}
                  </span>
                  <span className="font-['Work_Sans'] text-xs font-semibold text-white">
                    {recipe.difficulty}
                  </span>
                </div>

                {/* Favorite Heart Button */}
                <button
                  id={`btn-fav-${recipe.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(recipe.id);
                  }}
                  className={`absolute top-4 left-4 bg-black/70 border border-white/10 backdrop-blur-md w-9 h-9 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all ${
                    recipe.isFavorite ? 'text-rose-500' : 'text-white/60 hover:text-rose-400'
                  }`}
                  title={recipe.isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                  aria-label="Alternar favorito"
                >
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      recipe.isFavorite ? 'fill-icon' : ''
                    }`}
                  >
                    favorite
                  </span>
                </button>

                {/* Match percentage pill */}
                {recipe.matchPercentage && (
                  <div className="absolute bottom-3 right-3 bg-black/80 border border-white/10 text-white backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                    {recipe.matchPercentage}% en despensa
                  </div>
                )}
              </div>

              {/* Recipe Body Info */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h2
                    onClick={() => onSelectRecipe(recipe)}
                    className="font-['Epilogue'] text-xl md:text-2xl font-medium text-white mb-2 cursor-pointer hover:text-emerald-300 transition-colors leading-snug"
                  >
                    {recipe.title}
                  </h2>
                  <p className="font-['Work_Sans'] text-sm text-white/60 mb-4 leading-relaxed">
                    {recipe.description}
                  </p>

                  {/* Ingredients in Stock / Missing badges */}
                  <div className="bg-[#181818] rounded-xl p-3.5 flex flex-col gap-2 border border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[17px] text-emerald-400 shrink-0">
                        check_circle
                      </span>
                      <span className="font-['Work_Sans'] text-xs font-semibold text-white/80">
                        Tienes:{' '}
                        <span className="font-normal text-white/60">
                          {recipe.inStockIngredients.join(', ')}
                        </span>
                      </span>
                    </div>

                    {recipe.missingIngredients.length > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[17px] text-rose-400 shrink-0">
                          error
                        </span>
                        <span className="font-['Work_Sans'] text-xs font-semibold text-rose-300">
                          Falta:{' '}
                          <span className="font-normal text-rose-200/80">
                            {recipe.missingIngredients.join(', ')}
                          </span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[17px] text-emerald-400 shrink-0 fill-icon">
                          verified
                        </span>
                        <span className="font-['Work_Sans'] text-xs font-semibold text-emerald-300">
                          ¡Tienes todos los ingredientes necesarios!
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-['Work_Sans'] text-xs text-white/40 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    {recipe.timeMinutes} minutos
                  </span>

                  <button
                    onClick={() => onSelectRecipe(recipe)}
                    className="px-4 py-2 rounded-full bg-white text-black text-xs font-['Work_Sans'] font-bold uppercase tracking-wider shadow-sm hover:bg-white/90 transition-all flex items-center gap-1.5"
                  >
                    <span>Cocinar ahora</span>
                    <span className="material-symbols-outlined text-[14px]">
                      restaurant
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12 bg-[#121212] rounded-2xl border border-dashed border-white/10 p-6">
            <span className="material-symbols-outlined text-4xl text-white/30 mb-2">
              soup_kitchen
            </span>
            <p className="font-['Epilogue'] text-base font-light text-white">
              No encontramos recetas para tu búsqueda
            </p>
            <p className="font-['Work_Sans'] text-xs text-white/40 mt-1">
              Intenta cambiar los filtros o limpiar la búsqueda.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTag('Todos');
              }}
              className="mt-3 px-5 py-2 bg-white text-black rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
