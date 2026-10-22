import React from 'react';
import { 
  Heart, 
  Share2, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  ArrowUp,
  Download,
  Monitor,
  Smartphone
} from 'lucide-react';
import { KHAIRUL_NIZAM_PROFILE } from '../data/portfolioData';

interface FooterProps {
  onOpenDownloadModal: () => void;
  onOpenWindowsExeModal: () => void;
  onOpenMobileModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDownloadModal,
  onOpenWindowsExeModal,
  onOpenMobileModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-24 sm:pb-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Identity & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-blue-600 to-sky-400 flex items-center justify-center font-bold text-white text-lg">
                K
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Khairul Nizam
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Platform portofolio profesional dan sistem dokumen digital terintegrasi dengan opsi unduh gratis ber-watermark serta lisensi premium tanpa watermark.
            </p>
            <div className="text-xs text-emerald-400 font-medium">
              ✓ Multi-Platform (Web, Windows .EXE, Android, iOS)
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#beranda" className="hover:text-blue-400 transition">Beranda Utama</a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-blue-400 transition">Tentang & Kredibilitas</a>
              </li>
              <li>
                <a href="#portofolio" className="hover:text-blue-400 transition">Koleksi Portofolio & CV</a>
              </li>
              <li>
                <a href="#unggah-data" className="hover:text-blue-400 transition">Unggah Data Diri Publik</a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-blue-400 transition">Layanan Profesional</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Media Sosial matching schema diagram */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Media Sosial & Tautan
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href={KHAIRUL_NIZAM_PROFILE.facebookUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-blue-400 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>Facebook: Khairul Nizam</span>
                </a>
              </li>
              <li>
                <a 
                  href={KHAIRUL_NIZAM_PROFILE.instagramUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-pink-400 transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                  <span>Instagram: Khairul Nizam</span>
                </a>
              </li>
              <li>
                <a 
                  href={KHAIRUL_NIZAM_PROFILE.linkedinUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-sky-400 transition flex items-center gap-2"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                  <span>LinkedIn: Khairul Nizam</span>
                </a>
              </li>
              <li>
                <a 
                  href={KHAIRUL_NIZAM_PROFILE.githubUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5 text-slate-300" />
                  <span>GitHub: khairulnizam-tech</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Unduh & Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Aplikasi & Unduhan
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenDownloadModal}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh CV (Gratis / Premium)</span>
              </button>

              <button
                onClick={onOpenWindowsExeModal}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-semibold flex items-center gap-2 transition cursor-pointer border border-slate-700"
              >
                <Monitor className="w-3.5 h-3.5 text-sky-400" />
                <span>Versi Desktop Windows (.EXE)</span>
              </button>

              <button
                onClick={onOpenMobileModal}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-semibold flex items-center gap-2 transition cursor-pointer border border-slate-700"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Aplikasi Android & iOS (PWA)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Line from Schema: "© Khairul Nizam. Semua Hak Cipta Dilindungi" */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-300">Khairul Nizam</strong>. Semua Hak Cipta Dilindungi.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400">
              Sinkronisasi Otomatis Daring & Mode Offline Canggih
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
