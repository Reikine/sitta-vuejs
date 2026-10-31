import { initialUserData } from './data/data.js';
import { useToast } from './composables/useToast.js';
import { getStorage, setStorage, resetToMasterData } from './utils.js';

const { createApp, ref, reactive, onMounted, onUnmounted } = Vue;

createApp({
    setup() {
        const { toasts, showToast, removeToast } = useToast();

        const userDb = ref([]);
        const currentView = ref('login');
        const showPassword = ref(false);

        const loginForm = reactive({ email: '', password: '' });
        const regForm = reactive({ name: '', email: '', password: '', location: '' });

        const isResetModalOpen = ref(false);
        const resetEmail = ref('');

        let idleTimer = null;

        onMounted(() => {
            userDb.value = getStorage('user_db', initialUserData);
            if (!localStorage.getItem('user_db')) {
                setStorage('user_db', initialUserData);
            }

            const twoMinutes = 2 * 60 * 1000;
            idleTimer = setTimeout(() => {
                resetToMasterData(initialUserData);
                userDb.value = [...initialUserData];
                showToast('Aplikasi telah di-reset ke master data awal.', 'info');
            }, twoMinutes);
        });

        const togglePassword = () => {
            showPassword.value = !showPassword.value;
        };

        // Authenticates user credentials against local storage records.
        const handleLogin = () => {
            const email = loginForm.email.trim();
            const password = loginForm.password.trim();

            const found = userDb.value.find(u => u.email === email && u.password === password);
            if (found) {
                setStorage('auth_token', found);
                showToast('Data terverifikasi! Menuju Dashboard...', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showToast('Email atau password salah.', 'error');
            }
        };

        // Registers a new user account with unique email enforcement.
        const handleRegister = () => {
            const email = regForm.email.trim();

            if (userDb.value.some(u => u.email === email)) {
                showToast('Email sudah terdaftar di sistem!', 'warning');
                return;
            }

            // Restricted default RBAC role
            const newUser = {
                id: userDb.value.length + 1,
                name: regForm.name.trim(),
                email: email,
                password: regForm.password.trim(),
                role: 'User',
                location: regForm.location.trim()
            };

            userDb.value.push(newUser);
            setStorage('user_db', userDb.value);

            showToast('Akun berhasil terdaftar! Silakan login.', 'success');

            Object.assign(regForm, { name: '', email: '', password: '', location: '' });
            currentView.value = 'login';
        };

        const openResetModal = () => {
            resetEmail.value = '';
            isResetModalOpen.value = true;
        };

        const closeResetModal = () => {
            isResetModalOpen.value = false;
        };

        // Queues a password reset request into localStorage for admin review.
        const submitForgotPassword = () => {
            const email = resetEmail.value.trim();
            if (!email) {
                showToast('Email tidak boleh kosong!', 'warning');
                return;
            }

            const userExists = userDb.value.some(u => u.email === email);
            if (!userExists) {
                showToast('Email tidak ditemukan dalam sistem.', 'error', 0);
                return;
            }

            // Append to reset queue without creating duplicates
            const resetRequests = getStorage('resetRequests', []);
            if (!resetRequests.includes(email)) {
                resetRequests.push(email);
                setStorage('resetRequests', resetRequests);
            }

            showToast('Permintaan reset password berhasil dikirim ke Admin.', 'info');
            closeResetModal();
        };

        return {
            toasts,
            removeToast,
            currentView,
            showPassword,
            togglePassword,
            loginForm,
            regForm,
            handleLogin,
            handleRegister,
            isResetModalOpen,
            resetEmail,
            openResetModal,
            closeResetModal,
            submitForgotPassword
        };
    }
}).mount('#app-auth');