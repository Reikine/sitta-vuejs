import { trackingData, packageList, deliveryList } from './data/data.js';
import { useToast } from './composables/useToast.js';
import {
    requireAuth,
    getStorage,
    setStorage,
    formatDateTime,
    getTodayDateString,
    checkAndPromoteStatus,
    goBack
} from './utils.js';

const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        const { toasts, showToast, removeToast } = useToast();

        // Session and tracking state
        const currentUser = ref({ name: 'Pengguna', role: 'User' });
        const trackingList = ref({});
        const searchQuery = ref('');
        const searchResult = ref(null);
        const searchError = ref('');
        const isDoModalOpen = ref(false);
        const isConfirmStep = ref(false);

        // New DO registration model
        const newDo = ref({
            doNumber: '',
            nim: '',
            name: '',
            courier: '',
            packageCode: '',
            shipmentDate: getTodayDateString(),
            total: 0,
            history: []
        });

        // Hydrate tracking dataset from localStorage
        const loadTrackingData = () => {
            trackingList.value = getStorage('trackingData', trackingData);
            if (!localStorage.getItem('trackingData')) {
                setStorage('trackingData', trackingData);
            }
        };

        // Guard auth session, hydrate data, and initialize polling interval
        onMounted(() => {
            const auth = requireAuth();
            if (!auth) return;

            currentUser.value = auth.user;

            loadTrackingData();
            checkAndPromoteStatus(trackingList.value);

            // Handle URL query parameters or active storage detail key
            const urlParams = new URLSearchParams(window.location.search);
            const doFromUrl = urlParams.get('do');
            const doFromStorage = getStorage('activeDoDetail');
            const targetDo = doFromUrl || doFromStorage;

            if (targetDo) {
                searchQuery.value = targetDo;
                handleSearchDo();
                localStorage.removeItem('activeDoDetail');
            }

            // Polling interval (2s) to promote status and refresh active view
            setInterval(() => {
                const currentData = getStorage('trackingData');
                if (!currentData) return;

                const isPromoted = checkAndPromoteStatus(currentData);
                if (isPromoted) {
                    trackingList.value = currentData;

                    if (searchResult.value && trackingList.value[searchResult.value.doNumber]) {
                        searchResult.value = { ...trackingList.value[searchResult.value.doNumber] };
                    }
                }
            }, 2000);
        });

        const handleSearchDo = () => {
            // Kunci pencarian hanya kalau toast error/info sedang aktif melayang
            if (toasts.value && toasts.value.length > 0) {
                return;
            }

            searchError.value = '';
            searchResult.value = null;

            const query = searchQuery.value.trim();
            if (!query) {
                searchError.value = 'Silakan masukkan nomor Delivery Order (DO).';
                return;
            }

            const matchedKey = Object.keys(trackingList.value).find(
                key => key.toLowerCase() === query.toLowerCase()
            );

            if (matchedKey && trackingList.value[matchedKey]) {
                searchResult.value = trackingList.value[matchedKey];
                return;
            }

            showToast('Paket tidak ditemukan!', 'error', 0);
        };

        // Computed package metadata and pricing
        const selectedPackageInfo = computed(() => {
            if (!newDo.value.packageCode) return null;
            return packageList.find(p => p.code === newDo.value.packageCode) || null;
        });

        const calculatedPrice = computed(() => {
            return selectedPackageInfo.value ? selectedPackageInfo.value.price : 0;
        });

        const selectedPackageItemsDetails = computed(() => {
            if (!newDo.value.packageCode) return [];

            const selectedPkg = packageList.find(p => p.code === newDo.value.packageCode);
            if (!selectedPkg || !selectedPkg.items) return [];

            const stockList = getStorage('stock_db', []);

            return selectedPkg.items.map(code => {
                const cleanCode = String(code).trim().toLowerCase();

                const matchedItem = stockList.find(s => {
                    const sCode = String(s.kode || s.itemCode || s.code || '').trim().toLowerCase();
                    return sCode === cleanCode;
                });

                const itemTitle = matchedItem
                    ? (matchedItem.namaItem || matchedItem.nama || matchedItem.title || matchedItem.name || matchedItem.itemName)
                    : code;

                return {
                    code,
                    title: itemTitle
                };
            });
        });

        // Open new DO modal with auto-generated DO Number
        const openDoModal = () => {
            const year = new Date().getFullYear();
            const count = Object.keys(trackingList.value).length + 1;
            const sequence = String(count).padStart(3, '0');

            newDo.value = {
                doNumber: `DO${year}-${sequence}`,
                nim: '',
                name: '',
                courier: '',
                packageCode: '',
                shipmentDate: getTodayDateString(),
                total: 0,
                history: []
            };

            isDoModalOpen.value = true;
        };

        // Validate form input and stock levels before confirmation step
        const proceedToConfirm = () => {
            if (!newDo.value.nim || !newDo.value.name || !newDo.value.courier || !newDo.value.packageCode) {
                showToast('Semua kolom bertanda wajib harus diisi!', 'warning');
                return;
            }

            const today = getTodayDateString();
            if (newDo.value.shipmentDate < today) {
                showToast('Tanggal kirim tidak boleh menggunakan tanggal yang sudah lalu!', 'warning');
                return;
            }

            const selectedPkg = packageList.find(p => p.code === newDo.value.packageCode);
            if (!selectedPkg) {
                showToast('Paket bahan ajar tidak valid!', 'error');
                return;
            }

            const stockList = getStorage('stock_db', []);
            const itemsToDeduct = selectedPkg.items || [newDo.value.packageCode];

            for (const code of itemsToDeduct) {
                const stockItem = stockList.find(
                    s => String(s.itemCode).trim().toLowerCase() === String(code).trim().toLowerCase()
                );

                if (stockItem) {
                    const currentQty = Number(stockItem.qty || 0);
                    const safetyStock = Number(stockItem.safetyStock || 0);

                    if (currentQty < safetyStock) {
                        const statusText = currentQty === 0 ? 'KOSONG' : 'MENIPIS';
                        showToast(
                            `Paket tidak dapat dipilih! Stok ${stockItem.title || code} dalam status ${statusText}`,
                            'error'
                        );
                        return;
                    }
                }
            }

            isConfirmStep.value = true;
        };

        const backToForm = () => {
            isConfirmStep.value = false;
        };

        // Persist new DO record and update inventory stock
        const saveNewDo = () => {
            if (!newDo.value.nim || !newDo.value.name || !newDo.value.courier || !newDo.value.packageCode) {
                showToast('Semua kolom bertanda wajib harus diisi!', 'warning');
                return;
            }

            const selectedPkg = packageList.find(p => p.code === newDo.value.packageCode);
            if (!selectedPkg) {
                showToast('Paket bahan ajar tidak valid!', 'error');
                return;
            }

            // Deduct stock from inventory
            const stockList = getStorage('stock_db', []);
            const itemsToDeduct = selectedPkg.items || [newDo.value.packageCode];

            itemsToDeduct.forEach(code => {
                const stockIndex = stockList.findIndex(
                    s => String(s.itemCode).trim().toLowerCase() === String(code).trim().toLowerCase()
                );

                if (stockIndex !== -1 && stockList[stockIndex].qty > 0) {
                    stockList[stockIndex].qty -= 1;
                }
            });

            setStorage('stock_db', stockList);

            const createdDoNumber = newDo.value.doNumber;

            // Initial timeline entry (Top item)
            trackingList.value[createdDoNumber] = {
                doNumber: createdDoNumber,
                nim: newDo.value.nim.toString(),
                name: newDo.value.name.trim(),
                email: currentUser.value.email || '',
                createdBy: currentUser.value.email || currentUser.value.name || '',
                status: 'Diproses',
                courier: newDo.value.courier,
                shipmentDate: newDo.value.shipmentDate,
                packageCode: newDo.value.packageCode,
                total: selectedPkg.price,
                createdAt: Date.now(),
                history: [
                    {
                        time: formatDateTime(),
                        description: 'Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka'
                    }
                ]
            };

            setStorage('trackingData', trackingList.value);
            showToast(`Delivery Order ${createdDoNumber} berhasil dibuat! Stok telah diperbarui.`, 'success');

            searchQuery.value = createdDoNumber;
            handleSearchDo();
            closeModal();
        };

        const closeModal = () => {
            isDoModalOpen.value = false;
            isConfirmStep.value = false;
        };

        return {
            toasts,
            removeToast,
            currentUser,
            trackingList,
            searchQuery,
            searchResult,
            searchError,
            handleSearchDo,
            goBack,
            isDoModalOpen,
            openDoModal,
            newDo,
            saveNewDo,
            packageList,
            deliveryList,
            selectedPackageInfo,
            calculatedPrice,
            isConfirmStep,
            selectedPackageItemsDetails,
            proceedToConfirm,
            backToForm,
            closeModal
        };
    }
}).mount('#app-tracking');