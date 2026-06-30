// Billing Module: Handles invoice history records, SUNAT XML generation, CDR receipts, and cloud sync loops
import { state, notify, money } from "../shared/state.js";
import { toast } from "../shared/ui.js";
import { showReceipt } from "../pos/pos.js";

export function initBilling() {
  // Bind sync button
  const syncBtn = document.getElementById("sync-sunat");
  if (syncBtn) {
    syncBtn.addEventListener("click", () => {
      runSunatSync();
    });
  }

  // Bind filter switcher buttons
  const docFilterBtns = document.querySelectorAll("[data-doc-filter]");
  docFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      state.docFilter = btn.dataset.docFilter;
      docFilterBtns.forEach(b => b.classList.toggle("active", b === btn));
      renderBilling();
    });
  });
}

function runSunatSync() {
  const syncBtn = document.getElementById("sync-sunat");
  if (!syncBtn || syncBtn.classList.contains("loading")) return;

  const pendingCount = state.sales.filter(s => s.status === "Pendiente").length;
  if (pendingCount === 0) {
    toast("No hay comprobantes pendientes por sincronizar", "info");
    return;
  }

  // Visual loader
  syncBtn.classList.add("loading");
  syncBtn.disabled = true;
  syncBtn.innerHTML = `<i data-lucide="refresh-cw" class="animate-spin"></i> Sincronizando...`;
  if (window.lucide) window.lucide.createIcons();

  // Create progress bar dynamically in sync panel if not exists
  let progBar = document.getElementById("sync-progress-bar-el");
  if (!progBar) {
    const parent = document.querySelector(".sync-panel-content");
    progBar = document.createElement("div");
    progBar.id = "sync-progress-bar-el";
    progBar.className = "sync-progress-bar";
    progBar.innerHTML = `<div id="sync-progress-fill-el" class="sync-progress-fill"></div>`;
    parent.appendChild(progBar);
  }

  const fill = document.getElementById("sync-progress-fill-el");
  let width = 0;
  
  const interval = setInterval(() => {
    width += 5;
    if (fill) fill.style.width = `${width}%`;
    
    if (width >= 100) {
      clearInterval(interval);
      
      // Update state
      state.sales = state.sales.map(sale => {
        if (sale.status === "Pendiente") {
          return {
            ...sale,
            status: "Sincronizado",
            cdrReceived: true
          };
        }
        return sale;
      });

      notify();
      renderBilling();
      
      // Reset button
      syncBtn.classList.remove("loading");
      syncBtn.disabled = false;
      syncBtn.innerHTML = `<i data-lucide="refresh-cw"></i> Sincronizar pendientes`;
      
      if (progBar) progBar.remove();
      toast(`Sincronización completa. ${pendingCount} comprobantes enviados a SUNAT.`, "success");
      
      if (window.lucide) window.lucide.createIcons();
    }
  }, 75);
}

export function renderBilling() {
  const tableContainer = document.getElementById("billing-table");
  if (!tableContainer) return;

  const filtered = state.sales.filter(sale => {
    if (state.docFilter === "Todos") return true;
    return sale.type === state.docFilter;
  });

  if (filtered.length === 0) {
    tableContainer.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding: 40px; color: var(--muted);">
          No hay comprobantes para esta categoría
        </td>
      </tr>
    `;
    updateKPIs();
    return;
  }

  tableContainer.innerHTML = filtered.map(sale => {
    const isSync = sale.status === "Sincronizado";
    const badgeClass = isSync ? "success" : "warning";
    const typeBadge = sale.type === "Factura" ? "purple" : sale.type === "Boleta" ? "blue" : "warning";

    return `
      <tr>
        <td><strong>${sale.number}</strong></td>
        <td><span class="status-pill ${typeBadge}">${sale.type}</span></td>
        <td>
          <div style="display:flex; flex-direction:column;">
            <span>${sale.customer}</span>
            ${sale.customerDoc ? `<small style="font-size:11px; color:var(--muted);">${sale.customerDoc}</small>` : ""}
          </div>
        </td>
        <td>${sale.time}</td>
        <td class="money">${money.format(sale.total)}</td>
        <td>
          <span class="status-pill ${badgeClass}">
            <i data-lucide="${isSync ? 'check-circle' : 'alert-circle'}" style="width:14px; height:14px;"></i>
            ${sale.status}
          </span>
        </td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="receipt-action-btn" data-view-receipt="${sale.number}" title="Ver Comprobante">
              <i data-lucide="eye"></i>
            </button>
            <button class="download-xml-btn" data-download-xml="${sale.number}" title="Descargar XML">
              <i data-lucide="file-code"></i>
            </button>
            <button class="download-cdr-btn" data-download-cdr="${sale.number}" ${!sale.cdrReceived ? 'disabled' : ''} title="Descargar Constancia CDR">
              <i data-lucide="file-check-2"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  // Bind Actions
  tableContainer.querySelectorAll("[data-view-receipt]").forEach(btn => {
    btn.addEventListener("click", () => {
      const num = btn.dataset.viewReceipt;
      const sale = state.sales.find(s => s.number === num);
      if (sale) showReceipt(sale);
    });
  });

  tableContainer.querySelectorAll("[data-download-xml]").forEach(btn => {
    btn.addEventListener("click", () => {
      const num = btn.dataset.downloadXml;
      toast(`Descargando XML: ${num}.xml (Simulado)`);
      mockFileDownload(`${num}.xml`, `<?xml version="1.0" encoding="UTF-8"?><Invoice><cbc:ID>${num}</cbc:ID></Invoice>`);
    });
  });

  tableContainer.querySelectorAll("[data-download-cdr]").forEach(btn => {
    btn.addEventListener("click", () => {
      const num = btn.dataset.downloadCdr;
      toast(`Descargando CDR: R-${num}.zip (Simulado)`);
      mockFileDownload(`R-${num}.xml`, `<?xml version="1.0"?><ApplicationResponse><cbc:ResponseCode>0</cbc:ResponseCode><cbc:Description>La Boleta/Factura numero ${num} ha sido aceptada</cbc:Description></ApplicationResponse>`);
    });
  });

  updateKPIs();
  if (window.lucide) window.lucide.createIcons();
}

function updateKPIs() {
  const metricDocs = document.getElementById("metric-documents");
  const metricBoletas = document.getElementById("metric-boletas");
  const metricFacturas = document.getElementById("metric-facturas");
  const metricPending = document.getElementById("metric-pending");

  if (metricDocs) metricDocs.textContent = state.sales.length;
  if (metricBoletas) metricBoletas.textContent = state.sales.filter(s => s.type === "Boleta").length;
  if (metricFacturas) metricFacturas.textContent = state.sales.filter(s => s.type === "Factura").length;
  
  const pendingCount = state.sales.filter(s => s.status === "Pendiente").length;
  if (metricPending) metricPending.textContent = pendingCount;
  
  // Highlight pending KPI card if there are pending docs
  const pendingCard = document.getElementById("metric-pending-card");
  if (pendingCard) {
    if (pendingCount > 0) {
      pendingCard.classList.add("danger");
      pendingCard.classList.remove("warning");
    } else {
      pendingCard.classList.remove("danger");
      pendingCard.classList.add("success");
    }
  }
}

function mockFileDownload(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
