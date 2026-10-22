import React from 'react';
import { 
  X, 
  Monitor, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  FileCode,
  ShieldCheck,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { desktopExeGenerator } from '../services/desktopExeGenerator';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface WindowsExeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WindowsExeModal: React.FC<WindowsExeModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, install } = usePWAInstall();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-sky-600" />
              <span>Aplikasi Desktop Windows (.EXE / Launcher)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Jalankan portofolio Khairul Nizam secara mandiri di sistem operasi Windows
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
          
          {/* Main Download Option 1: Native Desktop Launcher */}
          <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-sky-950">
                    Windows Desktop Launcher (.CMD / .EXE)
                  </h4>
                  <span className="text-[11px] text-sky-700">
                    Otomatis menjalankan mode jendela aplikasi mandiri tanpa address bar
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-200 text-sky-900">
                Resmi Windows
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Berkas skrip eksekutor mandiri yang secara instan membuka aplikasi Khairul Nizam dalam jendela desktop khusus (berbasis Microsoft Edge WebView2 / Chrome App Mode).
            </p>

            <button
              onClick={() => {
                desktopExeGenerator.downloadWindowsLauncher();
              }}
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Windows Launcher (.cmd) Sekarang</span>
            </button>
          </div>

          {/* Option 2: Browser Desktop Direct Install */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Laptop className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-sm text-slate-900">
                  Pasang Langsung sebagai Aplikasi Desktop Windows
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                Paling Praktis
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-2">
              <p>
                Anda dapat memasang portofolio ini langsung ke Start Menu & Taskbar Windows:
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 text-[11px]">
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-blue-600">1.</span>
                  <span>Di <strong>Microsoft Edge</strong>: Klik ikon titik tiga (...) di pojok kanan atas &gt; pilih <strong>Aplikasi (Apps)</strong> &gt; klik <strong>Pasang situs ini sebagai aplikasi</strong>.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-blue-600">2.</span>
                  <span>Di <strong>Google Chrome</strong>: Klik ikon instal di bilah alamat (URL bar) atau menu &gt; <strong>Simpan dan bagikan</strong> &gt; <strong>Pasang Khairul Nizam Portofolio</strong>.</span>
                </div>
              </div>
            </div>

            {isInstallable && (
              <button
                onClick={install}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Klik untuk Pasang Otomatis Sekarang</span>
              </button>
            )}
          </div>

          {/* Option 3: Offline HTML Package */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-emerald-600" />
                <span>Paket Berkas HTML Offline Portabel</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Dapat dibuka langsung tanpa koneksi internet di browser Windows apa pun.
              </p>
            </div>
            <button
              onClick={() => desktopExeGenerator.downloadStandaloneOfflineBundle()}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
            >
              Unduh HTML
            </button>
          </div>

        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
