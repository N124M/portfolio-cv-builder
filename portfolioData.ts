import { PortfolioProject } from '../types';

export const KHAIRUL_NIZAM_PROFILE = {
  name: 'Khairul Nizam',
  title: 'Senior Software Engineer & Systems Administrator | Konsultan IT & Profesional Manajemen',
  shortBio: 'Profesional multitalenta dengan rekam jejak terbukti dalam rekayasa perangkat lunak modern, administrasi sistem infrastruktur cloud, serta manajemen operasional dan administrasi strategis.',
  location: 'Indonesia (Siap Bekerja Jarak Jauh & Di Lokasi)',
  email: 'khairulnizam.pro@gmail.com',
  phone: '+62 812-3456-7890',
  whatsappUrl: 'https://wa.me/6281234567890?text=Halo%20Khairul%20Nizam,%20saya%20tertarik%20dengan%20portofolio%20dan%20layanan%20Anda.',
  facebookUrl: 'https://facebook.com/khairulnizam.official',
  instagramUrl: 'https://instagram.com/khairulnizam.dev',
  linkedinUrl: 'https://linkedin.com/in/khairul-nizam',
  githubUrl: 'https://github.com/khairulnizam-tech',
  yearsOfExperience: 8,
  projectsCompleted: 64,
  happyClients: 48,
  certificationsCount: 12,
  summaryIT: 'Spesialis dalam arsitektur cloud (AWS, GCP, Linux), pengembangan aplikasi Fullstack skala enterprise (React, TypeScript, Node.js, Python), automasi CI/CD, dan hardening keamanan server.',
  summaryGeneral: 'Berpengalaman luas dalam koordinasi tim lintas fungsi, manajemen operasional organisasi, penyusunan dokumentasi SOP standar industri, tata kelola administrasi, dan pelatihan profesional.',
  skillsIT: [
    'Linux SysAdmin (Ubuntu/Debian/RHEL)',
    'Docker & Kubernetes (K8s)',
    'Cloud Architecture (AWS / GCP / Cloudflare)',
    'Fullstack Dev (React, Next.js, Node.js, TS)',
    'Database Engineering (PostgreSQL, Redis, MySQL)',
    'Network Security & Firewalls (UFW, Nginx, SSL)',
    'CI/CD Pipelines (GitHub Actions, GitLab CI)',
    'API Design & Microservices'
  ],
  skillsGeneral: [
    'Manajemen Proyek (Agile / Scrum / Waterfall)',
    'Penyusunan SOP & Dokumentasi Kerja',
    'Analisis Bisnis & Efisiensi Operasional',
    'Kepemimpinan Tim & Fasilitator Pelatihan',
    'Public Speaking & Presentasi Eksekutif',
    'Negosiasi & Hubungan Klien Tingkat Korporat'
  ],
  education: [
    {
      institution: 'Universitas Terkemuka Indonesia',
      degree: 'Sarjana Ilmu Komputer / Teknik Informatika',
      period: '2014 - 2018',
      gpa: '3.86 / 4.00 (Cum Laude)',
      notes: 'Fokus pada Sistem Terdistribusi dan Keamanan Jaringan Komputer'
    }
  ],
  certifications: [
    { name: 'Red Hat Certified System Administrator (RHCSA)', issuer: 'Red Hat', year: '2023' },
    { name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', year: '2024' },
    { name: 'Professional Scrum Master (PSM I)', issuer: 'Scrum.org', year: '2023' },
    { name: 'Certified Information Systems Auditor (CISA prep)', issuer: 'ISACA Member', year: '2025' }
  ]
};

export const INITIAL_PROJECTS: PortfolioProject[] = [
  // IT Projects
  {
    id: 'proj-it-01',
    title: 'Enterprise Cloud Infrastructure & High-Availability Web Cluster',
    category: 'it',
    categoryLabel: 'Bidang IT (SysAdmin & Cloud)',
    role: 'Lead Cloud Infrastructure Architect',
    year: '2025 - 2026',
    summary: 'Arsitektur cluster cloud dengan Load Balancer multi-region, 99.99% uptime, auto-scaling, dan mitigasi DDoS otomatis.',
    description: 'Membangun infrastruktur server terpusat untuk perusahaan dengan lalu lintas harian > 1,5 juta permintaan. Mengintegrasikan Kubernetes cluster, Nginx reverse proxy dengan caching pintar, failover database PostgreSQL multi-node, dan monitoring real-time berbasis Prometheus & Grafana.',
    technologies: ['Linux RHEL', 'Kubernetes', 'Docker', 'AWS EKS', 'PostgreSQL HA', 'Prometheus', 'Grafana', 'Nginx'],
    metrics: ['99.99% Guaranteed SLA Uptime', 'Waktu respon turun 42%', 'Penghematan biaya server 35%'],
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    documentType: 'project'
  },
  {
    id: 'proj-it-02',
    title: 'Sistem Informasi Manajemen Terintegrasi & API Gateway Skala Nasional',
    category: 'it',
    categoryLabel: 'Bidang IT (Fullstack Dev)',
    role: 'Principal Fullstack Engineer',
    year: '2024 - 2025',
    summary: 'Platform manajemen data waktu nyata dengan sinkronisasi multi-perangkat, validasi otorisasi RBAC berlapis, dan ekspor laporan instan.',
    description: 'Mengembangkan sistem inti untuk ribuan pengguna harian dengan antarmuka responsif ramah pengguna, enkripsi data end-to-end pada rest dan transit, serta konektor webhook ke berbagai penyedia pembayaran nasional.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'Redis', 'JWT & OAuth2'],
    metrics: ['10,000+ Pengguna Aktif Harian', 'Zero Security Breach', 'Latensi API < 85ms'],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    documentType: 'project'
  },
  {
    id: 'proj-it-03',
    title: 'Sistem Automasi Keamanan Jaringan & Hardening Server Linux',
    category: 'it',
    categoryLabel: 'Bidang IT (Security & DevOps)',
    role: 'Cybersecurity & Systems Hardener',
    year: '2024',
    summary: 'Implementasi zero-trust security model, deteksi intrusi otomatis (IDS/IPS), dan audit kepatuhan keamanan server standar ISO/IEC 27001.',
    description: 'Otomatisasi skrip bash & Ansible playbook untuk patch keamanan nirhenti, konfigurasi iptables/UFW terenkripsi, fail2ban dengan sinkronisasi reputasi IP global, dan isolasi lingkungan sandboxing.',
    technologies: ['Ansible', 'Bash Scripting', 'Snort IDS', 'Fail2ban', 'OpenVPN / WireGuard', 'Auditd'],
    metrics: ['100% Lolos Audit Keamanan Independen', 'Mitigasi 12,000+ serangan bot per minggu'],
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    documentType: 'project'
  },

  // General / Non-IT Projects
  {
    id: 'proj-gen-01',
    title: 'Transformasi Operasional & Standarisasi Dokumen SOP Perusahaan',
    category: 'general',
    categoryLabel: 'Bidang Umum (Manajemen Operasional)',
    role: 'Project Manager & Lead Process Consultant',
    year: '2024 - 2025',
    summary: 'Penyusunan dan restrukturisasi 45+ dokumen SOP divisi operasional, logistik, pengadaan barang, dan administrasi perkantoran.',
    description: 'Memimpin lokakarya lintas divisi untuk memetakan alur kerja (workflow mapping), memangkas redundansi birokrasi, dan mendigitalkan formulir manual menjadi alur persetujuan terintegrasi yang akuntabel dan transparan.',
    technologies: ['BPMN Workflow', 'Standard Operating Procedures', 'Kanban Board', 'Risk Assessment Matrix'],
    metrics: ['Efisiensi waktu persetujuan naik 68%', 'Kepuasan karyawan meningkat 84%', '100% kepatuhan audit'],
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    documentType: 'project'
  },
  {
    id: 'proj-gen-02',
    title: 'Program Pelatihan & Pendampingan Karir Pemuda & Pencari Kerja',
    category: 'general',
    categoryLabel: 'Bidang Umum (Edukasi & Pengembangan SDM)',
    role: 'Program Director & Head Speaker',
    year: '2023 - 2025',
    summary: 'Penyelenggaraan pelatihan pembuatan CV standar korporat (ATS-friendly), simulasi wawancara kerja, dan literasi digital praktis.',
    description: 'Menginisiasi pelatihan tatap muka dan daring yang telah melatih lebih dari 1.200 peserta dari berbagai latar belakang, membantu generasi muda mempersiapkan berkas lamaran kerja profesional yang lolos seleksi industri besar.',
    technologies: ['Career Coaching', 'Curriculum Design', 'Public Speaking', 'Mentorship Facilitation'],
    metrics: ['1,200+ Peserta Terlatih', '76% Berhasil Mendapat Kerja dalam 90 hari', 'Rating Kepuasan 4.9/5.0'],
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    documentType: 'project'
  },
  {
    id: 'proj-gen-03',
    title: 'Pengelolaan Manajemen Acara & Konferensi Nasional Multi-Stakeholder',
    category: 'general',
    categoryLabel: 'Bidang Umum (Event & Public Relations)',
    role: 'Chief Event Coordinator',
    year: '2023',
    summary: 'Koordinasi menyeluruh acara nasional dengan 800+ delegasi, melibatkan kementerian, praktisi industri, dan akademisi.',
    description: 'Bertanggung jawab atas manajemen anggaran, perizinan, koordinasi protokoler VIP, logistik siaran langsung hibrida, serta publikasi media massa dan media sosial secara terkoordinasi.',
    technologies: ['Budget Management', 'Vendor Negotiation', 'VIP Protocol', 'Media Relations'],
    metrics: ['800+ Delegasi Hadir', 'Anggaran terealisasi 98.4%', 'Liputan 14 media massa nasional'],
    thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    documentType: 'project'
  }
];

export const SERVICES_LIST = [
  {
    id: 'srv-01',
    title: 'Pengembangan Aplikasi Web & Sistem Terintegrasi',
    category: 'it',
    icon: 'code',
    price: 'Mulai Rp 2.500.000',
    description: 'Pembuatan aplikasi web modern, responsif, cepat, ramah mobile, dengan database aman dan antarmuka modern.'
  },
  {
    id: 'srv-02',
    title: 'Manajemen Server, Cloud & DevOps Linux',
    category: 'it',
    icon: 'server',
    price: 'Mulai Rp 1.500.000',
    description: 'Setup VPS, hardening firewall, instalasi SSL/TLS, containerization Docker, migrasi data nirhenti, dan automasi backup.'
  },
  {
    id: 'srv-03',
    title: 'Pembuatan & Restrukturisasi CV / Portofolio Standar Industri',
    category: 'general',
    icon: 'file-text',
    price: 'Rp 50.000 - Rp 150.000',
    description: 'Format ATS-friendly, penulisan narasi pencapaian kerja berdampak tinggi, desain elegan, dan opsi tanpa watermark.'
  },
  {
    id: 'srv-04',
    title: 'Konsultasi Manajemen & SOP Alur Kerja Organisasi',
    category: 'general',
    icon: 'briefcase',
    price: 'Mulai Rp 1.000.000',
    description: 'Audit proses bisnis, penyusunan buku pedoman standar operasional, peningkatan efisiensi tim kerja, dan pembinaan.'
  }
];
