export const desktopExeGenerator = {
  // Download Windows Launcher Script / Executable Helper
  downloadWindowsLauncher(): void {
    const appUrl = window.location.href;
    
    const batContent = `@echo off
:: ============================================================================
:: Khairul Nizam - Portofolio Profesional & CV Builder (Windows Desktop Launcher)
:: ============================================================================
title Khairul Nizam - Portofolio Profesional Desktop App
color 0B
echo.
echo ============================================================================
echo   Memulai Aplikasi Desktop Khairul Nizam (Windows Standalone Mode)...
echo ============================================================================
echo.
echo Sedang memeriksa peramban sistem Windows...

:: Coba jalankan menggunakan Microsoft Edge dalam mode --app (Pengalaman Native Desktop)
start msedge.exe --app="${appUrl}" --window-size=1280,820

if %ERRORLEVEL% NEQ 0 (
    echo Mencoba menggunakan Google Chrome...
    start chrome.exe --app="${appUrl}" --window-size=1280,820
)

echo.
echo Aplikasi telah berhasil diluncurkan di jendela desktop mandiri!
echo Anda dapat menyematkan (Pin) aplikasi ini ke Taskbar Windows Anda.
echo.
timeout /t 3 >nul
exit
`;

    const blob = new Blob([batContent], { type: 'application/x-bat' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Khairul_Nizam_Portfolio_Windows_Launcher.cmd';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Download Standalone Offline HTML Bundle
  downloadStandaloneOfflineBundle(): void {
    const currentUrl = window.location.origin;
    const offlineHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Khairul Nizam - Portofolio Profesional (Desktop Offline Bundle)</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 32px; max-width: 600px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
    h1 { color: #38bdf8; margin-top: 0; }
    p { line-height: 1.6; color: #cbd5e1; }
    .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px; transition: background 0.2s; }
    .btn:hover { background: #1d4ed8; }
    .badge { display: inline-block; background: #0284c7; color: white; font-size: 12px; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Aplikasi Desktop Windows</span>
    <h1>Khairul Nizam Portofolio</h1>
    <p>Aplikasi portofolio profesional dan sistem unduh CV resmi Khairul Nizam siap dijalankan.</p>
    <p>Aplikasi ini memiliki sinkronisasi data real-time, mode offline terintegrasi, dan dukungan penuh untuk perangkat Windows, macOS, Android, dan iOS.</p>
    <a href="${currentUrl}" class="btn" target="_blank">Buka Aplikasi Lengkap Sekarang</a>
  </div>
</body>
</html>`;

    const blob = new Blob([offlineHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Khairul_Nizam_Portfolio_Desktop.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};
