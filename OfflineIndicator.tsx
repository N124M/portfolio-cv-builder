import React from 'react';
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const { isOnline, syncedCount } = useOnlineStatus();

  if (isOnline && syncedCount === 0) return null;

  if (!isOnline) {
    return (
      <div 
        role="status"
        aria-live="polite"
        className="fixed bottom-16 sm:bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 flex items-center gap-2.5 rounded-2xl bg-amber-500 px-4 py-2.5 text-xs font-semibold text-white shadow-xl border border-amber-400 animate-fade-in"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse shrink-0" />
        <div className="flex-1">
          <strong>Mode Offline Aktif:</strong> Anda tetap dapat melihat portofolio dan mengisi formulir. Data akan disinkronkan otomatis saat tersambung kembali ke internet.
        </div>
      </div>
    );
  }

  return (
    <div 
      role="status"
      aria-live="polite"
      className="fixed bottom-16 sm:bottom-4 left-4 z-50 flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xl animate-fade-in"
    >
      <CheckCircle2 className="w-4 h-4 text-emerald-200" />
      <span>{syncedCount} data offline berhasil disinkronkan otomatis!</span>
    </div>
  );
};
