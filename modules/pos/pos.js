// POS Module: Handles sales catalog, cart logic, mixed payments, and checkout
import { state, notify, money } from "../shared/state.js";
import { toast, simulateBarcodeScan, generateBarcode } from "../shared/ui.js";

const productIcons = {
  Bebidas: "cup-soda",
  Snacks: "cookie",
  Lácteos: "milk",
  Abarrotes: "wheat",
  Limpieza: "spray-can",
};

const paymentIcons = {
  Efectivo: "banknote",
  Yape: "smartphone",
  Plin: "scan-line",
  Tarjeta: "credit-card",
};

export function initPOS() {
  // Bind search and filter
  const searchInput = document.getElementById("product-search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderProducts();
    });
  }

  // Bind barcode scanner simulator button
  const scanBtn = document.getElementById("barcode-scanner-simulator");
  if (scanBtn) {
    scanBtn.addEventListener("click", () => {
      // Pick a random available product
      const available = state.products.filter(p => p.stock > 0);
      if (available.length === 0) {
        toast("No hay productos con stock disponible para escanear.", "warning");
        return;
      }
      const randomProduct = available[Math.floor(Math.random() * available.length)];
      
      // Simulate scan sound and action
      simulateBarcodeScan(() => {
        addToCart(randomProduct.id);
        toast(`Escaneado: ${randomProduct.name} (SKU: ${randomProduct.sku})`, "info");
      });
    });
  }

  // Bind toggle cart panel
  const toggleCartBtn = document.getElementById("toggle-cart-btn");
  const posView = document.getElementById("pos-view");
  const toggleCartText = document.getElementById("toggle-cart-text");
  const toggleCartIcon = toggleCartBtn ? toggleCartBtn.querySelector("i") : null;

  if (toggleCartBtn && posView) {
    toggleCartBtn.addEventListener("click", () => {
      const isCollapsed = posView.classList.toggle("cart-collapsed");
      if (isCollapsed) {
        if (toggleCartText) toggleCartText.textContent = "Mostrar Carrito";
        if (toggleCartIcon) toggleCartIcon.setAttribute("data-lucide", "shopping-cart");
      } else {
        if (toggleCartText) toggleCartText.textContent = "Ocultar Carrito";
        if (toggleCartIcon) toggleCartIcon.setAttribute("data-lucide", "sidebar");
      }
      if (window.lucide) window.lucide.createIcons();
    });
  }

  // Bind document switcher buttons
  const docBtns = document.querySelectorAll("[data-document]");
  docBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      state.docType = btn.dataset.document;
      docBtns.forEach(b => b.classList.toggle("active", b === btn));
      
      const customerFields = document.getElementById("customer-fields");
      if (customerFields) {
        customerFields.classList.toggle("hidden", state.docType !== "Factura" && state.docType !== "Nota V.");
      }
      renderCart();
    });
  });

  // Bind auto-fill for customer doc
  const customerDoc = document.getElementById("customer-doc");
  const customerName = document.getElementById("customer-name");
  if (customerDoc && customerName) {
    customerDoc.addEventListener("input", (e) => {
      const val = e.target.value.trim();
      if (val.length === 8) {
        // Mock DNI query
        customerName.value = "Juan Pérez Vasquez";
        toast("DNI verificado con RENIEC (Simulado)");
      } else if (val.length === 11) {
        // Mock RUC query
        customerName.value = "Distribuciones Tarapoto S.A.C.";
        toast("RUC verificado con SUNAT (Simulado)");
      }
    });
  }

  // Bind Mixed Payment toggle switch
  const mixedToggle = document.getElementById("mixed-toggle");
  if (mixedToggle) {
    mixedToggle.addEventListener("change", (event) => {
      state.mixed = event.target.checked;
      renderCart();
    });
  }

  // Bind confirm checkout
  const confirmBtn = document.getElementById("confirm-sale");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", confirmSale);
  }

  // Bind close receipt dialog
  const closeReceiptBtn = document.getElementById("close-receipt");
  if (closeReceiptBtn) {
    closeReceiptBtn.addEventListener("click", () => {
      const dialog = document.getElementById("receipt-dialog");
      if (dialog) dialog.close();
    });
  }

  // Bind print receipt
  const printReceiptBtn = document.getElementById("print-receipt");
  if (printReceiptBtn) {
    printReceiptBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

export function renderCategories() {
  const container = document.getElementById("category-tabs");
  if (!container) return;

  const categories = ["Todos", ...new Set(state.products.map(p => p.category))];
  
  container.innerHTML = categories.map(cat => `
    <button class="chip ${cat === state.category ? 'active' : ''}" data-category="${cat}">
      ${cat}
    </button>
  `).join("");

  container.querySelectorAll(".chip").forEach(button => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      renderCategories();
      renderProducts();
    });
  });
}

