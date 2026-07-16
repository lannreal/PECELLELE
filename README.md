# 🚀 MotionHub Premium API — Automation & Queue System

Sistem Otomasi **MotionHub** berbasis **Node.js** yang dirancang khusus untuk mem-bypass pengamanan Cloudflare Turnstile, memverifikasi Magic Link secara otomatis (Firebase Auth), mengeksekusi bypass 5 langkah iklan otomatis, serta mengklaim VIP/Premium secara langsung dengan sistem **Smart Queue (Antrean Pintar)**.

Versi terbaru ini telah didesain untuk beroperasi sebagai Web/API Server berskala produksi dengan manajemen background worker (Child Process) untuk menjaga kestabilan memori.

---

## 🌟 Fitur Unggulan Terbaru
- **MotionHub Rebranding**: Notifikasi hasil sukses/gagal dikirim via Email dengan UI desain ala Apple/Vercel yang sangat premium dan elegan.
- **Smart Queue System (Antrean Pintar)**: Mencegah *bottleneck* dan pemblokiran Cloudflare dengan menerapkan sistem antrean background.
  - `/api/send`: Jeda cooldown antrean 30 detik.
  - `/api/verify` & `/api/claim`: Jeda cooldown antrean 60-90 detik.
- **Auto-Polling System**: API akan memberikan `job_id` dengan status HTTP 202 (Accepted) untuk di-cek hasilnya secara berkala di `/api/result/:jobId`.
- **Auto-Keep-Alive**: Menjaga sesi *cookie* agar tetap valid dengan jadwal acak (Random Human-Like Interval).
- **Process Isolation**: Pekerja (Worker) dijalankan secara terpisah menggunakan Puppeteer untuk manajemen memory yang optimal.

---

## 💻 Cara Menjalankan Server

1. Pastikan **Node.js** (versi 18+) dan **Google Chrome** terpasang.
2. Clone repository ini dan buka via Terminal.
3. Install dependensi:
   ```bash
   npm install
   ```
4. Jalankan aplikasi (Disarankan menggunakan PM2 untuk Production):
   ```bash
   pm2 start app.js --name motionhub-bot -- --api
   ```
   Atau jika hanya ingin di lokal (Interactive Mode):
   ```bash
   node app.js
   ```

---

## 🌐 Dokumentasi Endpoint API

Semua endpoint bersifat Asynchronous. Payload dikirim ke antrean, dan klien harus melakukan *polling* ke URL cek status (`check_result_url`) yang diberikan di response awal.

### 1. `POST /api/send`
Memicu pengiriman Magic Link verifikasi (Firebase) ke email.
- **Payload**: `{"email": "user@gmail.com"}`
- **Response**: `HTTP 202` (Job Diterima, Antrean)

### 2. `POST /api/verify`
Memverifikasi Magic Link dari email, melakukan *bypass* iklan 5 langkah, dan mengaktifkan VIP. Email laporan (UI Premium) akan otomatis terkirim setelah sukses.
- **Payload**: `{"email": "user@gmail.com", "magicLink": "https://..."}`
- **Response**: `HTTP 202` (Job Diterima, Antrean)

### 3. `POST /api/claim`
Langsung mem-bypass iklan 5 langkah dan klaim VIP menggunakan sesi (*cookie*) aktif saat ini (berguna jika sebelumnya gagal di tahap iklan).
- **Payload**: `{}`
- **Response**: `HTTP 202` (Job Diterima, Antrean)

### 4. `GET /api/result/:jobId`
Mengecek status eksekusi dari antrean.
- **Response**: Menampilkan objek status (`queued`, `done`, atau `failed`). Jika `done`/`failed`, akan berisi hasil/error operasi.

### Endpoint Utilitas Lainnya
- `GET /` : Informasi Status Health API dan Dokumentasi.
- `GET /api/status` : Mengecek *uptime* server, jadwal keep-alive, dan status *cookie* Cloudflare/Sesi.
- `POST /api/keepalive` : Memaksa bot melakukan penyegaran (Refresh) untuk memperpanjang sesi Cloudflare manual.
- `POST /api/config` : Menimpa config (`config_prem.json`) secara manual via API.

---

*Engineered & Maintained by **lanncodex** | Supported by **Antigravity AI***
