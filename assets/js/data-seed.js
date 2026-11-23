/**
 * EcoTrack - Master Dummy Seed Data
 * Kabupaten Pesawaran, Lampung
 */

// SVG Photo Generators for stable offline demo
function generateWasteSvg(title, color = '#EAB308') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
    <rect width="100%" height="100%" fill="#F3F4F6"/>
    <rect x="20" y="20" width="360" height="220" rx="8" fill="#E5E7EB" stroke="#D1D5DB" stroke-width="2"/>
    <circle cx="200" cy="110" r="45" fill="${color}" opacity="0.85"/>
    <path d="M185 100 L215 100 L210 135 L190 135 Z" fill="#FFFFFF"/>
    <path d="M180 95 L220 95" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
    <text x="200" y="180" font-family="sans-serif" font-size="14" font-weight="bold" fill="#374151" text-anchor="middle">${title}</text>
    <text x="200" y="205" font-family="sans-serif" font-size="11" fill="#6B7280" text-anchor="middle">Dokumentasi Laporan Sampah - EcoTrack</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function generateCleanSvg(title) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260">
    <rect width="100%" height="100%" fill="#ECFDF5"/>
    <rect x="20" y="20" width="360" height="220" rx="8" fill="#D1FAE5" stroke="#10B981" stroke-width="2"/>
    <circle cx="200" cy="110" r="45" fill="#059669"/>
    <path d="M185 110 L195 120 L215 98" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="200" y="180" font-family="sans-serif" font-size="14" font-weight="bold" fill="#065F46" text-anchor="middle">${title}</text>
    <text x="200" y="205" font-family="sans-serif" font-size="11" fill="#047857" text-anchor="middle">Bukti Penanganan Berhasil Bersih - EcoTrack</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

const SEED_WILAYAH_PESAWARAN = {
  "Gedong Tataan": ["Sukadadi", "Bernung", "Bagelen", "Tamansari", "Sukaraja", "Kutoarjo", "Wiyono", "Cipadang"],
  "Negeri Katon": ["Negeri Katon", "Halangan Ratu", "Karang Anyar", "Sidomulyo", "Tresnomaju", "Pejambon"],
  "Tegineneng": ["Kresno Widodo", "Batang Hari Ogan", "Gerning", "Gunung Sugih Baru", "Margumulyo"],
  "Way Lima": ["Batu Raja", "Paguyuban", "Pekondoh", "Kuta Dalom", "Sindang Garut", "Gedung Dalom"],
  "Padang Cermin": ["Padang Cermin", "Hanau Berak", "Durian", "Tambangan", "Khepong Jaya"],
  "Teluk Pandan": ["Hanura", "Gebang", "Hurun", "Sukajaya Lempasing", "Batu Menyan", "Munca"],
  "Kedondong": ["Pasar Baru", "Gunung Sugih", "Sinar Harapan", "Teba Jawa", "Way Kepayang"],
  "Way Khilau": ["Kububatu", "Tanjung Kerta", "Kota Jawa", "Padang Cermin Way Khilau", "Mbayas"],
  "Way Ratai": ["Wates", "Pesawaran Indah", "Poncorejo", "Gunung Rejo", "Harapan Jaya"],
  "Punduh Pedada": ["Bawang", "Sukarame", "Banding", "Rusaba", "Batu Raja Pedada"],
  "Marga Punduh": ["Maja", "Kampung Baru", "Umbul Limus", "Pekon Ampai"]
};

const SEED_CATEGORIES = [
  { id: 1, name: "Sampah Rumah Tangga", description: "Limbah sisa makanan dan kebutuhan rumah tangga sehari-hari." },
  { id: 2, name: "Sampah Plastik", description: "Kemasan plastik sekali pakai, botol, kresek, dan styrofoam." },
  { id: 3, name: "Sampah Organik", description: "Dedaunan, ranting pohon, sisa pertanian, dan limbah pasar." },
  { id: 4, name: "Sampah B3", description: "Bahan berbahaya dan beracun seperti aki bekas, baterai, pecahan kaca, lampu neon." },
  { id: 5, name: "Sampah Menumpuk", description: "Penumpukan sampah akibat TPS over kapasitas atau belum terangkut." },
  { id: 6, name: "Pembuangan Sampah Liar", description: "Titik buang sampah ilegal di pinggir jalan, kebun, atau lahan kosong." },
  { id: 7, name: "Sampah Pesisir & Sungai", description: "Sampah yang mencemari aliran kali, muara, dan kawasan pesisir pantai." }
];

