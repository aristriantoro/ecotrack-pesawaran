# EcoTrack — Sistem Informasi Monitoring & Pengelolaan Sampah Web
### Kabupaten Pesawaran, Provinsi Lampung (Static Simulation Mode — Vercel Ready)

**EcoTrack** adalah aplikasi sistem informasi berbasis web yang menghubungkan tiga peran utama: **Masyarakat**, **Admin Dinas Lingkungan Hidup (DLH)**, dan **Petugas Armada Kebersihan** dalam mendata, memverifikasi, menugaskan, menangani, hingga memantau bukti penyelesaian penanganan persampahan secara transparan dan terukur di Kabupaten Pesawaran.

Aplikasi ini dibangun khusus dalam **Static Simulation Mode** (Frontend JavaScript Vanilla + LocalStorage) sehingga siap di-deploy langsung ke **Vercel** melalui integrasi GitHub tanpa memerlukan database MySQL, backend PHP/Laravel, Node.js runtime, API server, maupun konfigurasi server tambahan.

---

## 1. Deskripsi Aplikasi
EcoTrack mendigitalkan alur penanganan sampah di Kabupaten Pesawaran yang mencakup 11 Kecamatan. Permasalahan sampah liar atau penumpukan yang dilaporkan oleh warga langsung divalidasi oleh administrator dinas, diteruskan ke armada petugas lapangan terkait, dan diselesaikan dengan bukti dokumentasi foto pembersihan yang dapat dilihat kembali oleh pelapor secara terbuka.

---

## 2. Teknologi yang Digunakan
- **Struktur Halaman:** HTML5 (Semantic Elements, Multi-page static structure)
- **Desain & Tata Letak:** CSS3, Bootstrap 5.3.3 (Responsive Grid, Cards, Offcanvas Sidebar, Modals)
- **Tipografi & Ikon:** Google Fonts *Inter*, Bootstrap Icons 1.11.3
- **Visualisasi Data:** Chart.js 4.4.4 (Donut Chart & Bar Chart distribusi laporan wilayah)
- **Logika & State Engine:** Vanilla JavaScript ES6+
- **Penyimpanan Data:** Web Storage API (`localStorage`)
- **Hosting & Deployment:** Vercel Static Hosting

---

## 3. Struktur Folder Project

```text
ecotrack/
├── index.html                   # Landing Page publik interaktif (di root project)
├── login.html                   # Halaman masuk dengan panel 1-Click Akun Demo
├── register.html                # Pendaftaran akun mandiri masyarakat
├── vercel.json                  # Konfigurasi static deployment Vercel
├── .gitignore                   # Mengabaikan file OS & editor
├── admin/                       # Halaman Peran Administrator DLH
│   ├── dashboard.html           # KPI cards, grafik Chart.js, antrian aksi, log aktivitas
│   ├── reports.html             # Master data laporan, filter kecamatan, status, keyword
│   ├── verification.html        # Antrian verifikasi laporan & modal tolak dengan alasan wajib
│   ├── assignments.html         # Alokasi penugasan ke armada petugas kebersihan
│   ├── users.html               # Manajemen pengguna simulasi (petugas & warga)
│   ├── categories.html          # Manajemen master kategori sampah
│   └── statistics.html          # Evaluasi data, chart per kategori/status, cetak rekap
├── masyarakat/                  # Halaman Peran Masyarakat / Pelapor
│   ├── dashboard.html           # Ringkasan laporan pribadi, tombol buat laporan, tabel
│   ├── create-report.html       # Form laporan sampah (cascading kecamatan/desa, upload foto)
│   ├── history.html             # Riwayat laporan & pembatalan mandiri
│   ├── detail-report.html       # Timeline perkembangan, bukti foto awal & bukti bersih
│   └── profile.html             # Profil data diri pelapor
├── petugas/                     # Halaman Peran Petugas Armada Kebersihan
│   ├── dashboard.html           # Ringkasan tugas armada & tugas aktif
│   ├── tasks.html               # Daftar tugas milik petugas tersebut
│   ├── detail-task.html         # Aksi: Mulai Penanganan & Unggah Foto Bukti Tuntas Bersih
│   ├── history.html             # Riwayat tugas tuntas & galeri bukti bersih
│   └── profile.html             # Informasi armada dan zonasi tugas
├── assets/
│   ├── css/
│   │   └── style.css            # Design system, variabel warna (#006B2C), layout, badges
│   └── js/
│       ├── data-seed.js         # Master data dummy realistis (18 laporan, 11 kecamatan, akun)
│       ├── storage.js           # Engine LocalStorage (CRUD, verifikasi, penugasan, penyelesaian)
│       ├── auth.js              # Manajemen session, login, guard hak akses antar role
│       └── app.js               # Helper UI, toast notifikasi, modal konfirmasi, format tanggal
└── README.md                    # Dokumentasi lengkap simulasi aplikasi
```

---

## 4. Cara Menjalankan Aplikasi Secara Lokal

### Opsi 1: Buka Langsung di Browser (Tanpa Server)
1. Buka folder `ecotrack/` di File Explorer.
2. Klik ganda pada berkas **`index.html`** untuk langsung membukanya di browser Google Chrome, Microsoft Edge, atau browser modern lainnya.

### Opsi 2: Menggunakan Local Web Server (Opsional)
Jika ingin menggunakan localhost port:
```bash
# Menggunakan Python
python -m http.server 8080

# Lalu buka di browser:
# http://localhost:8080
```
Atau menggunakan extension **Live Server** di VS Code.

---

## 5. Daftar Akun Demo

Aplikasi menyediakan tombol **1-Click Login Cepat** pada halaman `login.html` dan `index.html`, serta pengalih akun cepat (*Ganti Role Demo*) di topbar setiap dashboard.