export function renderProducts() {
  const container = document.getElementById("product-grid");
  if (!container) return;

  const searchInput = document.getElementById("product-search");
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

  const filtered = state.products.filter(product => {
    const matchCategory = state.category === "Todos" || product.category === state.category;
    const matchQuery = `${product.name} ${product.sku}`.toLowerCase().includes(query);
    return matchCategory && matchQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i data-lucide="search-x"></i>
        <strong>No se encontraron productos</strong>
        <p>Intente con otro término o categoría.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(product => {
    const low = product.stock <= product.min;
    const inCart = state.cart.some(item => item.id === product.id);
    const hasStock = product.stock > 0;
    
    // Status text for badge
    let stockClass = "";
    let stockText = `${product.stock} u.`;
    if (!hasStock) {
      stockClass = "empty";
      stockText = "Sin stock";
    } else if (low) {
      stockClass = "low";
      stockText = `Bajo stock: ${product.stock}`;
    }

    return `
      <button class="product-card ${inCart ? 'selected' : ''}" data-product="${product.id}" ${!hasStock ? 'disabled' : ''}>
        <span class="stock-badge ${stockClass}">${stockText}</span>
        <div class="product-img-wrapper">
          <img class="product-img" src="${product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80'}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80'">
        </div>
        <div class="product-info-box">
          <div>
            <h3>${product.name}</h3>
            <small>${product.sku}</small>
          </div>
          <div class="product-footer">
            <span class="product-icon"><i data-lucide="${productIcons[product.category] || 'package'}"></i></span>
            <strong class="product-price">${money.format(product.price)}</strong>
          </div>
        </div>
      </button>
    `;
  }).join("");

  container.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      addToCart(Number(card.dataset.product));
    });
  });

  if (window.lucide) window.lucide.createIcons();
}

export function addToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product || product.stock <= 0) return;

  const cartItem = state.cart.find(item => item.id === productId);
  const currentQty = cartItem ? cartItem.qty : 0;

  if (currentQty >= product.stock) {
    toast(`Stock máximo disponible alcanzado (${product.stock} u.)`, "warning");
    return;
  }

  if (cartItem) {
    cartItem.qty += 1;
  } else {
    state.cart.push({ id: productId, qty: 1 });
  }

  renderCart();
  renderProducts();
}

function updateQty(productId, delta) {
  const product = state.products.find(p => p.id === productId);
  const cartItem = state.cart.find(item => item.id === productId);
  if (!cartItem || !product) return;

  cartItem.qty += delta;
  
  if (cartItem.qty <= 0) {
    state.cart = state.cart.filter(item => item.id !== productId);
  } else if (cartItem.qty > product.stock) {
    cartItem.qty = product.stock;
    toast(`Se ajustó la cantidad al stock máximo disponible (${product.stock} u.)`, "warning");
  }

  renderCart();
  renderProducts();
}

function totals() {
  const total = state.cart.reduce((sum, item) => {
    const product = state.products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
  const subtotal = total / 1.18;
  return {
    total,
    subtotal,
    tax: total - subtotal
  };
}

export function renderCart() {
  const { total, subtotal, tax } = totals();
  
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) cartCountEl.textContent = state.cart.reduce((sum, item) => sum + item.qty, 0);

  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const totalEl = document.getElementById("total");

  if (subtotalEl) subtotalEl.textContent = money.format(subtotal);
  if (taxEl) taxEl.textContent = money.format(tax);
  if (totalEl) totalEl.textContent = money.format(total);

  const cartListContainer = document.getElementById("cart-list");
  if (!cartListContainer) return;

  if (state.cart.length === 0) {
    cartListContainer.innerHTML = `
      <div class="empty-state">
        <i data-lucide="shopping-basket"></i>
        <strong>Carrito vacío</strong>
        <p>Añada productos desde el catálogo para iniciar una venta.</p>
      </div>
    `;
    const confirmBtn = document.getElementById("confirm-sale");
    if (confirmBtn) confirmBtn.disabled = true;
    renderPayments(0);
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  cartListContainer.innerHTML = state.cart.map(item => {
    const product = state.products.find(p => p.id === item.id);
    if (!product) return "";
    
    return `
      <article class="cart-item">
        <div class="cart-item-top">
          <div>
            <span class="cart-item-name">${product.name}</span>
            <div class="cart-item-meta">${money.format(product.price)} c/u</div>
          </div>
          <button class="delete-cart-item" data-remove="${product.id}" aria-label="Quitar del carrito">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
        <div class="cart-controls">
          <div class="qty-controls">
            <button class="qty-btn" data-dec="${product.id}"><i data-lucide="minus"></i></button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" data-inc="${product.id}"><i data-lucide="plus"></i></button>
          </div>
          <strong class="line-total">${money.format(product.price * item.qty)}</strong>
        </div>
      </article>
    `;
  }).join("");

  // Bind buttons
  cartListContainer.querySelectorAll("[data-dec]").forEach(btn => {
    btn.addEventListener("click", () => updateQty(Number(btn.dataset.dec), -1));
  });
  cartListContainer.querySelectorAll("[data-inc]").forEach(btn => {
    btn.addEventListener("click", () => updateQty(Number(btn.dataset.inc), 1));
  });
  cartListContainer.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.cart = state.cart.filter(item => item.id !== Number(btn.dataset.remove));
      renderCart();
      renderProducts();
    });
  });

  renderPayments(total);
  validateCheckout(total);
  if (window.lucide) window.lucide.createIcons();
}

