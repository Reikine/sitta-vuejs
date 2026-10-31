const { ref } = Vue;

// composables/useToast.js
export function useToast() {
    const toasts = ref([]);

    // Default duration = 3000 (3 detik hilang otomatis)
    const showToast = (message, type = 'info', duration = 3000) => {
        const id = Date.now();
        toasts.value.push({ id, message, type });

        // Jika duration > 0, otomatis hilang setelah durasi tersebut
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    };

    const removeToast = (id) => {
        toasts.value = toasts.value.filter(t => t.id !== id);
    };

    return { toasts, showToast, removeToast };
}