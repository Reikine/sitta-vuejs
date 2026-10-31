import { initialStockData, regionList, categoryList } from './data/data.js';
import {
    getSortIcon,
    goBack,
    requireAuth,
    getStorage,
    setStorage,
    formatPrice
} from './utils.js';
import { useToast } from './composables/useToast.js';

const { createApp, ref, computed, watch, onMounted } = Vue;

createApp({
    setup() {
        const { toasts, showToast, removeToast } = useToast();

        // Session and user state
        const currentUser = ref({ name: 'Pengguna', role: 'User' });
        const isAdmin = computed(() => currentUser.value?.role?.toLowerCase() === 'administrator');

        // Inventory list and filter state
        const stock = ref([]);
        const selectedRegion = ref('');
        const selectedCategory = ref('');
        const searchQuery = ref('');
        const isReorderFilterActive = ref(false);

        // Sorting state
        const sortColumn = ref('');
        const sortDirection = ref('asc');

        // Form and modal controls
        const showNewForm = ref(false);
        const isModalOpen = ref(false);
        const selectedBook = ref(null);
        const stockActionInput = ref('');
        const tempQty = ref(0);
        const activeAction = ref(null);

        // New item registration model
        const newBook = ref({
            itemCode: '',
            title: '',
            category: '',
            region: '',
            rackLocation: '',
            price: null,
            qty: 1,
            safetyStock: 5,
            notesHTML: ''
        });

        // Hydrate stock dataset from localStorage
        const loadStockData = () => {
            stock.value = getStorage('stock_db', initialStockData);
            if (!localStorage.getItem('stock_db')) {
                setStorage('stock_db', initialStockData);
            }
        };

        // Guard auth session and initialize data on mount
        onMounted(() => {
            const auth = requireAuth();
            if (!auth) return;

            currentUser.value = auth.user;
            loadStockData();
        });

        // Reset category filter upon region selection change
        watch(selectedRegion, () => {
            selectedCategory.value = '';
        });

        // Computed metrics and option lists
        const reorderCount = computed(() => {
            return stock.value.filter(item => item.qty < item.safetyStock || item.qty === 0).length;
        });

        const availableCategories = computed(() => {
            let data = stock.value;
            if (selectedRegion.value) {
                data = data.filter(item => item.region === selectedRegion.value);
            }
            return [...new Set(data.map(item => item.category))];
        });

        // Computed filtered and sorted stock dataset
        const filteredStock = computed(() => {
            let result = stock.value.filter(item => {
                if (isReorderFilterActive.value) {
                    return item.qty < item.safetyStock || item.qty === 0;
                }
                const isRegionMatched = !selectedRegion.value || item.region === selectedRegion.value;
                const isCategoryMatched = !selectedCategory.value || item.category === selectedCategory.value;
                const isSearchMatched = !searchQuery.value ||
                    item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                    item.itemCode.toLowerCase().includes(searchQuery.value.toLowerCase());

                return isRegionMatched && isCategoryMatched && isSearchMatched;
            });

            if (!sortColumn.value) return result;

            return result.sort((a, b) => {
                const modifier = sortDirection.value === 'asc' ? 1 : -1;
                let valA = a[sortColumn.value];
                let valB = b[sortColumn.value];

                if (sortColumn.value === 'price') {
                    valA = typeof valA === 'number' ? valA : (Number(String(valA).replace(/[^0-9]/g, '')) || 0);
                    valB = typeof valB === 'number' ? valB : (Number(String(valB).replace(/[^0-9]/g, '')) || 0);
                }

                if (typeof valA === 'string') {
                    return valA.localeCompare(valB) * modifier;
                }
                return (valA - valB) * modifier;
            });
        });

        // Filter and sorting actions
        const toggleReorderFilter = () => {
            isReorderFilterActive.value = !isReorderFilterActive.value;
        };

        const resetFilters = () => {
            selectedRegion.value = '';
            selectedCategory.value = '';
            searchQuery.value = '';
            isReorderFilterActive.value = false;
            showToast('Filter berhasil direset.', 'info');
        };

        const handleSort = (column) => {
            if (sortColumn.value === column) {
                sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
                return;
            }
            sortColumn.value = column;
            sortDirection.value = 'asc';
        };

        const toggleNewForm = () => {
            if (!isAdmin.value) {
                showToast('Akses Ditolak! Fitur ini khusus Administrator.', 'error');
                return;
            }
            showNewForm.value = !showNewForm.value;
        };

        // Register new inventory item
        const handleRegisterBook = () => {
            if (!isAdmin.value) {
                showToast('Akses Ditolak! Anda tidak memiliki izin menambah data.', 'error');
                return;
            }

            if (!newBook.value.itemCode || !newBook.value.title) {
                showToast('Kode Item dan Judul Buku wajib diisi!', 'warning');
                return;
            }

            const cleanCode = String(newBook.value.itemCode).trim();
            const isDuplicate = stock.value.some(
                item => String(item.itemCode).trim().toLowerCase() === cleanCode.toLowerCase()
            );

            if (isDuplicate) {
                showToast(`Kode Item '${cleanCode}' sudah terdaftar!`, 'warning');
                return;
            }

            stock.value.push({
                ...newBook.value,
                itemCode: cleanCode,
                title: String(newBook.value.title).trim(),
                price: Number(newBook.value.price || 0)
            });

            setStorage('stock_db', stock.value);

            showNewForm.value = false;
            newBook.value = {
                itemCode: '',
                title: '',
                category: '',
                region: '',
                rackLocation: '',
                price: null,
                qty: 1,
                safetyStock: 5,
                notesHTML: ''
            };

            showToast('Bahan ajar baru berhasil didaftarkan!', 'success');
        };

        // Modal and stock update handlers
        const openBookModal = (book) => {
            if (!isAdmin.value) {
                showToast('Akses Ditolak! Anda tidak memiliki izin mengedit stok.', 'error');
                return;
            }

            selectedBook.value = { ...book };
            tempQty.value = Number(book.qty !== undefined ? book.qty : 0);
            stockActionInput.value = '';
            isModalOpen.value = true;
            activeAction.value = null;
        };

        const addStock = () => {
            if (!selectedBook.value) return;
            const val = Number(stockActionInput.value) || 0;
            if (val <= 0) {
                showToast('Masukkan angka penambahan stok yang valid!', 'warning');
                return;
            }
            tempQty.value = Number(selectedBook.value.qty) + val;
            activeAction.value = 'add';
        };

        const reduceStock = () => {
            if (!selectedBook.value) return;
            const val = Number(stockActionInput.value) || 0;
            if (val <= 0) {
                showToast('Masukkan angka pengurangan stok yang valid!', 'warning');
                return;
            }
            const current = Number(selectedBook.value.qty);

            if (current - val < 0) {
                showToast('Stok tidak boleh kurang dari 0!', 'warning');
                return;
            }

            tempQty.value = current - val;
            activeAction.value = 'reduce';
        };

        const saveBookChanges = () => {
            if (!isAdmin.value) {
                showToast('Akses Ditolak!', 'error');
                return;
            }

            if (!selectedBook.value) return;

            const inputVal = Number(stockActionInput.value) || 0;

            if (inputVal > 0 && !activeAction.value) {
                showToast('Pilih aksi terlebih dahulu!', 'warning');
                return;
            }

            if (inputVal === 0 && !activeAction.value) {
                showToast('Masukkan jumlah penambahan/pengurangan stok!', 'warning');
                return;
            }

            if (activeAction.value === 'add') {
                tempQty.value = Number(selectedBook.value.qty) + inputVal;
            } else if (activeAction.value === 'reduce') {
                const newQty = Number(selectedBook.value.qty) - inputVal;
                if (newQty < 0) {
                    showToast('Stok tidak boleh kurang dari 0!', 'warning');
                    return;
                }
                tempQty.value = newQty;
            }

            const targetCode = String(selectedBook.value.itemCode).trim().toLowerCase();
            const index = stock.value.findIndex(
                item => String(item.itemCode).trim().toLowerCase() === targetCode
            );

            if (index === -1) {
                showToast('Data bahan ajar tidak ditemukan!', 'error');
                return;
            }

            stock.value[index].qty = tempQty.value;
            setStorage('stock_db', stock.value);

            isModalOpen.value = false;
            stockActionInput.value = '';
            activeAction.value = null;
            showToast('Perubahan stok berhasil disimpan!', 'success');
        };

        const closeModal = () => {
            isModalOpen.value = false;
        };

        return {
            toasts,
            removeToast,
            currentUser,
            isAdmin,
            stock,
            selectedRegion,
            selectedCategory,
            searchQuery,
            showNewForm,
            newBook,
            isModalOpen,
            selectedBook,
            stockActionInput,
            tempQty,
            activeAction,
            regionList,
            categoryList,
            availableCategories,
            filteredStock,
            isReorderFilterActive,
            reorderCount,
            sortColumn,
            sortDirection,
            toggleReorderFilter,
            resetFilters,
            handleSort,
            getSortIcon,
            toggleNewForm,
            handleRegisterBook,
            openBookModal,
            addStock,
            reduceStock,
            saveBookChanges,
            closeModal,
            goBack,
            formatPrice
        };
    }
}).mount('#app-stock');