function renderPayments(total) {
  const container = document.getElementById("payment-methods");
  if (!container) return;

  const methods = Object.keys(paymentIcons);
  container.innerHTML = methods.map(method => `
    <button class="payment-btn ${state.payment === method ? 'active' : ''}" data-payment="${method}">
      <i data-lucide="${paymentIcons[method]}"></i>
      <span>${method}</span>
    </button>
  `).join("");

  container.querySelectorAll(".payment-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.payment = btn.dataset.payment;
      renderCart();
    });
  });

  const mixedInputsContainer = document.getElementById("mixed-payments");
  if (!mixedInputsContainer) return;

  mixedInputsContainer.classList.toggle("hidden", !state.mixed);
  
  if (state.mixed) {
    const half = (total / 2).toFixed(2);
    mixedInputsContainer.innerHTML = `
      <div class="mixed-inputs">
        <div class="mixed-row">
          <span>Efectivo S/</span>
          <input id="mixed-cash" type="number" min="0" step="0.10" value="${half}">
        </div>
        <div class="mixed-row">
          <span>Yape/Plin S/</span>
          <input id="mixed-digital" type="number" min="0" step="0.10" value="${(total - half).toFixed(2)}">
        </div>
        <div class="mixed-row">
          <span>Cód. Oper.</span>
          <input id="operation-code" placeholder="Ej: YP-128475" type="text">
        </div>
      </div>
    `;

    // Bind verification
    const cashInput = document.getElementById("mixed-cash");
    const digitalInput = document.getElementById("mixed-digital");
    [cashInput, digitalInput].forEach(inp => {
      if (inp) {
        inp.addEventListener("input", () => validateCheckout(total));
      }
    });
  } else {
    mixedInputsContainer.innerHTML = "";
  }
}

function validateCheckout(total) {
  const confirmBtn = document.getElementById("confirm-sale");
  if (!confirmBtn) return;

  if (total <= 0) {
    confirmBtn.disabled = true;
    return;
  }

  // Check customer doc if Invoice is selected
  if (state.docType === "Factura") {
    const rucInput = document.getElementById("customer-doc");
    if (!rucInput || rucInput.value.trim().length !== 11) {
      confirmBtn.disabled = true;
      return;
    }
  }

  if (state.mixed) {
    const cashVal = Number(document.getElementById("mixed-cash")?.value || 0);
    const digitalVal = Number(document.getElementById("mixed-digital")?.value || 0);
    const diff = Math.abs((cashVal + digitalVal) - total);
    
    // Allow 0.02 rounding error
    if (diff > 0.02) {
      confirmBtn.disabled = true;
      return;
    }
  }

  confirmBtn.disabled = false;
}

