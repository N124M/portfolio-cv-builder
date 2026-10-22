import { jsPDF } from 'jspdf';
import { KHAIRUL_NIZAM_PROFILE, INITIAL_PROJECTS } from '../data/portfolioData';
import { UserSubmission } from '../types';

export const pdfGenerator = {
  // Generate Khairul Nizam's CV & Portfolio PDF
  generateKhairulNizamPDF(options: {
    category?: 'all' | 'it' | 'general';
    watermarked: boolean;
    buyerName?: string;
  }): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;

    // Helper: Watermark
    const applyWatermarkIfNeeded = () => {
      if (options.watermarked) {
        doc.saveGraphicsState();
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(36);
        doc.setTextColor(200, 210, 230);
        
        // Draw diagonal watermarks across page
        const stepY = 65;
        for (let y = 40; y < pageHeight + 50; y += stepY) {
          doc.text('KHAIRUL NIZAM', pageWidth / 2, y, {
            align: 'center',
            angle: -35
          });
          doc.setFontSize(14);
          doc.text('(VERSI GRATIS DENGAN WATERMARK)', pageWidth / 2, y + 12, {
            align: 'center',
            angle: -35
          });
          doc.setFontSize(36);
        }

        // Top warning badge
        doc.setFillColor(254, 242, 242);
        doc.rect(0, 0, pageWidth, 8, 'F');
        doc.setFontSize(8);
        doc.setTextColor(185, 28, 28);
        doc.text('Salinan Gratis Ber-Watermark Khairul Nizam. Untuk versi tanpa watermark, gunakan opsi Unduh Premium.', pageWidth / 2, 5.5, { align: 'center' });
        doc.restoreGraphicsState();
      } else {
        // Premium verified seal at top right
        doc.setFillColor(239, 246, 255);
        doc.roundedRect(pageWidth - 65, 12, 50, 16, 2, 2, 'F');
        doc.setDrawColor(37, 99, 235);
        doc.roundedRect(pageWidth - 65, 12, 50, 16, 2, 2, 'D');
        doc.setFontSize(7.5);
        doc.setTextColor(30, 64, 175);
        doc.setFont('helvetica', 'bold');
        doc.text('DOKUMEN RESMI', pageWidth - 40, 17, { align: 'center' });
        doc.setFontSize(6.5);
        doc.setFont('helvetica', 'normal');
        doc.text('BEBAS WATERMARK (PREMIUM)', pageWidth - 40, 22, { align: 'center' });
        doc.text(`Lisensi: ${options.buyerName || 'Standard Verified'}`, pageWidth - 40, 26, { align: 'center' });
      }
    };

    // PAGE 1: CURRICULUM VITAE
    applyWatermarkIfNeeded();

    let curY = 24;

    // Header Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42);
    doc.text(KHAIRUL_NIZAM_PROFILE.name, margin, curY);

    curY += 6;
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text('Senior Software Engineer, Linux SysAdmin & Project Consultant', margin, curY);

    curY += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Email: ${KHAIRUL_NIZAM_PROFILE.email}  |  Telp/WA: ${KHAIRUL_NIZAM_PROFILE.phone}  |  Lokasi: ${KHAIRUL_NIZAM_PROFILE.location}`, margin, curY);

    curY += 4;
    doc.text(`LinkedIn: linkedin.com/in/khairul-nizam  |  GitHub: github.com/khairulnizam-tech`, margin, curY);

    // Decorative divider line
    curY += 4;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.6);
    doc.line(margin, curY, pageWidth - margin, curY);
    curY += 6;

    // Ringkasan Profesional
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('RINGKASAN PROFESIONAL', margin, curY);
    curY += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const summaryLines = doc.splitTextToSize(
      `${KHAIRUL_NIZAM_PROFILE.shortBio}\n\n• Fokus Bidang IT: ${KHAIRUL_NIZAM_PROFILE.summaryIT}\n• Fokus Bidang Umum & Manajemen: ${KHAIRUL_NIZAM_PROFILE.summaryGeneral}`,
      contentWidth
    );
    doc.text(summaryLines, margin, curY);
    curY += summaryLines.length * 4.2 + 4;

    // Kompetensi Utama (2 Kolom: Bidang IT & Bidang Umum)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('KEAHLIAN UTAMA & KOMPETENSI', margin, curY);
    curY += 5;

    const colWidth = (contentWidth - 6) / 2;
    // Kolom Kiri: IT
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, curY, colWidth, 38, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, curY, colWidth, 38, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(37, 99, 235);
    doc.text('BIDANG IT & INFRASTRUKTUR CLOUD', margin + 4, curY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    let itY = curY + 11;
    KHAIRUL_NIZAM_PROFILE.skillsIT.slice(0, 6).forEach((skill) => {
      doc.text(`• ${skill}`, margin + 4, itY);
      itY += 4.2;
    });

    // Kolom Kanan: Umum
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin + colWidth + 6, curY, colWidth, 38, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin + colWidth + 6, curY, colWidth, 38, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(16, 185, 129);
    doc.text('BIDANG UMUM & MANAJEMEN KERJA', margin + colWidth + 10, curY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    let genY = curY + 11;
    KHAIRUL_NIZAM_PROFILE.skillsGeneral.slice(0, 6).forEach((skill) => {
      doc.text(`• ${skill}`, margin + colWidth + 10, genY);
      genY += 4.2;
    });

    curY += 44;

    // Riwayat Pengalaman & Portofolio Pilihan
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('PENGALAMAN KERJA & PROYEK UNGGULAN', margin, curY);
    curY += 6;

    INITIAL_PROJECTS.forEach((proj, idx) => {
      if (curY > pageHeight - 35) {
        doc.addPage();
        applyWatermarkIfNeeded();
        curY = 25;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`${idx + 1}. ${proj.title}`, margin, curY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(37, 99, 235);
      doc.text(`${proj.role}  |  ${proj.year}  |  ${proj.categoryLabel}`, margin, curY + 4.2);

      doc.setTextColor(71, 85, 105);
      const descLines = doc.splitTextToSize(proj.summary, contentWidth);
      doc.text(descLines, margin, curY + 8.5);

      curY += 14 + descLines.length * 3.5;
    });

    // Sertifikasi & Pendidikan
    if (curY > pageHeight - 45) {
      doc.addPage();
      applyWatermarkIfNeeded();
      curY = 25;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('PENDIDIKAN & SERTIFIKASI PROFESIONAL', margin, curY);
    curY += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`• ${KHAIRUL_NIZAM_PROFILE.education[0].degree} — ${KHAIRUL_NIZAM_PROFILE.education[0].institution} (${KHAIRUL_NIZAM_PROFILE.education[0].period})`, margin, curY);
    curY += 4.5;
    doc.text(`  IPK: ${KHAIRUL_NIZAM_PROFILE.education[0].gpa} | ${KHAIRUL_NIZAM_PROFILE.education[0].notes}`, margin, curY);
    curY += 5;

    KHAIRUL_NIZAM_PROFILE.certifications.forEach((c) => {
      doc.text(`• ${c.name} — ${c.issuer} (${c.year})`, margin, curY);
      curY += 4.2;
    });

    // Footer on page
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `Dokumen Portofolio Resmi Khairul Nizam  |  Halaman ${i} dari ${totalPages}  |  khairulnizam.pro@gmail.com`,
        pageWidth / 2,
        pageHeight - 8,
        { align: 'center' }
      );
    }

    const fileName = options.watermarked
      ? 'Khairul_Nizam_CV_Watermarked_Gratis.pdf'
      : 'Khairul_Nizam_CV_Premium_Resmi.pdf';

    doc.save(fileName);
  },

  // Generate User's Custom Form CV
  generateCustomUserCV(submission: UserSubmission, watermarked: boolean): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;

    if (watermarked) {
      doc.saveGraphicsState();
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(36);
      doc.setTextColor(210, 220, 235);
      
      const stepY = 70;
      for (let y = 45; y < pageHeight + 50; y += stepY) {
        doc.text('KHAIRUL NIZAM PLATFORM', pageWidth / 2, y, {
          align: 'center',
          angle: -35
        });
        doc.setFontSize(13);
        doc.text('(DRAF UMUM - GRATIS)', pageWidth / 2, y + 12, {
          align: 'center',
          angle: -35
        });
        doc.setFontSize(36);
      }
      doc.restoreGraphicsState();
    }

    let y = 25;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42);
    doc.text(submission.nama || 'Nama Pengguna', margin, y);

    y += 7;
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text(`Bidang: ${submission.bidang || 'Umum'}`, margin, y);

    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Kontak: ${submission.email || '-'} | Telp/WA: ${submission.telepon || '-'} | Kode: ${submission.trackingCode}`, margin, y);

    y += 4;
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, pageWidth - margin, y);
    y += 7;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('PROFIL & RINGKASAN', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const ringkasanLines = doc.splitTextToSize(submission.ringkasan || 'Belum ada ringkasan diri yang diisi.', contentWidth);
    doc.text(ringkasanLines, margin, y);
    y += ringkasanLines.length * 4.5 + 6;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('PENGALAMAN KERJA / ORGANISASI', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const expLines = doc.splitTextToSize(submission.pengalaman || 'Belum ada pengalaman yang diisi.', contentWidth);
    doc.text(expLines, margin, y);
    y += expLines.length * 4.5 + 6;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('RIWAYAT PENDIDIKAN', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const eduLines = doc.splitTextToSize(submission.pendidikan || 'Belum ada pendidikan yang diisi.', contentWidth);
    doc.text(eduLines, margin, y);
    y += eduLines.length * 4.5 + 6;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('KEAHLIAN & KETERAMPILAN', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const skillsText = submission.keahlian && submission.keahlian.length > 0
      ? submission.keahlian.join('  •  ')
      : 'Belum ada keahlian ditambahkan';
    const skillsLines = doc.splitTextToSize(`• ${skillsText}`, contentWidth);
    doc.text(skillsLines, margin, y);

    const safeName = (submission.nama || 'Pengguna').replace(/[^a-zA-Z0-9]/g, '_');
    doc.save(`CV_${safeName}_${watermarked ? 'Watermarked' : 'Premium'}.pdf`);
  }
};
