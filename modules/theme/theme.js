// Theme Manager (Dark/Light mode toggler)
import { state, notify } from "../shared/state.js";

export function initTheme() {
  applyTheme(state.theme);

  // Bind toggle click if toggle exists in DOM
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    // Update visual state of button
    toggleBtn.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      applyTheme(state.theme);
      notify();
    });
  }
}

export function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  updateToggleIcon(theme);
}

function updateToggleIcon(theme) {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const icon = toggleBtn.querySelector("i");
  if (icon) {
    if (theme === "dark") {
      icon.setAttribute("data-lucide", "sun");
    } else {
      icon.setAttribute("data-lucide", "moon");
    }
    // Recreate Lucide icons if available
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}
