/**
 * EcoTrack - Global App Engine & UI Helpers
 */

const App = {
  // Toast notifications
  toast(message, type = 'info') {
    let container = document.getElementById('ecoToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'ecoToastContainer';
      container.className = 'eco-toast-container';
      document.body.appendChild(container);
    }

    const toastEl = document.createElement('div');
    const bgClass = type === 'success' ? 'bg-success text-white' :
                    type === 'danger' ? 'bg-danger text-white' :
                    type === 'warning' ? 'bg-warning text-dark' : 'bg-dark text-white';

    const icon = type === 'success' ? 'bi-check-circle-fill' :
                 type === 'danger' ? 'bi-exclamation-triangle-fill' :
                 type === 'warning' ? 'bi-exclamation-circle-fill' : 'bi-info-circle-fill';

    toastEl.className = `toast align-items-center ${bgClass} border-0 shadow-lg show`;
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi ${icon} fs-5"></i>
          <span>${this.escapeHtml(message)}</span>
        </div>
        <button type="button" class="btn-close ${type === 'warning' ? '' : 'btn-close-white'} me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;

    container.appendChild(toastEl);
    setTimeout(() => {
      toastEl.classList.remove('show');
      setTimeout(() => toastEl.remove(), 300);
    }, 4500);
  },

  // Confirmation Modal
  confirmModal({ title, message, confirmText = 'Lanjutkan', confirmBtnClass = 'btn-primary-eco', onConfirm }) {
    let modalEl = document.getElementById('ecoConfirmModal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'ecoConfirmModal';
      modalEl.className = 'modal fade';
      modalEl.setAttribute('tabindex', '-1');
      modalEl.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow">
            <div class="modal-header border-0 pb-0">
              <h5 class="modal-title fw-bold" id="ecoConfirmTitle">Konfirmasi Tindakan</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body py-3" id="ecoConfirmMessage">
              Apakah Anda yakin?
            </div>
            <div class="modal-footer border-0 pt-0">
              <button type="button" class="btn btn-light" data-bs-dismiss="modal">Batal</button>
              <button type="button" class="btn" id="ecoConfirmBtn">Lanjutkan</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalEl);
    }

    document.getElementById('ecoConfirmTitle').textContent = title;
    document.getElementById('ecoConfirmMessage').innerHTML = message;
    const confirmBtn = document.getElementById('ecoConfirmBtn');
    confirmBtn.className = `btn ${confirmBtnClass}`;
    confirmBtn.textContent = confirmText;

    const bsModal = new bootstrap.Modal(modalEl);

    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    newConfirmBtn.addEventListener('click', () => {
      bsModal.hide();
      if (typeof onConfirm === 'function') onConfirm();
    });

    bsModal.show();
  },

  // Reset Demo Data with confirmation
  confirmResetDemo() {
    this.confirmModal({
      title: 'Reset Seluruh Data Simulasi?',
      message: 'Semua perubahan laporan, penugasan, dan status akan dikembalikan ke data awal demo Kabupaten Pesawaran.',
      confirmText: 'Ya, Reset Data Demo',
      confirmBtnClass: 'btn-danger',
      onConfirm: () => {
        StorageManager.resetData(false);
        App.toast('Data simulasi berhasil direset ke kondisi awal.', 'success');
        setTimeout(() => window.location.reload(), 800);
      }
    });
  },

  // Status Badge Helper
  getStatusBadge(status) {
    switch (status) {
      case 'Menunggu Verifikasi':
        return `<span class="badge-eco badge-menunggu"><i class="bi bi-clock-history"></i> Menunggu Verifikasi</span>`;
      case 'Terverifikasi':
        return `<span class="badge-eco badge-terverifikasi"><i class="bi bi-patch-check"></i> Terverifikasi</span>`;
      case 'Ditugaskan':
        return `<span class="badge-eco badge-ditugaskan"><i class="bi bi-person-check"></i> Ditugaskan</span>`;
      case 'Dalam Penanganan':
        return `<span class="badge-eco badge-penanganan"><i class="bi bi-tools"></i> Dalam Penanganan</span>`;
      case 'Selesai':
        return `<span class="badge-eco badge-selesai"><i class="bi bi-check-circle-fill"></i> Selesai</span>`;
      case 'Ditolak':
        return `<span class="badge-eco badge-ditolak"><i class="bi bi-x-circle-fill"></i> Ditolak</span>`;
      case 'Dibatalkan':
        return `<span class="badge-eco badge-dibatalkan"><i class="bi bi-slash-circle"></i> Dibatalkan</span>`;
      default:
        return `<span class="badge-eco badge-dibatalkan">${this.escapeHtml(status)}</span>`;
    }
  },

  formatDate(dateStr) {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr.replace(' ', 'T'));
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateStr;
    }
  },

  escapeHtml(str) {
    if (typeof str !== 'string') return str || '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  // Render Top Simulation Bar
  renderSimulationBanner(containerId = 'simBannerContainer') {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
      <div class="simulation-banner">
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-cpu-fill"></i>
          <span><strong>MODE SIMULASI & DEMO</strong> — Sistem Pengelolaan Sampah Kab. Pesawaran</span>
        </div>
        <div class="d-flex align-items-center gap-3">
          <button type="button" onclick="App.confirmResetDemo()" title="Kembalikan semua data ke kondisi awal">
            <i class="bi bi-arrow-counterclockwise"></i> Reset Data Demo
          </button>
        </div>
      </div>
    `;
  },

  // Setup Sidebar Navigation dynamically
  renderSidebar(role, activeMenuId) {
    const sidebarEl = document.querySelector('.sidebar');
    if (!sidebarEl) return;

    let roleName = 'Masyarakat';
    let roleBadgeClass = 'badge-role-masyarakat';
    let menuItems = [];

    if (role === 'admin') {
      roleName = 'Administrator DLH';
      roleBadgeClass = 'badge-role-admin';
      menuItems = [
        { header: 'Utama' },
        { id: 'dashboard', label: 'Dashboard', icon: 'bi-grid-1x2-fill', href: 'dashboard.html' },
        { header: 'Pengelolaan Laporan' },
        { id: 'reports', label: 'Data Laporan', icon: 'bi-file-earmark-text-fill', href: 'reports.html' },
        { id: 'verification', label: 'Verifikasi Laporan', icon: 'bi-shield-check', href: 'verification.html' },
        { id: 'assignments', label: 'Penugasan Petugas', icon: 'bi-person-badge-fill', href: 'assignments.html' },
        { header: 'Master Data & Pengguna' },
        { id: 'users', label: 'Data Pengguna', icon: 'bi-people-fill', href: 'users.html' },
        { id: 'categories', label: 'Kategori Sampah', icon: 'bi-tags-fill', href: 'categories.html' },
        { header: 'Laporan & Analisis' },
        { id: 'statistics', label: 'Statistik & Rekap', icon: 'bi-bar-chart-fill', href: 'statistics.html' }
      ];
    } else if (role === 'officer') {
      roleName = 'Petugas Kebersihan';
      roleBadgeClass = 'badge-role-petugas';
      menuItems = [
        { header: 'Utama' },
        { id: 'dashboard', label: 'Dashboard Tugas', icon: 'bi-speedometer2', href: 'dashboard.html' },
        { header: 'Tugas Lapangan' },
        { id: 'tasks', label: 'Daftar Tugas Saya', icon: 'bi-card-checklist', href: 'tasks.html' },
        { id: 'history', label: 'Riwayat Pekerjaan', icon: 'bi-clock-history', href: 'history.html' },
        { header: 'Akun' },
        { id: 'profile', label: 'Profil Saya', icon: 'bi-person-circle', href: 'profile.html' }
      ];
    } else {
      // citizen
      roleName = 'Masyarakat / Pelapor';
      roleBadgeClass = 'badge-role-masyarakat';
      menuItems = [
        { header: 'Utama' },
        { id: 'dashboard', label: 'Dashboard Saya', icon: 'bi-grid-fill', href: 'dashboard.html' },
        { header: 'Layanan Sampah' },
        { id: 'create-report', label: 'Buat Laporan', icon: 'bi-plus-circle-fill', href: 'create-report.html' },
        { id: 'history', label: 'Riwayat Laporan', icon: 'bi-journal-text', href: 'history.html' },
        { header: 'Akun' },
        { id: 'profile', label: 'Profil Saya', icon: 'bi-person-circle', href: 'profile.html' }
      ];
    }

    let menuHtml = '';
    menuItems.forEach(item => {
      if (item.header) {
        menuHtml += `<li class="sidebar-menu-category">${item.header}</li>`;
      } else {
        const isActive = item.id === activeMenuId ? 'active' : '';
        menuHtml += `
          <li class="sidebar-nav-item">
            <a href="${item.href}" class="sidebar-nav-link ${isActive}">
              <i class="bi ${item.icon}"></i>
              <span>${item.label}</span>
            </a>
          </li>
        `;
      }
    });

    sidebarEl.innerHTML = `
      <div class="sidebar-header">
        <a href="../index.html" class="sidebar-brand">
          <i class="bi bi-recycle"></i>
          <span>EcoTrack</span>
        </a>
      </div>
      <div class="sidebar-role-indicator">
        <div class="d-flex align-items-center justify-content-between mb-1">
          <span class="text-muted" style="font-size: 11px;">Peran Akses:</span>
          <span class="badge ${roleBadgeClass} fw-bold" style="font-size: 10px;">${roleName}</span>
        </div>
        <div class="fw-bold text-dark text-truncate" id="sidebarUserName">-</div>
      </div>
      <ul class="sidebar-menu">
        ${menuHtml}
      </ul>
      <div class="sidebar-footer">
        <button type="button" class="btn btn-outline-danger btn-sm w-100 d-flex align-items-center justify-content-center gap-2" onclick="Auth.logout('../login.html')">
          <i class="bi bi-box-arrow-right"></i>
          <span>Keluar Sesi</span>
        </button>
      </div>
    `;

    // Populate user name
    const currentUser = Auth.getCurrentUser();
    if (currentUser) {
      const nameEl = document.getElementById('sidebarUserName');
      if (nameEl) nameEl.textContent = currentUser.name;
    }
  },

  // Render Topbar
  renderTopbar(pageTitle, breadcrumbs = []) {
    const topbarEl = document.querySelector('.topbar');
    if (!topbarEl) return;

    let breadcrumbHtml = `<nav aria-label="breadcrumb"><ol class="breadcrumb mb-0 small">`;
    breadcrumbs.forEach((crumb, idx) => {
      if (idx === breadcrumbs.length - 1) {
        breadcrumbHtml += `<li class="breadcrumb-item active fw-medium text-dark">${crumb.label}</li>`;
      } else {
        breadcrumbHtml += `<li class="breadcrumb-item"><a href="${crumb.href}" class="text-muted text-decoration-none">${crumb.label}</a></li>`;
      }
    });
    breadcrumbHtml += `</ol></nav>`;

    const currentUser = Auth.getCurrentUser();
    const initials = currentUser ? currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('') : 'U';

    topbarEl.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <button class="btn btn-light d-lg-none p-1 px-2 border" type="button" id="sidebarToggleBtn">
          <i class="bi bi-list fs-4"></i>
        </button>
        <div>
          ${breadcrumbHtml}
          <h5 class="fw-bold text-dark mb-0 d-none d-sm-block">${pageTitle}</h5>
        </div>
      </div>

      <div class="d-flex align-items-center gap-3">
        <!-- Switch Persona Fast Dropdown -->
        <div class="dropdown">
          <button class="btn btn-sm btn-outline-success dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown">
            <i class="bi bi-person-gear"></i>
            <span class="d-none d-md-inline">Ganti Role Demo</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow border-0 small">
            <li><h6 class="dropdown-header">Pindah Cepat Akun Demo:</h6></li>
            <li><button class="dropdown-item" onclick="App.quickSwitch('masyarakat@ecotrack.demo', 'user123')"><i class="bi bi-person me-2"></i> Warga (Siti Aminah)</button></li>
            <li><button class="dropdown-item" onclick="App.quickSwitch('petugas@ecotrack.demo', 'petugas123')"><i class="bi bi-truck me-2"></i> Petugas (Joko Susanto)</button></li>
            <li><button class="dropdown-item" onclick="App.quickSwitch('admin@ecotrack.demo', 'admin123')"><i class="bi bi-shield-lock me-2"></i> Admin DLH (Budi S.)</button></li>
          </ul>
        </div>

        <div class="d-flex align-items-center gap-2">
          <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold small" style="width: 36px; height: 36px;">
            ${initials}
          </div>
          <div class="d-none d-md-block text-start">
            <div class="fw-bold small text-dark leading-tight">${currentUser ? currentUser.name : ''}</div>
            <small class="text-muted" style="font-size: 11px;">${currentUser ? currentUser.email : ''}</small>
          </div>
        </div>
      </div>
    `;

    this.setupSidebarToggle();
  },

  quickSwitch(email, password) {
    try {
      const user = Auth.login(email, password);
      App.toast(`Beralih ke akun ${user.name} (${user.role})...`, 'info');
      setTimeout(() => {
        window.location.href = Auth.getRedirectPathForRole(user.role, 1);
      }, 400);
    } catch (e) {
      App.toast(e.message, 'danger');
    }
  },

  setupSidebarToggle() {
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    const sidebar = document.querySelector('.sidebar');
    if (!toggleBtn || !sidebar) return;

    let backdrop = document.querySelector('.sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'sidebar-backdrop d-none';
      document.body.appendChild(backdrop);
    }

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      backdrop.classList.toggle('d-none');
    });

    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('show');
      backdrop.classList.add('d-none');
    });
  },

  // Cascading Kecamatan -> Desa
  setupKecamatanDesa(kecSelectId, desaSelectId, defaultKec = '', defaultDesa = '') {
    const kecSelect = document.getElementById(kecSelectId);
    const desaSelect = document.getElementById(desaSelectId);
    if (!kecSelect || !desaSelect) return;

    const wilayah = StorageManager.getWilayah();

    kecSelect.innerHTML = `<option value="">-- Pilih Kecamatan --</option>`;
    Object.keys(wilayah).forEach(kec => {
      const selected = kec === defaultKec ? 'selected' : '';
      kecSelect.innerHTML += `<option value="${kec}" ${selected}>${kec}</option>`;
    });

    const updateDesa = (selectedKec, preselectedDesa = '') => {
      desaSelect.innerHTML = `<option value="">-- Pilih Desa / Kelurahan --</option>`;
      if (selectedKec && wilayah[selectedKec]) {
        wilayah[selectedKec].forEach(desa => {
          const selected = desa === preselectedDesa ? 'selected' : '';
          desaSelect.innerHTML += `<option value="${desa}" ${selected}>${desa}</option>`;
        });
        desaSelect.disabled = false;
      } else {
        desaSelect.disabled = true;
      }
    };

    kecSelect.addEventListener('change', () => {
      updateDesa(kecSelect.value);
    });

    if (defaultKec) {
      updateDesa(defaultKec, defaultDesa);
    } else {
      desaSelect.disabled = true;
    }
  },

  // Setup Photo Uploader with preview & base64
  setupPhotoUploader({ dropzoneId, inputId, previewGridId, initialPhotos = [], onPhotosChange }) {
    const dropzone = document.getElementById(dropzoneId);
    const input = document.getElementById(inputId);
    const grid = document.getElementById(previewGridId);
    if (!dropzone || !input || !grid) return;

    let photos = [...initialPhotos];

    const renderPhotos = () => {
      grid.innerHTML = '';
      photos.forEach((photoUrl, idx) => {
        const card = document.createElement('div');
        card.className = 'photo-preview-card';
        card.innerHTML = `
          <img src="${photoUrl}" alt="Preview Foto ${idx + 1}">
          <button type="button" class="photo-remove-btn" title="Hapus foto">&times;</button>
        `;
        card.querySelector('.photo-remove-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          photos.splice(idx, 1);
          renderPhotos();
          if (typeof onPhotosChange === 'function') onPhotosChange(photos);
        });
        grid.appendChild(card);
      });
      if (typeof onPhotosChange === 'function') onPhotosChange(photos);
    };

    renderPhotos();

    dropzone.addEventListener('click', () => input.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      handleFiles(e.dataTransfer.files);
    });

    input.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });

    const handleFiles = (files) => {
      Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
          App.toast(`File "${file.name}" bukan gambar yang valid.`, 'warning');
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          App.toast(`Ukuran foto "${file.name}" melebihi batas 5 MB.`, 'danger');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          photos.push(e.target.result);
          renderPhotos();
        };
        reader.readAsDataURL(file);
      });
    };
  }
};
