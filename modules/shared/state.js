// State Manager for RumiMarket POS Cloud

const initialProducts = [
  { id: 1, sku: "BEB-001", name: "Inca Kola 600ml", category: "Bebidas", price: 2.5, cost: 1.45, stock: 48, min: 8, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80" },
  { id: 2, sku: "BEB-002", name: "Coca-Cola 1.5L", category: "Bebidas", price: 5.0, cost: 2.8, stock: 24, min: 7, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&auto=format&fit=crop&q=80" },
  { id: 3, sku: "BEB-003", name: "Agua San Luis 625ml", category: "Bebidas", price: 1.5, cost: 0.55, stock: 3, min: 8, image: "https://images.unsplash.com/photo-1548839133-9fa067ffca9f?w=400&auto=format&fit=crop&q=80" },
  { id: 4, sku: "BEB-004", name: "Gatorade 500ml", category: "Bebidas", price: 4.5, cost: 2.7, stock: 18, min: 6, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=80" },
  { id: 5, sku: "SNK-001", name: "Galletas Oreo 119g", category: "Snacks", price: 3.5, cost: 2.0, stock: 30, min: 8, image: "https://images.unsplash.com/photo-1558961317-1f198f395777?w=400&auto=format&fit=crop&q=80" },
  { id: 6, sku: "SNK-002", name: "Chifles Inka 90g", category: "Snacks", price: 2.0, cost: 1.1, stock: 5, min: 8, image: "https://images.unsplash.com/photo-1566478989037-eec170784d20?w=400&auto=format&fit=crop&q=80" },
  { id: 7, sku: "SNK-003", name: "Pan de Molde Bimbo", category: "Snacks", price: 6.5, cost: 4.6, stock: 12, min: 6, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80" },
  { id: 8, sku: "LAC-001", name: "Leche Gloria Evap. 400g", category: "Lácteos", price: 3.8, cost: 2.5, stock: 36, min: 10, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80" },
  { id: 9, sku: "LAC-002", name: "Yogurt Gloria 180g", category: "Lácteos", price: 2.2, cost: 1.25, stock: 20, min: 8, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop&q=80" },
  { id: 10, sku: "LAC-003", name: "Mantequilla Laive 100g", category: "Lácteos", price: 4.9, cost: 3.2, stock: 2, min: 5, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&auto=format&fit=crop&q=80" },
  { id: 11, sku: "ABA-001", name: "Arroz Costeño 1kg", category: "Abarrotes", price: 4.5, cost: 3.2, stock: 55, min: 12, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80" },
  { id: 12, sku: "ABA-002", name: "Azúcar Rubia 1kg", category: "Abarrotes", price: 3.2, cost: 2.3, stock: 40, min: 12, image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&auto=format&fit=crop&q=80" },
  { id: 13, sku: "ABA-003", name: "Aceite Primor 1L", category: "Abarrotes", price: 8.9, cost: 6.5, stock: 18, min: 7, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80" },
  { id: 14, sku: "LIM-001", name: "Jabón Camay 90g", category: "Limpieza", price: 2.5, cost: 1.35, stock: 4, min: 8, image: "https://images.unsplash.com/photo-1607006342456-ba2b2d3d0f7a?w=400&auto=format&fit=crop&q=80" },
  { id: 15, sku: "LIM-002", name: "Detergente Ariel 500g", category: "Limpieza", price: 7.5, cost: 5.4, stock: 22, min: 6, image: "https://images.unsplash.com/photo-1585830812416-a6c869e4527a?w=400&auto=format&fit=crop&q=80" },
  { id: 16, sku: "LIM-003", name: "Papel Higiénico Elite x4", category: "Limpieza", price: 6.0, cost: 4.1, stock: 28, min: 6, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80" },
];

const initialSales = [
  makeSaleSeed("B001-00234", "Boleta", "08:14", "Efectivo", 12.5, "Sincronizado", "Cliente final", "Joy Correa"),
  makeSaleSeed("B001-00235", "Boleta", "08:32", "Yape", 38.9, "Sincronizado", "Juan Pérez", "Nayeli Arevalo"),
  makeSaleSeed("F001-00089", "Factura", "09:05", "Tarjeta", 187.4, "Sincronizado", "Servicios Generales Ruiz S.A.C.", "Joy Correa", "20608754129"),
  makeSaleSeed("B001-00236", "Boleta", "09:48", "Plin", 5.0, "Sincronizado", "Cliente final", "Frank Bardalez"),
  makeSaleSeed("NV-00041", "Nota V.", "10:12", "Efectivo", 22.8, "Pendiente", "Cliente final", "Belther Rodas"),
];

function makeSaleSeed(number, type, time, method, total, status, customer = "Cliente final", cashier = "Joy Correa", customerDoc = "") {
  return {
    number,
    type,
    time,
    method,
    total,
    status,
    customer,
    customerDoc,
    cashier,
    subtotal: total / 1.18,
    tax: total - total / 1.18,
    items: [],
    createdAt: new Date().toISOString(),
    xmlHash: "a8f6d5c4b3a2e1f0...mock",
    cdrReceived: status === "Sincronizado",
  };
}

function load(key, fallback, isValid = () => true) {
  let stored = null;
  try {
    stored = localStorage.getItem(key);
    if (!stored) return fallback;

    const parsed = JSON.parse(stored);
    return isValid(parsed) ? parsed : fallback;
  } catch (error) {
    if (isValid(stored)) return stored;
    console.warn(`No se pudo cargar "${key}" desde localStorage. Se usara el valor inicial.`, error);
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`No se pudo guardar "${key}" en localStorage.`, error);
  }
}

function isProductList(value) {
  return Array.isArray(value) && value.every((product) => (
    product &&
    typeof product.id !== "undefined" &&
    typeof product.name === "string" &&
    typeof product.sku === "string" &&
    typeof product.category === "string" &&
    typeof product.price === "number" &&
    typeof product.cost === "number" &&
    typeof product.stock === "number"
  ));
}

function isSalesList(value) {
  return Array.isArray(value) && value.every((sale) => (
    sale &&
    typeof sale.number === "string" &&
    typeof sale.type === "string" &&
    typeof sale.time === "string" &&
    typeof sale.total === "number"
  ));
}

function isUser(value) {
  return value === null || (
    value &&
    typeof value.username === "string" &&
    typeof value.name === "string" &&
    (value.role === "admin" || value.role === "cashier")
  );
}

function isTheme(value) {
  return value === "light" || value === "dark";
}

export const state = {
  products: load("rumi_products", initialProducts, isProductList),
  sales: load("rumi_sales", initialSales, isSalesList),
  cart: [],
  category: "Todos",
  docType: "Boleta",
  payment: "Efectivo",
  mixed: false,
  saleFilter: "Todos",
  docFilter: "Todos",
  user: load("rumi_user", null, isUser), // null means not logged in
  theme: load("rumi_theme", "light", isTheme),
};

// Event listeners for state changes
const listeners = [];

export function subscribe(callback) {
  listeners.push(callback);
}

export function notify() {
  persist();
  listeners.forEach((callback) => callback(state));
}

export function persist() {
  save("rumi_products", JSON.stringify(state.products));
  save("rumi_sales", JSON.stringify(state.sales));
  save("rumi_user", JSON.stringify(state.user));
  save("rumi_theme", state.theme);
}

export const money = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});
