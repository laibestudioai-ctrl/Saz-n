import React from 'react';

interface HeaderProps {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadNotificationsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNotifications,
  onOpenProfile,
  unreadNotificationsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#080808]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="flex justify-between items-center px-4 md:px-8 h-16 w-full max-w-screen-xl mx-auto">
        {/* Profile Avatar Button */}
        <button
          id="btn-header-profile"
          onClick={onOpenProfile}
          className="flex items-center gap-2 p-1 rounded-full hover:ring-1 hover:ring-white/30 active:scale-95 transition-all duration-200"
          title="Ver Perfil Familiar y Miembros"
          aria-label="Abrir Perfil Familiar"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#121212] border border-white/15 shadow-sm flex items-center justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRpWNTEnrs1DmGGhyuYhgznqiSXzRIBKMtmN512m8v-SOZQlDURWdTE_Ho2Q-y24mFcrbLiTrCPB2DGcbw1DX11WJQLN7T44vGww1hqUdjqtzNS4VdpVwSafztTGe2uXNoUuIl5SHKZWRb_dR5NK4aqgeAOTGN9YNR-h6C6QaqT3xznNDx0O5_Aj5p7biAEXGokvf4eVkdRLrsVwnEceivznibeYCq-6fM5fAXdoTEUtsCf4_DghiWtg"
              alt="Perfil de Usuario"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </button>

        {/* Logo / App Name */}
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <span className="h-[1px] w-5 bg-white/30 hidden sm:inline-block"></span>
          <h1 className="font-['Epilogue'] text-2xl md:text-3xl font-light tracking-[0.25em] uppercase text-white hover:text-white/80 transition-colors">
            Sazón
          </h1>
          <span className="h-[1px] w-5 bg-white/30 hidden sm:inline-block"></span>
        </div>

        {/* Action Buttons: Notifications & Settings */}
        <div className="flex items-center gap-1">
          <button
            id="btn-header-notifications"
            onClick={onOpenNotifications}
            className="relative w-10 h-10 rounded-full hover:bg-white/5 text-white/60 hover:text-white flex items-center justify-center active:scale-95 transition-all duration-200"
            title="Notificaciones"
            aria-label="Abrir Notificaciones"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[#080808]"></span>
            )}
          </button>

          <button
            id="btn-header-settings"
            onClick={onOpenProfile}
            className="w-10 h-10 rounded-full hover:bg-white/5 text-white/60 hover:text-white flex items-center justify-center active:scale-95 transition-all duration-200"
            title="Ajustes y Perfil Familiar"
            aria-label="Configuración"
          >
            <span className="material-symbols-outlined text-[22px]">settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};
