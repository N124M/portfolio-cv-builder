import React, { useState } from 'react';
import { 
  FolderKanban, 
  FileText, 
  Award, 
  Download, 
  Check, 
  ExternalLink, 
  Eye, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Sparkles,
  Terminal,
  Briefcase,
  Layers
} from 'lucide-react';
import { PortfolioProject } from '../types';
import { INITIAL_PROJECTS, KHAIRUL_NIZAM_PROFILE } from '../data/portfolioData';
import { pdfGenerator } from '../services/pdfGenerator';

interface PortfolioSectionProps {
  selectedCategory: 'all' | 'it' | 'general';
  onSelectCategory: (category: 'all' | 'it' | 'general') => void;
  onOpenDownloadModal: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenDownloadModal,
}) => {
  const [activeTab, setActiveTab] = useState<'proyek' | 'cv' | 'dokumen'>('proyek');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isWatermarkedPreview, setIsWatermarkedPreview] = useState(true);

  // Filter projects by category
  const filteredProjects = INITIAL_PROJECTS.filter((proj) => {
    if (selectedCategory === 'all') return true;
    return proj.category === selectedCategory;
  });

  const handleDownloadFree = () => {
    pdfGenerator.generateKhairulNizamPDF({
      category: selectedCategory,
      watermarked: true,
    });
  };

  return (
    <section id="portofolio" className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Heading matching the diagram title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wide uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>Bagian Portofolio & CV</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sistem Portofolio, CV & Unduh Dokumen
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Pilih dan telusuri portofolio terverifikasi, lihat pratinjau dokumen digital, serta pilih opsi unduh gratis ber-watermark atau versi premium bebas watermark standar industri.
          </p>
        </div>

        {/* Category Filters: Bidang IT & Bidang Umum */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Semua Bidang ({INITIAL_PROJECTS.length})
          </button>

          <button
            onClick={() => onSelectCategory('it')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              selectedCategory === 'it'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4 text-sky-500" />
            <span>Bidang IT (Developer, SysAdmin)</span>
          </button>

          <button
            onClick={() => onSelectCategory('general')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              selectedCategory === 'general'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4 text-amber-500" />
            <span>Bidang Umum & Lainnya</span>
          </button>
        </div>

        {/* Three Sub-tabs from Schema: Proyek, CV, Dokumen Portofolio */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-1.5 flex justify-center max-w-lg mx-auto">
          <button
            onClick={() => setActiveTab('proyek')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'proyek'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Proyek</span>
          </button>

          <button
            onClick={() => setActiveTab('cv')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'cv'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>CV Digital</span>
          </button>

          <button
            onClick={() => setActiveTab('dokumen')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'dokumen'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Dokumen Portofolio</span>
          </button>
        </div>

        {/* TAB 1: PROYEK */}
        {activeTab === 'proyek' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div 
                key={proj.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Thumbnail Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={proj.thumbnail} 
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs ${
                      proj.category === 'it' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-900 text-white'
                    }`}>
                      {proj.category === 'it' ? 'Bidang IT' : 'Bidang Umum'}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                    {proj.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-blue-600 transition">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-blue-600 font-semibold mt-1">
                      {proj.role}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {proj.summary}
                    </p>
                  </div>

                  {/* Tech / Skill Tags */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.slice(0, 4).map((tech) => (
                        <span 
                          key={tech} 
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {proj.technologies.length > 4 && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                          +{proj.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Impact metric */}
                    <div className="bg-emerald-50 rounded-xl p-2.5 border border-emerald-100 text-[11px] font-medium text-emerald-800 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{proj.metrics[0]}</span>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProject(proj)}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-600" />
                        <span>Detail & Studi Kasus</span>
                      </button>

                      <button
                        onClick={onOpenDownloadModal}
                        title="Unduh Berkas Proyek Ini"
                        className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: CV DIGITAL & PREVIEW (Matching Diagram) */}
        {activeTab === 'cv' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Distasi File & Portofolio Resmi
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  Curriculum Vitae Digital — Khairul Nizam
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Format ATS-friendly terstandardisasi untuk industri teknologi dan manajemen profesional.
                </p>
              </div>

              {/* Watermark toggle preview */}
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl self-start sm:self-auto">
                <span className="text-xs font-semibold text-slate-700 px-2">Mode Pratinjau:</span>
                <button
                  onClick={() => setIsWatermarkedPreview(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    isWatermarkedPreview 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dengan Watermark
                </button>
                <button
                  onClick={() => setIsWatermarkedPreview(false)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    !isWatermarkedPreview 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Premium Bersih
                </button>
              </div>
            </div>

            {/* Document Render Simulation */}
            <div className="relative border border-slate-300 rounded-2xl bg-white shadow-inner p-6 sm:p-10 max-w-4xl mx-auto overflow-hidden">
              
              {/* If Watermark mode is active, show the diagonal repetition as shown in diagram */}
              {isWatermarkedPreview && (
                <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-around overflow-hidden select-none opacity-20">
                  <div className="transform -rotate-35 text-4xl sm:text-6xl font-black text-slate-600 tracking-widest whitespace-nowrap">
                    KHAIRUL NIZAM
                  </div>
                  <div className="transform -rotate-35 text-4xl sm:text-6xl font-black text-slate-600 tracking-widest whitespace-nowrap">
                    KHAIRUL NIZAM
                  </div>
                  <div className="transform -rotate-35 text-4xl sm:text-6xl font-black text-slate-600 tracking-widest whitespace-nowrap">
                    KHAIRUL NIZAM
                  </div>
                </div>
              )}

              {/* Verified seal in clean premium mode */}
              {!isWatermarkedPreview && (
                <div className="absolute top-6 right-6 border-2 border-emerald-500 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-lg shadow-xs flex items-center gap-1 z-10">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>DOKUMEN RESMI BEBAS WATERMARK</span>
                </div>
              )}

              {/* CV Document Header */}
              <div className="space-y-2 border-b border-slate-200 pb-5">
                <h1 className="text-3xl font-extrabold text-slate-900">{KHAIRUL_NIZAM_PROFILE.name}</h1>
                <p className="text-sm font-semibold text-blue-600">{KHAIRUL_NIZAM_PROFILE.title}</p>
                <p className="text-xs text-slate-600">
                  {KHAIRUL_NIZAM_PROFILE.email} • {KHAIRUL_NIZAM_PROFILE.phone} • {KHAIRUL_NIZAM_PROFILE.location}
                </p>
              </div>

              {/* Summary */}
              <div className="py-4 space-y-2 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Ringkasan Eksekutif</h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {KHAIRUL_NIZAM_PROFILE.shortBio}
                </p>
              </div>

              {/* Dual Skill Columns */}
              <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-100">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h5 className="text-xs font-bold text-blue-700 mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Kompetensi IT & Cloud SysAdmin</span>
                  </h5>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {KHAIRUL_NIZAM_PROFILE.skillsIT.slice(0, 5).map((s) => (
                      <li key={s}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h5 className="text-xs font-bold text-emerald-700 mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Kompetensi Manajemen Umum & SOP</span>
                  </h5>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {KHAIRUL_NIZAM_PROFILE.skillsGeneral.slice(0, 5).map((s) => (
                      <li key={s}>• {s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Education & Certs */}
              <div className="pt-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Pendidikan & Sertifikasi</h4>
                <div className="text-xs text-slate-700">
                  <strong>{KHAIRUL_NIZAM_PROFILE.education[0].degree}</strong> — {KHAIRUL_NIZAM_PROFILE.education[0].institution} ({KHAIRUL_NIZAM_PROFILE.education[0].period})
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {KHAIRUL_NIZAM_PROFILE.certifications.map((c) => (
                    <span key={c.name} className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-800 rounded-md text-[11px] font-medium">
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: DOKUMEN PORTOFOLIO & SERTIFIKAT */}
        {activeTab === 'dokumen' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Sertifikasi Cloud & Linux</h4>
                  <p className="text-xs text-slate-500">RHCSA, AWS Solutions Architect, K8s Admin</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dokumentasi kelulusan sertifikasi internasional dengan nomor lisensi resmi dan verifikasi kredensial daring.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={onOpenDownloadModal}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Dokumen Sertifikat</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Dokumen SOP & Audit Proses Kerja</h4>
                  <p className="text-xs text-slate-500">Standarisasi ISO & Framework Operasional</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contoh lembar pedoman kerja terstruktur, matriks risiko operasional, dan template laporan berkala perusahaan.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={onOpenDownloadModal}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Sampel Dokumen</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM UNDUH & WATERMARK FLOW BANNER (Matches the diagram's central highlight!) */}
        <div className="relative rounded-3xl bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 shadow-2xl border border-blue-800/80 overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-bold border border-blue-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sistem Unduh & Watermark Dokumen</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Pilih Opsi Unduh Berkas Sesuai Kebutuhan Anda
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tersedia opsi gratis dengan watermark resmi <em>'Khairul Nizam'</em>, serta opsi versi premium tanpa watermark dengan kualitas standar industri korporat dan kantor besar.
              </p>
            </div>

            {/* The 2 Download Buttons from Schema */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
              
              {/* 1. Unduh Gratis (Dengan Watermark 'Khairul Nizam') */}
              <button
                onClick={handleDownloadFree}
                className="group p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-left transition transform active:scale-98 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-sky-400" />
                    <span className="font-bold text-sm text-white">Unduh Gratis</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/30 text-sky-200 font-medium">
                    Free
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Disertai watermark diagonal pengaman 'Khairul Nizam'
                </p>
              </button>

              {/* 2. Unduh Versi Premium (Tanpa Watermark) */}
              <button
                onClick={onOpenDownloadModal}
                className="group p-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-left transition shadow-lg hover:shadow-emerald-500/25 transform active:scale-98 cursor-pointer border border-emerald-400/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-white" />
                    <span className="font-bold text-sm text-white">Unduh Versi Premium</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/25 text-white font-bold">
                    Rp 50.000
                  </span>
                </div>
                <p className="text-xs text-emerald-100 mt-1">
                  100% Bersih Tanpa Watermark • Kualitas Standar Industri Besar
                </p>
              </button>

            </div>

          </div>
        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase">
                  {selectedProject.categoryLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedProject.role} • {selectedProject.year}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden h-48 bg-slate-100">
              <img 
                src={selectedProject.thumbnail} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>{selectedProject.description}</p>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Pencapaian & Dampak Nyata:</h4>
                <ul className="space-y-1.5 list-disc list-inside text-emerald-700 font-medium">
                  {selectedProject.metrics.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Teknologi & Instrumen:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-medium text-xs border border-blue-100">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedProject(null);
                  handleDownloadFree();
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 cursor-pointer"
              >
                Unduh Gratis (Watermark)
              </button>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  onOpenDownloadModal();
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Unduh Premium Bersih (Rp 50.000)
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
