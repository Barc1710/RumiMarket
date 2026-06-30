// Inventory Module: Handles stock records, profit margins, SKU generator, CSV export, and role rights
import { state, notify, money } from "../shared/state.js";
import { toast } from "../shared/ui.js";

let editingProductId = null;

export function initInventory() {
  const searchInput = document.getElementById("inventory-search");
  if (searchInput) {
    searchInput.addEventListener("input", renderInventory);
  }

  const categoryFilter = document.getElementById("inventory-filter");
  if (categoryFilter) {
    categoryFilter.addEventListener("change", renderInventory);
  }

  // Bind Open Add Modal
  const addBtn = document.getElementById("add-product-button");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      editingProductId = null;
      document.getElementById("modal-title").textContent = "Añadir producto";
      
      const form = document.getElementById("product-form");
      if (form) form.reset();
      
      // Auto-generate SKU for default category
      updateSKUField();
      updateMarginPreview();

      const dialog = document.getElementById("product-dialog");
      if (dialog) dialog.showModal();
    });
  }

  // Bind Close Add Modal
  const closeBtn = document.getElementById("close-product-dialog");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const dialog = document.getElementById("product-dialog");
      if (dialog) dialog.close();
    });
  }

  // Bind Category switch in Add Modal -> Auto updates SKU prefix
  const categorySelect = document.getElementById("new-category");
  if (categorySelect) {
    categorySelect.addEventListener("change", updateSKUField);
  }

  // Bind margin calculation live updates
  const priceInput = document.getElementById("new-price");
  const costInput = document.getElementById("new-cost");
  if (priceInput && costInput) {
    [priceInput, costInput].forEach(input => {
      input.addEventListener("input", updateMarginPreview);
    });
  }

  // Bind Save form submission
  const form = document.getElementById("product-form");
  if (form) {
    form.addEventListener("submit", saveProduct);
  }

  // Export inventory to CSV
  const exportBtn = document.getElementById("export-inventory");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const header = "SKU,Producto,Categoría,Precio Venta,Precio Costo,Stock,Stock Minimo\n";
      const rows = state.products.map(p => 
        `"${p.sku}","${p.name.replace(/"/g, '""')}","${p.category}",${p.price},${p.cost},${p.stock},${p.min}`
      ).join("\n");
      
      const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `inventario-rumi-market-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast("Inventario exportado en formato CSV");
    });
  }
}

function updateSKUField() {
  const categorySelect = document.getElementById("new-category");
  const skuInput = document.getElementById("new-sku");
  if (!categorySelect || !skuInput) return;

  const category = categorySelect.value;
  let prefix = "ABA"; // default Abarrotes
  if (category === "Bebidas") prefix = "BEB";
  else if (category === "Snacks") prefix = "SNK";
  else if (category === "Lácteos") prefix = "LAC";
  else if (category === "Limpieza") prefix = "LIM";

  const matchingProducts = state.products.filter(p => p.sku.startsWith(prefix));
  let maxNum = 0;
  matchingProducts.forEach(p => {
    const parts = p.sku.split("-");
    if (parts.length === 2) {
      const num = parseInt(parts[1], 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  });
  const count = maxNum + 1;
  skuInput.value = `${prefix}-${String(count).padStart(3, "0")}`;
}

function updateMarginPreview() {
  const priceInput = document.getElementById("new-price");
  const costInput = document.getElementById("new-cost");
  const previewDiv = document.getElementById("margin-live-preview");
  if (!priceInput || !costInput || !previewDiv) return;

  const price = Number(priceInput.value || 0);
  const cost = Number(costInput.value || 0);

  if (price <= 0) {
    previewDiv.innerHTML = `<span>Ingrese Precio de Venta para estimar márgenes</span>`;
    previewDiv.className = "margin-preview";
    return;
  }

  const profit = price - cost;
  const marginPct = (profit / price) * 100;

  if (profit < 0) {
    previewDiv.innerHTML = `<i data-lucide="alert-triangle"></i> Margen negativo: ${marginPct.toFixed(1)}% (Pérdida: ${money.format(Math.abs(profit))})`;
    previewDiv.className = "margin-preview negative";
  } else {
    previewDiv.innerHTML = `<i data-lucide="sparkles"></i> Margen estimado: ${marginPct.toFixed(1)}% (Utilidad neta: ${money.format(profit)})`;
    previewDiv.className = "margin-preview";
  }
  if (window.lucide) window.lucide.createIcons();
}

function saveProduct(event) {
  event.preventDefault();

  const name = document.getElementById("new-name").value.trim();
  const sku = document.getElementById("new-sku").value.trim();
  const category = document.getElementById("new-category").value;
  const price = Number(document.getElementById("new-price").value);
  const cost = Number(document.getElementById("new-cost").value);
  const stock = Number(document.getElementById("new-stock").value);

  // Set smart Unsplash image based on name
  let imageUrl = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80"; // Default grocery
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes("cola") || lowerName.includes("gaseosa") || lowerName.includes("soda")) {
    imageUrl = "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80";
  } else if (lowerName.includes("agua")) {
    imageUrl = "https://images.unsplash.com/photo-1548839133-9fa067ffca9f?w=400&auto=format&fit=crop&q=80";
  } else if (lowerName.includes("oreo") || lowerName.includes("galleta")) {
    imageUrl = "https://images.unsplash.com/photo-1558961317-1f198f395777?w=400&auto=format&fit=crop&q=80";
  } else if (lowerName.includes("leche") || lowerName.includes("queso")) {
    imageUrl = "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80";
  } else if (lowerName.includes("yogurt")) {
    imageUrl = "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop&q=80";
  } else if (lowerName.includes("mantequilla")) {
    imageUrl = "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&auto=format&fit=crop&q=80";
  } else if (lowerName.includes("arroz")) {
    imageUrl = "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80";
  } else if (lowerName.includes("azucar") || lowerName.includes("azúcar")) {
    imageUrl = "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&auto=format&fit=crop&q=80";
  } else if (lowerName.includes("aceite")) {
    imageUrl = "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80";
  } else if (lowerName.includes("jabon") || lowerName.includes("jabón")) {
    imageUrl = "https://images.unsplash.com/photo-1607006342456-ba2b2d3d0f7a?w=400&auto=format&fit=crop&q=80";
  } else if (lowerName.includes("detergente") || lowerName.includes("ariel")) {
    imageUrl = "https://images.unsplash.com/photo-1585830812416-a6c869e4527a?w=400&auto=format&fit=crop&q=80";
  } else if (lowerName.includes("papel") || lowerName.includes("higienico") || lowerName.includes("higiénico")) {
    imageUrl = "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80";
  }

  if (editingProductId) {
    // Edit existing product
    const product = state.products.find(p => p.id === editingProductId);
    if (product) {
      product.name = name;
      product.sku = sku;
      product.category = category;
      product.price = price;
      product.cost = cost;
      product.stock = stock;
      // Preserve old image if it wasn't renamed to change image style
      if (lowerName !== product.name.toLowerCase()) {
        product.image = imageUrl;
      }
      toast("Producto actualizado correctamente");
    }
  } else {
    // Add new product
    const newProduct = {
      id: Date.now(),
      sku,
      name,
      category,
      price,
      cost,
      stock,
      min: 6, // default alert minimum stock
      image: imageUrl
    };
    state.products.unshift(newProduct);
    toast("Producto añadido al catálogo de existencias");
  }

  notify();
  const dialog = document.getElementById("product-dialog");
  if (dialog) dialog.close();
  renderInventory();
}

export function renderInventory() {
  const tableContainer = document.getElementById("inventory-table");
  if (!tableContainer) return;

  const searchInput = document.getElementById("inventory-search");
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

  const categoryFilter = document.getElementById("inventory-filter");
  const category = categoryFilter ? categoryFilter.value : "Todos";

  const filtered = state.products.filter(product => {
    const matchCategory = category === "Todos" || product.category === category;
    const matchQuery = `${product.name} ${product.sku}`.toLowerCase().includes(query);
    return matchCategory && matchQuery;
  });

  const isCashier = state.user && state.user.role === "cashier";

  // Restricted Notice toggle
  const noticeEl = document.getElementById("restricted-notice");
  if (noticeEl) {
    noticeEl.classList.toggle("hidden", !isCashier);
  }

  const addProductBtn = document.getElementById("add-product-button");
  if (addProductBtn) {
    addProductBtn.disabled = isCashier;
  }

  tableContainer.innerHTML = filtered.map(product => {
    const low = product.stock <= product.min;
    
    return `
      <tr class="${low ? 'low-stock-row' : ''}">
        <td><strong>${product.sku}</strong></td>
        <td>
          <div style="display:flex; align-items:center; gap:8px;">
            <img src="${product.image}" style="width:30px; height:30px; object-fit:cover; border-radius:4px;" alt="${product.name}">
            <span>${product.name}</span>
          </div>
        </td>
        <td>${product.category}</td>
        <td class="money">${money.format(product.price)}</td>
        
        <!-- Cost and Margin hidden or shown based on user role rights -->
        <td>${isCashier ? '***' : money.format(product.cost)}</td>
        
        <td><strong style="color: ${low ? 'var(--danger)' : 'var(--text)'}">${product.stock} u.</strong></td>
        <td>
          <span class="status-pill ${low ? 'low' : ''}">
            ${low ? 'Bajo stock' : 'Suficiente'}
          </span>
        </td>
        <td>
          ${isCashier ? `
            <span style="font-size:11px; color:var(--muted); font-style:italic;">Solo lectura</span>
          ` : `
            <div class="action-buttons">
              <button class="btn-edit" data-edit="${product.id}" title="Editar"><i data-lucide="edit-3"></i></button>
              <button class="btn-delete" data-delete="${product.id}" title="Eliminar"><i data-lucide="trash-2"></i></button>
            </div>
          `}
        </td>
      </tr>
    `;
  }).join("");

  // Bind Actions
  if (!isCashier) {
    tableContainer.querySelectorAll("[data-edit]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.edit);
        const product = state.products.find(p => p.id === id);
        if (!product) return;

        editingProductId = id;
        document.getElementById("modal-title").textContent = "Editar producto";
        
        // Fill form fields
        document.getElementById("new-name").value = product.name;
        document.getElementById("new-sku").value = product.sku;
        document.getElementById("new-category").value = product.category;
        document.getElementById("new-price").value = product.price;
        document.getElementById("new-cost").value = product.cost;
        document.getElementById("new-stock").value = product.stock;

        updateMarginPreview();

        const dialog = document.getElementById("product-dialog");
        if (dialog) dialog.showModal();
        if (window.lucide) window.lucide.createIcons();
      });
    });

    tableContainer.querySelectorAll("[data-delete]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.delete);
        const product = state.products.find(p => p.id === id);
        if (!product) return;

        if (confirm(`¿Está seguro de eliminar ${product.name} del catálogo?`)) {
          state.products = state.products.filter(p => p.id !== id);
          state.cart = state.cart.filter(item => item.id !== id); // clear from cart if deleted
          notify();
          renderInventory();
          toast("Producto eliminado");
        }
      });
    });
  }

  // Update Inventory KPI Cards
  const totalItems = state.products.length;
  const stockAlerts = state.products.filter(p => p.stock <= p.min).length;
  
  // Cost value hidden to cashier
  let totalCostVal = "S/ ***";
  if (!isCashier) {
    const sumCost = state.products.reduce((sum, p) => sum + (p.cost * p.stock), 0);
    totalCostVal = money.format(sumCost);
  }

  const metricProducts = document.getElementById("metric-products");
  const metricAlerts = document.getElementById("metric-alerts");
  const metricValue = document.getElementById("metric-value");

  if (metricProducts) metricProducts.textContent = totalItems;
  if (metricAlerts) metricAlerts.textContent = stockAlerts;
  if (metricValue) metricValue.textContent = totalCostVal;

  if (window.lucide) window.lucide.createIcons();
}
