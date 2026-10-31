export const goBack = () => {
    window.history.back();
};

/**
 * Mengembalikan nama ikon Material Symbols berdasarkan status sorting kolom
 * @param {string} column - Nama kolom tabel
 * @param {string} currentColumn - Kolom yang sedang aktif disortir
 * @param {string} direction - Arah sortir ('asc' atau 'desc')
 * @returns {string} Nama ikon Material Symbols
 */
export const getSortIcon = (currentCol, targetCol, direction) => {
    if (currentCol !== targetCol) return 'swap_vert';
    return direction === 'asc' ? 'arrow_upward' : 'arrow_downward';
};

// Storage Helpers (Safe LocalStorage)
export const getStorage = (key, fallback = null) => {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    try {
        return JSON.parse(item);
    } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
        return fallback;
    }
};

export const setStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(`Error setting localStorage key "${key}":`, e);
    }
};

// Auth & Session Guards
export const getAuthUser = () => {
    return getStorage('auth_token', null);
};

export const requireAuth = (allowedRoles = [], redirectTo = 'index.html') => {
    const user = getAuthUser();
    if (!user) {
        window.location.href = redirectTo;
        return null;
    }

    if (allowedRoles.length > 0) {
        const userRole = String(user.role || '').toLowerCase();
        const hasRole = allowedRoles.some(role => role.toLowerCase() === userRole);
        if (!hasRole) {
            return { user, authorized: false };
        }
    }

    return { user, authorized: true };
};

export const logout = (redirectTo = 'index.html') => {
    localStorage.removeItem('auth_token');
    window.location.href = redirectTo;
};

// Formatters & Badge Helpers
export const formatPrice = (value) => {
    if (value === null || value === undefined || value === '') return 'Rp 0';
    const numericOnly = typeof value === 'string' ? value.replace(/[^0-9]/g, '') : value;
    const num = Number(numericOnly) || 0;
    return `Rp ${num.toLocaleString('id-ID')}`;
};

export const formatDateTime = (date = new Date()) => {
    const d = new Date(date);
    return d.toLocaleString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(/\//g, '-');
};

export const getTodayDateString = () => {
    return new Date().toISOString().split('T')[0];
};

export const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'Selesai':
        case 'Berhasil Kirim':
            return 'badge-success';
        case 'Dalam Perjalanan':
            return 'badge-warning';
        case 'Diproses':
            return 'badge-info';
        default:
            return 'badge-secondary';
    }
};

// Tracking Status Promotion Engine
export const checkAndPromoteStatus = (trackingMap) => {
    if (!trackingMap) return false;
    let updated = false;
    const now = Date.now();

    Object.keys(trackingMap).forEach(doNum => {
        const item = trackingMap[doNum];

        if (item.status === 'Diproses' && item.createdAt && (now - item.createdAt >= 20000)) {
            item.status = 'Dalam Perjalanan';
            if (!item.history) item.history = [];

            item.history.push({
                time: formatDateTime(),
                description: `Tiba di Hub Transit: ${item.courier || 'Ekspedisi'}. Paket diteruskan ke kota tujuan.`
            });

            updated = true;
        }
    });

    if (updated) {
        setStorage('trackingData', trackingMap);
    }
    return updated;
};