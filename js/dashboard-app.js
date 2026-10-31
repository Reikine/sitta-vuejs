import { useToast } from './composables/useToast.js';
import { requireAuth, logout, getStorage, setStorage } from './utils.js';

const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        const { toasts, showToast, removeToast } = useToast();

        // User state and session
        const currentUser = ref({ name: 'Pengguna', role: 'User', location: 'Pusat' });
        const isLogoutModalOpen = ref(false);

        // Admin password reset queue state
        const isNotifOpen = ref(false);
        const resetRequests = ref([]);

        // Role authorization check
        const isAdmin = computed(() => {
            const role = currentUser.value?.role?.toLowerCase() || '';
            return role === 'administrator';
        });

        // Guard auth session on mount
        onMounted(() => {
            const auth = requireAuth();
            if (!auth) return;

            currentUser.value = auth.user;

            if (isAdmin.value) {
                fetchResetRequests();
            }
        });

        // Logout handlers
        const confirmLogout = () => {
            isLogoutModalOpen.value = true;
        };

        const cancelLogoutBtn = () => {
            isLogoutModalOpen.value = false;
        };

        const modalConfirmLogout = () => {
            showToast('Berhasil keluar.', 'info');
            setTimeout(() => {
                logout();
            }, 600);
        };

        // Fetch pending reset requests from localStorage
        const fetchResetRequests = () => {
            if (!isAdmin.value) return;
            resetRequests.value = getStorage('resetRequests', []);
        };

        const toggleNotifPanel = () => {
            if (!isAdmin.value) return;

            isNotifOpen.value = !isNotifOpen.value;
            if (isNotifOpen.value) {
                fetchResetRequests();
            }
        };

        // Approve reset request: set user password to default '123456'
        const approveReset = (email, index) => {
            if (!isAdmin.value) return;

            let db = getStorage('user_db', []);
            const targetUser = db.find(u => u.email === email);

            if (targetUser) {
                targetUser.password = '123456';
                setStorage('user_db', db);
                showToast(`Password untuk ${email} direset menjadi '123456'`, 'success');
            } else {
                showToast('Pengguna tidak ditemukan di database', 'error');
            }

            // Remove processed request from queue
            resetRequests.value.splice(index, 1);
            setStorage('resetRequests', resetRequests.value);
        };

        // Reject reset request: purge item from queue
        const rejectReset = (index) => {
            if (!isAdmin.value) return;

            resetRequests.value.splice(index, 1);
            setStorage('resetRequests', resetRequests.value);
            showToast('Permintaan reset password ditolak.', 'warning');
        };

        // Client-side route navigation guard
        const navigateTo = (url) => {
            if (url === 'distribution.html' && !isAdmin.value) {
                showToast('Akses ditolak. Fitur ini khusus Administrator.', 'error');
                return;
            }
            window.location.href = url;
        };

        return {
            toasts,
            removeToast,
            currentUser,
            isAdmin,
            navigateTo,
            isLogoutModalOpen,
            confirmLogout,
            modalConfirmLogout,
            cancelLogoutBtn,
            isNotifOpen,
            resetRequests,
            toggleNotifPanel,
            approveReset,
            rejectReset
        };
    }
}).mount('#app-dashboard');