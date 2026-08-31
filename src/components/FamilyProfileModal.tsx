import React, { useState } from 'react';
import { FamilyPreferences, HouseholdMember, HouseholdRole } from '../types';

interface FamilyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: FamilyPreferences;
  onSavePreferences: (prefs: FamilyPreferences) => void;
  members: HouseholdMember[];
  onAddMember: (member: Omit<HouseholdMember, 'id'>) => void;
  onUpdateMember: (member: HouseholdMember) => void;
  onDeleteMember: (id: string) => void;
  onSetCurrentUser?: (id: string) => void;
}

const PRESET_AVATARS = [
  {
    label: 'Elena (Chef)',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3F1OiLKoWNzr4UqsUpBheZ0N4ImVBjwYeqWsjBbz85bu3UdWYKWXgXgbjhdDohtv3dHxrn5xLEB_1GWkYsnJoE7WtW30ksdbXpaElplGBIa9xd9Goce6u2xyP9nlKuKBuWtfemQFsCdglgGud4-LRLVeiMrsgaypWc-qlHyOYv5poI_IjuFwgN1L_NLXnyczxIkl0PWpPNdYSRd6b05Y-Ax5yjMNK1eoRdfN1-85jlQtaV1hNiCXdPg',
  },
  {
    label: 'Mateo (Comprador)',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZzFJG58eskaJuGULCd0lDET2HdAiyotBQd93tmV8fI3ioM_Y55OLKNvbvXeeB19TGAP30iZd8Yto1wi9oXVioxAHJepl9e63GC7_M2LlK4EXHDhQnXSsSfi7qwMmwXv6H7aS5cGzYnrlr9fweziKW7_eIdAQPpj4lRbckDV79pVr2_6tjjpqDKQ80JRELuKu9t6UJLAbkqGwBkkJyMUBI3xs4lc3aNY0_GwOUyqU_ywRnR8q0YfhumQ',
  },
  {
    label: 'Sofía (Colaboradora)',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8xaw8omwlYOkmDgCg8ITj0NoULTwK9_01BTb6fDRPmUf1wbnRA7ovi4eWFz9bFFM9nyulAftMUtwXSU_3iEm27F4VBtRLJaO1CdcnjS3aOQVwc67hqWg4Y0tRSaDv4hX2n_psqSlUTvD6gzt-l22vy3L19IkGxCDVyEQRumtzQxXd7AIupCw3T_A5yHfd67cr0T_D9dcDQV18MGLsM0FVb7afLvsVT7en7UzirEBAIA3GKulRNTx-qA',
  },
  {
    label: 'Carlos (Gourmet)',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbCx4vjeDGSQHEh-EvZ2Ol1nhRmcahJ54Xsd7j1h0NotJtqbjY76FLk4sh-_wfb2g5n5aDH-y5jVfJV51Wf2LGZN5IhRjxLA7dp289P178sbswf5HK54xS-VVZr8iI9Pr6ppKvAjWSuA3d7qYY2l-BI6uKMqgGRAtoBfq1OV-WFGnFtD2lt3yysNaz6-a4wab0SpcszZ1I4T54DIMWMP1Xuqd51QVzC-t786vhE-p9LK2F8mpehM498g',
  },
  {
    label: 'Lucía (Veggie)',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
  },
  {
    label: 'David (Fitness)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  },
];

const ROLES_LIST: { id: HouseholdRole; title: string; desc: string }[] = [
  {
    id: 'Administrador Familiar',
    title: 'Administrador Familiar',
    desc: 'Control total de la despensa, menú, presupuesto y gestión de miembros.',
  },
  {
    id: 'Comprador Principal',
    title: 'Comprador Principal',
    desc: 'Encargado de las compras, escaneo de tickets y control de gastos.',
  },
  {
    id: 'Colaborador',
    title: 'Colaborador',
    desc: 'Añade alimentos a la despensa, actualiza consumos y sugiere recetas.',
  },
  {
    id: 'Miembro Familiar',
    title: 'Miembro Familiar',
    desc: 'Consulta el menú del día, recetas disponibles y lista de compra.',
  },
];

export const FamilyProfileModal: React.FC<FamilyProfileModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSavePreferences,
  members,
  onAddMember,
  onUpdateMember,
  onDeleteMember,
  onSetCurrentUser,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'household'>('profile');
  const [diners, setDiners] = useState<number | '5+'>(preferences.dinersCount);
  const [allergies, setAllergies] = useState(preferences.allergies);
  const [specialConditions, setSpecialConditions] = useState(preferences.specialConditions);
  
  // Member edit & create state
  const [editingMember, setEditingMember] = useState<HouseholdMember | null>(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<HouseholdRole>('Colaborador');
  const [newMemberAvatar, setNewMemberAvatar] = useState(PRESET_AVATARS[0].url);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberNotes, setNewMemberNotes] = useState('');

  // Editing existing member fields
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState<HouseholdRole>('Colaborador');
  const [editAvatar, setEditAvatar] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const [saveToast, setSaveToast] = useState(false);

  if (!isOpen) return null;

  const toggleAllergy = (key: keyof typeof allergies) => {
    setAllergies((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePreferences = () => {
    onSavePreferences({
      dinersCount: diners,
      allergies,
      specialConditions,
    });
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      onClose();
    }, 800);
  };

  // Open Edit Modal for a member
  const handleOpenEdit = (member: HouseholdMember) => {
    setEditingMember(member);
    setEditName(member.name);
    setEditRole((member.role as HouseholdRole) || 'Colaborador');
    setEditAvatar(member.avatarUrl);
    setEditEmail(member.email || '');
    setEditNotes(member.notes || '');
  };

  const handleSaveMemberEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !editName.trim()) return;

    onUpdateMember({
      ...editingMember,
      name: editName.trim(),
      role: editRole,
      avatarUrl: editAvatar || editingMember.avatarUrl,
      email: editEmail.trim(),
      notes: editNotes.trim(),
      lastActivity: 'Perfil actualizado recientemente',
    });

    setEditingMember(null);
  };

  // Add new member
  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    onAddMember({
      name: newMemberName.trim(),
      role: newMemberRole,
      avatarUrl: newMemberAvatar || PRESET_AVATARS[3].url,
      email: newMemberEmail.trim(),
      notes: newMemberNotes.trim(),
      lastActivity: 'Añadido recientemente al hogar',
      isCurrentUser: false,
    });

    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberNotes('');
    setShowAddMemberModal(false);
  };

  const adminMember = members.find((m) => m.role === 'Administrador Familiar' || m.isCurrentUser) || members[0];
  const regularMembers = members.filter((m) => m.id !== adminMember?.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-0 md:p-4 overflow-y-auto">
      <div className="bg-[#0c0c0c] text-white w-full max-w-2xl min-h-screen md:min-h-0 md:max-h-[92vh] md:rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden relative border border-white/10">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/10 px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 -ml-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              title="Cerrar"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h2 className="font-['Epilogue'] text-lg md:text-xl font-light tracking-wide text-white">
              {activeTab === 'profile' ? 'Preferencias Familiares' : 'Gestión de Perfiles'}
            </h2>
          </div>

          <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-full text-xs font-semibold font-['Work_Sans'] border border-white/10">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                activeTab === 'profile'
                  ? 'bg-white text-black shadow-sm font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Preferencias
            </button>
            <button
              onClick={() => setActiveTab('household')}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === 'household'
                  ? 'bg-white text-black shadow-sm font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span>Miembros ({members.length})</span>
            </button>
          </div>
        </header>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-grow space-y-8 pb-32">
          {saveToast && (
            <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-xl text-center font-['Work_Sans'] text-xs font-bold uppercase tracking-wider shadow-md animate-fade-in">
              ✓ ¡Preferencias guardadas con éxito!
            </div>
          )}

          {activeTab === 'profile' ? (
            <>
              {/* Diners Selector */}
              <section>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-['Epilogue'] text-base md:text-lg font-medium text-white">
                    Número de Comensales
                  </h3>
                  <span className="text-xs text-emerald-400 font-semibold">
                    {diners} personas
                  </span>
                </div>
                <p className="font-['Work_Sans'] text-xs text-white/50 mb-4">
                  Ajustaremos automáticamente las porciones y cantidades en las recetas recomendadas.
                </p>

                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {([1, 2, 3, 4, '5+'] as const).map((num) => (
                    <button
                      key={num}
                      onClick={() => setDiners(num)}
                      className={`relative flex-shrink-0 w-14 h-14 rounded-full font-['Work_Sans'] text-sm font-semibold flex items-center justify-center transition-all ${
                        diners === num
                          ? 'bg-white text-black border-2 border-white shadow-lg font-bold scale-105'
                          : 'border border-white/10 bg-[#121212] text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {num}
                      {diners === num && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-[#0c0c0c]">
                          <span className="material-symbols-outlined text-[10px] text-white fill-icon">
                            check
                          </span>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </section>

              {/* Allergies & Intolerances */}
              <section>
                <h3 className="font-['Epilogue'] text-base md:text-lg font-medium text-white mb-1">
                  Alergias e Intolerancias
                </h3>
                <p className="font-['Work_Sans'] text-xs text-white/50 mb-4">
                  Excluiremos ingredientes que contengan estos alérgenos en tus sugerencias.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Gluten */}
                  <div
                    onClick={() => toggleAllergy('gluten')}
                    className={`relative rounded-2xl p-3.5 flex items-center gap-3 border cursor-pointer transition-all ${
                      allergies.gluten
                        ? 'border-white bg-white/10 shadow-sm text-white'
                        : 'border-white/10 bg-[#121212] text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-white/80">grass</span>
                    <span className="font-['Work_Sans'] text-xs font-semibold">
                      Gluten
                    </span>
                    <div
                      className={`ml-auto w-4 h-4 rounded flex items-center justify-center ${
                        allergies.gluten
                          ? 'bg-white text-black'
                          : 'border border-white/30'
                      }`}
                    >
                      {allergies.gluten && (
                        <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                      )}
                    </div>
                  </div>

                  {/* Lactosa */}
                  <div
                    onClick={() => toggleAllergy('lactosa')}
                    className={`relative rounded-2xl p-3.5 flex items-center gap-3 border cursor-pointer transition-all ${
                      allergies.lactosa
                        ? 'border-white bg-white/10 shadow-sm text-white'
                        : 'border-white/10 bg-[#121212] text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-white/80">water_drop</span>
                    <span className="font-['Work_Sans'] text-xs font-semibold">
                      Lactosa
                    </span>
                    <div
                      className={`ml-auto w-4 h-4 rounded flex items-center justify-center ${
                        allergies.lactosa
                          ? 'bg-white text-black'
                          : 'border border-white/30'
                      }`}
                    >
                      {allergies.lactosa && (
                        <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                      )}
                    </div>
                  </div>

                  {/* Frutos Secos */}
                  <div
                    onClick={() => toggleAllergy('frutosSecos')}
                    className={`relative rounded-2xl p-3.5 flex items-center gap-3 border cursor-pointer transition-all ${
                      allergies.frutosSecos
                        ? 'border-white bg-white/10 shadow-sm text-white'
                        : 'border-white/10 bg-[#121212] text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-white/80">spa</span>
                    <span className="font-['Work_Sans'] text-xs font-semibold">
                      Frutos Secos
                    </span>
                    <div
                      className={`ml-auto w-4 h-4 rounded flex items-center justify-center ${
                        allergies.frutosSecos
                          ? 'bg-white text-black'
                          : 'border border-white/30'
                      }`}
                    >
                      {allergies.frutosSecos && (
                        <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                      )}
                    </div>
                  </div>

                  {/* Mariscos */}
                  <div
                    onClick={() => toggleAllergy('mariscos')}
                    className={`relative rounded-2xl p-3.5 flex items-center gap-3 border cursor-pointer transition-all ${
                      allergies.mariscos
                        ? 'border-white bg-white/10 shadow-sm text-white'
                        : 'border-white/10 bg-[#121212] text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-white/80">set_meal</span>
                    <span className="font-['Work_Sans'] text-xs font-semibold">
                      Mariscos
                    </span>
                    <div
                      className={`ml-auto w-4 h-4 rounded flex items-center justify-center ${
                        allergies.mariscos
                          ? 'bg-white text-black'
                          : 'border border-white/30'
                      }`}
                    >
                      {allergies.mariscos && (
                        <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                      )}
                    </div>
                  </div>

                  {/* Huevo */}
                  <div
                    onClick={() => toggleAllergy('huevo')}
                    className={`relative rounded-2xl p-3.5 flex items-center gap-3 border cursor-pointer transition-all ${
                      allergies.huevo
                        ? 'border-white bg-white/10 shadow-sm text-white'
                        : 'border-white/10 bg-[#121212] text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-white/80">egg</span>
                    <span className="font-['Work_Sans'] text-xs font-semibold">
                      Huevo
                    </span>
                    <div
                      className={`ml-auto w-4 h-4 rounded flex items-center justify-center ${
                        allergies.huevo
                          ? 'bg-white text-black'
                          : 'border border-white/30'
                      }`}
                    >
                      {allergies.huevo && (
                        <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                      )}
                    </div>
                  </div>

                  {/* Soja */}
                  <div
                    onClick={() => toggleAllergy('soja')}
                    className={`relative rounded-2xl p-3.5 flex items-center gap-3 border cursor-pointer transition-all ${
                      allergies.soja
                        ? 'border-white bg-white/10 shadow-sm text-white'
                        : 'border-white/10 bg-[#121212] text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-white/80">grain</span>
                    <span className="font-['Work_Sans'] text-xs font-semibold">
                      Soja
                    </span>
                    <div
                      className={`ml-auto w-4 h-4 rounded flex items-center justify-center ${
                        allergies.soja
                          ? 'bg-white text-black'
                          : 'border border-white/30'
                      }`}
                    >
                      {allergies.soja && (
                        <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Special Conditions */}
              <section>
                <h3 className="font-['Epilogue'] text-base md:text-lg font-medium text-white mb-3">
                  Condiciones y Dietas Especiales
                </h3>
                <div className="space-y-3">
                  {/* Embarazadas */}
                  <div className="bg-[#121212] rounded-2xl p-4 flex items-start justify-between gap-4 border border-white/10 shadow-lg">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="material-symbols-outlined text-rose-400 text-[18px]">
                          pregnant_woman
                        </span>
                        <h4 className="font-['Work_Sans'] text-sm font-semibold text-white">
                          Embarazadas
                        </h4>
                      </div>
                      <p className="font-['Work_Sans'] text-xs text-white/50 leading-relaxed">
                        Filtra alimentos crudos, lácteos no pasteurizados y pescados altos en mercurio.
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
                      <input
                        type="checkbox"
                        checked={specialConditions.embarazadas}
                        onChange={(e) =>
                          setSpecialConditions((prev) => ({
                            ...prev,
                            embarazadas: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#1f1f1f] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white border border-white/20"></div>
                    </label>
                  </div>

                  {/* Vegetariano */}
                  <div className="bg-[#121212] rounded-2xl p-4 flex items-start justify-between gap-4 border border-white/10 shadow-lg">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="material-symbols-outlined text-emerald-400 text-[18px]">
                          eco
                        </span>
                        <h4 className="font-['Work_Sans'] text-sm font-semibold text-white">
                          Preferencia Vegetariana
                        </h4>
                      </div>
                      <p className="font-['Work_Sans'] text-xs text-white/50 leading-relaxed">
                        Prioriza recetas y menús basados en vegetales, legumbres y cereales.
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
                      <input
                        type="checkbox"
                        checked={specialConditions.vegetariano}
                        onChange={(e) =>
                          setSpecialConditions((prev) => ({
                            ...prev,
                            vegetariano: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#1f1f1f] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white border border-white/20"></div>
                    </label>
                  </div>
                </div>
              </section>
            </>
          ) : (
            /* Household Members & Profile Editing Tab */
            <>
              {/* Administrator Profile Card */}
              {adminMember && (
                <section className="bg-[#121212] rounded-2xl p-5 shadow-xl border border-white/15 flex flex-col md:flex-row items-center justify-between gap-5 relative group">
                  <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
                    <div className="relative">
                      <img
                        src={adminMember.avatarUrl}
                        alt={adminMember.name}
                        className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-white/30"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-0 right-0 bg-white text-black rounded-full p-1 shadow-md border border-black flex items-center justify-center">
                        <span className="material-symbols-outlined text-xs fill-icon">star</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <h3 className="font-['Epilogue'] text-lg md:text-xl font-medium text-white">
                          {adminMember.name}
                        </h3>
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Principal
                        </span>
                      </div>
                      <span className="font-['Work_Sans'] text-xs font-semibold text-white/60 block mt-0.5">
                        {adminMember.role}
                      </span>
                      {adminMember.email && (
                        <p className="font-['Work_Sans'] text-xs text-white/40 mt-0.5">
                          {adminMember.email}
                        </p>
                      )}
                      {adminMember.notes && (
                        <p className="font-['Work_Sans'] text-xs text-white/50 italic mt-1">
                          "{adminMember.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenEdit(adminMember)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-semibold text-white transition-all flex items-center gap-1.5 active:scale-95"
                    title="Editar perfil del administrador"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    <span>Editar Perfil</span>
                  </button>
                </section>
              )}

              {/* Members List */}
              <section>
                <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-4">
                  <div>
                    <h3 className="font-['Epilogue'] text-base font-medium text-white">
                      Miembros del Hogar ({members.length})
                    </h3>
                    <p className="font-['Work_Sans'] text-xs text-white/40">
                      Todos los integrantes pueden consultar y editar la despensa.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddMemberModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-black rounded-full text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-white/90 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">person_add</span>
                    <span>Añadir miembro</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {regularMembers.map((member) => (
                    <div
                      key={member.id}
                      className="bg-[#121212] rounded-2xl p-4 shadow-lg border border-white/10 flex items-center justify-between gap-4 group hover:border-white/25 transition-all"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover border border-white/10 opacity-90"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-['Epilogue'] text-base font-medium text-white">
                              {member.name}
                            </h4>
                          </div>
                          <span className="font-['Work_Sans'] text-xs font-semibold text-white/60">
                            {member.role}
                          </span>
                          {member.email && (
                            <p className="font-['Work_Sans'] text-[11px] text-white/40">
                              {member.email}
                            </p>
                          )}
                          <p className="font-['Work_Sans'] text-[11px] text-white/30 mt-0.5">
                            {member.lastActivity}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleOpenEdit(member)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                          title="Editar perfil"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => onDeleteMember(member.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Eliminar miembro"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>

        {/* Modal: EDIT MEMBER POPUP */}
        {editingMember && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <form
              onSubmit={handleSaveMemberEdit}
              className="bg-[#121212] border border-white/20 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-5 text-white max-h-[90vh] overflow-y-auto animate-fade-in"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-white/80">manage_accounts</span>
                  <h4 className="font-['Epilogue'] text-lg font-medium text-white">
                    Editar Perfil
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {/* Avatar Picker */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">
                  Seleccionar Foto de Perfil / Avatar
                </label>
                <div className="flex gap-3 items-center overflow-x-auto pb-2">
                  {PRESET_AVATARS.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditAvatar(av.url)}
                      className={`relative flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                        editAvatar === av.url
                          ? 'border-white scale-110 shadow-lg ring-2 ring-emerald-400'
                          : 'border-white/20 opacity-70 hover:opacity-100'
                      }`}
                      title={av.label}
                    >
                      <img
                        src={av.url}
                        alt={av.label}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {editAvatar === av.url && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-xs font-bold">
                            check
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  placeholder="O pega una URL personalizada de imagen..."
                  className="mt-2 w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Ej. Elena Rodríguez"
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Rol en el Hogar
                </label>
                <div className="space-y-2">
                  {ROLES_LIST.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setEditRole(r.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                        editRole === r.id
                          ? 'border-white bg-white/10 text-white'
                          : 'border-white/10 bg-[#181818] text-white/60 hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-xs text-white">{r.title}</div>
                        <div className="text-[11px] text-white/50">{r.desc}</div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${
                          editRole === r.id
                            ? 'border-white bg-white text-black'
                            : 'border-white/30'
                        }`}
                      >
                        {editRole === r.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Correo Electrónico (opcional)
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="ejemplo@familia.com"
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Notas o Preferencias Personales (opcional)
                </label>
                <input
                  type="text"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Ej. Prefiere comida sin picante, compra los sábados..."
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-white/60 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black shadow-md hover:bg-white/90 active:scale-95"
                >
                  Guardar Perfil
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modal: ADD MEMBER POPUP */}
        {showAddMemberModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <form
              onSubmit={handleAddMemberSubmit}
              className="bg-[#121212] border border-white/20 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-5 text-white max-h-[90vh] overflow-y-auto animate-fade-in"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-white/80">person_add</span>
                  <h4 className="font-['Epilogue'] text-lg font-medium text-white">
                    Nuevo Miembro del Hogar
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">
                  Elige un Avatar
                </label>
                <div className="flex gap-3 items-center overflow-x-auto pb-2">
                  {PRESET_AVATARS.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNewMemberAvatar(av.url)}
                      className={`relative flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                        newMemberAvatar === av.url
                          ? 'border-white scale-110 shadow-lg ring-2 ring-emerald-400'
                          : 'border-white/20 opacity-70 hover:opacity-100'
                      }`}
                      title={av.label}
                    >
                      <img
                        src={av.url}
                        alt={av.label}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Ej. Carlos Rodríguez"
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Rol en el Hogar
                </label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value as HouseholdRole)}
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                >
                  {ROLES_LIST.map((r) => (
                    <option key={r.id} value={r.id} className="bg-[#181818] text-white">
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Correo Electrónico (opcional)
                </label>
                <input
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="carlos@familia.com"
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-white/60 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black shadow-md hover:bg-white/90 active:scale-95"
                >
                  Añadir Miembro
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Fixed Bottom Save Action */}
        <div className="sticky bottom-0 left-0 w-full px-6 py-4 bg-[#0c0c0c]/95 backdrop-blur-md border-t border-white/10 flex justify-end gap-3 z-20">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full border border-white/20 text-white/70 font-['Work_Sans'] text-xs font-semibold hover:bg-white/10 hover:text-white transition-colors"
          >
            Cerrar
          </button>
          {activeTab === 'profile' && (
            <button
              id="btn-save-preferences"
              onClick={handleSavePreferences}
              className="px-7 py-2.5 rounded-full bg-white text-black font-['Work_Sans'] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-white/90 transition-all active:scale-95 flex items-center gap-1.5 border border-white"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>Guardar Preferencias</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
