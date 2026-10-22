import { UserSubmission, PaymentTransaction } from '../types';

const SUBMISSIONS_KEY = 'kn_user_submissions_v2';
const TRANSACTIONS_KEY = 'kn_transactions_v2';
const PENDING_SYNC_QUEUE_KEY = 'kn_pending_sync_queue';
const DRAFT_CV_KEY = 'kn_draft_cv_user';

// Setup BroadcastChannel for real-time multi-tab / multi-window synchronization
let syncChannel: BroadcastChannel | null = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    syncChannel = new BroadcastChannel('kn_realtime_sync_channel');
  }
} catch (e) {
  console.warn('BroadcastChannel not supported in this environment:', e);
}

// Initial demo submissions to illustrate public submissions
const INITIAL_DEMO_SUBMISSIONS: UserSubmission[] = [
  {
    id: 'sub-001',
    trackingCode: 'KN-2026-9041',
    nama: 'Budi Santoso, S.Kom',
    email: 'budi.santoso@example.com',
    telepon: '081298765432',
    bidang: 'IT - Backend Developer & DevOps',
    kategori: 'it',
    ringkasan: 'Pengembang backend dengan 3 tahun pengalaman membangun API Node.js dan mengelola server Linux Ubuntu.',
    pengalaman: 'Software Engineer di PT Solusi Prima (2022 - Sekarang), Junior Web Dev di CV Digital Kreatif (2020 - 2022)',
    pendidikan: 'S1 Teknik Informatika - Universitas Dian Nuswantoro (2016 - 2020)',
    keahlian: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'Linux CLI', 'Git'],
    fileNama: 'lampiran_sertifikat_budi.pdf',
    fileSize: '1.2 MB',
    status: 'Selesai',
    catatanAdmin: 'Format CV ATS telah selesai diproses dan siap diunduh.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    synced: true
  },
  {
    id: 'sub-002',
    trackingCode: 'KN-2026-7812',
    nama: 'Siti Rahmawati, S.E.',
    email: 'siti.rahmawati@example.com',
    telepon: '085712349876',
    bidang: 'Administrasi & Keuangan Perusahaan',
    kategori: 'general',
    ringkasan: 'Staff administrasi berpengalaman dalam pembukuan keuangan, rekapitulasi pajak, dan manajemen inventaris kantor.',
    pengalaman: 'Staff Administrasi Keuangan di PT Logistik Nusantara (2021 - Sekarang)',
    pendidikan: 'S1 Manajemen Keuangan - STIE Indonesia (2017 - 2021)',
    keahlian: ['Microsoft Excel Advanced', 'SAP ERP', 'Penyusunan Laporan Keuangan', 'Arsip Dokumen'],
    status: 'Diproses',
    catatanAdmin: 'Sedang dalam tahap penyesuaian deskripsi pencapaian kerja profesional.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    synced: true
  }
];

