import React, { useState } from 'react';
import { 
  Download, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Monitor, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Menu, 
  X,
  FileText,
  Sliders
} from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  onOpenDownloadModal: () => void;
  onOpenAccessibilityModal: () => void;
  onOpenWindowsExeModal: () => void;
  onOpenMobileModal: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDownloadModal,
  onOpenAccessibilityModal,
  onOpenWindowsExeModal,
  onOpenMobileModal,
  activeSection,
  setActiveSection,
  isSpeaking,
  onToggleSpeech,
}) => {
  const { isOnline } = useOnlineStatus();
  const { isInstallable, install } = usePWAInstall();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang Saya' },
    { id: 'portofolio', label: 'Portofolio' },
    { id: 'layanan', label: 'Layanan' },
    { id: 'unggah-data', label: 'Unggah Data CV' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand matching the diagram header */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('beranda')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
              aria-label="Khairul Nizam Beranda"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-700 via-blue-600 to-sky-500 p-0.5 shadow-md flex items-center justify-center transform group-hover:scale-105 transition">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-xl text-sky-400 tracking-tighter">K</span>
                </div>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  Khairul Nizam
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                    Pro
                  </span>
                </span>
                <span className="block text-[11px] text-slate-500 font-medium">
                  IT & Management Hub
                </span>
              </div>
            </button>

            {/* Sync Status Badge */}
            <div className="hidden xl:flex items-center gap-1.5 pl-3 border-l border-slate-200 text-xs">
              {isOnline ? (
                <span className="inline-flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Daring (Auto-Sync)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <WifiOff className="w-3 h-3 text-amber-600" />
                  Mode Offline Aktif
                </span>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigasi Utama">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === link.id
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Tools & Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Screen Reader Voice Button */}
            <button
              onClick={onToggleSpeech}
              title={isSpeaking ? 'Hentikan Pembacaan Suara' : 'Bacakan Halaman Ini (Aksesibilitas)'}
              className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition ${
                isSpeaking 
                  ? 'bg-amber-100 border-amber-300 text-amber-900 animate-pulse'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              aria-label="Fitur suara pembaca teks"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-amber-700" />
                  <span className="hidden md:inline">Stop Suara</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-slate-600" />
                  <span className="hidden md:inline">Baca Suara</span>
                </>
              )}
            </button>

            {/* Accessibility Settings Tool */}
            <button
              onClick={onOpenAccessibilityModal}
              title="Pengaturan Aksesibilitas (Ukuran Teks, Kontras, Font Disleksia)"
              className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition text-xs font-medium flex items-center gap-1"
              aria-label="Panel Aksesibilitas"
            >
              <Sliders className="w-4 h-4 text-blue-600" />
              <span className="hidden md:inline">Aksesibilitas</span>
            </button>

            {/* Windows Desktop .EXE / App modal */}
            <button
              onClick={onOpenWindowsExeModal}
              title="Unduh Versi Desktop Windows (.EXE / Launcher)"
              className="px-2.5 py-1.5 rounded-lg border border-sky-300 bg-sky-50 text-sky-800 hover:bg-sky-100 transition text-xs font-semibold flex items-center gap-1.5"
            >
              <Monitor className="w-3.5 h-3.5 text-sky-600" />
              <span className="hidden xl:inline">Windows .EXE</span>
            </button>

            {/* Mobile / PWA install */}
            <button
              onClick={onOpenMobileModal}
              title="Pasang di Ponsel (Android / iOS)"
              className="px-2.5 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition text-xs font-semibold flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden xl:inline">Mobile App</span>
            </button>

            {/* In-app install button if browser triggers beforeinstallprompt */}
            {isInstallable && (
              <button
                onClick={install}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Instal PWA</span>
              </button>
            )}

            {/* Unduh CV Action Button (Directly from Diagram Header) */}
            <button
              onClick={onOpenDownloadModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm hover:shadow transition transform active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Unduh CV</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenDownloadModal}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh CV</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Status Aplikasi:</span>
            {isOnline ? (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5" /> Daring (Sync Otomatis)
              </span>
            ) : (
              <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                <WifiOff className="w-3.5 h-3.5" /> Mode Offline Aktif
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 text-left text-sm font-medium rounded-lg ${
                  activeSection === link.id
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAccessibilityModal();
              }}
              className="w-full py-2 px-3 rounded-lg border border-slate-200 text-slate-700 text-xs font-medium flex items-center justify-center gap-2"
            >
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>Aksesibilitas (Ukuran Huruf & Kontras)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWindowsExeModal();
              }}
              className="w-full py-2 px-3 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Monitor className="w-4 h-4" />
              <span>Versi Desktop Windows (.EXE)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMobileModal();
              }}
              className="w-full py-2 px-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              <span>Pasang Aplikasi di HP (Android / iOS)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
