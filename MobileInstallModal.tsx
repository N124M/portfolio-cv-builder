import React from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  Share, 
  PlusSquare, 
  CheckCircle2, 
  Sparkles,
  WifiOff
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface MobileInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileInstallModal: React.FC<MobileInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, install, isIOS, isAndroid } = usePWAInstall();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-600" />
              <span>Pasang Aplikasi di HP (Android & iOS)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Akses cepat tanpa browser, layar penuh, dan mendukung mode offline
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Quick Install Button for Android / Chromium */}
          {isInstallable && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <span className="text-xs font-bold text-emerald-900">
                Ponsel Anda Mendukung Instalasi Instan!
              </span>
              <button
                onClick={async () => {
                  await install();
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Pasang Aplikasi Sekarang</span>
              </button>
            </div>
          )}

          {/* Android Guide */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                A
              </div>
              <span>Pengguna Android (Google Chrome / Samsung Internet)</span>
            </div>
            
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside pl-1 leading-relaxed">
              <li>Buka website ini melalui browser <strong>Google Chrome</strong> di ponsel Anda.</li>
              <li>Ketuk ikon <strong>titik tiga (⋮)</strong> di sudut kanan atas layar browser.</li>
              <li>Pilih menu <strong>"Tambahkan ke Layar Utama"</strong> atau <strong>"Instal Aplikasi"</strong>.</li>
              <li>Ikon aplikasi resmi <em>Khairul Nizam</em> akan muncul di layar beranda ponsel Anda layaknya aplikasi dari Play Store.</li>
            </ol>
          </div>

          {/* iOS Safari Guide */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                iOS
              </div>
              <span>Pengguna iPhone & iPad (Apple Safari)</span>
            </div>

            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside pl-1 leading-relaxed">
              <li className="flex items-center gap-1.5 flex-wrap">
                <span>1. Buka di <strong>Safari</strong>, lalu ketuk tombol <strong>Bagikan (Share)</strong></span>
                <Share className="w-3.5 h-3.5 text-blue-600 inline" />
                <span>di bilah bawah.</span>
              </li>
              <li className="flex items-center gap-1.5 flex-wrap">
                <span>2. Gulir ke bawah dan ketuk opsi <strong>"Tambahkan ke Layar Utama" (Add to Home Screen)</strong></span>
                <PlusSquare className="w-3.5 h-3.5 text-slate-700 inline" />
              </li>
              <li>3. Ketuk <strong>"Tambah" (Add)</strong> di sudut kanan atas.</li>
              <li>4. Buka aplikasi dari layar beranda iPhone untuk pengalaman layar penuh bebas browser!</li>
            </ol>
          </div>

          {/* Features note */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3 text-xs text-blue-900">
            <WifiOff className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <strong>Mendukung Mode Offline:</strong> Anda tetap bisa membuka CV, dokumen, dan mengisi formulir walau tanpa sinyal internet.
            </div>
          </div>

        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Mengerti & Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
