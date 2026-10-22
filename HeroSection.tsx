import React from 'react';
import { 
  Code2, 
  Briefcase, 
  Terminal, 
  Server, 
  Users, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Download,
  Laptop,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { KHAIRUL_NIZAM_PROFILE } from '../data/portfolioData';

interface HeroSectionProps {
  onSelectCategory: (category: 'it' | 'general') => void;
  onOpenDownloadModal: () => void;
  onNavigateToUpload: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCategory,
  onOpenDownloadModal,
  onNavigateToUpload,
}) => {
  return (
    <section id="beranda" className="pt-6 pb-12 sm:pt-10 sm:pb-16 bg-linear-to-b from-blue-50/70 via-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Card matching the diagram */}
        <div className="relative bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12">
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100/30 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Portofolio Profesional & Sistem Dokumen Digital</span>
              </div>

              {/* Title from diagram: "Sapaan profesional!" */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Sapaan profesional!
                </h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  Selamat datang di portal resmi portofolio <strong className="text-slate-900 font-bold">Khairul Nizam</strong>. Menyajikan ringkasan kompetensi teruji, proyek infrastruktur sistem terdepan, serta manajemen dokumen profesional berstandar industri dengan sistem unduh aman.
                </p>
              </div>

              {/* Diagram callout: Akses cepat ke dua kategori utama */}
              <div className="pt-2">
                <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Akses cepat ke dua kategori utama portofolio:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Category 1: Bidang IT (Developer, SysAdmin, dll) */}
                  <button
                    onClick={() => onSelectCategory('it')}
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 text-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left cursor-pointer border border-blue-500"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                      <Terminal className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-bold tracking-tight">Bidang IT</span>
                        <ArrowRight className="w-4 h-4 opacity-75 group-hover:translate-x-1 transition" />
                      </div>
                      <p className="text-xs text-blue-100 mt-0.5 leading-snug">
                        Developer, SysAdmin, Linux Cloud, Security & DevOps
                      </p>
                      <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-blue-800/60 text-blue-200">
                        Lihat Rekam Jejak IT
                      </span>
                    </div>
                  </button>

                  {/* Category 2: Bidang Umum/Lainnya */}
                  <button
                    onClick={() => onSelectCategory('general')}
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 text-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left cursor-pointer border border-slate-700"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                      <Briefcase className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-bold tracking-tight">Bidang Umum / Lainnya</span>
                        <ArrowRight className="w-4 h-4 opacity-75 group-hover:translate-x-1 transition" />
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                        Manajemen Operasional, SOP, Analisis Bisnis & SDM
                      </p>
                      <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-slate-700/80 text-sky-300">
                        Lihat Rekam Jejak Umum
                      </span>
                    </div>
                  </button>

                </div>
              </div>

              {/* Call to Actions & Public Portal link */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenDownloadModal}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh CV Khairul Nizam</span>
                </button>

                <button
                  onClick={onNavigateToUpload}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-xs transition flex items-center gap-2 cursor-pointer"
                >
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>Unggah Data Diri Anda (Gratis)</span>
                </button>
              </div>

              {/* Metrics / Key highlights */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 sm:gap-4 text-center sm:text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-blue-600">8+ Thn</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Pengalaman Teruji</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900">60+</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Proyek Sukses</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600">100%</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Komitmen Mutu</div>
                </div>
              </div>

            </div>

            {/* Right Graphic Column: Professional Avatar matching diagram */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md bg-linear-to-b from-blue-50 to-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-inner flex flex-col items-center text-center">
                
                {/* Floating Badges */}
                <div className="absolute -top-3 left-6 bg-white px-3 py-1 rounded-full shadow-md border border-slate-200 text-[11px] font-bold text-blue-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Terverifikasi Profesional</span>
                </div>

                <div className="absolute -bottom-3 right-6 bg-slate-900 text-white px-3 py-1 rounded-full shadow-md text-[11px] font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sistem Unduh Watermark</span>
                </div>

                {/* Illustrated Avatar Container matching the diagram's artwork */}
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl bg-linear-to-br from-blue-600 to-sky-500 p-1 shadow-lg relative my-3">
                  <div className="w-full h-full bg-white rounded-[14px] flex flex-col items-center justify-end overflow-hidden relative">
                    
                    {/* SVG Professional Illustration */}
                    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="200" height="200" fill="#F0F9FF"/>
                      
                      {/* Indoor plant leaf */}
                      <path d="M165 140 C170 110 190 90 195 75 C185 85 175 105 168 135" stroke="#10B981" strokeWidth="4" strokeLinecap="round"/>
                      <path d="M160 145 C155 120 140 100 135 90 C145 100 155 120 162 145" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>

                      {/* Coffee cup */}
                      <rect x="25" y="145" width="18" height="22" rx="3" fill="#D97706"/>
                      <path d="M43 150 C48 150 48 158 43 162" stroke="#D97706" strokeWidth="2.5" fill="none"/>
                      <path d="M30 138 Q32 134 30 130" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M36 138 Q38 134 36 130" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>

                      {/* Person Body & Suit */}
                      <path d="M50 200 C50 165 70 145 100 145 C130 145 150 165 150 200 Z" fill="#1E3A8A"/>
                      
                      {/* White Shirt Collar & Tie */}
                      <polygon points="100,145 88,160 100,185 112,160" fill="#FFFFFF"/>
                      <polygon points="100,158 96,164 100,185 104,164" fill="#0284C7"/>
                      <polygon points="82,145 92,165 100,158 92,145" fill="#3B82F6"/>
                      <polygon points="118,145 108,165 100,158 108,145" fill="#3B82F6"/>

                      {/* Head & Neck */}
                      <rect x="92" y="125" width="16" height="22" rx="4" fill="#FCD34D"/>
                      <ellipse cx="100" cy="105" rx="28" ry="32" fill="#FDE68A"/>

                      {/* Hair */}
                      <path d="M72 100 C72 75 88 65 100 65 C115 65 130 75 128 100 C128 85 120 78 108 78 C95 78 88 85 88 95 Z" fill="#1E293B"/>

                      {/* Face features & gentle smile */}
                      <circle cx="90" cy="103" r="3" fill="#1E293B"/>
                      <circle cx="110" cy="103" r="3" fill="#1E293B"/>
                      <path d="M93 118 Q100 124 107 118" stroke="#B45309" strokeWidth="2" strokeLinecap="round"/>

                      {/* Modern Spectacles */}
                      <rect x="84" y="97" width="13" height="11" rx="2" stroke="#0284C7" strokeWidth="2" fill="rgba(255,255,255,0.4)"/>
                      <rect x="103" y="97" width="13" height="11" rx="2" stroke="#0284C7" strokeWidth="2" fill="rgba(255,255,255,0.4)"/>
                      <line x1="97" y1="102" x2="103" y2="102" stroke="#0284C7" strokeWidth="2"/>

                      {/* Laptop in front */}
                      <rect x="65" y="165" width="70" height="32" rx="4" fill="#334155"/>
                      <rect x="70" y="168" width="60" height="24" rx="2" fill="#0F172A"/>
                      {/* Code on screen */}
                      <line x1="75" y1="174" x2="90" y2="174" stroke="#38BDF8" strokeWidth="2"/>
                      <line x1="75" y1="180" x2="110" y2="180" stroke="#34D399" strokeWidth="1.5"/>
                      <line x1="75" y1="185" x2="100" y2="185" stroke="#FBBF24" strokeWidth="1.5"/>
                    </svg>

                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-slate-900">Khairul Nizam</h3>
                  <p className="text-xs text-blue-600 font-semibold">
                    Software Engineer & Operations Specialist
                  </p>
                  <p className="text-[11px] text-slate-500 max-w-xs mt-1">
                    Siap membantu kebutuhan arsitektur sistem IT, cloud server Linux, dan standardisasi manajemen kerja.
                  </p>
                </div>

                {/* Quick tech pills */}
                <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                  {['Cloud Linux', 'Fullstack Web', 'Docker/K8s', 'SOP Manajemen'].map((tag) => (
                    <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
