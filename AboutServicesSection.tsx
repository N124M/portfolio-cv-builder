import React from 'react';
import { 
  UserCheck, 
  Terminal, 
  Briefcase, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight,
  Code,
  Server,
  FileCheck,
  Cpu,
  Layers
} from 'lucide-react';
import { KHAIRUL_NIZAM_PROFILE, SERVICES_LIST } from '../data/portfolioData';

interface AboutServicesSectionProps {
  onOpenDownloadModal: () => void;
  onOpenContact: () => void;
}

export const AboutServicesSection: React.FC<AboutServicesSectionProps> = ({
  onOpenDownloadModal,
  onOpenContact,
}) => {
  return (
    <div className="space-y-16 py-12">
      
      {/* TENTANG SAYA SECTION */}
      <section id="tentang" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wide">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Tentang Saya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Profil & Kredibilitas Khairul Nizam
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Menghubungkan keunggulan teknologi rekayasa sistem dengan ketajaman tata kelola manajemen operasional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Bio Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">
                Dedikasi, Presisi & Komitmen Terhadap Kualitas
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {KHAIRUL_NIZAM_PROFILE.shortBio}
              </p>
            </div>

            {/* IT Domain Overview */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
              <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600" />
                <span>Kiprah di Bidang IT & Rekayasa Perangkat Lunak</span>
              </h4>
              <p className="text-xs text-blue-950 leading-relaxed">
                {KHAIRUL_NIZAM_PROFILE.summaryIT}
              </p>
            </div>

            {/* General Domain Overview */}
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-700" />
                <span>Kiprah di Bidang Umum, Tata Kelola & SOP</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {KHAIRUL_NIZAM_PROFILE.summaryGeneral}
              </p>
            </div>

            {/* Education & Achievements */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Riwayat Akademik</span>
              </h4>
              {KHAIRUL_NIZAM_PROFILE.education.map((edu) => (
                <div key={edu.institution} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-blue-600 font-semibold">{edu.institution} ({edu.period})</div>
                  <div className="text-slate-500 mt-1">{edu.notes} — IPK: {edu.gpa}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Skills & Certifications */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Certifications Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Sertifikasi Profesional</span>
              </h3>
              <div className="space-y-2.5">
                {KHAIRUL_NIZAM_PROFILE.certifications.map((cert) => (
                  <div key={cert.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{cert.name}</div>
                      <div className="text-[11px] text-slate-500">{cert.issuer} • {cert.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact & Unduh Callout */}
            <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 shadow-lg space-y-4">
              <h4 className="font-bold text-lg">Tertarik Berkolaborasi?</h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                Dapatkan salinan CV resmi atau diskusikan kebutuhan proyek IT dan manajemen organisasi Anda bersama Khairul Nizam.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  onClick={onOpenDownloadModal}
                  className="px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs transition text-center cursor-pointer shadow-xs"
                >
                  Unduh CV Resmi
                </button>
                <button
                  onClick={onOpenContact}
                  className="px-4 py-2.5 rounded-xl bg-blue-800/80 hover:bg-blue-900 text-white font-bold text-xs transition text-center cursor-pointer border border-blue-400/30"
                >
                  Hubungi Langsung
                </button>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* LAYANAN SECTION */}
      <section id="layanan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide">
            <Layers className="w-3.5 h-3.5" />
            <span>Layanan Profesional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Solusi Rekayasa IT & Jasa Pembuatan CV / Portofolio
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Menyediakan pendampingan menyeluruh dari pembuatan berkas karir standar korporat hingga arsitektur server kelas enterprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_LIST.map((srv) => (
            <div 
              key={srv.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition group-hover:scale-105 ${
                  srv.category === 'it' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {srv.category === 'it' ? <Cpu className="w-6 h-6" /> : <FileCheck className="w-6 h-6" />}
                </div>

                <div className="text-[11px] font-bold text-slate-400 uppercase">
                  {srv.category === 'it' ? 'Bidang IT' : 'Bidang Umum / CV'}
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition">
                  {srv.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-blue-600">{srv.price}</span>
                <button
                  onClick={onOpenContact}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition cursor-pointer"
                  title="Pesan Layanan Ini"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};
