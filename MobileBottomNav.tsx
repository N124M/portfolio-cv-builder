import React from 'react';
import { 
  Home, 
  UserCheck, 
  Briefcase, 
  Wrench, 
  MessageSquare,
  FileText
} from 'lucide-react';

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  onNavigate,
}) => {
  const items = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'tentang', label: 'Tentang Saya', icon: UserCheck },
    { id: 'portofolio', label: 'Portofolio', icon: Briefcase },
    { id: 'layanan', label: 'Layanan', icon: Wrench },
    { id: 'kontak', label: 'Kontak', icon: MessageSquare },
  ];

  return (
    <nav 
      aria-label="Navigasi Bawah Layar Sentuh"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition cursor-pointer ${
                isActive
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900 font-medium'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-blue-50' : ''}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