function confirmSale() {
  const { total, subtotal, tax } = totals();
  if (total <= 0) return;

  // Validation checks
  const customerNameInput = document.getElementById("customer-name");
  const customerDocInput = document.getElementById("customer-doc");
  const customerName = customerNameInput ? customerNameInput.value.trim() : "Cliente final";
  const customerDoc = customerDocInput ? customerDocInput.value.trim() : "";

  if (state.docType === "Factura" && customerDoc.length !== 11) {
    toast("Debe ingresar un RUC de 11 dígitos para emitir una Factura", "danger");
    return;
  }

  let finalPaymentMethod = state.payment;
  let operationCode = "";
  
  if (state.mixed) {
    finalPaymentMethod = "Mixto";
    const opCodeInput = document.getElementById("operation-code");
    operationCode = opCodeInput ? opCodeInput.value.trim() : "";
    if (!operationCode) {
      // auto-fill operation code if empty just for convenience
      operationCode = "YP-" + Math.floor(100000 + Math.random() * 900000);
    }
  }

  // Subtract stocks
  state.cart.forEach(item => {
    const product = state.products.find(p => p.id === item.id);
    if (product) {
      product.stock -= item.qty;
    }
  });

  // Calculate invoice number prefix
  const prefix = state.docType === "Factura" ? "F001" : state.docType === "Nota V." ? "NV" : "B001";
  const matchingSales = state.sales.filter(s => s.number.startsWith(prefix));
  const newNum = matchingSales.length + 241;
  const number = `${prefix}-${String(newNum).padStart(5, "0")}`;

  // Time formatting
  const now = new Date();
  const timeStr = now.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });

  const saleItems = state.cart.map(item => {
    const product = state.products.find(p => p.id === item.id);
    return {
      sku: product.sku,
      name: product.name,
      qty: item.qty,
      price: product.price,
      total: product.price * item.qty
    };
  });

  // Create XML hash & check CDR SUNAT (85% success simulation)
  const isSincronizado = Math.random() > 0.15;
  const hashBytes = new Uint8Array(16);
  window.crypto.getRandomValues(hashBytes);
  const xmlHash = Array.from(hashBytes).map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 20) + "...xml";

  const newSale = {
    number,
    type: state.docType,
    time: timeStr,
    method: finalPaymentMethod,
    total,
    subtotal,
    tax,
    status: isSincronizado ? "Sincronizado" : "Pendiente",
    customer: customerName || "Cliente final",
    customerDoc: customerDoc,
    cashier: state.user ? state.user.name : "Joy Correa",
    items: saleItems,
    createdAt: now.toISOString(),
    xmlHash: xmlHash,
    cdrReceived: isSincronizado,
    operationCode: operationCode
  };

  // Prepend to sales list
  state.sales.unshift(newSale);
  
  // Clear cart & input fields
  state.cart = [];
  state.mixed = false;
  
  const mixedToggle = document.getElementById("mixed-toggle");
  if (mixedToggle) mixedToggle.checked = false;

  if (customerNameInput) customerNameInput.value = "";
  if (customerDocInput) customerDocInput.value = "";

  notify();
  
  // Render updates
  renderAllPOSView();
  showReceipt(newSale);
  toast(`Comprobante ${number} emitido. SUNAT: ${newSale.status}`, "success");
}

export function showReceipt(sale) {
  const container = document.getElementById("receipt-content");
  if (!container) return;

  const itemsHtml = sale.items.map(item => `
    <tr>
      <td>${item.qty} x ${item.name.substring(0, 18)}</td>
      <td style="text-align: right;">${money.format(item.total)}</td>
    </tr>
  `).join("");

  container.innerHTML = `
    <div class="receipt">
      <div class="receipt-header">
        <h2>RUMI MARKET</h2>
        <small>De: Frank Bardalez V.</small><br>
        <small>Jr. Bolognesi 1455 - Tarapoto</small><br>
        <small>RUC: 10459871231</small>
      </div>
      
      <div class="receipt-divider"></div>
      
      <div>
        <strong>COMPROBANTE: ${sale.number}</strong><br>
        <span>Fecha: ${new Date(sale.createdAt).toLocaleDateString()}</span><br>
        <span>Hora: ${sale.time}</span><br>
        <span>Cajero: ${sale.cashier}</span><br>
        <span>Cliente: ${sale.customer}</span><br>
        ${sale.customerDoc ? `<span>Doc: ${sale.customerDoc}</span><br>` : ""}
        <span>Pago: ${sale.method} ${sale.operationCode ? `(${sale.operationCode})` : ""}</span>
      </div>
      
      <div class="receipt-divider"></div>
      
      <table class="receipt-items-table">
        <thead>
          <tr>
            <th style="text-align: left;">Descrip.</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml.length > 0 ? itemsHtml : `<tr><td colspan="2" style="text-align:center;">Venta de importes manuales</td></tr>`}
        </tbody>
      </table>
      
      <div class="receipt-divider"></div>
      
      <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-end;">
        <div>Subtotal: <strong>${money.format(sale.subtotal)}</strong></div>
        <div>IGV (18%): <strong>${money.format(sale.tax)}</strong></div>
        <div style="font-size: 14px;">TOTAL: <strong>${money.format(sale.total)}</strong></div>
      </div>
      
      <div class="receipt-divider"></div>
      
      <div class="receipt-qr-hash">
        <!-- Mock QR Code generator from sunat link -->
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=RumiMarket|${sale.type}|${sale.number}|${sale.tax.toFixed(2)}|${sale.total.toFixed(2)}|${sale.createdAt}" alt="QR Comprobante">
        <small>HASH XML: ${sale.xmlHash}</small>
        <small style="margin-top: 4px;">Representación impresa de la ${sale.type} Electrónica.</small>
      </div>
    </div>
  `;

  const dialog = document.getElementById("receipt-dialog");
  if (dialog) dialog.showModal();
}

export function renderAllPOSView() {
  renderCategories();
  renderProducts();
  renderCart();
}