export const storageService = {
  // Get all user submissions
  getSubmissions(): UserSubmission[] {
    try {
      const data = localStorage.getItem(SUBMISSIONS_KEY);
      if (!data) {
        localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(INITIAL_DEMO_SUBMISSIONS));
        return INITIAL_DEMO_SUBMISSIONS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading submissions from localStorage', e);
      return INITIAL_DEMO_SUBMISSIONS;
    }
  },

  // Save a new submission (with offline queue and real-time sync notification)
  saveSubmission(submission: Omit<UserSubmission, 'id' | 'trackingCode' | 'createdAt' | 'status' | 'synced'>): UserSubmission {
    const submissions = this.getSubmissions();
    const id = 'sub-' + Date.now();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `KN-2026-${randomCode}`;
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

    const newRecord: UserSubmission = {
      ...submission,
      id,
      trackingCode,
      createdAt: new Date().toISOString(),
      status: 'Menunggu',
      synced: isOnline
    };

    submissions.unshift(newRecord);
    try {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
    } catch (e) {
      console.error('Failed to write submission to storage:', e);
    }

    // Queue for sync if offline
    if (!isOnline) {
      this.addToPendingQueue({ type: 'SUBMISSION_NEW', payload: newRecord });
    }

    // Broadcast change to other open tabs
    this.broadcastUpdate({ type: 'SUBMISSION_ADDED', payload: newRecord });

    return newRecord;
  },

  // Update submission status
  updateSubmissionStatus(id: string, status: UserSubmission['status'], catatanAdmin?: string): void {
    const list = this.getSubmissions();
    const updated = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          catatanAdmin: catatanAdmin !== undefined ? catatanAdmin : item.catatanAdmin
        };
      }
      return item;
    });
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
    this.broadcastUpdate({ type: 'SUBMISSION_UPDATED', payload: { id, status } });
  },

  // Delete submission
  deleteSubmission(id: string): void {
    const list = this.getSubmissions();
    const filtered = list.filter(item => item.id !== id);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(filtered));
    this.broadcastUpdate({ type: 'SUBMISSION_DELETED', payload: { id } });
  },

  // Transactions
  getTransactions(): PaymentTransaction[] {
    try {
      const data = localStorage.getItem(TRANSACTIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveTransaction(transaction: Omit<PaymentTransaction, 'id' | 'invoiceNumber' | 'createdAt'>): PaymentTransaction {
    const list = this.getTransactions();
    const id = 'trx-' + Date.now();
    const invoiceNumber = `INV-KN-${Date.now().toString().slice(-6)}`;
    const fullTransaction: PaymentTransaction = {
      ...transaction,
      id,
      invoiceNumber,
      createdAt: new Date().toISOString()
    };
    list.unshift(fullTransaction);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(list));
    this.broadcastUpdate({ type: 'TRANSACTION_SAVED', payload: fullTransaction });
    return fullTransaction;
  },

  // Draft CV for Public Builder
  saveDraftCV(draft: Partial<UserSubmission>): void {
    try {
      localStorage.setItem(DRAFT_CV_KEY, JSON.stringify(draft));
    } catch (e) {
      console.error('Failed to save CV draft:', e);
    }
  },

  getDraftCV(): Partial<UserSubmission> | null {
    try {
      const data = localStorage.getItem(DRAFT_CV_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  // Offline Pending Sync Queue
  getPendingQueue(): any[] {
    try {
      const data = localStorage.getItem(PENDING_SYNC_QUEUE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addToPendingQueue(action: { type: string; payload: any }): void {
    const queue = this.getPendingQueue();
    queue.push({ ...action, queuedAt: new Date().toISOString() });
    localStorage.setItem(PENDING_SYNC_QUEUE_KEY, JSON.stringify(queue));
  },

  processPendingSyncQueue(): number {
    const queue = this.getPendingQueue();
    if (queue.length === 0) return 0;
    
    // Mark items as synced in storage
    const submissions = this.getSubmissions();
    const updated = submissions.map(s => ({ ...s, synced: true }));
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
    localStorage.removeItem(PENDING_SYNC_QUEUE_KEY);
    
    this.broadcastUpdate({ type: 'QUEUE_SYNCED', payload: { count: queue.length } });
    return queue.length;
  },

  // Broadcast helper
  broadcastUpdate(msg: { type: string; payload: any }): void {
    if (syncChannel) {
      try {
        syncChannel.postMessage(msg);
      } catch (err) {
        console.warn('Broadcast error:', err);
      }
    }
  },

  // Subscribe to real-time sync events
  onSyncEvent(callback: (event: { type: string; payload: any }) => void): () => void {
    if (!syncChannel) {
      // Fallback to storage event
      const handler = (e: StorageEvent) => {
        if (e.key === SUBMISSIONS_KEY || e.key === TRANSACTIONS_KEY) {
          callback({ type: 'STORAGE_CHANGE', payload: null });
        }
      };
      window.addEventListener('storage', handler);
      return () => window.removeEventListener('storage', handler);
    }

    const handler = (e: MessageEvent) => {
      callback(e.data);
    };
    syncChannel.addEventListener('message', handler);
    return () => syncChannel?.removeEventListener('message', handler);
  }
};
