import React, { useState } from 'react';
import { PantryItem, StockLevel, PantryCategory } from '../types';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: Omit<PantryItem, 'id' | 'lastUpdated'>) => void;
}

const CATEGORIES: { key: PantryCategory; label: string }[] = [
  { key: 'Vegetables', label: 'Vegetales & Verduras' },
  { key: 'Proteins', label: 'Proteínas & Carnes' },
  { key: 'Grains', label: 'Granos & Cereales' },
  { key: 'Dairy', label: 'Lácteos & Huevos' },
  { key: 'Pantry', label: 'Despensa & Especias' },
];

const STOCKS: StockLevel[] = ['Entero', 'Medio', 'Poco', 'Agotado'];

const SAMPLE_IMAGES: Record<string, string> = {
  Vegetables:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCNI2jPgy-_BiyT3NIH99YdRb9pIbwhYXxPIaFOaWAmaAwZ2Qr6TNGk3K3-5ii3iywwvdxe1WmhB_LsaijFT--VW-LHeLpOVOLgMJprdWZIWqunk9Ebpbu_DizQiddF9M55_pjEZ0l9eU6t6ZlB_HFDvAzkRHyc7spWJcxH6XRDxeTOejvwTIKHm-hctJe7augOZkgGPSW_IgzvFdC_l6o3iYcNlqZUfAae0woaPiLDVmRGGpjP-JgvCQ',
  Proteins:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCgl9oZfLSi3HZd5j3RX0_t0FzqqC8eMn9MY-SN_1RwArKLit4O-EUdXPcoV9olxfxsJlhT9DqunLz0DquyXcfCsY4ZhKwes-ybm3dcDhEYi4fEqHUDVlCDIsdV9f0_0Xzf49Wjys0Fa8ClPjUgvzXBCGc9u2d2Fmb1NYWZE5USlyAgyO6VfxsQ_RCIUGJXiP76XFtb54WoecD8T5msawo8LMWNyBjoUrmopJY0f-XNr7KbcLLDNwRBlg',
  Grains:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCI_cCwPx4Yb9SjBVf61GCSWliP8QDqMKgb9jm5bIzIkLYmwQjpDFeusxjSj7MKjwPPSRPSX9CBj-fkog0kQ8zMOzFWklOkGRsJuP1srSYD2eX4gVamyBEIFnl-qJ76XjA07eXFmSjv1f0oZdJSk58ZLvjgyYSRhZk6n_vzcw6CHQOnlSKOzPeY7f4mGoa5EKNT8MEtki0TckPXd7c9b_CQlgpwN2Ow4QxMvh_ipcwLTJvqOFQAGlZrjQ',
  Dairy:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAOIT67qHJQqPiaXP5Pr_FAMVm60hFb6ABtC6KsCwlTOutoOACZsY-PzvAQEGODyAWoGxUR7TXL_c0TN8N8RowP3Nk4vkXJLW-ZfwBCkyc14AISUovdmhWmwLY3eNAE88Hxb53hQDi8a7qmbS4VBwnt0xuVFk81UXYU4Ukm8xaJpkxFeU1fHXbsQtSSkoVlyGwiRRnAITO41FF88qliJT-_uqRXgSagMw0GANAnRY-0el8FUPKIzei3gg',
  Pantry:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAwv4pjK9ZAtcoE2lPwrTZCIfDP5Z9natNOTYrx7eIXF2LRveCRyeyyR9pWRC5wO39RJ1ECOYcK1Rixvhf4FlOYLpTP2RDbyMcO2g7e5gEvM9P4zb8sl3nqSm6PRve-3XYyhb_nNFrL8wAVcYDCBsZq5mN3psfusJpdwu5qoIcD446oleGssdQ3M3bWA0IuBnPmywg1OkWOb6PmGjhKPKKvR8ksV-VEWEw9d1JXFQgmb1tcTFzlYmQ9WA',
};

export const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  onAddItem,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<PantryCategory>('Vegetables');
  const [stock, setStock] = useState<StockLevel>('Entero');
  const [quantity, setQuantity] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddItem({
      name: name.trim(),
      category,
      stock,
      quantity: quantity.trim() || '1 unidad',
      imageUrl: SAMPLE_IMAGES[category] || SAMPLE_IMAGES.Pantry,
    });

    setName('');
    setQuantity('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0c0c0c] text-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-white/10 animate-fade-in">
        {/* Header */}
        <header className="p-5 bg-[#0c0c0c] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-white/80">
              add_circle
            </span>
            <h3 className="font-['Epilogue'] text-base md:text-lg font-light tracking-wide text-white">
              Añadir a la Despensa
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-['Work_Sans'] text-xs font-semibold text-white/70 mb-1">
              Nombre del Alimento
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Espinacas frescas, Salmón, etc."
              className="w-full bg-[#181818] border border-white/10 focus:border-white rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-['Work_Sans'] text-xs font-semibold text-white/70 mb-1">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PantryCategory)}
                className="w-full bg-[#181818] border border-white/10 focus:border-white rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.key} value={cat.key} className="bg-[#181818] text-white">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-['Work_Sans'] text-xs font-semibold text-white/70 mb-1">
                Nivel de Stock
              </label>
              <select
                value={stock}
                onChange={(e) => setStock(e.target.value as StockLevel)}
                className="w-full bg-[#181818] border border-white/10 focus:border-white rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none"
              >
                {STOCKS.map((s) => (
                  <option key={s} value={s} className="bg-[#181818] text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-['Work_Sans'] text-xs font-semibold text-white/70 mb-1">
              Cantidad o Detalle (opcional)
            </label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Ej. 500g, 2 botellas, etc."
              className="w-full bg-[#181818] border border-white/10 focus:border-white rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-white text-black font-['Work_Sans'] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-white/90 active:scale-95 transition-all"
            >
              Guardar en Despensa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