const SEED_USERS = [
  // Admin
  {
    id: "usr_admin_01",
    name: "Budi Santoso, S.T.",
    email: "admin@ecotrack.demo",
    password: "admin123",
    role: "admin",
    phone: "0812-7890-1122",
    agency: "Dinas Lingkungan Hidup Kab. Pesawaran",
    created_at: "2026-01-10 08:00:00"
  },
  // Petugas Kebersihan (5 Petugas)
  {
    id: "usr_petugas_01",
    name: "Joko Susanto",
    email: "petugas@ecotrack.demo",
    password: "petugas123",
    role: "officer",
    phone: "0813-6655-4433",
    zone: "Kecamatan Gedong Tataan & Way Lima",
    vehicle: "Truk Pengangkut No. 03",
    created_at: "2026-01-15 09:00:00"
  },
  {
    id: "usr_petugas_02",
    name: "Rudi Hermawan",
    email: "petugas2@ecotrack.demo",
    password: "petugas123",
    role: "officer",
    phone: "0821-4433-2211",
    zone: "Kecamatan Negeri Katon & Tegineneng",
    vehicle: "Truk Pengangkut No. 05",
    created_at: "2026-01-15 09:30:00"
  },
  {
    id: "usr_petugas_03",
    name: "Ahmad Zaelani",
    email: "petugas3@ecotrack.demo",
    password: "petugas123",
    role: "officer",
    phone: "0852-9988-7766",
    zone: "Kecamatan Teluk Pandan & Padang Cermin",
    vehicle: "Armada Motor Roda Tiga No. 08",
    created_at: "2026-01-16 10:00:00"
  },
  {
    id: "usr_petugas_04",
    name: "Hendra Setiawan",
    email: "petugas4@ecotrack.demo",
    password: "petugas123",
    role: "officer",
    phone: "0819-3322-1100",
    zone: "Kecamatan Kedondong & Way Khilau",
    vehicle: "Truk Pengangkut No. 02",
    created_at: "2026-01-16 10:30:00"
  },
  {
    id: "usr_petugas_05",
    name: "Bambang Irawan",
    email: "petugas5@ecotrack.demo",
    password: "petugas123",
    role: "officer",
    phone: "0877-6655-9988",
    zone: "Kecamatan Way Ratai & Punduh Pedada",
    vehicle: "Armada Pengangkut No. 07",
    created_at: "2026-01-17 11:00:00"
  },
  // Masyarakat / Citizen (5 Akun)
  {
    id: "usr_warga_01",
    name: "Siti Aminah",
    email: "masyarakat@ecotrack.demo",
    password: "user123",
    role: "citizen",
    phone: "0822-1122-3344",
    address: "Jl. Ahmad Yani No. 45, Bagelen, Gedong Tataan",
    created_at: "2026-01-20 14:00:00"
  },
  {
    id: "usr_warga_02",
    name: "Dian Lestari",
    email: "dian@ecotrack.demo",
    password: "user123",
    role: "citizen",
    phone: "0853-2233-4455",
    address: "Dusun Hanura Jaya, Hanura, Teluk Pandan",
    created_at: "2026-01-22 11:30:00"
  },
  {
    id: "usr_warga_03",
    name: "Eko Prasetyo",
    email: "eko@ecotrack.demo",
    password: "user123",
    role: "citizen",
    phone: "0812-3344-5566",
    address: "Jl. Raya Negeri Katon, Halangan Ratu",
    created_at: "2026-01-25 08:45:00"
  },
  {
    id: "usr_warga_04",
    name: "Rini Novita",
    email: "rini@ecotrack.demo",
    password: "user123",
    role: "citizen",
    phone: "0878-4455-6677",
    address: "Dusun Kresno, Kresno Widodo, Tegineneng",
    created_at: "2026-01-28 13:20:00"
  },
  {
    id: "usr_warga_05",
    name: "Indra Kusuma",
    email: "indra@ecotrack.demo",
    password: "user123",
    role: "citizen",
    phone: "0896-5566-7788",
    address: "Pasar Baru Barat, Kedondong",
    created_at: "2026-02-01 10:15:00"
  }
];

