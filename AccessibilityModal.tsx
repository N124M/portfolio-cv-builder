import React from 'react';
import { 
  X, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Eye, 
  Type, 
  Check, 
  Sparkles,
  Play,
  Square
} from 'lucide-react';
import { AccessibilitySettings } from '../types';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, val: AccessibilitySettings[K]) => void;
  speakText: (text: string) => void;
  stopSpeech: () => void;
  isSpeaking: boolean;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  settings,
  updateSetting,
  speakText,
  stopSpeech,
  isSpeaking,
}) => {
  if (!isOpen) return null;

  const fontSizes: { key: 'sm' | 'md' | 'lg' | 'xl'; label: string; desc: string }[] = [
    { key: 'sm', label: 'A-', desc: 'Kecil (14px)' },
    { key: 'md', label: 'Normal', desc: 'Standar (16px)' },
    { key: 'lg', label: 'A+', desc: 'Besar (18px)' },
    { key: 'xl', label: 'A++', desc: 'Sangat Besar (20px)' },
  ];

  const handleTestSpeech = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      speakText('Halo! Ini adalah suara pembaca narasi otomatis website portofolio profesional Khairul Nizam. Anda dapat mendengarkan seluruh konten dengan mudah.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-600" />
              <span>Aksesibilitas & Kenyamanan Membaca</span>
            </h3>
            <p className="text-xs text-slate-500">
              Didesain agar ramah digunakan semua orang tanpa terkecuali
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
          
          {/* 1. Voice Reader */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-blue-900">
                <Volume2 className="w-5 h-5 text-blue-600" />
                <span>Pembaca Layar Suara (Text-to-Speech)</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSpeaking ? 'bg-amber-200 text-amber-900 animate-pulse' : 'bg-blue-200 text-blue-900'}`}>
                {isSpeaking ? 'Sedang Membaca...' : 'Siap'}
              </span>
            </div>
            
            <p className="text-xs text-blue-950 leading-relaxed">
              Membacakan isi teks website dalam Bahasa Indonesia secara otomatis bagi penyandang disabilitas penglihatan atau kemudahan mendengarkan.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleTestSpeech}
                className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-xs ${
                  isSpeaking
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <Square className="w-4 h-4 fill-current" />
                    <span>Hentikan Suara Sekarang</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Uji Dengarkan Suara</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 2. Ukuran Font */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Ukuran Huruf Teks (Font Scaling):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {fontSizes.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => updateSetting('fontSize', f.key)}
                  className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                    settings.fontSize === f.key
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-xs ring-1 ring-blue-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-sm font-black">{f.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. High Contrast Mode */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50">
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Mode Kontras Sangat Tinggi</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Memaksimalkan keterbacaan teks bagi pengguna dengan daya lihat rendah (low vision).
              </p>
            </div>
            <button
              onClick={() => updateSetting('highContrast', !settings.highContrast)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.highContrast ? 'bg-black' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                settings.highContrast ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* 4. Font Ramah Disleksia */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50">
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Type className="w-4 h-4 text-indigo-600" />
                <span>Huruf Khusus Ramah Disleksia</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Menyesuaikan jarak antar huruf dan bentuk font agar lebih mudah dibaca bagi disleksia.
              </p>
            </div>
            <button
              onClick={() => updateSetting('dyslexiaMode', !settings.dyslexiaMode)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.dyslexiaMode ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                settings.dyslexiaMode ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Terapkan & Simpan Pengaturan
          </button>
        </div>

      </div>
    </div>
  );
};
