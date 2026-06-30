// Main application orchestrator for RumiMarket POS Cloud
import { state, subscribe } from "./modules/shared/state.js";
import { initAuth, updateRoleUI } from "./modules/auth/auth.js";
import { initPOS, renderAllPOSView } from "./modules/pos/pos.js";
import { initInventory, renderInventory } from "./modules/inventory/inventory.js";
import { initBilling, renderBilling } from "./modules/billing/billing.js";
import { initReports, renderReports } from "./modules/reports/reports.js";
import { initTheme } from "./modules/theme/theme.js";

// Global DOM hooks
const $$ = (selector) => [...document.querySelectorAll(selector)];

function mount() {
  // Initialize modular controllers
  initTheme();
  
  initAuth((user) => {
    // Callback when login state changes
    updateRoleUI(user);
    if (user) {
      renderAllViews();
    }
  });

  initPOS();
  initInventory();
  initBilling();
  initReports();

  bindNavigation();
  startClock();

  // Subscribe to global state changes (re-renders views on data updates)
  subscribe(() => {
    renderAllViews();
  });

  // Initial draw
  renderAllViews();
}

function bindNavigation() {
  const tabs = $$(".nav-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetView = tab.dataset.view;
      
      // Update Tab Visual State
      tabs.forEach((t) => t.classList.toggle("active", t === tab));
      
      // Update View Visibility
      $$(".view").forEach((view) => {
        if (view.id === `${targetView}-view`) {
          view.classList.add("active");
        } else {
          view.classList.remove("active");
        }
      });

      // Render the specifically activated view
      renderViewByName(targetView);
    });
  });
}

function startClock() {
  const clockEl = document.getElementById("clock");
  const reportDateEl = document.getElementById("report-date");

  const tick = () => {
    const now = new Date();
    
    // Header clock update
    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString("es-PE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
    }

    // Reports date label update
    if (reportDateEl) {
      reportDateEl.textContent = now.toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    }
  };

  tick();
  setInterval(tick, 1000);
}

function renderViewByName(viewName) {
  if (viewName === "pos") {
    renderAllPOSView();
  } else if (viewName === "inventory") {
    renderInventory();
  } else if (viewName === "billing") {
    renderBilling();
  } else if (viewName === "reports") {
    renderReports();
  }
}

function renderAllViews() {
  renderAllPOSView();
  renderInventory();
  renderBilling();
  renderReports();
  updateAlertBadge();
}

function updateAlertBadge() {
  const alerts = state.products.filter((p) => p.stock <= p.min).length;
  const badge = document.getElementById("stock-alert-badge");
  
  if (badge) {
    badge.textContent = alerts;
    badge.classList.toggle("hidden", alerts === 0);
  }
}

// Kickstart when document is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
