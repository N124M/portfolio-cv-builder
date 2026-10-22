# Build Electron — Khairul Nizam Portfolio

## Build melalui HP (Android)
Electron Windows tidak dibangun langsung di Android/Termux dengan andal. Gunakan GitHub Actions agar build dijalankan di Windows cloud dari browser HP:

1. Buat repository GitHub dan unggah semua isi folder proyek ini.
2. Buka tab **Actions** pada repository.
3. Pilih **Build Electron for Windows** lalu tekan **Run workflow** (atau push ke branch `main`/`master`).
4. Tunggu workflow selesai. Buka hasil run dan unduh artifact `khairul-nizam-electron-windows`.
5. Artifact berisi installer `.exe` dan/atau portable `.exe`.

## Build di komputer Windows
Persyaratan: Node.js 22 LTS dan koneksi internet.

```bash
npm install
npm run lint
npm run build:electron
```

Hasil Electron ada di `dist/electron/`. Hasil web internal berada di `dist/web/`.

Untuk portable saja:
```bash
npm run build:electron:portable
```

## Catatan
- `npm install` akan membuat `package-lock.json`; commit file itu untuk build berikutnya yang lebih konsisten.
- Jangan commit file `.env` atau API key. Variabel rahasia sebaiknya disimpan di GitHub Secrets.
- Build ini menargetkan Windows x64. Build Android APK adalah target berbeda dan tidak dihasilkan oleh Electron Builder.
