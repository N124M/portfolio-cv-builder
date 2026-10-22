import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PortfolioSection } from './components/PortfolioSection';
import { UploadDataDiriSection } from './components/UploadDataDiriSection';
import { AboutServicesSection } from './components/AboutServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { DownloadModal } from './components/DownloadModal';
import { AccessibilityModal } from './components/AccessibilityModal';
import { WindowsExeModal } from './components/WindowsExeModal';
import { MobileInstallModal } from './components/MobileInstallModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useAccessibility } from './hooks/useAccessibility';

export default function App() {
  const [activeSection, setActiveSection] = useState('beranda');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'it' | 'general'>('all');
  
  // Modals state
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [isWindowsExeModalOpen, setIsWindowsExeModalOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  // Accessibility & TTS hook
  const {
    settings,
    updateSetting,
    speakText,
    stopSpeech,
    isSpeaking,
  } = useAccessibility();

  // Category selection handler from Hero
  const handleSelectCategory = (category: 'it' | 'general') => {
    setSelectedCategory(category);
    setActiveSection('portofolio');
    const el = document.getElementById('portofolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToUpload = () => {
    setActiveSection('unggah-data');
    const el = document.getElementById('unggah-data');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      speakText(
        'Selamat datang di website portofolio profesional Khairul Nizam. Tersedia kategori Bidang IT seperti Developer dan SysAdmin, serta Bidang Umum. Anda dapat mengunduh CV resmi ber-watermark secara gratis atau versi premium bebas watermark, serta mengunggah data diri Anda untuk dibuatkan CV berstandar industri.'
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors duration-200">
      
      {/* Skip to Content for screen reader & keyboard navigation accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:p-3 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-hidden"
      >
        Lewati ke Konten Utama (Aksesibilitas)
      </a>

      {/* Header */}
      <Header
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onOpenAccessibilityModal={() => setIsAccessibilityModalOpen(true)}
        onOpenWindowsExeModal={() => setIsWindowsExeModalOpen(true)}
        onOpenMobileModal={() => setIsMobileModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleSpeech}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        
        {/* Halaman Utama (Home) */}
        <HeroSection
          onSelectCategory={handleSelectCategory}
          onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
          onNavigateToUpload={handleNavigateToUpload}
        />

        {/* Bagian Portofolio & CV (Sistem Unduh & Watermark) */}
        <PortfolioSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        />

        {/* Halaman Unggah Data Diri (Untuk Umum) */}
        <UploadDataDiriSection />

        {/* Tentang Saya & Layanan Profesional */}
        <AboutServicesSection
          onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
          onOpenContact={() => {
            setActiveSection('kontak');
            const el = document.getElementById('kontak');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Kontak */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onOpenWindowsExeModal={() => setIsWindowsExeModalOpen(true)}
        onOpenMobileModal={() => setIsMobileModalOpen(true)}
      />

      {/* Mobile Bottom Bar matching diagram */}
      <MobileBottomNav
        activeSection={activeSection}
        onNavigate={(id) => {
          setActiveSection(id);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* PWA & Offline Indicator Banner */}
      <OfflineIndicator />

      {/* MODALS */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      <AccessibilityModal
        isOpen={isAccessibilityModalOpen}
        onClose={() => setIsAccessibilityModalOpen(false)}
        settings={settings}
        updateSetting={updateSetting}
        speakText={speakText}
        stopSpeech={stopSpeech}
        isSpeaking={isSpeaking}
      />

      <WindowsExeModal
        isOpen={isWindowsExeModalOpen}
        onClose={() => setIsWindowsExeModalOpen(false)}
      />

      <MobileInstallModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
      />

    </div>
  );
}
