export type CategoryType = 'all' | 'it' | 'general';

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'it' | 'general';
  categoryLabel: string;
  role: string;
  year: string;
  summary: string;
  description: string;
  technologies: string[];
  metrics: string[];
  thumbnail: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  documentType: 'project' | 'cv' | 'certificate';
}

export interface UserSubmission {
  id: string;
  trackingCode: string;
  nama: string;
  email: string;
  telepon: string;
  bidang: string;
  kategori: 'it' | 'general';
  ringkasan: string;
  pengalaman: string;
  pendidikan: string;
  keahlian: string[];
  fileNama?: string;
  fileSize?: string;
  fileData?: string; // base64
  status: 'Menunggu' | 'Ditinjau' | 'Diproses' | 'Selesai';
  catatanAdmin?: string;
  createdAt: string;
  synced: boolean;
}

export interface PaymentTransaction {
  id: string;
  invoiceNumber: string;
  itemTitle: string;
  targetCategory: 'it' | 'general' | 'custom_cv';
  customerName: string;
  customerEmail: string;
  amount: number;
  paymentMethod: 'qris' | 'bca_va' | 'mandiri_va' | 'gopay' | 'dana';
  status: 'pending' | 'success' | 'expired';
  createdAt: string;
  paidAt?: string;
}

export interface AccessibilitySettings {
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  highContrast: boolean;
  dyslexiaMode: boolean;
  screenReaderActive: boolean;
  speechRate: number;
}
