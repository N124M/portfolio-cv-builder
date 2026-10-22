import React, { useState, useEffect } from 'react';
import { 
  UploadCloud, 
  FileCheck, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  Clock, 
  User, 
  Briefcase, 
  GraduationCap, 
  Layers, 
  FileText, 
  Search, 
  Plus, 
  Trash2,
  Lock,
  Wifi,
  WifiOff
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserSubmission } from '../types';
import { storageService } from '../services/storageService';
import { pdfGenerator } from '../services/pdfGenerator';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const UploadDataDiriSection: React.FC = () => {
  const { isOnline } = useOnlineStatus();
  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [telepon, setTelepon] = useState('');
  const [bidang, setBidang] = useState('IT - Software & Web Developer');
  const [customBidang, setCustomBidang] = useState('');
  const [ringkasan, setRingkasan] = useState('');
  const [pengalaman, setPengalaman] = useState('');
  const [pendidikan, setPendidikan] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [keahlian, setKeahlian] = useState<string[]>(['Komunikasi Efektif', 'Problem Solving']);
  const [fileAttachment, setFileAttachment] = useState<{ name: string; size: string; data?: string } | null>(null);
  
  const [submittedItem, setSubmittedItem] = useState<UserSubmission | null>(null);
  const [searchTracking, setSearchTracking] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing submissions and listen to real-time events
  useEffect(() => {
    setSubmissions(storageService.getSubmissions());

    const unsubscribe = storageService.onSyncEvent(() => {
      setSubmissions(storageService.getSubmissions());
    });

    return () => unsubscribe();
  }, []);

  // Handle skill tag addition
  const handleAddSkill = () => {
    if (skillInput.trim() && !keahlian.includes(skillInput.trim())) {
      setKeahlian([...keahlian, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (item: string) => {
    setKeahlian(keahlian.filter((k) => k !== item));
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFileAttachment({
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          data: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      alert('Silakan isi Nama Lengkap Anda.');
      return;
    }

    setIsSubmitting(true);
    const chosenBidang = bidang === 'Lainnya' && customBidang ? customBidang : bidang;
    const isIT = chosenBidang.toLowerCase().includes('it') || chosenBidang.toLowerCase().includes('dev') || chosenBidang.toLowerCase().includes('sistem');

    setTimeout(() => {
      const newRecord = storageService.saveSubmission({
        nama,
        email,
        telepon,
        bidang: chosenBidang,
        kategori: isIT ? 'it' : 'general',
        ringkasan: ringkasan || 'Profesional berdedikasi dengan komitmen kerja tinggi dan orientasi hasil.',
        pengalaman: pengalaman || 'Pengalaman profesional di bidang terkait.',
        pendidikan: pendidikan || 'Pendidikan formal / sertifikasi relevan.',
        keahlian,
        fileNama: fileAttachment?.name,
        fileSize: fileAttachment?.size,
        fileData: fileAttachment?.data,
      });

      setSubmissions(storageService.getSubmissions());
      setSubmittedItem(newRecord);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (err) {
        console.warn(err);
      }
    }, 600);
  };

  // Current draft preview object
  const currentDraft: UserSubmission = {
    id: 'draft',
    trackingCode: 'DRAFT-PREVIEW',
    nama: nama || 'Nama Pengguna Lengkap',
    email: email || 'email.pengguna@example.com',
    telepon: telepon || '0812-xxxx-xxxx',
    bidang: (bidang === 'Lainnya' && customBidang) ? customBidang : bidang,
    kategori: 'it',
    ringkasan: ringkasan || 'Tuliskan deskripsi ringkas tentang keahlian, pengalaman utama, dan tujuan karir profesional Anda di formulir samping.',
    pengalaman: pengalaman || 'Tuliskan pengalaman kerja atau organisasi di formulir samping.',
    pendidikan: pendidikan || 'Tuliskan riwayat pendidikan formal atau kursus Anda.',
    keahlian: keahlian.length > 0 ? keahlian : ['Contoh Keahlian 1', 'Contoh Keahlian 2'],
    status: 'Menunggu',
    createdAt: new Date().toISOString(),
    synced: true,
  };

  // Filtered public submissions for tracking
  const filteredSubmissions = submissions.filter((item) => {
    const matchSearch = searchTracking 
      ? item.trackingCode.toLowerCase().includes(searchTracking.toLowerCase()) ||
        item.nama.toLowerCase().includes(searchTracking.toLowerCase())
      : true;
    const matchStatus = filterStatus === 'all' ? true : item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <section id="unggah-data" className="py-14 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header matching schema */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 uppercase tracking-wider">
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Halaman Unggah Data Diri (Untuk Umum)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kirimkan Data Anda untuk Pembuatan CV & Portofolio
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Pengguna/umum bisa mengunggah data mereka untuk dibuatkan CV/Portofolio profesional berstandar industri atau sekadar membagikan data dengan sinkronisasi otomatis daring dan luring.
          </p>
        </div>

        {/* 2-Column Layout: Form & Live Real-Time CV Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Matching "Halaman Unggah Data Diri (Untuk Umum)" */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Formulir Pengisian Data Diri</span>
              </h3>
              <span className="text-[11px] font-semibold text-slate-500">
                {isOnline ? 'Tersinkronisasi Real-Time' : 'Mode Offline (Disimpan Lokal)'}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Nama field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap & Gelar (Jika Ada) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Contoh: Ahmad Fauzan, S.Kom"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm text-slate-900 bg-white"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Alamat Email Aktif *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@anda.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm text-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nomor WhatsApp / Telepon *
                  </label>
                  <input
                    type="tel"
                    value={telepon}
                    onChange={(e) => setTelepon(e.target.value)}
                    placeholder="0812-3456-7890"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm text-slate-900 bg-white"
                  />
                </div>
              </div>

              {/* Bidang (Field from Schema) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bidang Keahlian / Minat Pekerjaan *
                </label>
                <select
                  value={bidang}
                  onChange={(e) => setBidang(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm text-slate-900 bg-white"
                >
                  <option value="IT - Software & Web Developer">Bidang IT: Software & Web Developer</option>
                  <option value="IT - Linux System Administrator & Cloud">Bidang IT: Linux SysAdmin & Cloud Infra</option>
                  <option value="IT - UI/UX & Frontend Engineer">Bidang IT: UI/UX & Frontend Engineer</option>
                  <option value="IT - Network & Cybersecurity">Bidang IT: Network & Cybersecurity</option>
                  <option value="Bidang Umum - Administrasi Perkantoran & Keuangan">Bidang Umum: Administrasi Perkantoran & Keuangan</option>
                  <option value="Bidang Umum - Manajemen Operasional & Logistik">Bidang Umum: Manajemen Operasional & Logistik</option>
                  <option value="Bidang Umum - Pemasaran Digital & Konten Kreator">Bidang Umum: Pemasaran & Media Digital</option>
                  <option value="Bidang Umum - Pendidikan, Guru & Pelatih">Bidang Umum: Pendidikan & Pelatihan</option>
                  <option value="Lainnya">Lainnya (Ketik Manual)</option>
                </select>

                {bidang === 'Lainnya' && (
                  <input
                    type="text"
                    value={customBidang}
                    onChange={(e) => setCustomBidang(e.target.value)}
                    placeholder="Masukkan nama bidang Anda..."
                    className="mt-2 w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                  />
                )}
              </div>

              {/* Ringkasan Diri */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ringkasan Diri / Bio Singkat
                </label>
                <textarea
                  rows={2}
                  value={ringkasan}
                  onChange={(e) => setRingkasan(e.target.value)}
                  placeholder="Jelaskan secara singkat latar belakang dan keunggulan Anda..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm text-slate-900 bg-white"
                />
              </div>

              {/* Pengalaman & Pendidikan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pengalaman Kerja / Organisasi
                  </label>
                  <textarea
                    rows={2}
                    value={pengalaman}
                    onChange={(e) => setPengalaman(e.target.value)}
                    placeholder="Contoh: Staff Admin di PT ABC (2022-2024)"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Riwayat Pendidikan Terakhir
                  </label>
                  <textarea
                    rows={2}
                    value={pendidikan}
                    onChange={(e) => setPendidikan(e.target.value)}
                    placeholder="Contoh: S1 Manajemen - Univ Indonesia"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                  />
                </div>
              </div>

              {/* Keahlian Tag input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Daftar Keterampilan / Skill Utama
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    placeholder="Ketik skill lalu klik tambah..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {keahlian.map((skill) => (
                    <span 
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-medium"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-blue-500 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Upload Dokumen/Aset (From diagram with lock icon) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Dokumen / Aset Pendukung (Sertifikat, KTP, Foto, CV Lama)
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-white rounded-2xl p-4 text-center transition relative cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">
                      {fileAttachment ? fileAttachment.name : 'Pilih atau Seret Berkas ke Sini'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {fileAttachment ? `Ukuran: ${fileAttachment.size} (Tersimpan Aman)` : 'Mendukung PDF, Word, atau Foto Gambar (Maks 5 MB)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Button: "Mengunggah Data" (from Schema) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sedang Menyimpan & Menyinkronkan Data...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>Mengunggah Data (Kirim Data Diri)</span>
                  </>
                )}
              </button>

            </form>

            {/* Success alert with tracking code */}
            {submittedItem && (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Data Berhasil Dikirim & Tersimpan!</span>
                </div>
                <p className="text-xs text-emerald-700">
                  Kode Pelacakan Anda: <strong className="font-mono bg-white px-2 py-0.5 rounded-md border border-emerald-200">{submittedItem.trackingCode}</strong>
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => pdfGenerator.generateCustomUserCV(submittedItem, true)}
                    className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 font-bold text-xs rounded-lg hover:bg-emerald-100 flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh CV Hasil (Gratis Ber-Watermark)</span>
                  </button>
                  <button
                    onClick={() => pdfGenerator.generateCustomUserCV(submittedItem, false)}
                    className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Unduh CV Bersih (Tanpa Watermark)</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Live Real-Time Generated CV Card */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Pratinjau CV Real-Time Diri Anda</span>
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                Live Preview
              </span>
            </div>

            {/* Interactive Paper Simulation */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-6 sm:p-7 relative overflow-hidden transition-all duration-300">
              
              {/* Watermark overlay on preview */}
              <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-around overflow-hidden select-none opacity-10">
                <div className="transform -rotate-30 text-3xl font-black text-slate-800 tracking-wider">
                  KHAIRUL NIZAM PLATFORM
                </div>
                <div className="transform -rotate-30 text-3xl font-black text-slate-800 tracking-wider">
                  KHAIRUL NIZAM PLATFORM
                </div>
              </div>

              {/* CV Top Header */}
              <div className="border-b border-slate-200 pb-4 space-y-1">
                <h4 className="text-xl font-black text-slate-900 tracking-tight">
                  {currentDraft.nama}
                </h4>
                <p className="text-xs font-bold text-blue-600">
                  {currentDraft.bidang}
                </p>
                <p className="text-[11px] text-slate-500">
                  {currentDraft.email} • {currentDraft.telepon}
                </p>
              </div>

              {/* Bio summary */}
              <div className="py-3 border-b border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Ringkasan Profil
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentDraft.ringkasan}
                </p>
              </div>

              {/* Experience */}
              <div className="py-3 border-b border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Pengalaman
                </span>
                <p className="text-xs text-slate-700 whitespace-pre-line">
                  {currentDraft.pengalaman}
                </p>
              </div>

              {/* Education */}
              <div className="py-3 border-b border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Pendidikan
                </span>
                <p className="text-xs text-slate-700">
                  {currentDraft.pendidikan}
                </p>
              </div>

              {/* Skills */}
              <div className="pt-3 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Keahlian Terdata
                </span>
                <div className="flex flex-wrap gap-1">
                  {currentDraft.keahlian.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick direct download of current draft */}
              <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => pdfGenerator.generateCustomUserCV(currentDraft, true)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh CV Pratinjau (Gratis)</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Public Submissions Status & Tracking Table */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Pelacakan Status Pengajuan Daring</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Cek status pengerjaan CV/Portofolio Anda yang telah diunggah ke sistem Khairul Nizam.
              </p>
            </div>

            {/* Search & filter */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTracking}
                  onChange={(e) => setSearchTracking(e.target.value)}
                  placeholder="Cari Kode atau Nama..."
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
              >
                <option value="all">Semua Status</option>
                <option value="Menunggu">Menunggu</option>
                <option value="Diproses">Diproses</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>
          </div>

          {/* Submissions Cards / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubmissions.map((sub) => (
              <div 
                key={sub.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      {sub.trackingCode}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      sub.status === 'Selesai'
                        ? 'bg-emerald-100 text-emerald-800'
                        : sub.status === 'Diproses'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {sub.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900">{sub.nama}</h4>
                  <p className="text-xs text-blue-600 font-medium">{sub.bidang}</p>
                  <p className="text-xs text-slate-600 line-clamp-2">{sub.ringkasan}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    {new Date(sub.createdAt).toLocaleDateString('id-ID')}
                  </span>
                  
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => pdfGenerator.generateCustomUserCV(sub, true)}
                      title="Unduh Berkas Ini (Gratis)"
                      className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF</span>
                    </button>
                    <button
                      onClick={() => storageService.deleteSubmission(sub.id)}
                      title="Hapus data"
                      className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