| Role | Akun Demo | Password | Persona & Keterangan |
| :--- | :--- | :--- | :--- |
| **Admin DLH** | `admin@ecotrack.demo` | `admin123` | **Budi Santoso, S.T.** (Kepala Verifikasi & Pengendali Armada DLH) |
| **Masyarakat** | `masyarakat@ecotrack.demo` | `user123` | **Siti Aminah** (Warga Gedong Tataan) |
| **Petugas 1** | `petugas@ecotrack.demo` | `petugas123` | **Joko Susanto** (Armada Truk 03 - Gedong Tataan & Way Lima) |
| **Petugas 2** | `petugas2@ecotrack.demo` | `petugas123` | **Rudi Hermawan** (Truk 05 - Negeri Katon & Tegineneng) |
| **Petugas 3** | `petugas3@ecotrack.demo` | `petugas123` | **Ahmad Zaelani** (Motor Roda Tiga 08 - Teluk Pandan & Padang Cermin) |
| **Petugas 4** | `petugas4@ecotrack.demo` | `petugas123` | **Hendra Setiawan** (Truk 02 - Kedondong & Way Khilau) |
| **Petugas 5** | `petugas5@ecotrack.demo` | `petugas123` | **Bambang Irawan** (Armada 07 - Way Ratai & Punduh Pedada) |
| **Warga Lain** | `dian@ecotrack.demo` / `eko@ecotrack.demo` | `user123` | Warga Teluk Pandan & Warga Negeri Katon |

> Fitur registrasi mandiri warga baru juga tersedia di halaman `register.html` dan langsung tersimpan ke `localStorage`.

---

## 6. Cara Menghubungkan Repository ke GitHub

Langkah-langkah untuk mengunggah project EcoTrack ke GitHub:

1. **Inisialisasi Git di Folder Project:**
   Buka terminal di dalam folder `ecotrack/`, lalu jalankan:
   ```bash
   git init
   git add .
   git commit -m "feat: inisialisasi aplikasi web EcoTrack simulasi siap deploy"
   ```

2. **Buat Repository Baru di GitHub:**
   - Masuk ke akun [GitHub](https://github.com/).
   - Klik tombol **New Repository** (+).
   - Beri nama repository, misalnya `ecotrack-pesawaran`.
   - Pilih visibilitas **Public** (atau Private).
   - Jangan centang *Add README*, *.gitignore*, atau *license* (karena sudah dibuat di lokal).
   - Klik **Create repository**.

3. **Hubungkan & Push ke GitHub:**
   Jalankan perintah berikut di terminal lokal Anda (ganti `<username>` dengan username GitHub Anda):
   ```bash
   git branch -M main
   git remote add origin https://github.com/<username>/ecotrack-pesawaran.git
   git push -u origin main
   ```

---

## 7. Cara Melakukan Deployment ke Vercel

Setelah repository berada di GitHub, deploy ke Vercel hanya membutuhkan waktu kurang dari 1 menit:

1. **Login ke Vercel:**
   - Buka [vercel.com](https://vercel.com/) dan login menggunakan akun GitHub Anda.
2. **Import Project:**
   - Pada Vercel Dashboard, klik tombol **Add New...** -> **Project**.
   - Cari dan pilih repository `ecotrack-pesawaran` yang telah di-push, lalu klik **Import**.
3. **Konfigurasi Project Settings:**
   Pastikan konfigurasi Vercel diatur sebagai berikut:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./` (default)
   - **Build Command:** *(kosongkan / biarkan off)*
   - **Output Directory:** `.` *(atau kosongkan)*
   - **Install Command:** *(kosongkan / biarkan off)*
4. **Deploy:**
   - Klik tombol **Deploy**.
   - Vercel akan memproses deployment dalam beberapa detik.
   - Setelah selesai, Anda akan mendapatkan URL domain aktif (misal: `https://ecotrack-pesawaran.vercel.app`).
   - Aplikasi siap digunakan dan diuji langsung secara publik!

---

## 8. Cara Memperbarui Website Setelah Perubahan Kode

Vercel telah terintegrasi secara otomatis dengan branch `main` GitHub (CI/CD otomatis):

1. Lakukan perubahan atau perbaikan pada kode di lokal.
2. Lakukan commit dan push ke GitHub:
   ```bash
   git add .
   git commit -m "update: pembaruan fitur laporan"
   git push origin main
   ```
3. Vercel akan secara otomatis mendeteksi push baru, memicu build instan, dan mempublikasikan versi terbaru dalam hitungan detik tanpa perlu tindakan manual.

---

## 9. Fitur & Aturan Bisnis yang Diterapkan

- **Alur Utama 5 Tahap:** `Masyarakat Lapor (Menunggu Verifikasi) → Admin Verifikasi (Terverifikasi) → Admin Alokasi (Ditugaskan) → Petugas Tangani (Dalam Penanganan) → Petugas Unggah Bukti (Selesai)`.
- **Pencegahan Akses Ilegal Antar-Petugas:** Petugas armada hanya dapat melihat dan menyelesaikan tugas yang dialokasikan ke ID petugasnya.
- **Validasi Bukti Foto:** Tugas tidak dapat diselesaikan (*Selesai*) tanpa melampirkan foto bukti pembersihan.
- **Validasi Penolakan:** Admin wajib menyertakan alasan resmi saat menolak laporan.
- **Hak Pembatalan Pelapor:** Warga hanya dapat membatalkan laporannya sendiri sebelum diverifikasi oleh admin.
- **Reset Data Demo:** Bilah atas (*Simulation Banner*) menyediakan tombol `Reset Data Demo` untuk mengembalikan seluruh kondisi data awal sewaktu-waktu.
