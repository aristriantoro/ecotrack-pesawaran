/**
 * EcoTrack - Storage Manager (localStorage engine)
 */

const STORAGE_KEYS = {
  USERS: 'ecotrack_users',
  CATEGORIES: 'ecotrack_categories',
  REPORTS: 'ecotrack_reports',
  WILAYAH: 'ecotrack_wilayah',
  SESSION: 'ecotrack_session'
};

if (typeof window === 'undefined') {
  globalThis.STORAGE_KEYS = STORAGE_KEYS;
}

const StorageManager = {
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      this.resetData(false);
    }
  },

  resetData(showAlert = true) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(SEED_CATEGORIES));
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(SEED_REPORTS));
    localStorage.setItem(STORAGE_KEYS.WILAYAH, JSON.stringify(SEED_WILAYAH_PESAWARAN));

    if (showAlert && typeof App !== 'undefined' && App.toast) {
      App.toast('Data demo simulasi berhasil direset ke kondisi awal.', 'success');
    }
  },

  // USERS
  getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  },

  getUserById(id) {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  },

  getUserByEmail(email) {
    const users = this.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  saveUser(userData) {
    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.id === userData.id);
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...userData };
    } else {
      users.push(userData);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return userData;
  },

  deleteUser(id) {
    let users = this.getUsers();
    users = users.filter(u => u.id !== id);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  getOfficers() {
    return this.getUsers().filter(u => u.role === 'officer');
  },

  getCitizens() {
    return this.getUsers().filter(u => u.role === 'citizen');
  },

  // CATEGORIES
  getCategories() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
  },

  saveCategory(category) {
    const categories = this.getCategories();
    if (category.id) {
      const idx = categories.findIndex(c => c.id === category.id);
      if (idx >= 0) categories[idx] = category;
    } else {
      category.id = Date.now();
      categories.push(category);
    }
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    return category;
  },

  deleteCategory(id) {
    let categories = this.getCategories();
    categories = categories.filter(c => c.id !== Number(id));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  },

  // WILAYAH
  getWilayah() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.WILAYAH) || JSON.stringify(SEED_WILAYAH_PESAWARAN));
  },

  // REPORTS
  getReports() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]');
  },

  getReportById(id) {
    const reports = this.getReports();
    return reports.find(r => r.id === id) || null;
  },

  saveReports(reports) {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  },

  createReport(data, currentUser) {
    const reports = this.getReports();
    const newId = `RPT-${new Date().getFullYear()}-${String(reports.length + 1).padStart(4, '0')}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const newReport = {
      id: newId,
      user_id: currentUser.id,
      user_name: currentUser.name,
      user_phone: currentUser.phone || '-',
      category_id: Number(data.category_id),
      category_name: data.category_name,
      title: data.title.trim(),
      description: data.description.trim(),
      district: data.district,
      village: data.village,
      address: data.address.trim(),
      status: "Menunggu Verifikasi",
      created_at: nowStr,
      photos: data.photos && data.photos.length > 0 ? data.photos : [generateWasteSvg(data.title.trim())],
      completion_photos: [],
      assigned_officer_id: null,
      assigned_officer_name: null,
      rejection_reason: null,
      timeline: [
        {
          status: "Menunggu Verifikasi",
          notes: `Laporan berhasil diajukan oleh masyarakat (${currentUser.name}).`,
          user_name: currentUser.name,
          role: currentUser.role,
          timestamp: nowStr
        }
      ]
    };

    reports.unshift(newReport);
    this.saveReports(reports);
    return newReport;
  },

  verifyReport(reportId, adminUser) {
    const reports = this.getReports();
    const report = reports.find(r => r.id === reportId);
    if (!report) throw new Error("Laporan tidak ditemukan.");
    if (report.status !== 'Menunggu Verifikasi') throw new Error("Hanya laporan berstatus 'Menunggu Verifikasi' yang dapat diverifikasi.");

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    report.status = "Terverifikasi";
    report.timeline.push({
      status: "Terverifikasi",
      notes: "Laporan telah diverifikasi oleh tim Dinas Lingkungan Hidup Kab. Pesawaran dan dinyatakan valid untuk ditindaklanjuti.",
      user_name: adminUser.name,
      role: adminUser.role,
      timestamp: nowStr
    });

    this.saveReports(reports);
    return report;
  },

  rejectReport(reportId, reason, adminUser) {
    if (!reason || !reason.trim()) {
      throw new Error("Alasan penolakan laporan wajib diisi!");
    }
    const reports = this.getReports();
    const report = reports.find(r => r.id === reportId);
    if (!report) throw new Error("Laporan tidak ditemukan.");
    if (report.status !== 'Menunggu Verifikasi') throw new Error("Hanya laporan 'Menunggu Verifikasi' yang dapat ditolak.");

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    report.status = "Ditolak";
    report.rejection_reason = reason.trim();
    report.timeline.push({
      status: "Ditolak",
      notes: `Laporan ditolak. Alasan: ${reason.trim()}`,
      user_name: adminUser.name,
      role: adminUser.role,
      timestamp: nowStr
    });

    this.saveReports(reports);
    return report;
  },

  assignOfficer(reportId, officerId, adminUser) {
    const reports = this.getReports();
    const report = reports.find(r => r.id === reportId);
    if (!report) throw new Error("Laporan tidak ditemukan.");
    if (report.status !== 'Terverifikasi' && report.status !== 'Ditugaskan') {
      throw new Error("Laporan harus berstatus 'Terverifikasi' sebelum dapat ditugaskan.");
    }

    const officer = this.getUserById(officerId);
    if (!officer || officer.role !== 'officer') throw new Error("Petugas yang dipilih tidak valid.");

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    report.status = "Ditugaskan";
    report.assigned_officer_id = officer.id;
    report.assigned_officer_name = officer.name;
    report.timeline.push({
      status: "Ditugaskan",
      notes: `Ditugaskan kepada petugas kebersihan ${officer.name} (${officer.vehicle || 'Armada DLH'}).`,
      user_name: adminUser.name,
      role: adminUser.role,
      timestamp: nowStr
    });

    this.saveReports(reports);
    return report;
  },

  startHandling(reportId, officerUser) {
    const reports = this.getReports();
    const report = reports.find(r => r.id === reportId);
    if (!report) throw new Error("Laporan tidak ditemukan.");
    if (report.assigned_officer_id !== officerUser.id) {
      throw new Error("Anda tidak memiliki akses ke penugasan ini.");
    }
    if (report.status !== 'Ditugaskan') {
      throw new Error("Status laporan tidak sesuai untuk memulai penanganan.");
    }

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    report.status = "Dalam Penanganan";
    report.timeline.push({
      status: "Dalam Penanganan",
      notes: `Petugas (${officerUser.name}) telah tiba di lokasi dan mulai proses penanganan/pengangkutan sampah.`,
      user_name: officerUser.name,
      role: officerUser.role,
      timestamp: nowStr
    });

    this.saveReports(reports);
    return report;
  },

  completeReport(reportId, evidencePhotos, notes, officerUser) {
    if (!evidencePhotos || evidencePhotos.length === 0) {
      throw new Error("Wajib mengunggah minimal satu foto bukti penanganan sebelum menyelesaikan tugas!");
    }
    const reports = this.getReports();
    const report = reports.find(r => r.id === reportId);
    if (!report) throw new Error("Laporan tidak ditemukan.");
    if (report.assigned_officer_id !== officerUser.id) {
      throw new Error("Anda tidak berwenang menyelesaikan tugas petugas lain.");
    }
    if (report.status !== 'Dalam Penanganan') {
      throw new Error("Laporan harus dalam status 'Dalam Penanganan' terlebih dahulu.");
    }

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    report.status = "Selesai";
    report.completion_photos = evidencePhotos;
    report.timeline.push({
      status: "Selesai",
      notes: notes && notes.trim() 
        ? notes.trim() 
        : `Tugas penanganan sampah telah selesai dikerjakan secara tuntas oleh ${officerUser.name}. Bukti penanganan telah diunggah.`,
      user_name: officerUser.name,
      role: officerUser.role,
      timestamp: nowStr
    });

    this.saveReports(reports);
    return report;
  },

  cancelReport(reportId, citizenUser) {
    const reports = this.getReports();
    const report = reports.find(r => r.id === reportId);
    if (!report) throw new Error("Laporan tidak ditemukan.");
    if (report.user_id !== citizenUser.id) {
      throw new Error("Anda hanya dapat membatalkan laporan yang Anda buat sendiri.");
    }
    if (report.status !== 'Menunggu Verifikasi') {
      throw new Error("Laporan sudah diverifikasi/diproses dan tidak dapat dibatalkan lagi.");
    }

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    report.status = "Dibatalkan";
    report.timeline.push({
      status: "Dibatalkan",
      notes: `Laporan dibatalkan mandiri oleh pelapor (${citizenUser.name}).`,
      user_name: citizenUser.name,
      role: citizenUser.role,
      timestamp: nowStr
    });

    this.saveReports(reports);
    return report;
  },

  // STATS
  getStats() {
    const reports = this.getReports();
    return {
      total: reports.length,
      menunggu: reports.filter(r => r.status === 'Menunggu Verifikasi').length,
      terverifikasi: reports.filter(r => r.status === 'Terverifikasi').length,
      ditugaskan: reports.filter(r => r.status === 'Ditugaskan').length,
      penanganan: reports.filter(r => r.status === 'Dalam Penanganan').length,
      selesai: reports.filter(r => r.status === 'Selesai').length,
      ditolak: reports.filter(r => r.status === 'Ditolak').length,
      dibatalkan: reports.filter(r => r.status === 'Dibatalkan').length,
      totalPetugas: this.getOfficers().length,
      totalMasyarakat: this.getCitizens().length
    };
  },

  getStatsForOfficer(officerId) {
    const reports = this.getReports().filter(r => r.assigned_officer_id === officerId);
    return {
      total: reports.length,
      baru: reports.filter(r => r.status === 'Ditugaskan').length,
      sedangDikerjakan: reports.filter(r => r.status === 'Dalam Penanganan').length,
      selesai: reports.filter(r => r.status === 'Selesai').length,
      reports: reports
    };
  },

  getStatsForCitizen(citizenId) {
    const reports = this.getReports().filter(r => r.user_id === citizenId);
    return {
      total: reports.length,
      menunggu: reports.filter(r => r.status === 'Menunggu Verifikasi').length,
      proses: reports.filter(r => ['Terverifikasi', 'Ditugaskan', 'Dalam Penanganan'].includes(r.status)).length,
      selesai: reports.filter(r => r.status === 'Selesai').length,
      ditolak: reports.filter(r => r.status === 'Ditolak').length,
      dibatalkan: reports.filter(r => r.status === 'Dibatalkan').length,
      reports: reports
    };
  }
};

// Initialize right away
StorageManager.init();

if (typeof window === 'undefined') {
  globalThis.StorageManager = StorageManager;
}
