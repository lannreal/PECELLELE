#!/bin/bash

echo "============================================="
echo "🚀 Memulai Setup VPS untuk AM Generator Bot..."
echo "============================================="

# Update package list
echo "📦 Update dan Upgrade System..."
sudo apt update && sudo apt upgrade -y

# Install dependensi yang dibutuhkan Chrome & XVFB
echo "🖥️ Menginstall XVFB dan dependensi Chrome..."
sudo apt install -y curl wget git xvfb libnss3 libatk-bridge2.0-0 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libasound2 libpango-1.0-0 libcups2

# Install Google Chrome Stable
echo "🌐 Menginstall Google Chrome..."
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
sudo apt update
sudo apt install -y google-chrome-stable
# Install Node.js (Versi 20 LTS - disarankan)
echo "🟢 Menginstall Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Cek versi NodeJS dan NPM
echo "✅ NodeJS Version: $(node -v)"
echo "✅ NPM Version: $(npm -v)"

# Install PM2 secara global
echo "⚙️ Menginstall PM2..."
sudo npm install -g pm2

echo "============================================="
echo "🎉 SETUP SELESAI!"
echo "============================================="
echo "Langkah selanjutnya yang harus lu lakukan:"
echo "1. Upload/Clone project lu ke VPS ini."
echo "2. Masuk ke folder projectnya (cd nama-folder)."
echo "3. Jalankan: npm install"
echo "4. Jalankan bot via PM2 + XVFB dengan command berikut:"
echo "   xvfb-run -a pm2 start app.js --name 'pecellele-bot' -- --api"
echo "5. Simpan service PM2 biar auto run saat VPS restart:"
echo "   pm2 save && pm2 startup"
echo "============================================="
