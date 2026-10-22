import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Wallet, 
  CheckCircle2, 
  Copy, 
  Clock, 
  Sparkles,
  ArrowRight,
  Shield,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { pdfGenerator } from '../services/pdfGenerator';
import { storageService } from '../services/storageService';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('premium');
  const [tierAmount, setTierAmount] = useState<number>(50000);
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bca_va' | 'mandiri_va' | 'gopay' | 'dana'>('qris');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [step, setStep] = useState<'select' | 'payment' | 'success'>('select');
  const [countdownSeconds, setCountdownSeconds] = useState(900); // 15 mins
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionCode, setTransactionCode] = useState('');

  // Timer for QRIS / VA payment simulation
  useEffect(() => {
    let timer: any;
    if (step === 'payment' && countdownSeconds > 0) {
      timer = setInterval(() => {
        setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdownSeconds]);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleFreeDownload = () => {
    pdfGenerator.generateKhairulNizamPDF({
      watermarked: true,
      category: 'all',
    });
    onClose();
  };

  const handleProceedToPayment = () => {
    if (!customerName.trim()) {
      alert('Silakan masukkan nama lengkap Anda untuk dicantumkan pada lisensi dokumen.');
      return;
    }
    const code = 'INV-KN-' + Math.floor(100000 + Math.random() * 900000);
    setTransactionCode(code);
    setStep('payment');
  };

  const handleSimulatePaymentSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');

      // Save transaction record to storage service
      storageService.saveTransaction({
        targetCategory: 'it',
        customerName: customerName || 'Pembeli Terverifikasi',
        customerEmail: customerEmail || 'customer@example.com',
        amount: tierAmount,
        paymentMethod,
        status: 'success',
        paidAt: new Date().toISOString(),
        itemTitle: 'Dokumen Portofolio & CV Khairul Nizam (Versi Premium Tanpa Watermark)',
      });

      // Celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.warn(err);
      }

      // Automatically trigger clean download
      pdfGenerator.generateKhairulNizamPDF({
        watermarked: false,
        category: 'all',
        buyerName: customerName,
      });
    }, 1200);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-600" />
              <span>Opsi Unduh CV & Portofolio</span>
            </h3>
            <p className="text-xs text-slate-500">
              Sesuai skema resmi Khairul Nizam (Gratis Ber-Watermark / Premium Bebas Watermark)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: SELECT PLAN */}
        {step === 'select' && (
          <div className="p-6 space-y-6">
            
            {/* The 2 choices from schema */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Choice 1: Free */}
              <div 
                onClick={() => setSelectedPlan('free')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPlan === 'free'
                    ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      Gratis
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Rp 0</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900 mt-2">
                    Unduh Gratis
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Dengan Watermark pengaman diagonal <em>'Khairul Nizam'</em> pada semua lembar dokumen.
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-1">
                  <div>✓ PDF Lengkap Portofolio & CV</div>
                  <div>⚠ Terdapat tanda air diagonal</div>
                  <div>✓ Siap cetak referensi cepat</div>
                </div>
              </div>

              {/* Choice 2: Premium */}
              <div 
                onClick={() => setSelectedPlan('premium')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                  selectedPlan === 'premium'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="absolute -top-3 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  Rekomendasi
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Premium Bersih
                    </span>
                    <span className="text-xs font-black text-emerald-700">Rp 50.000</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900 mt-2">
                    Unduh Versi Premium
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    100% Bebas Watermark dengan segel resmi lisensi standar kantor besar/korporat.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-600 space-y-1">
                  <div className="text-emerald-700 font-bold">✓ 100% Tanpa Watermark</div>
                  <div>✓ Standar Industri & Kantor Besar</div>
                  <div>✓ Dukungan & Konsultasi Langsung</div>
                </div>
              </div>

            </div>

            {/* If Free Selected */}
            {selectedPlan === 'free' && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-3">
                <p className="text-xs text-slate-600">
                  Dokumen akan langsung diunduh ke perangkat Anda dengan watermark pengaman 'Khairul Nizam'.
                </p>
                <button
                  onClick={handleFreeDownload}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Dokumen Gratis Sekarang (PDF)</span>
                </button>
              </div>
            )}

            {/* If Premium Selected: Fill Name & Choose Amount */}
            {selectedPlan === 'premium' && (
              <div className="space-y-4 pt-1">
                
                {/* Donation / Pricing tier from diagram: Rp 50.000 - Rp 150.000 */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Pilih Paket Pembayaran / Donasi:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { amount: 50000, label: 'Standar Korporat', desc: 'Rp 50.000' },
                      { amount: 100000, label: 'Plus Konsultasi', desc: 'Rp 100.000' },
                      { amount: 150000, label: 'Paket Bundling VIP', desc: 'Rp 150.000' },
                    ].map((tier) => (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => setTierAmount(tier.amount)}
                        className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                          tierAmount === tier.amount
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="text-xs font-extrabold">{tier.desc}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{tier.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Lengkap Anda (Untuk Dicetak pada Lisensi Dokumen) *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Contoh: Muhammad Farhan, S.T."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm text-slate-900 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email / WhatsApp (Untuk Pengiriman Salinan Faktur)
                    </label>
                    <input
                      type="text"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="farhan@gmail.com / 0812xxxx"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm text-slate-900 bg-white"
                    />
                  </div>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lanjut ke Pembayaran ({formatRupiah(tierAmount)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        )}

        {/* STEP 2: PAYMENT CHANNELS */}
        {step === 'payment' && (
          <div className="p-6 space-y-6">
            
            {/* Invoice Summary */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-500">Nomor Tagihan:</span>
                <div className="font-mono font-bold text-xs text-slate-800">{transactionCode}</div>
                <div className="text-xs text-slate-600 mt-0.5">Pemohon: <strong>{customerName}</strong></div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-semibold text-slate-500">Total Pembayaran:</span>
                <div className="text-base font-black text-emerald-600">{formatRupiah(tierAmount)}</div>
                <div className="text-[10px] text-amber-600 flex items-center gap-1 justify-end font-medium">
                  <Clock className="w-3 h-3" />
                  <span>Sisa: {formatTimer(countdownSeconds)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Pilih Metode Pembayaran:
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('qris')}
                  className={`p-2.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                    paymentMethod === 'qris'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-semibold">QRIS Nasional</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bca_va')}
                  className={`p-2.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                    paymentMethod === 'bca_va'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                  <span className="text-xs font-semibold">Virtual Account</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('gopay')}
                  className={`p-2.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                    paymentMethod === 'gopay'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <Wallet className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-semibold">E-Wallet</span>
                </button>
              </div>
            </div>

            {/* QRIS Display */}
            {paymentMethod === 'qris' && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center space-y-3">
                <span className="text-xs font-bold text-slate-800">
                  Scan QRIS dengan GoPay, OVO, Dana, BCA Mobile, atau Bank Lainnya
                </span>

                <div className="bg-white p-3 rounded-xl border border-slate-300 inline-block shadow-sm">
                  {/* Generated clean SVG QR Pattern */}
                  <svg width="180" height="180" viewBox="0 0 200 200" className="mx-auto">
                    <rect width="200" height="200" fill="#FFFFFF"/>
                    {/* Corner squares */}
                    <rect x="20" y="20" width="45" height="45" fill="#000000"/>
                    <rect x="27" y="27" width="31" height="31" fill="#FFFFFF"/>
                    <rect x="34" y="34" width="17" height="17" fill="#000000"/>

                    <rect x="135" y="20" width="45" height="45" fill="#000000"/>
                    <rect x="142" y="27" width="31" height="31" fill="#FFFFFF"/>
                    <rect x="149" y="34" width="17" height="17" fill="#000000"/>

                    <rect x="20" y="135" width="45" height="45" fill="#000000"/>
                    <rect x="27" y="142" width="31" height="31" fill="#FFFFFF"/>
                    <rect x="34" y="149" width="17" height="17" fill="#000000"/>

                    {/* Randomized QR Data Patterns */}
                    <rect x="75" y="25" width="10" height="10" fill="#000000"/>
                    <rect x="95" y="25" width="20" height="10" fill="#000000"/>
                    <rect x="80" y="45" width="30" height="10" fill="#000000"/>
                    <rect x="75" y="65" width="10" height="20" fill="#000000"/>
                    <rect x="95" y="65" width="15" height="10" fill="#000000"/>
                    <rect x="120" y="70" width="25" height="10" fill="#000000"/>
                    <rect x="150" y="75" width="20" height="15" fill="#000000"/>

                    <rect x="25" y="80" width="20" height="10" fill="#000000"/>
                    <rect x="55" y="80" width="15" height="20" fill="#000000"/>
                    <rect x="30" y="105" width="25" height="10" fill="#000000"/>

                    <rect x="80" y="90" width="40" height="40" rx="8" fill="#2563EB"/>
                    <text x="100" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">QRIS</text>

                    <rect x="75" y="140" width="20" height="10" fill="#000000"/>
                    <rect x="105" y="140" width="15" height="20" fill="#000000"/>
                    <rect x="80" y="165" width="35" height="10" fill="#000000"/>
                    <rect x="135" y="135" width="15" height="15" fill="#000000"/>
                    <rect x="160" y="140" width="15" height="25" fill="#000000"/>
                  </svg>
                </div>

                <div className="text-[11px] text-slate-500">
                  NMID: <strong>ID102609482910</strong> (Khairul Nizam Official)
                </div>
              </div>
            )}

            {/* Virtual Account Display */}
            {paymentMethod === 'bca_va' && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="text-xs font-bold text-slate-800">Transfer Virtual Account:</div>
                <div className="space-y-2">
                  {[
                    { bank: 'Bank Central Asia (BCA)', va: '8271081234567890' },
                    { bank: 'Bank Mandiri', va: '8901281234567890' },
                    { bank: 'Bank BRI', va: '1234081234567890' },
                  ].map((item) => (
                    <div key={item.bank} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                      <div>
                        <div className="text-[11px] font-semibold text-slate-700">{item.bank}</div>
                        <div className="font-mono text-xs font-bold text-blue-700">{item.va}</div>
                      </div>
                      <button
                        onClick={() => handleCopy(item.va)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedText === item.va ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* E-Wallet Display */}
            {paymentMethod === 'gopay' && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="text-xs font-bold text-slate-800">Nomor Akun E-Wallet Resmi:</div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-500">GoPay / OVO / DANA / ShopeePay</div>
                    <div className="font-mono text-sm font-bold text-emerald-700">0812-3456-7890</div>
                    <div className="text-[10px] text-slate-500">a.n. Khairul Nizam</div>
                  </div>
                  <button
                    onClick={() => handleCopy('081234567890')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 cursor-pointer"
                  >
                    {copiedText === '081234567890' ? 'Tersalin!' : 'Salin Nomor'}
                  </button>
                </div>
              </div>
            )}

            {/* Action to confirm payment */}
            <div className="space-y-2">
              <button
                onClick={handleSimulatePaymentSuccess}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memverifikasi Pembayaran...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Konfirmasi Pembayaran Selesai (Simulasi Instan)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setStep('select')}
                className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
              >
                Kembali ke Pilihan Paket
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: PAYMENT SUCCESS */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-extrabold text-slate-900">
                Pembayaran Berhasil Dikonfirmasi!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Terima kasih, <strong>{customerName}</strong>. Dokumen Portofolio & CV resmi versi premium tanpa watermark telah dibuat dan diunduh ke perangkat Anda.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-sm mx-auto text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Nomor Faktur:</span>
                <span className="font-mono font-bold text-slate-800">{transactionCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Jumlah Dibayar:</span>
                <span className="font-bold text-emerald-600">{formatRupiah(tierAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status Lisensi:</span>
                <span className="font-bold text-blue-600">Aktif & Terverifikasi</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => {
                  pdfGenerator.generateKhairulNizamPDF({
                    watermarked: false,
                    category: 'all',
                    buyerName: customerName,
                  });
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Ulang Dokumen Premium</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition cursor-pointer"
              >
                Tutup Jendela
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
