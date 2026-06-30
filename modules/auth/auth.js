// Auth Module: Handles Login/Logout and User Roles
import { state, notify } from "../shared/state.js";
import { toast } from "../shared/ui.js";

const demoUsers = {
  joy: { password: "123", user: { username: "joy", name: "Joy Correa", role: "admin" } },
  frank: { password: "123", user: { username: "frank", name: "Frank Bardalez", role: "cashier" } },
  belther: { password: "123", user: { username: "belther", name: "Belther Rodas", role: "cashier" } },
  nayeli: { password: "123", user: { username: "nayeli", name: "Nayeli Arevalo", role: "cashier" } },
  ariana: { password: "123", user: { username: "ariana", name: "Ariana Rosales", role: "cashier" } },
  admin: { password: "admin", user: { username: "admin", name: "Admin (Fallback)", role: "admin" } },
};

export function initAuth(onLoginChange) {
  // Bind Password Visibility Toggle
  const togglePwdBtn = document.getElementById("toggle-password-btn");
  if (togglePwdBtn) {
    togglePwdBtn.addEventListener("click", () => {
      const pwdInput = document.getElementById("login-password");
      const icon = document.getElementById("toggle-password-icon");
      if (pwdInput && icon) {
        if (pwdInput.type === "password") {
          pwdInput.type = "text";
          icon.setAttribute("data-lucide", "eye-off");
        } else {
          pwdInput.type = "password";
          icon.setAttribute("data-lucide", "eye");
        }
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  function performLogin(username, password) {
    const normalizedUsername = username.trim().toLowerCase();
    const account = demoUsers[normalizedUsername];

    if (!account || account.password !== password) {
      toast("Credenciales inválidas. Use los botones de acceso rápido.", "danger");
      return;
    }

    const user = { ...account.user };
    state.user = user;
    notify();
    
    // Clear forms
    const usernameInput = document.getElementById("login-user");
    const passwordInput = document.getElementById("login-password");
    if (usernameInput) usernameInput.value = "";
    if (passwordInput) passwordInput.value = "";

    toast(`Sesión iniciada como ${user.role === "admin" ? "Administrador" : "Cajero"}`);
    if (onLoginChange) onLoginChange(user);
  }

  // Bind Login Form Submission
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const usernameInput = document.getElementById("login-user");
      const passwordInput = document.getElementById("login-password");

      if (!usernameInput || !passwordInput) {
        toast("No se pudo leer el formulario de acceso. Recargue la pagina.", "danger");
        return;
      }
      
      const username = usernameInput.value;
      const password = passwordInput.value;
      
      performLogin(username, password);
    });
  }

  // Bind Quick Login Autofill Clicks (Event Delegation)
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".quick-login-card");
    if (!card) return;
    
    e.preventDefault();
    const u = card.getAttribute("data-fill-user");
    const p = card.getAttribute("data-fill-pass");
    
    const usernameInput = document.getElementById("login-user");
    const passwordInput = document.getElementById("login-password");
    
    if (u && p && usernameInput && passwordInput) {
      usernameInput.value = u;
      passwordInput.value = p;
      
      // Efecto visual inmediato
      card.style.transform = "scale(0.95)";
      setTimeout(() => {
        card.style.transform = "";
        // Login directo saltando formulario
        performLogin(u, p);
      }, 150);
    } else if (u && p) {
      performLogin(u, p);
    }
  });

  // Bind Logout
  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      state.user = null;
      state.cart = []; // clear cart on logout
      notify();
      toast("Sesión cerrada correctamente", "info");
      if (onLoginChange) onLoginChange(null);
    });
  }

  // Initial State Check
  if (state.user) {
    if (onLoginChange) onLoginChange(state.user);
  }
}

// Update UI based on active user role
export function updateRoleUI(user) {
  const loginView = document.getElementById("login-view");
  const appView = document.getElementById("app-view");
  const userTag = document.getElementById("user-profile-tag");
  const adminOnlyElements = document.querySelectorAll(".admin-only");

  if (!loginView || !appView) return;

  if (user) {
    loginView.classList.add("hidden");
    appView.classList.remove("hidden");

    if (userTag) {
      userTag.innerHTML = `
        <span class="user-role-badge ${user.role === 'admin' ? 'admin' : 'cashier'}">
          ${user.role === 'admin' ? 'Admin' : 'Cajero'}
        </span>
        <strong>${user.name}</strong>
      `;
    }

    // Toggle admin-only elements visibility
    adminOnlyElements.forEach(el => {
      if (user.role === "admin") {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    });

  } else {
    appView.classList.add("hidden");
    loginView.classList.remove("hidden");
  }
}