const SEED_REPORTS = [
  // 1. Menunggu Verifikasi (Masyarakat: Siti Aminah)
  {
    id: "RPT-2026-0001",
    user_id: "usr_warga_01",
    user_name: "Siti Aminah",
    user_phone: "0822-1122-3344",
    category_id: 6,
    category_name: "Pembuangan Sampah Liar",
    title: "Tumpukan Sampah Liar di Pinggir Jalan Lintas Sukadadi",
    description: "Terdapat pembuangan sampah liar tak berizin di pinggir jalan raya Sukadadi dekat kebun karet. Bau menyengat dan mengganggu pengendara.",
    district: "Gedong Tataan",
    village: "Sukadadi",
    address: "Jl. Raya Lintas Barat KM 14, seberang SPBU lama Sukadadi",
    status: "Menunggu Verifikasi",
    created_at: "2026-11-23 09:15:00",
    photos: [generateWasteSvg("Sampah Liar Lintas Sukadadi", "#EF4444")],
    completion_photos: [],
    assigned_officer_id: null,
    assigned_officer_name: null,
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan baru berhasil diajukan oleh pelapor Siti Aminah.",
        user_name: "Siti Aminah",
        role: "citizen",
        timestamp: "2026-11-23 09:15:00"
      }
    ]
  },
  // 2. Menunggu Verifikasi (Masyarakat: Dian Lestari)
  {
    id: "RPT-2026-0002",
    user_id: "usr_warga_02",
    user_name: "Dian Lestari",
    user_phone: "0853-2233-4455",
    category_id: 7,
    category_name: "Sampah Pesisir & Sungai",
    title: "Sampah Plastik Menumpuk di Muara Pantai Mutun",
    description: "Aliran muara menuju pantai dipenuhi botol plastik dan kresek terbawa arus hujan kemarin sore. Dikhawatirkan mencemari wisata pesisir.",
    district: "Teluk Pandan",
    village: "Sukajaya Lempasing",
    address: "Dusun Sukajaya RT 02, Muara Sungai dekat Pantai",
    status: "Menunggu Verifikasi",
    created_at: "2026-11-23 11:20:00",
    photos: [generateWasteSvg("Sampah Muara Pesisir Lempasing", "#F59E0B")],
    completion_photos: [],
    assigned_officer_id: null,
    assigned_officer_name: null,
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan dibuat melalui aplikasi EcoTrack.",
        user_name: "Dian Lestari",
        role: "citizen",
        timestamp: "2026-11-23 11:20:00"
      }
    ]
  },
  // 3. Menunggu Verifikasi (Masyarakat: Eko Prasetyo)
  {
    id: "RPT-2026-0003",
    user_id: "usr_warga_03",
    user_name: "Eko Prasetyo",
    user_phone: "0812-3344-5566",
    category_id: 1,
    category_name: "Sampah Rumah Tangga",
    title: "TPS Liar Dekat Jembatan Halangan Ratu",
    description: "Warga membuang kantong sampah rumah tangga di dekat pangkal jembatan. Volume makin tinggi dalam 3 hari terakhir.",
    district: "Negeri Katon",
    village: "Halangan Ratu",
    address: "Jembatan Kali Belau Dusun 3 RT 01",
    status: "Menunggu Verifikasi",
    created_at: "2026-11-23 14:00:00",
    photos: [generateWasteSvg("Sampah Rumah Tangga Jembatan", "#EAB308")],
    completion_photos: [],
    assigned_officer_id: null,
    assigned_officer_name: null,
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan baru terdaftar dalam sistem.",
        user_name: "Eko Prasetyo",
        role: "citizen",
        timestamp: "2026-11-23 14:00:00"
      }
    ]
  },
  // 4. Terverifikasi (Belum ditugaskan - Admin sudah setujui)
  {
    id: "RPT-2026-0004",
    user_id: "usr_warga_01",
    user_name: "Siti Aminah",
    user_phone: "0822-1122-3344",
    category_id: 5,
    category_name: "Sampah Menumpuk",
    title: "Kontainer TPS Pasar Bagelen Meluap",
    description: "Bak sampah kontainer di area belakang pasar Bagelen meluap ke badan jalan setinggi setengah meter. Lalat dan bau sangat mengganggu pedagang.",
    district: "Gedong Tataan",
    village: "Bagelen",
    address: "Kawasan Pasar Bagelen Lorong 2",
    status: "Terverifikasi",
    created_at: "2026-11-22 10:00:00",
    photos: [generateWasteSvg("TPS Pasar Bagelen Meluap", "#D97706")],
    completion_photos: [],
    assigned_officer_id: null,
    assigned_officer_name: null,
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan dibuat oleh Siti Aminah.",
        user_name: "Siti Aminah",
        role: "citizen",
        timestamp: "2026-11-22 10:00:00"
      },
      {
        status: "Terverifikasi",
        notes: "Laporan divalidasi oleh DLH. Lokasi memenuhi kriteria penanganan segera.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-22 13:45:00"
      }
    ]
  },
  // 5. Terverifikasi (Belum ditugaskan)
  {
    id: "RPT-2026-0005",
    user_id: "usr_warga_04",
    user_name: "Rini Novita",
    user_phone: "0878-4455-6677",
    category_id: 3,
    category_name: "Sampah Organik",
    title: "Ranting Pohon Tumbang & Daun Kering di Kresno Widodo",
    description: "Bekas pemangkasan pohon jalan raya dan ranting kering dibiarkan menumpuk di saluran drainase utama.",
    district: "Tegineneng",
    village: "Kresno Widodo",
    address: "Jl. Poros Desa RT 04 dekat Balai Desa",
    status: "Terverifikasi",
    created_at: "2026-11-22 08:30:00",
    photos: [generateWasteSvg("Ranting & Daun Menumpuk Drainase", "#16A34A")],
    completion_photos: [],
    assigned_officer_id: null,
    assigned_officer_name: null,
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan masuk sistem.",
        user_name: "Rini Novita",
        role: "citizen",
        timestamp: "2026-11-22 08:30:00"
      },
      {
        status: "Terverifikasi",
        notes: "Diverifikasi oleh tim lapangan. Membutuhkan armada pengangkut ranting.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-22 11:10:00"
      }
    ]
  },
  // 6. Ditugaskan (Petugas: Joko Susanto)
  {
    id: "RPT-2026-0006",
    user_id: "usr_warga_01",
    user_name: "Siti Aminah",
    user_phone: "0822-1122-3344",
    category_id: 2,
    category_name: "Sampah Plastik",
    title: "Limbah Gelas Plastik Sepanjang Lapangan Tamansari",
    description: "Sisa perayaan warga semalam meninggalkan botol dan plastik minuman berserakan di sekeliling lapangan desa Tamansari.",
    district: "Gedong Tataan",
    village: "Tamansari",
    address: "Lapangan Desa Tamansari, sisi timur tribun",
    status: "Ditugaskan",
    created_at: "2026-11-22 07:00:00",
    photos: [generateWasteSvg("Sampah Plastik Lapangan Desa", "#3B82F6")],
    completion_photos: [],
    assigned_officer_id: "usr_petugas_01",
    assigned_officer_name: "Joko Susanto",
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan diajukan pelapor.",
        user_name: "Siti Aminah",
        role: "citizen",
        timestamp: "2026-11-22 07:00:00"
      },
      {
        status: "Terverifikasi",
        notes: "Data valid.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-22 08:00:00"
      },
      {
        status: "Ditugaskan",
        notes: "Ditugaskan kepada petugas kebersihan Joko Susanto (Truk No. 03).",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-22 08:30:00"
      }
    ]
  },
  // 7. Ditugaskan (Petugas: Rudi Hermawan)
  {
    id: "RPT-2026-0007",
    user_id: "usr_warga_04",
    user_name: "Rini Novita",
    user_phone: "0878-4455-6677",
    category_id: 6,
    category_name: "Pembuangan Sampah Liar",
    title: "Sampah Karung Liar di Jalur Tegineneng - Batang Hari Ogan",
    description: "Banyak karung berisi sampah rumah tangga dibuang oknum tak dikenal di parit perbatasan antar desa.",
    district: "Tegineneng",
    village: "Batang Hari Ogan",
    address: "Perbatasan Batang Hari Ogan KM 2",
    status: "Ditugaskan",
    created_at: "2026-11-21 15:40:00",
    photos: [generateWasteSvg("Karung Sampah Parit Tegineneng", "#6366F1")],
    completion_photos: [],
    assigned_officer_id: "usr_petugas_02",
    assigned_officer_name: "Rudi Hermawan",
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan masuk.",
        user_name: "Rini Novita",
        role: "citizen",
        timestamp: "2026-11-21 15:40:00"
      },
      {
        status: "Terverifikasi",
        notes: "Disetujui admin untuk jadwal pengangkutan rute utara.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-21 16:30:00"
      },
      {
        status: "Ditugaskan",
        notes: "Penugasan kepada Rudi Hermawan (Truk No. 05).",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-21 17:00:00"
      }
    ]
  },
  // 8. Ditugaskan (Petugas: Ahmad Zaelani)
  {
    id: "RPT-2026-0008",
    user_id: "usr_warga_02",
    user_name: "Dian Lestari",
    user_phone: "0853-2233-4455",
    category_id: 2,
    category_name: "Sampah Plastik",
    title: "Penumpukan Sampah Wisata Kuliner Hanura",
    description: "Tong sampah tepi dermaga nelayan Hanura penuh dan tumpah ke pantai berpasir.",
    district: "Teluk Pandan",
    village: "Hanura",
    address: "Dermaga Nelayan RT 05 Hanura",
    status: "Ditugaskan",
    created_at: "2026-11-21 13:00:00",
    photos: [generateWasteSvg("Sampah Wisata Hanura", "#06B6D4")],
    completion_photos: [],
    assigned_officer_id: "usr_petugas_03",
    assigned_officer_name: "Ahmad Zaelani",
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan warga Hanura.",
        user_name: "Dian Lestari",
        role: "citizen",
        timestamp: "2026-11-21 13:00:00"
      },
      {
        status: "Terverifikasi",
        notes: "Terverifikasi prioritas kawasan pantai wisata.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-21 14:15:00"
      },
      {
        status: "Ditugaskan",
        notes: "Ditugaskan ke Ahmad Zaelani (Motor Roda Tiga No. 08).",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-21 14:30:00"
      }
    ]
  },
  // 9. Dalam Penanganan (Petugas: Joko Susanto)
  {
    id: "RPT-2026-0009",
    user_id: "usr_warga_01",
    user_name: "Siti Aminah",
    user_phone: "0822-1122-3344",
    category_id: 1,
    category_name: "Sampah Rumah Tangga",
    title: "Sampah Menumpuk di Depan Balai Desa Sukaraja",
    description: "Sampah dari sisa bazar minggu lalu belum terangkut di samping pos kamling Sukaraja.",
    district: "Gedong Tataan",
    village: "Sukaraja",
    address: "Jl. Lapangan Merdeka, samping Balai Desa Sukaraja",
    status: "Dalam Penanganan",
    created_at: "2026-11-20 09:30:00",
    photos: [generateWasteSvg("Sampah Balai Desa Sukaraja", "#10B981")],
    completion_photos: [],
    assigned_officer_id: "usr_petugas_01",
    assigned_officer_name: "Joko Susanto",
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Pelaporan awal warga.",
        user_name: "Siti Aminah",
        role: "citizen",
        timestamp: "2026-11-20 09:30:00"
      },
      {
        status: "Terverifikasi",
        notes: "Disetujui untuk penanganan cepat.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-20 10:10:00"
      },
      {
        status: "Ditugaskan",
        notes: "Petugas Joko Susanto ditugaskan.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-20 10:30:00"
      },
      {
        status: "Dalam Penanganan",
        notes: "Petugas telah tiba di lokasi dengan truk dan mulai pembersihan fisik.",
        user_name: "Joko Susanto",
        role: "officer",
        timestamp: "2026-11-20 11:15:00"
      }
    ]
  },
  // 10. Dalam Penanganan (Petugas: Hendra Setiawan)
  {
    id: "RPT-2026-0010",
    user_id: "usr_warga_05",
    user_name: "Indra Kusuma",
    user_phone: "0896-5566-7788",
    category_id: 5,
    category_name: "Sampah Menumpuk",
    title: "Sampah Buangan Sayur Pasar Kedondong",
    description: "Sisa sayuran dan kulit kelapa membusuk menutupi separuh jalan bongkar muat pasar.",
    district: "Kedondong",
    village: "Pasar Baru",
    address: "Area Bongkar Muat Pasar Baru Kedondong",
    status: "Dalam Penanganan",
    created_at: "2026-11-20 08:00:00",
    photos: [generateWasteSvg("Sampah Pasar Kedondong", "#059669")],
    completion_photos: [],
    assigned_officer_id: "usr_petugas_04",
    assigned_officer_name: "Hendra Setiawan",
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan masuk.",
        user_name: "Indra Kusuma",
        role: "citizen",
        timestamp: "2026-11-20 08:00:00"
      },
      {
        status: "Terverifikasi",
        notes: "Laporan dikonfirmasi pihak pengelola pasar.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-20 08:45:00"
      },
      {
        status: "Ditugaskan",
        notes: "Hendra Setiawan ditugaskan membawa Truk No. 02.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-20 09:00:00"
      },
      {
        status: "Dalam Penanganan",
        notes: "Pengerukan sampah menggunakan sekop dan pemuatan ke bak truk sedang berjalan.",
        user_name: "Hendra Setiawan",
        role: "officer",
        timestamp: "2026-11-20 10:20:00"
      }
    ]
  },
  // 11. Selesai (Petugas: Joko Susanto - Pelapor: Siti Aminah)
  {
    id: "RPT-2026-0011",
    user_id: "usr_warga_01",
    user_name: "Siti Aminah",
    user_phone: "0822-1122-3344",
    category_id: 5,
    category_name: "Sampah Menumpuk",
    title: "Penumpukan Sampah di Depan SMPN 1 Gedong Tataan",
    description: "Tong sampah depan gerbang sekolah penuh dengan bungkus makanan ringan dan kardus.",
    district: "Gedong Tataan",
    village: "Kutoarjo",
    address: "Jl. Veteran No. 12 Kutoarjo, depan gerbang sekolah",
    status: "Selesai",
    created_at: "2026-11-18 07:30:00",
    photos: [generateWasteSvg("Sampah Depan SMPN 1", "#F97316")],
    completion_photos: [generateCleanSvg("Halaman Depan SMPN 1 Bersih")],
    assigned_officer_id: "usr_petugas_01",
    assigned_officer_name: "Joko Susanto",
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan berhasil diajukan.",
        user_name: "Siti Aminah",
        role: "citizen",
        timestamp: "2026-11-18 07:30:00"
      },
      {
        status: "Terverifikasi",
        notes: "Disetujui untuk pembersihan pagi.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-18 08:00:00"
      },
      {
        status: "Ditugaskan",
        notes: "Ditugaskan ke Joko Susanto.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-18 08:15:00"
      },
      {
        status: "Dalam Penanganan",
        notes: "Petugas tiba dan melakukan pengangkutan.",
        user_name: "Joko Susanto",
        role: "officer",
        timestamp: "2026-11-18 09:00:00"
      },
      {
        status: "Selesai",
        notes: "Seluruh sampah telah diangkut ke TPA, area depan sekolah disapu bersih. Foto bukti penanganan dilampirkan.",
        user_name: "Joko Susanto",
        role: "officer",
        timestamp: "2026-11-18 10:15:00"
      }
    ]
  },
  // 12. Selesai (Petugas: Ahmad Zaelani - Pelapor: Dian Lestari)
  {
    id: "RPT-2026-0012",
    user_id: "usr_warga_02",
    user_name: "Dian Lestari",
    user_phone: "0853-2233-4455",
    category_id: 7,
    category_name: "Sampah Pesisir & Sungai",
    title: "Pembersihan Garis Pantai Gebang",
    description: "Eceng gondok dan sampah plastik terdampar di pesisir dermaga Gebang.",
    district: "Teluk Pandan",
    village: "Gebang",
    address: "Pesisir Dusun Gebang Hilir RT 03",
    status: "Selesai",
    created_at: "2026-11-17 10:00:00",
    photos: [generateWasteSvg("Sampah Pantai Gebang", "#0284C7")],
    completion_photos: [generateCleanSvg("Pesisir Pantai Gebang Bersih Bebas Sampah")],
    assigned_officer_id: "usr_petugas_03",
    assigned_officer_name: "Ahmad Zaelani",
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan masuk.",
        user_name: "Dian Lestari",
        role: "citizen",
        timestamp: "2026-11-17 10:00:00"
      },
      {
        status: "Terverifikasi",
        notes: "Verifikasi disetujui.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-17 11:00:00"
      },
      {
        status: "Ditugaskan",
        notes: "Ditugaskan ke Ahmad Zaelani.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-17 11:30:00"
      },
      {
        status: "Dalam Penanganan",
        notes: "Pembersihan pesisir dilakukan bersama tim nelayan lokal.",
        user_name: "Ahmad Zaelani",
        role: "officer",
        timestamp: "2026-11-17 13:00:00"
      },
      {
        status: "Selesai",
        notes: "Sampah pesisir terangkat 4 kubik dan dermaga telah steril.",
        user_name: "Ahmad Zaelani",
        role: "officer",
        timestamp: "2026-11-17 15:30:00"
      }
    ]
  },
  // 13. Selesai (Petugas: Rudi Hermawan - Pelapor: Eko Prasetyo)
  {
    id: "RPT-2026-0013",
    user_id: "usr_warga_03",
    user_name: "Eko Prasetyo",
    user_phone: "0812-3344-5566",
    category_id: 6,
    category_name: "Pembuangan Sampah Liar",
    title: "Pembersihan TPS Ilegal Perempatan Karang Anyar",
    description: "Lahan kosong di sudut jalan digunakan warga membuang sampah tanpa izin.",
    district: "Negeri Katon",
    village: "Karang Anyar",
    address: "Perempatan Karang Anyar Timur RT 08",
    status: "Selesai",
    created_at: "2026-11-16 08:20:00",
    photos: [generateWasteSvg("TPS Ilegal Karang Anyar", "#84CC16")],
    completion_photos: [generateCleanSvg("Lahan Bebas Sampah & Dipasang Plang Himbauan")],
    assigned_officer_id: "usr_petugas_02",
    assigned_officer_name: "Rudi Hermawan",
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan dibuat.",
        user_name: "Eko Prasetyo",
        role: "citizen",
        timestamp: "2026-11-16 08:20:00"
      },
      {
        status: "Terverifikasi",
        notes: "Disetujui admin.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-16 09:00:00"
      },
      {
        status: "Ditugaskan",
        notes: "Ditugaskan ke Rudi Hermawan.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-16 09:15:00"
      },
      {
        status: "Dalam Penanganan",
        notes: "Pengangkutan sedang berjalan.",
        user_name: "Rudi Hermawan",
        role: "officer",
        timestamp: "2026-11-16 11:00:00"
      },
      {
        status: "Selesai",
        notes: "Sampah tuntas diangkut. Aparat desa setempat telah memasang spanduk larangan buang sampah.",
        user_name: "Rudi Hermawan",
        role: "officer",
        timestamp: "2026-11-16 13:40:00"
      }
    ]
  },
  // 14. Selesai (Petugas: Bambang Irawan)
  {
    id: "RPT-2026-0014",
    user_id: "usr_warga_01",
    user_name: "Siti Aminah",
    user_phone: "0822-1122-3344",
    category_id: 3,
    category_name: "Sampah Organik",
    title: "Pembersihan Daun & Pangkasan Pohon Lapangan Wates",
    description: "Sisa kerja bakti warga berupa daun dan kayu lapuk memenuhi trotoar lapangan.",
    district: "Way Ratai",
    village: "Wates",
    address: "Jl. Lapangan Olahraga Wates RT 01",
    status: "Selesai",
    created_at: "2026-11-15 14:00:00",
    photos: [generateWasteSvg("Daun & Kayu Lapuk Lapangan", "#10B981")],
    completion_photos: [generateCleanSvg("Trotoar Lapangan Wates Bersih Rapih")],
    assigned_officer_id: "usr_petugas_05",
    assigned_officer_name: "Bambang Irawan",
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan masuk.",
        user_name: "Siti Aminah",
        role: "citizen",
        timestamp: "2026-11-15 14:00:00"
      },
      {
        status: "Terverifikasi",
        notes: "Validasi admin.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-15 14:30:00"
      },
      {
        status: "Ditugaskan",
        notes: "Ditugaskan kepada Bambang Irawan.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-15 15:00:00"
      },
      {
        status: "Dalam Penanganan",
        notes: "Pengangkutan dilakukan armada pengangkut.",
        user_name: "Bambang Irawan",
        role: "officer",
        timestamp: "2026-11-16 08:30:00"
      },
      {
        status: "Selesai",
        notes: "Selesai dikerjakan dan jalanan kembali bersih.",
        user_name: "Bambang Irawan",
        role: "officer",
        timestamp: "2026-11-16 10:00:00"
      }
    ]
  },
  // 15. Ditolak (Pelapor: Eko Prasetyo)
  {
    id: "RPT-2026-0015",
    user_id: "usr_warga_03",
    user_name: "Eko Prasetyo",
    user_phone: "0812-3344-5566",
    category_id: 4,
    category_name: "Sampah B3",
    title: "Puing Bangunan Beton & Sisa Cat di Halaman Pribadi",
    description: "Ada puing beton bekas renovasi dapur rumah tetangga yang belum dibuang.",
    district: "Negeri Katon",
    village: "Sidomulyo",
    address: "Pekarangan pribadi rumah warga No. 18",
    status: "Ditolak",
    created_at: "2026-11-19 11:00:00",
    photos: [generateWasteSvg("Puing Beton Rumah Pribadi", "#EF4444")],
    completion_photos: [],
    assigned_officer_id: null,
    assigned_officer_name: null,
    rejection_reason: "Laporan ditolak karena objek berada di dalam pekarangan rumah pribadi dan merupakan puing bongkaran konstruksi, bukan kewenangan pengelolaan persampahan umum DLH. Mohon dikoordinasikan secara swadaya atau dengan jasa angkut puing mandiri.",
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan diajukan.",
        user_name: "Eko Prasetyo",
        role: "citizen",
        timestamp: "2026-11-19 11:00:00"
      },
      {
        status: "Ditolak",
        notes: "Alasan penolakan: Lokasi berada di pekarangan privat dan berupa puing konstruksi renovasi.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-19 14:00:00"
      }
    ]
  },
  // 16. Ditolak (Pelapor: Dian Lestari)
  {
    id: "RPT-2026-0016",
    user_id: "usr_warga_02",
    user_name: "Dian Lestari",
    user_phone: "0853-2233-4455",
    category_id: 1,
    category_name: "Sampah Rumah Tangga",
    title: "Lokasi Tidak Jelas di Pinggir Hutan",
    description: "Tolong dicek ada sampah plastik banyak di dekat bukit tapi saya lupa patokan jalannya.",
    district: "Padang Cermin",
    village: "Tambangan",
    address: "Sekitar bukit dekat jalan tikus tanpa nama",
    status: "Ditolak",
    created_at: "2026-11-18 16:00:00",
    photos: [generateWasteSvg("Foto Tidak Jelas Blur", "#9CA3AF")],
    completion_photos: [],
    assigned_officer_id: null,
    assigned_officer_name: null,
    rejection_reason: "Petunjuk lokasi dan alamat tidak memadai untuk dijangkau petugas, serta foto tidak memperlihatkan titik lokasi yang spesifik. Silakan kirim ulang laporan baru dengan titik patokan yang jelas.",
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan dikirim.",
        user_name: "Dian Lestari",
        role: "citizen",
        timestamp: "2026-11-18 16:00:00"
      },
      {
        status: "Ditolak",
        notes: "Alasan penolakan: Informasi lokasi tidak akurat dan foto buram.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-19 09:20:00"
      }
    ]
  },
  // 17. Dibatalkan (Oleh Masyarakat: Siti Aminah saat Menunggu Verifikasi)
  {
    id: "RPT-2026-0017",
    user_id: "usr_warga_01",
    user_name: "Siti Aminah",
    user_phone: "0822-1122-3344",
    category_id: 1,
    category_name: "Sampah Rumah Tangga",
    title: "Salah Titik Lapor - Dibatalkan Mandiri",
    description: "Saya salah memilih desa dan foto yang diunggah tertukar dengan dokumen lain.",
    district: "Gedong Tataan",
    village: "Bernung",
    address: "Jl. Bernung Raya No. 10",
    status: "Dibatalkan",
    created_at: "2026-11-21 10:15:00",
    photos: [generateWasteSvg("Laporan Tertukar", "#6B7280")],
    completion_photos: [],
    assigned_officer_id: null,
    assigned_officer_name: null,
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan diajukan.",
        user_name: "Siti Aminah",
        role: "citizen",
        timestamp: "2026-11-21 10:15:00"
      },
      {
        status: "Dibatalkan",
        notes: "Laporan dibatalkan sendiri oleh pelapor Siti Aminah sebelum diverifikasi.",
        user_name: "Siti Aminah",
        role: "citizen",
        timestamp: "2026-11-21 10:30:00"
      }
    ]
  },
  // 18. Selesai (Petugas: Hendra Setiawan)
  {
    id: "RPT-2026-0018",
    user_id: "usr_warga_05",
    user_name: "Indra Kusuma",
    user_phone: "0896-5566-7788",
    category_id: 4,
    category_name: "Sampah B3",
    title: "Pecahan Kaca & Botol Kimia di Pinggir Saluran Irigasi Way Lima",
    description: "Pecahan kaca berbahaya berserakan di dekat pemandian saluran irigasi.",
    district: "Way Lima",
    village: "Batu Raja",
    address: "Dekat Bendung Irigasi Batu Raja RT 02",
    status: "Selesai",
    created_at: "2026-11-14 09:00:00",
    photos: [generateWasteSvg("Pecahan Kaca B3 Saluran", "#DC2626")],
    completion_photos: [generateCleanSvg("Saluran Irigasi Aman & Bersih Bebas Kaca")],
    assigned_officer_id: "usr_petugas_04",
    assigned_officer_name: "Hendra Setiawan",
    rejection_reason: null,
    timeline: [
      {
        status: "Menunggu Verifikasi",
        notes: "Laporan diajukan.",
        user_name: "Indra Kusuma",
        role: "citizen",
        timestamp: "2026-11-14 09:00:00"
      },
      {
        status: "Terverifikasi",
        notes: "Disetujui admin untuk penanganan B3.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-14 10:00:00"
      },
      {
        status: "Ditugaskan",
        notes: "Ditugaskan ke Hendra Setiawan.",
        user_name: "Budi Santoso, S.T.",
        role: "admin",
        timestamp: "2026-11-14 10:30:00"
      },
      {
        status: "Dalam Penanganan",
        notes: "Petugas menggunakan APD sarung tangan tebal dan wadah khusus kaca.",
        user_name: "Hendra Setiawan",
        role: "officer",
        timestamp: "2026-11-14 11:30:00"
      },
      {
        status: "Selesai",
        notes: "Pecahan kaca B3 berhasil diamankan ke depo khusus, saluran kembali steril.",
        user_name: "Hendra Setiawan",
        role: "officer",
        timestamp: "2026-11-14 13:00:00"
      }
    ]
  }
];

// Attach to globalThis for universal compatibility (Browser & Test)
const _root = typeof window !== 'undefined' ? window : globalThis;
_root.generateWasteSvg = generateWasteSvg;
_root.generateCleanSvg = generateCleanSvg;
_root.SEED_WILAYAH_PESAWARAN = SEED_WILAYAH_PESAWARAN;
_root.SEED_CATEGORIES = SEED_CATEGORIES;
_root.SEED_USERS = SEED_USERS;
_root.SEED_REPORTS = SEED_REPORTS;
