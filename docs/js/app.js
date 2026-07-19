
// docs/js/app.js
//
// Arys AI v1.5.1 — Main application entry point

import { CONFIG } from "./config.js";
import { initTheme } from "./themes.js";
import { initSettings } from "./settings.js";
import { initFeedback } from "./feedback.js";
import { initWelcomeScreen, showWelcomeScreen, hideWelcomeScreen } from "./welcome.js";
import { initChat, sendMessage, clearChat, toggleSidebar } from "./chat.js";
import { init3D, stop3D } from "./3d.js";
import { getStorage, setStorage } from "./utils.js";

// ============================================================
// Global state
// ============================================================
let isInitialized = false;

// ============================================================
// Initialize the application
// ============================================================
export async function initApp() {
    if (isInitialized) return;
    isInitialized = true;

    // Initialize theme
    initTheme();

    // Initialize settings
    initSettings();

    // Initialize feedback
    initFeedback();

    // Initialize welcome screen
    initWelcomeScreen(() => {
        // On welcome screen enter
        initChat();
        init3D();
    });

    // Show welcome screen
    showWelcomeScreen();

    // Check for welcome screen dismissal
    const dismissed = getStorage("arys_welcome_dismissed");
    if (dismissed) {
        hideWelcomeScreen();
        initChat();
        init3D();
    }

    // Global event listeners
    setupGlobalListeners();

    console.log(`Arys AI v${CONFIG.version} initialized`);
}

// ============================================================
// Setup global event listeners (only non-module-specific ones)
// ============================================================
function setupGlobalListeners() {
    // Close modals on Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAllModals();
        }
    });

    // Window resize - trigger resize for 3D
    window.addEventListener("resize", debounce(() => {
        window.dispatchEvent(new Event("resize"));
    }, 250));

    // Visibility change - pause 3D when tab hidden
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stop3D();
        } else {
            init3D();
        }
    });
}

// ============================================================
// Toast notifications (global utility)
// ============================================================
function showToast(message, type = "success") {
    const container = document.getElementById("toast-container") || createToastContainer();
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Close">&times;</button>
    `;

    toast.querySelector(".toast-close").addEventListener("click", () => toast.remove());
    container.appendChild(toast);

    // Auto remove
    setTimeout(() => toast.remove(), 4000);

    return toast;
}

function createToastContainer() {
    const container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
    return container;
}

function closeAllModals() {
    const modals = document.querySelectorAll(".modal-overlay.active");
    modals.forEach((modal) => {
        modal.classList.remove("active");
    });
    document.body.style.overflow = "";
}

// ============================================================
// Debounce helper
// ============================================================
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// ============================================================
// Export for global access
// ============================================================
window.ArysAI = {
    initApp,
    sendMessage,
    clearChat,
    toggleSidebar,
    showToast,
    version: CONFIG.version,
};

// ============================================================
// Auto-initialize on DOM ready
// ============================================================
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}
