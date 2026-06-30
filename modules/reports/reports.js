// Reports Module: Handles sales statistics, hourly buckets parser, donut charts, and role privacy
import { state, notify, money } from "../shared/state.js";
import { showReceipt } from "../pos/pos.js";

const paymentColors = {
  Efectivo: "#0d9488",  // Teal
  Yape: "#8b5cf6",      // Violet
  Plin: "#3b82f6",      // Blue
  Tarjeta: "#f97316",   // Orange
  Mixto: "#64748b",     // Slate / Muted
};

export function initReports() {
  // Bind report filter switcher
  const saleFilterBtns = document.querySelectorAll("[data-sale-filter]");
  saleFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      state.saleFilter = btn.dataset.saleFilter;
      saleFilterBtns.forEach(b => b.classList.toggle("active", b === btn));
      renderReports();
    });
  });
}

export function renderReports() {
  const isCashier = state.user && state.user.role === "cashier";

  // Filter sales based on role restriction: Cashier can only see their own transactions
  let allowedSales = state.sales;
  if (isCashier) {
    const cashierName = state.user.name;
    allowedSales = state.sales.filter(s => s.cashier === cashierName);
  }

  // Filter based on selected doc category
  const filteredSales = allowedSales.filter(sale => {
    if (state.saleFilter === "Todos") return true;
    return sale.type === state.saleFilter;
  });

  // Calculate Metrics
  const totalSalesVal = filteredSales.reduce((sum, s) => sum + s.total, 0);
  const transactionsCount = filteredSales.length;
  const averageTicketVal = transactionsCount > 0 ? (totalSalesVal / transactionsCount) : 0;
  
  // Exclude IGV 18% (net income). Hide from Cashier to ensure data privacy.
  const netIncomeVal = totalSalesVal / 1.18;

  // Render KPIs
  const reportSalesEl = document.getElementById("report-sales");
  const reportTransEl = document.getElementById("report-transactions");
  const reportAvgEl = document.getElementById("report-average");
  const reportNetEl = document.getElementById("report-net");

  if (reportSalesEl) reportSalesEl.textContent = money.format(totalSalesVal);
  if (reportTransEl) reportTransEl.textContent = transactionsCount;
  if (reportAvgEl) reportAvgEl.textContent = money.format(averageTicketVal);
  
  if (reportNetEl) {
    if (isCashier) {
      reportNetEl.textContent = "S/ ***";
      reportNetEl.parentElement.querySelector("small").textContent = "Restringido para cajero";
    } else {
      reportNetEl.textContent = money.format(netIncomeVal);
      reportNetEl.parentElement.querySelector("small").textContent = "descontado IGV 18%";
    }
  }

  // Render Dynamic Charts
  renderHourlyChart(allowedSales);
  renderPaymentChart(allowedSales);

  // Render sales list table
  renderSalesTable(filteredSales);
}

function renderHourlyChart(salesList) {
  const container = document.getElementById("hourly-chart");
  if (!container) return;

  const buckets = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
  const bucketValues = Array(buckets.length).fill(0);

  // Parse transaction timestamps dynamically
  salesList.forEach(sale => {
    // Expected time format: "HH:MM" (e.g. "08:14" or "10:32")
    const hour = parseInt(sale.time.split(":")[0]);
    if (hour >= 8 && hour <= 17) {
      const idx = hour - 8;
      bucketValues[idx] += sale.total;
    }
  });

  const maxVal = Math.max(...bucketValues, 100); // minimum scale limit to avoid huge single bars

  container.innerHTML = buckets.map((label, idx) => {
    const val = bucketValues[idx];
    const pct = Math.max(4, (val / maxVal) * 100);
    return `
      <div class="bar">
        <div class="bar-fill" style="height: ${pct}%" data-tooltip="${money.format(val)}"></div>
        <small>${label}</small>
      </div>
    `;
  }).join("");
}

function renderPaymentChart(salesList) {
  const donut = document.getElementById("payment-donut");
  const legend = document.getElementById("payment-legend");
  if (!donut || !legend) return;

  const methods = ["Efectivo", "Yape", "Plin", "Tarjeta", "Mixto"];
  const totalsByMethod = methods.reduce((acc, m) => {
    acc[m] = salesList.filter(s => s.method === m).reduce((sum, s) => sum + s.total, 0);
    return acc;
  }, {});

  const totalSalesSum = Object.values(totalsByMethod).reduce((sum, val) => sum + val, 0) || 1;
  
  let startDeg = 0;
  const segments = methods.map(method => {
    const deg = (totalsByMethod[method] / totalSalesSum) * 360;
    const segment = `${paymentColors[method]} ${startDeg}deg ${startDeg + deg}deg`;
    startDeg += deg;
    return segment;
  });

  donut.style.background = `conic-gradient(${segments.join(", ")})`;

  legend.innerHTML = methods.map(method => {
    const percent = Math.round((totalsByMethod[method] / totalSalesSum) * 100);
    return `
      <div class="legend-item">
        <span class="legend-dot" style="background: ${paymentColors[method]}"></span>
        <span>${method} (${percent}%)</span>
      </div>
    `;
  }).join("");
}

function renderSalesTable(salesList) {
  const container = document.getElementById("sales-table");
  if (!container) return;

  if (salesList.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding: 40px; color: var(--muted);">
          No se registraron transacciones
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = salesList.map(sale => {
    const isSync = sale.status === "Sincronizado";
    const typeBadge = sale.type === "Factura" ? "purple" : sale.type === "Boleta" ? "blue" : "warning";
    const statusBadge = isSync ? "success" : "warning";

    return `
      <tr style="cursor: pointer;" class="clickable-sale-row" data-sale-number="${sale.number}">
        <td><strong>${sale.number}</strong></td>
        <td><span class="status-pill ${typeBadge}">${sale.type}</span></td>
        <td>${sale.time}</td>
        <td>${sale.cashier}</td>
        <td>
          <span style="display:flex; align-items:center; gap:6px;">
            <span class="legend-dot" style="background: ${paymentColors[sale.method] || '#64748b'}; width: 8px; height: 8px;"></span>
            ${sale.method}
          </span>
        </td>
        <td class="money">${money.format(sale.total)}</td>
        <td>
          <span class="status-pill ${statusBadge}">
            ${sale.status}
          </span>
        </td>
      </tr>
    `;
  }).join("");

  // Bind clicks to row to display thermal ticket receipt
  container.querySelectorAll(".clickable-sale-row").forEach(row => {
    row.addEventListener("click", () => {
      const num = row.dataset.saleNumber;
      const sale = state.sales.find(s => s.number === num);
      if (sale) showReceipt(sale);
    });
  });
}
