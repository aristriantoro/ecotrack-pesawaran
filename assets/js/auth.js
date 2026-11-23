/**
 * EcoTrack - Authentication & Role Guard System
 */

const Auth = {
  getCurrentUser() {
    const sessionStr = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!sessionStr) return null;
    try {
      return JSON.parse(sessionStr);
    } catch (e) {
      return null;
    }
  },

  setCurrentUser(user) {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } else {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
    }
  },

  login(email, password) {
    const user = StorageManager.getUserByEmail(email);
    if (!user) {
      throw new Error("Email tidak terdaftar dalam sistem simulasi.");
    }
    if (user.password !== password) {
      throw new Error("Password yang Anda masukkan salah.");
    }

    this.setCurrentUser(user);
    return user;
  },

  register(userData) {
    // Validation
    if (!userData.name || !userData.name.trim()) throw new Error("Nama lengkap wajib diisi.");
    if (!userData.email || !userData.email.trim()) throw new Error("Email wajib diisi.");
    if (!userData.password || userData.password.length < 6) throw new Error("Password minimal 6 karakter.");
    if (!userData.phone || !userData.phone.trim()) throw new Error("Nomor HP / WhatsApp wajib diisi.");

    const existing = StorageManager.getUserByEmail(userData.email);
    if (existing) {
      throw new Error("Email sudah terdaftar. Silakan gunakan email lain atau login.");
    }

    const newUser = {
      id: `usr_warga_${Date.now()}`,
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      password: userData.password,
      role: 'citizen',
      phone: userData.phone.trim(),
      address: (userData.address || '').trim(),
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    StorageManager.saveUser(newUser);
    this.setCurrentUser(newUser);
    return newUser;
  },

  logout(redirectPath = '../login.html') {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    window.location.href = redirectPath;
  },

  getRedirectPathForRole(role, currentDepth = 0) {
    const prefix = currentDepth === 0 ? '' : '../';
    switch (role) {
      case 'admin':
        return `${prefix}admin/dashboard.html`;
      case 'officer':
        return `${prefix}petugas/dashboard.html`;
      case 'citizen':
        return `${prefix}masyarakat/dashboard.html`;
      default:
        return `${prefix}login.html`;
    }
  },

  requireAuth(allowedRoles = [], currentDepth = 1) {
    const user = this.getCurrentUser();
    const loginPath = currentDepth === 0 ? 'login.html' : '../login.html';

    if (!user) {
      window.location.href = `${loginPath}?error=unauthenticated`;
      return null;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      // Redirect to own dashboard if wrong role
      window.location.href = this.getRedirectPathForRole(user.role, currentDepth);
      return null;
    }

    return user;
  }
};

if (typeof window === 'undefined') {
  globalThis.Auth = Auth;
}
