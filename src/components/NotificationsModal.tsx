import React from 'react';
import { AppNotification } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllRead: () => void;
  onClearAll: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="bg-[#0c0c0c] text-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-white/10 animate-slide-left">
        {/* Header */}
        <header className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0c0c0c]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-white/80">notifications</span>
            <h3 className="font-['Epilogue'] text-base md:text-lg font-light tracking-wide text-white">
              Notificaciones del Hogar
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </header>

        {/* Action bar */}
        <div className="px-5 py-2.5 bg-[#121212] flex items-center justify-between border-b border-white/10 text-xs font-['Work_Sans'] font-semibold">
          <button
            onClick={onMarkAllRead}
            className="text-white/80 hover:text-white hover:underline transition-colors"
          >
            Marcar leídas
          </button>
          <button
            onClick={onClearAll}
            className="text-rose-400 hover:text-rose-300 hover:underline transition-colors"
          >
            Limpiar todo
          </button>
        </div>

        {/* Notifications list */}
        <div className="p-4 overflow-y-auto flex-grow space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-white/40">
              <span className="material-symbols-outlined text-4xl mb-2">
                notifications_off
              </span>
              <p className="font-['Work_Sans'] text-sm">
                No tienes notificaciones pendientes.
              </p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  item.read
                    ? 'bg-[#121212] border-white/5 opacity-50'
                    : 'bg-[#141414] border-white/15 shadow-md'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10 ${
                      item.type === 'add'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : item.type === 'purchase'
                        ? 'bg-white/20 text-white'
                        : item.type === 'alert'
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {item.type === 'add'
                        ? 'inventory_2'
                        : item.type === 'purchase'
                        ? 'receipt'
                        : item.type === 'alert'
                        ? 'priority_high'
                        : 'shopping_cart'}
                    </span>
                  </div>

                  <div className="flex-1">
                    <p className="font-['Work_Sans'] text-xs text-white/90 leading-snug">
                      <span className="font-semibold text-white">{item.user}</span> {item.action}{' '}
                      <span className="font-semibold text-white">{item.target}</span>.
                    </p>
                    <span className="text-[10px] text-white/40 mt-1 block">
                      {item.timeAgo}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0c0c0c] border-t border-white/10 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-white text-black font-['Work_Sans'] text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-white/90 active:scale-95 transition-all"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
