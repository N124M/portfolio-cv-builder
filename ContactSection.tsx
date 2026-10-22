import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Clock,
  Sparkles
} from 'lucide-react';
import { KHAIRUL_NIZAM_PROFILE } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [subjek, setSubjek] = useState('Konsultasi Portofolio / CV');
  const [pesan, setPesan] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !pesan) {
      alert('Mohon isi nama dan pesan Anda.');
      return;
    }
    setIsSent(true);
    setTimeout(() => {
      // Open WhatsApp pre-filled link
      const text = `Halo Khairul Nizam,%0A%0ANama: ${encodeURIComponent(nama)}%0AEmail: ${encodeURIComponent(email)}%0ASubjek: ${encodeURIComponent(subjek)}%0APesan: ${encodeURIComponent(pesan)}`;
      window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
    }, 800);
  };

  return (
    <section id="kontak" className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wide">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Hubungi Saya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Konsultasi & Penawaran Kerjasama
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Punya pertanyaan mengenai proyek, sistem cloud IT, atau ingin konsultasi berkas CV dan portofolio profesional? Silakan hubungi langsung di bawah ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Contact Details Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Saluran Komunikasi Langsung</h3>
              <p className="text-xs text-slate-500">
                Respon cepat melalui WhatsApp dan Email pada hari kerja.
              </p>
            </div>

            <div className="space-y-4">
              <a 
                href={KHAIRUL_NIZAM_PROFILE.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">WhatsApp Resmi</div>
                  <div className="text-sm font-semibold">{KHAIRUL_NIZAM_PROFILE.phone}</div>
                </div>
              </a>

              <a 
                href={`mailto:${KHAIRUL_NIZAM_PROFILE.email}`}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">Email Bisnis</div>
                  <div className="text-sm font-semibold">{KHAIRUL_NIZAM_PROFILE.email}</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">Lokasi Kerja</div>
                  <div className="text-xs text-slate-600">{KHAIRUL_NIZAM_PROFILE.location}</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Jam Kerja Konsultasi:</span>
              </div>
              <p>Senin – Sabtu: 08.00 – 20.00 WIB</p>
              <p>Minggu & Hari Libur: Penjadwalan Khusus</p>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Kirim Pesan Langsung</h3>

            {isSent ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-900">Pesan Telah Diteruskan!</h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Jendela WhatsApp Anda akan terbuka untuk mengirim pesan ini secara langsung ke nomor Khairul Nizam.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 cursor-pointer"
                >
                  Kirim Pesan Lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Lengkap Anda *
                    </label>
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Nama Anda"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@anda.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Topik / Subjek Pesan *
                  </label>
                  <select
                    value={subjek}
                    onChange={(e) => setSubjek(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                  >
                    <option value="Konsultasi Pembuatan CV / Portofolio">Konsultasi Pembuatan CV / Portofolio</option>
                    <option value="Pengembangan Website & Sistem Aplikasi">Pengembangan Website & Aplikasi</option>
                    <option value="Jasa SysAdmin Linux & Cloud Infra">Jasa SysAdmin Linux & Cloud Infra</option>
                    <option value="Penyusunan SOP & Manajemen Operasional">Penyusunan SOP & Manajemen</option>
                    <option value="Kerjasama Bisnis & Lainnya">Kerjasama Bisnis & Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Detail Kebutuhan atau Pesan Anda *
                  </label>
                  <textarea
                    rows={4}
                    value={pesan}
                    onChange={(e) => setPesan(e.target.value)}
                    placeholder="Tuliskan pesan, pertanyaan, atau rincian kebutuhan Anda secara singkat..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan Sekarang (Via WhatsApp & Email)</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
