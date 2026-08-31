import React from 'react';
import { SPENDING_CATEGORIES, SPENDING_TRENDS, TOP_SPENDS } from '../data/initialData';

export const SpendingView: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-6 pb-28">
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-semibold block mb-1">
          Finanzas & Análisis
        </span>
        <h2 className="font-['Epilogue'] text-2xl md:text-3xl font-light text-white tracking-tight">
          Gastos Mensuales
        </h2>
        <p className="font-['Work_Sans'] text-sm text-white/60 mt-1">
          Análisis de consumo, categorías y comparativa de compras del hogar.
        </p>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Total Spend Overview */}
        <section className="col-span-1 md:col-span-4 bg-[#121212] rounded-2xl p-6 shadow-xl border border-white/10 flex flex-col justify-center items-center text-center">
          <p className="font-['Work_Sans'] text-[10px] text-white/50 uppercase tracking-[0.25em] font-semibold mb-2">
            GASTO TOTAL
          </p>
          <h3 className="font-['Epilogue'] text-4xl md:text-5xl font-light text-white tracking-tight mb-3">
            342.50€
          </h3>
          <div className="flex items-center gap-1.5 text-emerald-300 bg-emerald-500/15 border border-emerald-500/20 px-3.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-sm">trending_down</span>
            <span className="font-['Work_Sans'] text-xs font-semibold">
              -12% vs mes anterior
            </span>
          </div>
        </section>

        {/* Category Breakdown */}
        <section className="col-span-1 md:col-span-8 bg-[#121212] rounded-2xl p-6 shadow-xl border border-white/10">
          <h3 className="font-['Epilogue'] text-base md:text-lg font-medium text-white mb-4">
            Por Categoría
          </h3>
          <div className="space-y-4">
            {SPENDING_CATEGORIES.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between items-center mb-1 text-sm font-['Work_Sans']">
                  <span className="text-white/80 flex items-center gap-1.5 font-medium">
                    <span className="material-symbols-outlined text-[17px] text-white/60">
                      {cat.icon}
                    </span>
                    {cat.name}
                  </span>
                  <span className="font-semibold text-white">
                    {cat.amount.toFixed(2)}€
                  </span>
                </div>
                <div className="w-full bg-[#181818] h-2 rounded-full overflow-hidden border border-white/5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      cat.name === 'Proteínas y Carnes'
                        ? 'bg-white'
                        : cat.name === 'Frutas y Verduras'
                        ? 'bg-emerald-400'
                        : cat.name === 'Despensa y Básicos'
                        ? 'bg-amber-400'
                        : 'bg-white/40'
                    }`}
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6 Month Trend */}
        <section className="col-span-1 md:col-span-12 bg-[#121212] rounded-2xl p-6 shadow-xl border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-['Epilogue'] text-base md:text-lg font-medium text-white">
              Tendencia de los Últimos 6 Meses
            </h3>
            <span className="text-xs text-white/40 font-['Work_Sans']">
              Promedio: ~320€/mes
            </span>
          </div>

          <div className="flex items-end justify-between h-48 gap-2 md:gap-6 px-2">
            {SPENDING_TRENDS.map((t) => (
              <div key={t.month} className="flex flex-col items-center flex-1 h-full justify-end group">
                <span className="text-[10px] text-white/60 opacity-0 group-hover:opacity-100 transition-opacity font-semibold mb-1">
                  {t.amount}€
                </span>
                <div className="w-full max-w-[48px] bg-[#181818] rounded-t-lg h-full flex items-end overflow-hidden border border-white/5">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-700 ${
                      t.isCurrent
                        ? 'bg-white shadow-sm'
                        : t.month === 'Dic'
                        ? 'bg-emerald-400'
                        : 'bg-white/20 group-hover:bg-white/40'
                    }`}
                    style={{ height: `${t.percentageHeight}%` }}
                  ></div>
                </div>
                <span
                  className={`font-['Work_Sans'] text-xs mt-2 ${
                    t.isCurrent
                      ? 'text-white font-bold'
                      : 'text-white/40'
                  }`}
                >
                  {t.month}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Top Spends */}
        <section className="col-span-1 md:col-span-12">
          <h3 className="font-['Epilogue'] text-base md:text-lg font-medium text-white mb-4">
            Mayores Gastos de este Mes
          </h3>
          <ul className="space-y-3">
            {TOP_SPENDS.map((item) => (
              <li
                key={item.id}
                className="bg-[#121212] p-3.5 rounded-2xl flex items-center justify-between shadow-lg border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#181818] overflow-hidden flex-shrink-0 border border-white/10">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-90"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="font-['Work_Sans'] text-sm font-medium text-white">
                      {item.title}
                    </p>
                    <p className="font-['Work_Sans'] text-xs text-white/40">
                      {item.category}
                    </p>
                  </div>
                </div>
                <span className="font-['Work_Sans'] text-base font-semibold text-white">
                  {item.amount.toFixed(2)}€
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
