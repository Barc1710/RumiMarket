(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}})();const ne=[{id:1,sku:"BEB-001",name:"Inca Kola 600ml",category:"Bebidas",price:2.5,cost:1.45,stock:48,min:8,image:"https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80"},{id:2,sku:"BEB-002",name:"Coca-Cola 1.5L",category:"Bebidas",price:5,cost:2.8,stock:24,min:7,image:"https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&auto=format&fit=crop&q=80"},{id:3,sku:"BEB-003",name:"Agua San Luis 625ml",category:"Bebidas",price:1.5,cost:.55,stock:3,min:8,image:"https://images.unsplash.com/photo-1548839133-9fa067ffca9f?w=400&auto=format&fit=crop&q=80"},{id:4,sku:"BEB-004",name:"Gatorade 500ml",category:"Bebidas",price:4.5,cost:2.7,stock:18,min:6,image:"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=80"},{id:5,sku:"SNK-001",name:"Galletas Oreo 119g",category:"Snacks",price:3.5,cost:2,stock:30,min:8,image:"https://images.unsplash.com/photo-1558961317-1f198f395777?w=400&auto=format&fit=crop&q=80"},{id:6,sku:"SNK-002",name:"Chifles Inka 90g",category:"Snacks",price:2,cost:1.1,stock:5,min:8,image:"https://images.unsplash.com/photo-1566478989037-eec170784d20?w=400&auto=format&fit=crop&q=80"},{id:7,sku:"SNK-003",name:"Pan de Molde Bimbo",category:"Snacks",price:6.5,cost:4.6,stock:12,min:6,image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80"},{id:8,sku:"LAC-001",name:"Leche Gloria Evap. 400g",category:"Lácteos",price:3.8,cost:2.5,stock:36,min:10,image:"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80"},{id:9,sku:"LAC-002",name:"Yogurt Gloria 180g",category:"Lácteos",price:2.2,cost:1.25,stock:20,min:8,image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop&q=80"},{id:10,sku:"LAC-003",name:"Mantequilla Laive 100g",category:"Lácteos",price:4.9,cost:3.2,stock:2,min:5,image:"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&auto=format&fit=crop&q=80"},{id:11,sku:"ABA-001",name:"Arroz Costeño 1kg",category:"Abarrotes",price:4.5,cost:3.2,stock:55,min:12,image:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80"},{id:12,sku:"ABA-002",name:"Azúcar Rubia 1kg",category:"Abarrotes",price:3.2,cost:2.3,stock:40,min:12,image:"https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&auto=format&fit=crop&q=80"},{id:13,sku:"ABA-003",name:"Aceite Primor 1L",category:"Abarrotes",price:8.9,cost:6.5,stock:18,min:7,image:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80"},{id:14,sku:"LIM-001",name:"Jabón Camay 90g",category:"Limpieza",price:2.5,cost:1.35,stock:4,min:8,image:"https://images.unsplash.com/photo-1607006342456-ba2b2d3d0f7a?w=400&auto=format&fit=crop&q=80"},{id:15,sku:"LIM-002",name:"Detergente Ariel 500g",category:"Limpieza",price:7.5,cost:5.4,stock:22,min:6,image:"https://images.unsplash.com/photo-1585830812416-a6c869e4527a?w=400&auto=format&fit=crop&q=80"},{id:16,sku:"LIM-003",name:"Papel Higiénico Elite x4",category:"Limpieza",price:6,cost:4.1,stock:28,min:6,image:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80"}],oe=[C("B001-00234","Boleta","08:14","Efectivo",12.5,"Sincronizado","Cliente final","Joy Correa"),C("B001-00235","Boleta","08:32","Yape",38.9,"Sincronizado","Juan Pérez","Nayeli Arevalo"),C("F001-00089","Factura","09:05","Tarjeta",187.4,"Sincronizado","Servicios Generales Ruiz S.A.C.","Joy Correa","20608754129"),C("B001-00236","Boleta","09:48","Plin",5,"Sincronizado","Cliente final","Frank Bardalez"),C("NV-00041","Nota V.","10:12","Efectivo",22.8,"Pendiente","Cliente final","Belther Rodas")];function C(t,n,e,a,o,s,r="Cliente final",d="Joy Correa",c=""){return{number:t,type:n,time:e,method:a,total:o,status:s,customer:r,customerDoc:c,cashier:d,subtotal:o/1.18,tax:o-o/1.18,items:[],createdAt:new Date().toISOString(),xmlHash:"a8f6d5c4b3a2e1f0...mock",cdrReceived:s==="Sincronizado"}}function A(t,n,e=()=>!0){let a=null;try{if(a=localStorage.getItem(t),!a)return n;const o=JSON.parse(a);return e(o)?o:n}catch(o){return e(a)?a:(console.warn(`No se pudo cargar "${t}" desde localStorage. Se usara el valor inicial.`,o),n)}}function q(t,n){try{localStorage.setItem(t,n)}catch(e){console.warn(`No se pudo guardar "${t}" en localStorage.`,e)}}function ae(t){return Array.isArray(t)&&t.every(n=>n&&typeof n.id<"u"&&typeof n.name=="string"&&typeof n.sku=="string"&&typeof n.category=="string"&&typeof n.price=="number"&&typeof n.cost=="number"&&typeof n.stock=="number")}function ie(t){return Array.isArray(t)&&t.every(n=>n&&typeof n.number=="string"&&typeof n.type=="string"&&typeof n.time=="string"&&typeof n.total=="number")}function se(t){return t===null||t&&typeof t.username=="string"&&typeof t.name=="string"&&(t.role==="admin"||t.role==="cashier")}function ce(t){return t==="light"||t==="dark"}const i={products:A("rumi_products",ne,ae),sales:A("rumi_sales",oe,ie),cart:[],category:"Todos",docType:"Boleta",payment:"Efectivo",mixed:!1,saleFilter:"Todos",docFilter:"Todos",user:A("rumi_user",null,se),theme:A("rumi_theme","light",ce)},X=[];function re(t){X.push(t)}function k(){de(),X.forEach(t=>t(i))}function de(){q("rumi_products",JSON.stringify(i.products)),q("rumi_sales",JSON.stringify(i.sales)),q("rumi_user",JSON.stringify(i.user)),q("rumi_theme",i.theme)}const h=new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN"});function y(t,n="success"){let e=document.getElementById("toast");e||(e=document.createElement("div"),e.id="toast",e.className="toast",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),document.body.appendChild(e)),e.textContent=t,e.className=`toast show toast-${n}`,n==="success"?(e.style.borderColor="var(--brand)",e.style.borderLeft="4px solid var(--brand)"):n==="danger"?(e.style.borderColor="var(--danger)",e.style.borderLeft="4px solid var(--danger)"):n==="warning"?(e.style.borderColor="var(--warning)",e.style.borderLeft="4px solid var(--warning)"):(e.style.borderColor="var(--blue)",e.style.borderLeft="4px solid var(--blue)"),clearTimeout(y.timer),y.timer=setTimeout(()=>{e.classList.remove("show")},3500)}function le(t){try{const n=new(window.AudioContext||window.webkitAudioContext),e=n.createOscillator(),a=n.createGain();e.connect(a),a.connect(n.destination),e.type="sine",e.frequency.setValueAtTime(1200,n.currentTime),a.gain.setValueAtTime(.08,n.currentTime),e.start(),setTimeout(()=>{e.stop(),n.close()},80)}catch(n){console.warn("Audio context not supported or user gesture needed.",n)}t()}const ue={joy:{password:"123",user:{username:"joy",name:"Joy Correa",role:"admin"}},frank:{password:"123",user:{username:"frank",name:"Frank Bardalez",role:"cashier"}},belther:{password:"123",user:{username:"belther",name:"Belther Rodas",role:"cashier"}},nayeli:{password:"123",user:{username:"nayeli",name:"Nayeli Arevalo",role:"cashier"}},ariana:{password:"123",user:{username:"ariana",name:"Ariana Rosales",role:"cashier"}},admin:{password:"admin",user:{username:"admin",name:"Admin (Fallback)",role:"admin"}}};function me(t){const n=document.getElementById("toggle-password-btn");n&&n.addEventListener("click",()=>{const s=document.getElementById("login-password"),r=document.getElementById("toggle-password-icon");s&&r&&(s.type==="password"?(s.type="text",r.setAttribute("data-lucide","eye-off")):(s.type="password",r.setAttribute("data-lucide","eye")),window.lucide&&window.lucide.createIcons())});function e(s,r){const d=s.trim().toLowerCase(),c=ue[d];if(!c||c.password!==r){y("Credenciales inválidas. Use los botones de acceso rápido.","danger");return}const l={...c.user};i.user=l,k();const u=document.getElementById("login-user"),f=document.getElementById("login-password");u&&(u.value=""),f&&(f.value=""),y(`Sesión iniciada como ${l.role==="admin"?"Administrador":"Cajero"}`),t&&t(l)}const a=document.getElementById("login-form");a&&a.addEventListener("submit",s=>{s.preventDefault();const r=document.getElementById("login-user"),d=document.getElementById("login-password");if(!r||!d){y("No se pudo leer el formulario de acceso. Recargue la pagina.","danger");return}const c=r.value,l=d.value;e(c,l)}),document.addEventListener("click",s=>{const r=s.target.closest(".quick-login-card");if(!r)return;s.preventDefault();const d=r.getAttribute("data-fill-user"),c=r.getAttribute("data-fill-pass"),l=document.getElementById("login-user"),u=document.getElementById("login-password");d&&c&&l&&u?(l.value=d,u.value=c,r.style.transform="scale(0.95)",setTimeout(()=>{r.style.transform="",e(d,c)},150)):d&&c&&e(d,c)});const o=document.getElementById("logout-button");o&&o.addEventListener("click",()=>{i.user=null,i.cart=[],k(),y("Sesión cerrada correctamente","info"),t&&t(null)}),i.user&&t&&t(i.user)}function pe(t){const n=document.getElementById("login-view"),e=document.getElementById("app-view"),a=document.getElementById("user-profile-tag"),o=document.querySelectorAll(".admin-only");!n||!e||(t?(n.classList.add("hidden"),e.classList.remove("hidden"),a&&(a.innerHTML=`
        <span class="user-role-badge ${t.role==="admin"?"admin":"cashier"}">
          ${t.role==="admin"?"Admin":"Cajero"}
        </span>
        <strong>${t.name}</strong>
      `),o.forEach(s=>{t.role==="admin"?s.classList.remove("hidden"):s.classList.add("hidden")})):(e.classList.add("hidden"),n.classList.remove("hidden")))}const fe={Bebidas:"cup-soda",Snacks:"cookie",Lácteos:"milk",Abarrotes:"wheat",Limpieza:"spray-can"},V={Efectivo:"banknote",Yape:"smartphone",Plin:"scan-line",Tarjeta:"credit-card"};function ge(){const t=document.getElementById("product-search");t&&t.addEventListener("input",()=>{L()});const n=document.getElementById("barcode-scanner-simulator");n&&n.addEventListener("click",()=>{const p=i.products.filter(m=>m.stock>0);if(p.length===0){y("No hay productos con stock disponible para escanear.","warning");return}const g=p[Math.floor(Math.random()*p.length)];le(()=>{Z(g.id),y(`Escaneado: ${g.name} (SKU: ${g.sku})`,"info")})});const e=document.getElementById("toggle-cart-btn"),a=document.getElementById("pos-view"),o=document.getElementById("toggle-cart-text"),s=e?e.querySelector("i"):null;e&&a&&e.addEventListener("click",()=>{a.classList.toggle("cart-collapsed")?(o&&(o.textContent="Mostrar Carrito"),s&&s.setAttribute("data-lucide","shopping-cart")):(o&&(o.textContent="Ocultar Carrito"),s&&s.setAttribute("data-lucide","sidebar")),window.lucide&&window.lucide.createIcons()});const r=document.querySelectorAll("[data-document]");r.forEach(p=>{p.addEventListener("click",()=>{i.docType=p.dataset.document,r.forEach(m=>m.classList.toggle("active",m===p));const g=document.getElementById("customer-fields");g&&g.classList.toggle("hidden",i.docType!=="Factura"&&i.docType!=="Nota V."),$()})});const d=document.getElementById("customer-doc"),c=document.getElementById("customer-name");d&&c&&d.addEventListener("input",p=>{const g=p.target.value.trim();g.length===8?(c.value="Juan Pérez Vasquez",y("DNI verificado con RENIEC (Simulado)")):g.length===11&&(c.value="Distribuciones Tarapoto S.A.C.",y("RUC verificado con SUNAT (Simulado)"))});const l=document.getElementById("mixed-toggle");l&&l.addEventListener("change",p=>{i.mixed=p.target.checked,$()});const u=document.getElementById("confirm-sale");u&&u.addEventListener("click",ye);const f=document.getElementById("close-receipt");f&&f.addEventListener("click",()=>{const p=document.getElementById("receipt-dialog");p&&p.close()});const E=document.getElementById("print-receipt");E&&E.addEventListener("click",()=>{window.print()})}function W(){const t=document.getElementById("category-tabs");if(!t)return;const n=["Todos",...new Set(i.products.map(e=>e.category))];t.innerHTML=n.map(e=>`
    <button class="chip ${e===i.category?"active":""}" data-category="${e}">
      ${e}
    </button>
  `).join(""),t.querySelectorAll(".chip").forEach(e=>{e.addEventListener("click",()=>{i.category=e.dataset.category,W(),L()})})}function L(){const t=document.getElementById("product-grid");if(!t)return;const n=document.getElementById("product-search"),e=n?n.value.trim().toLowerCase():"",a=i.products.filter(o=>{const s=i.category==="Todos"||o.category===i.category,r=`${o.name} ${o.sku}`.toLowerCase().includes(e);return s&&r});if(a.length===0){t.innerHTML=`
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i data-lucide="search-x"></i>
        <strong>No se encontraron productos</strong>
        <p>Intente con otro término o categoría.</p>
      </div>
    `,window.lucide&&window.lucide.createIcons();return}t.innerHTML=a.map(o=>{const s=o.stock<=o.min,r=i.cart.some(u=>u.id===o.id),d=o.stock>0;let c="",l=`${o.stock} u.`;return d?s&&(c="low",l=`Bajo stock: ${o.stock}`):(c="empty",l="Sin stock"),`
      <button class="product-card ${r?"selected":""}" data-product="${o.id}" ${d?"":"disabled"}>
        <span class="stock-badge ${c}">${l}</span>
        <div class="product-img-wrapper">
          <img class="product-img" src="${o.image||"https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80"}" alt="${o.name}" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80'">
        </div>
        <div class="product-info-box">
          <div>
            <h3>${o.name}</h3>
            <small>${o.sku}</small>
          </div>
          <div class="product-footer">
            <span class="product-icon"><i data-lucide="${fe[o.category]||"package"}"></i></span>
            <strong class="product-price">${h.format(o.price)}</strong>
          </div>
        </div>
      </button>
    `}).join(""),t.querySelectorAll(".product-card").forEach(o=>{o.addEventListener("click",()=>{Z(Number(o.dataset.product))})}),window.lucide&&window.lucide.createIcons()}function Z(t){const n=i.products.find(o=>o.id===t);if(!n||n.stock<=0)return;const e=i.cart.find(o=>o.id===t);if((e?e.qty:0)>=n.stock){y(`Stock máximo disponible alcanzado (${n.stock} u.)`,"warning");return}e?e.qty+=1:i.cart.push({id:t,qty:1}),$(),L()}function O(t,n){const e=i.products.find(o=>o.id===t),a=i.cart.find(o=>o.id===t);!a||!e||(a.qty+=n,a.qty<=0?i.cart=i.cart.filter(o=>o.id!==t):a.qty>e.stock&&(a.qty=e.stock,y(`Se ajustó la cantidad al stock máximo disponible (${e.stock} u.)`,"warning")),$(),L())}function ee(){const t=i.cart.reduce((e,a)=>{const o=i.products.find(s=>s.id===a.id);return e+(o?o.price*a.qty:0)},0),n=t/1.18;return{total:t,subtotal:n,tax:t-n}}function $(){const{total:t,subtotal:n,tax:e}=ee(),a=document.getElementById("cart-count");a&&(a.textContent=i.cart.reduce((c,l)=>c+l.qty,0));const o=document.getElementById("subtotal"),s=document.getElementById("tax"),r=document.getElementById("total");o&&(o.textContent=h.format(n)),s&&(s.textContent=h.format(e)),r&&(r.textContent=h.format(t));const d=document.getElementById("cart-list");if(d){if(i.cart.length===0){d.innerHTML=`
      <div class="empty-state">
        <i data-lucide="shopping-basket"></i>
        <strong>Carrito vacío</strong>
        <p>Añada productos desde el catálogo para iniciar una venta.</p>
      </div>
    `;const c=document.getElementById("confirm-sale");c&&(c.disabled=!0),U(0),window.lucide&&window.lucide.createIcons();return}d.innerHTML=i.cart.map(c=>{const l=i.products.find(u=>u.id===c.id);return l?`
      <article class="cart-item">
        <div class="cart-item-top">
          <div>
            <span class="cart-item-name">${l.name}</span>
            <div class="cart-item-meta">${h.format(l.price)} c/u</div>
          </div>
          <button class="delete-cart-item" data-remove="${l.id}" aria-label="Quitar del carrito">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
        <div class="cart-controls">
          <div class="qty-controls">
            <button class="qty-btn" data-dec="${l.id}"><i data-lucide="minus"></i></button>
            <span class="qty-value">${c.qty}</span>
            <button class="qty-btn" data-inc="${l.id}"><i data-lucide="plus"></i></button>
          </div>
          <strong class="line-total">${h.format(l.price*c.qty)}</strong>
        </div>
      </article>
    `:""}).join(""),d.querySelectorAll("[data-dec]").forEach(c=>{c.addEventListener("click",()=>O(Number(c.dataset.dec),-1))}),d.querySelectorAll("[data-inc]").forEach(c=>{c.addEventListener("click",()=>O(Number(c.dataset.inc),1))}),d.querySelectorAll("[data-remove]").forEach(c=>{c.addEventListener("click",()=>{i.cart=i.cart.filter(l=>l.id!==Number(c.dataset.remove)),$(),L()})}),U(t),te(t),window.lucide&&window.lucide.createIcons()}}function U(t){const n=document.getElementById("payment-methods");if(!n)return;const e=Object.keys(V);n.innerHTML=e.map(o=>`
    <button class="payment-btn ${i.payment===o?"active":""}" data-payment="${o}">
      <i data-lucide="${V[o]}"></i>
      <span>${o}</span>
    </button>
  `).join(""),n.querySelectorAll(".payment-btn").forEach(o=>{o.addEventListener("click",()=>{i.payment=o.dataset.payment,$()})});const a=document.getElementById("mixed-payments");if(a)if(a.classList.toggle("hidden",!i.mixed),i.mixed){const o=(t/2).toFixed(2);a.innerHTML=`
      <div class="mixed-inputs">
        <div class="mixed-row">
          <span>Efectivo S/</span>
          <input id="mixed-cash" type="number" min="0" step="0.10" value="${o}">
        </div>
        <div class="mixed-row">
          <span>Yape/Plin S/</span>
          <input id="mixed-digital" type="number" min="0" step="0.10" value="${(t-o).toFixed(2)}">
        </div>
        <div class="mixed-row">
          <span>Cód. Oper.</span>
          <input id="operation-code" placeholder="Ej: YP-128475" type="text">
        </div>
      </div>
    `;const s=document.getElementById("mixed-cash"),r=document.getElementById("mixed-digital");[s,r].forEach(d=>{d&&d.addEventListener("input",()=>te(t))})}else a.innerHTML=""}function te(t){var e,a;const n=document.getElementById("confirm-sale");if(n){if(t<=0){n.disabled=!0;return}if(i.docType==="Factura"){const o=document.getElementById("customer-doc");if(!o||o.value.trim().length!==11){n.disabled=!0;return}}if(i.mixed){const o=Number(((e=document.getElementById("mixed-cash"))==null?void 0:e.value)||0),s=Number(((a=document.getElementById("mixed-digital"))==null?void 0:a.value)||0);if(Math.abs(o+s-t)>.02){n.disabled=!0;return}}n.disabled=!1}}function ye(){const{total:t,subtotal:n,tax:e}=ee();if(t<=0)return;const a=document.getElementById("customer-name"),o=document.getElementById("customer-doc"),s=a?a.value.trim():"Cliente final",r=o?o.value.trim():"";if(i.docType==="Factura"&&r.length!==11){y("Debe ingresar un RUC de 11 dígitos para emitir una Factura","danger");return}let d=i.payment,c="";if(i.mixed){d="Mixto";const w=document.getElementById("operation-code");c=w?w.value.trim():"",c||(c="YP-"+Math.floor(1e5+Math.random()*9e5))}i.cart.forEach(w=>{const B=i.products.find(N=>N.id===w.id);B&&(B.stock-=w.qty)});const l=i.docType==="Factura"?"F001":i.docType==="Nota V."?"NV":"B001",f=i.sales.filter(w=>w.number.startsWith(l)).length+241,E=`${l}-${String(f).padStart(5,"0")}`,p=new Date,g=p.toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"}),m=i.cart.map(w=>{const B=i.products.find(N=>N.id===w.id);return{sku:B.sku,name:B.name,qty:w.qty,price:B.price,total:B.price*w.qty}}),v=Math.random()>.15,b=new Uint8Array(16);window.crypto.getRandomValues(b);const I=Array.from(b).map(w=>w.toString(16).padStart(2,"0")).join("").substring(0,20)+"...xml",S={number:E,type:i.docType,time:g,method:d,total:t,subtotal:n,tax:e,status:v?"Sincronizado":"Pendiente",customer:s||"Cliente final",customerDoc:r,cashier:i.user?i.user.name:"Joy Correa",items:m,createdAt:p.toISOString(),xmlHash:I,cdrReceived:v,operationCode:c};i.sales.unshift(S),i.cart=[],i.mixed=!1;const H=document.getElementById("mixed-toggle");H&&(H.checked=!1),a&&(a.value=""),o&&(o.value=""),k(),z(),D(S),y(`Comprobante ${E} emitido. SUNAT: ${S.status}`,"success")}function D(t){const n=document.getElementById("receipt-content");if(!n)return;const e=t.items.map(o=>`
    <tr>
      <td>${o.qty} x ${o.name.substring(0,18)}</td>
      <td style="text-align: right;">${h.format(o.total)}</td>
    </tr>
  `).join("");n.innerHTML=`
    <div class="receipt">
      <div class="receipt-header">
        <h2>RUMI MARKET</h2>
        <small>De: Frank Bardalez V.</small><br>
        <small>Jr. Bolognesi 1455 - Tarapoto</small><br>
        <small>RUC: 10459871231</small>
      </div>
      
      <div class="receipt-divider"></div>
      
      <div>
        <strong>COMPROBANTE: ${t.number}</strong><br>
        <span>Fecha: ${new Date(t.createdAt).toLocaleDateString()}</span><br>
        <span>Hora: ${t.time}</span><br>
        <span>Cajero: ${t.cashier}</span><br>
        <span>Cliente: ${t.customer}</span><br>
        ${t.customerDoc?`<span>Doc: ${t.customerDoc}</span><br>`:""}
        <span>Pago: ${t.method} ${t.operationCode?`(${t.operationCode})`:""}</span>
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
          ${e.length>0?e:'<tr><td colspan="2" style="text-align:center;">Venta de importes manuales</td></tr>'}
        </tbody>
      </table>
      
      <div class="receipt-divider"></div>
      
      <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-end;">
        <div>Subtotal: <strong>${h.format(t.subtotal)}</strong></div>
        <div>IGV (18%): <strong>${h.format(t.tax)}</strong></div>
        <div style="font-size: 14px;">TOTAL: <strong>${h.format(t.total)}</strong></div>
      </div>
      
      <div class="receipt-divider"></div>
      
      <div class="receipt-qr-hash">
        <!-- Mock QR Code generator from sunat link -->
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=RumiMarket|${t.type}|${t.number}|${t.tax.toFixed(2)}|${t.total.toFixed(2)}|${t.createdAt}" alt="QR Comprobante">
        <small>HASH XML: ${t.xmlHash}</small>
        <small style="margin-top: 4px;">Representación impresa de la ${t.type} Electrónica.</small>
      </div>
    </div>
  `;const a=document.getElementById("receipt-dialog");a&&a.showModal()}function z(){W(),L(),$()}let T=null;function he(){const t=document.getElementById("inventory-search");t&&t.addEventListener("input",x);const n=document.getElementById("inventory-filter");n&&n.addEventListener("change",x);const e=document.getElementById("add-product-button");e&&e.addEventListener("click",()=>{T=null,document.getElementById("modal-title").textContent="Añadir producto";const l=document.getElementById("product-form");l&&l.reset(),J(),F();const u=document.getElementById("product-dialog");u&&u.showModal()});const a=document.getElementById("close-product-dialog");a&&a.addEventListener("click",()=>{const l=document.getElementById("product-dialog");l&&l.close()});const o=document.getElementById("new-category");o&&o.addEventListener("change",J);const s=document.getElementById("new-price"),r=document.getElementById("new-cost");s&&r&&[s,r].forEach(l=>{l.addEventListener("input",F)});const d=document.getElementById("product-form");d&&d.addEventListener("submit",ve);const c=document.getElementById("export-inventory");c&&c.addEventListener("click",()=>{const l=`SKU,Producto,Categoría,Precio Venta,Precio Costo,Stock,Stock Minimo
`,u=i.products.map(g=>`"${g.sku}","${g.name.replace(/"/g,'""')}","${g.category}",${g.price},${g.cost},${g.stock},${g.min}`).join(`
`),f=new Blob([l+u],{type:"text/csv;charset=utf-8;"}),E=URL.createObjectURL(f),p=document.createElement("a");p.href=E,p.download=`inventario-rumi-market-${new Date().toISOString().split("T")[0]}.csv`,p.click(),URL.revokeObjectURL(E),y("Inventario exportado en formato CSV")})}function J(){const t=document.getElementById("new-category"),n=document.getElementById("new-sku");if(!t||!n)return;const e=t.value;let a="ABA";e==="Bebidas"?a="BEB":e==="Snacks"?a="SNK":e==="Lácteos"?a="LAC":e==="Limpieza"&&(a="LIM");const s=i.products.filter(r=>r.sku.startsWith(a)).length+1;n.value=`${a}-${String(s).padStart(3,"0")}`}function F(){const t=document.getElementById("new-price"),n=document.getElementById("new-cost"),e=document.getElementById("margin-live-preview");if(!t||!n||!e)return;const a=Number(t.value||0),o=Number(n.value||0);if(a<=0){e.innerHTML="<span>Ingrese Precio de Venta para estimar márgenes</span>",e.className="margin-preview";return}const s=a-o,r=s/a*100;s<0?(e.innerHTML=`<i data-lucide="alert-triangle"></i> Margen negativo: ${r.toFixed(1)}% (Pérdida: ${h.format(Math.abs(s))})`,e.className="margin-preview negative"):(e.innerHTML=`<i data-lucide="sparkles"></i> Margen estimado: ${r.toFixed(1)}% (Utilidad neta: ${h.format(s)})`,e.className="margin-preview"),window.lucide&&window.lucide.createIcons()}function ve(t){t.preventDefault();const n=document.getElementById("new-name").value.trim(),e=document.getElementById("new-sku").value.trim(),a=document.getElementById("new-category").value,o=Number(document.getElementById("new-price").value),s=Number(document.getElementById("new-cost").value),r=Number(document.getElementById("new-stock").value);let d="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80";const c=n.toLowerCase();if(c.includes("cola")||c.includes("gaseosa")||c.includes("soda")?d="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80":c.includes("agua")?d="https://images.unsplash.com/photo-1548839133-9fa067ffca9f?w=400&auto=format&fit=crop&q=80":c.includes("oreo")||c.includes("galleta")?d="https://images.unsplash.com/photo-1558961317-1f198f395777?w=400&auto=format&fit=crop&q=80":c.includes("leche")||c.includes("queso")?d="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80":c.includes("yogurt")?d="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop&q=80":c.includes("mantequilla")?d="https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&auto=format&fit=crop&q=80":c.includes("arroz")?d="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80":c.includes("azucar")||c.includes("azúcar")?d="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&auto=format&fit=crop&q=80":c.includes("aceite")?d="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80":c.includes("jabon")||c.includes("jabón")?d="https://images.unsplash.com/photo-1607006342456-ba2b2d3d0f7a?w=400&auto=format&fit=crop&q=80":c.includes("detergente")||c.includes("ariel")?d="https://images.unsplash.com/photo-1585830812416-a6c869e4527a?w=400&auto=format&fit=crop&q=80":(c.includes("papel")||c.includes("higienico")||c.includes("higiénico"))&&(d="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80"),T){const u=i.products.find(f=>f.id===T);u&&(u.name=n,u.sku=e,u.category=a,u.price=o,u.cost=s,u.stock=r,c!==u.name.toLowerCase()&&(u.image=d),y("Producto actualizado correctamente"))}else{const u={id:Date.now(),sku:e,name:n,category:a,price:o,cost:s,stock:r,min:6,image:d};i.products.unshift(u),y("Producto añadido al catálogo de existencias")}k();const l=document.getElementById("product-dialog");l&&l.close(),x()}function x(){const t=document.getElementById("inventory-table");if(!t)return;const n=document.getElementById("inventory-search"),e=n?n.value.trim().toLowerCase():"",a=document.getElementById("inventory-filter"),o=a?a.value:"Todos",s=i.products.filter(m=>{const v=o==="Todos"||m.category===o,b=`${m.name} ${m.sku}`.toLowerCase().includes(e);return v&&b}),r=i.user&&i.user.role==="cashier",d=document.getElementById("restricted-notice");d&&d.classList.toggle("hidden",!r);const c=document.getElementById("add-product-button");c&&(c.disabled=r),t.innerHTML=s.map(m=>{const v=m.stock<=m.min;return`
      <tr class="${v?"low-stock-row":""}">
        <td><strong>${m.sku}</strong></td>
        <td>
          <div style="display:flex; align-items:center; gap:8px;">
            <img src="${m.image}" style="width:30px; height:30px; object-fit:cover; border-radius:4px;" alt="${m.name}">
            <span>${m.name}</span>
          </div>
        </td>
        <td>${m.category}</td>
        <td class="money">${h.format(m.price)}</td>
        
        <!-- Cost and Margin hidden or shown based on user role rights -->
        <td>${r?"***":h.format(m.cost)}</td>
        
        <td><strong style="color: ${v?"var(--danger)":"var(--text)"}">${m.stock} u.</strong></td>
        <td>
          <span class="status-pill ${v?"low":""}">
            ${v?"Bajo stock":"Suficiente"}
          </span>
        </td>
        <td>
          ${r?`
            <span style="font-size:11px; color:var(--muted); font-style:italic;">Solo lectura</span>
          `:`
            <div class="action-buttons">
              <button class="btn-edit" data-edit="${m.id}" title="Editar"><i data-lucide="edit-3"></i></button>
              <button class="btn-delete" data-delete="${m.id}" title="Eliminar"><i data-lucide="trash-2"></i></button>
            </div>
          `}
        </td>
      </tr>
    `}).join(""),r||(t.querySelectorAll("[data-edit]").forEach(m=>{m.addEventListener("click",()=>{const v=Number(m.dataset.edit),b=i.products.find(S=>S.id===v);if(!b)return;T=v,document.getElementById("modal-title").textContent="Editar producto",document.getElementById("new-name").value=b.name,document.getElementById("new-sku").value=b.sku,document.getElementById("new-category").value=b.category,document.getElementById("new-price").value=b.price,document.getElementById("new-cost").value=b.cost,document.getElementById("new-stock").value=b.stock,F();const I=document.getElementById("product-dialog");I&&I.showModal(),window.lucide&&window.lucide.createIcons()})}),t.querySelectorAll("[data-delete]").forEach(m=>{m.addEventListener("click",()=>{const v=Number(m.dataset.delete),b=i.products.find(I=>I.id===v);b&&confirm(`¿Está seguro de eliminar ${b.name} del catálogo?`)&&(i.products=i.products.filter(I=>I.id!==v),i.cart=i.cart.filter(I=>I.id!==v),k(),x(),y("Producto eliminado"))})}));const l=i.products.length,u=i.products.filter(m=>m.stock<=m.min).length;let f="S/ ***";if(!r){const m=i.products.reduce((v,b)=>v+b.cost*b.stock,0);f=h.format(m)}const E=document.getElementById("metric-products"),p=document.getElementById("metric-alerts"),g=document.getElementById("metric-value");E&&(E.textContent=l),p&&(p.textContent=u),g&&(g.textContent=f),window.lucide&&window.lucide.createIcons()}function be(){const t=document.getElementById("sync-sunat");t&&t.addEventListener("click",()=>{Ee()});const n=document.querySelectorAll("[data-doc-filter]");n.forEach(e=>{e.addEventListener("click",()=>{i.docFilter=e.dataset.docFilter,n.forEach(a=>a.classList.toggle("active",a===e)),M()})})}function Ee(){const t=document.getElementById("sync-sunat");if(!t||t.classList.contains("loading"))return;const n=i.sales.filter(r=>r.status==="Pendiente").length;if(n===0){y("No hay comprobantes pendientes por sincronizar","info");return}t.classList.add("loading"),t.disabled=!0,t.innerHTML='<i data-lucide="refresh-cw" class="animate-spin"></i> Sincronizando...',window.lucide&&window.lucide.createIcons();let e=document.getElementById("sync-progress-bar-el");if(!e){const r=document.querySelector(".sync-panel-content");e=document.createElement("div"),e.id="sync-progress-bar-el",e.className="sync-progress-bar",e.innerHTML='<div id="sync-progress-fill-el" class="sync-progress-fill"></div>',r.appendChild(e)}const a=document.getElementById("sync-progress-fill-el");let o=0;const s=setInterval(()=>{o+=5,a&&(a.style.width=`${o}%`),o>=100&&(clearInterval(s),i.sales=i.sales.map(r=>r.status==="Pendiente"?{...r,status:"Sincronizado",cdrReceived:!0}:r),k(),M(),t.classList.remove("loading"),t.disabled=!1,t.innerHTML='<i data-lucide="refresh-cw"></i> Sincronizar pendientes',e&&e.remove(),y(`Sincronización completa. ${n} comprobantes enviados a SUNAT.`,"success"),window.lucide&&window.lucide.createIcons())},75)}function M(){const t=document.getElementById("billing-table");if(!t)return;const n=i.sales.filter(e=>i.docFilter==="Todos"?!0:e.type===i.docFilter);if(n.length===0){t.innerHTML=`
      <tr>
        <td colspan="6" style="text-align:center; padding: 40px; color: var(--muted);">
          No hay comprobantes para esta categoría
        </td>
      </tr>
    `,K();return}t.innerHTML=n.map(e=>{const a=e.status==="Sincronizado",o=a?"success":"warning",s=e.type==="Factura"?"purple":e.type==="Boleta"?"blue":"warning";return`
      <tr>
        <td><strong>${e.number}</strong></td>
        <td><span class="status-pill ${s}">${e.type}</span></td>
        <td>
          <div style="display:flex; flex-direction:column;">
            <span>${e.customer}</span>
            ${e.customerDoc?`<small style="font-size:11px; color:var(--muted);">${e.customerDoc}</small>`:""}
          </div>
        </td>
        <td>${e.time}</td>
        <td class="money">${h.format(e.total)}</td>
        <td>
          <span class="status-pill ${o}">
            <i data-lucide="${a?"check-circle":"alert-circle"}" style="width:14px; height:14px;"></i>
            ${e.status}
          </span>
        </td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="receipt-action-btn" data-view-receipt="${e.number}" title="Ver Comprobante">
              <i data-lucide="eye"></i>
            </button>
            <button class="download-xml-btn" data-download-xml="${e.number}" title="Descargar XML">
              <i data-lucide="file-code"></i>
            </button>
            <button class="download-cdr-btn" data-download-cdr="${e.number}" ${e.cdrReceived?"":"disabled"} title="Descargar Constancia CDR">
              <i data-lucide="file-check-2"></i>
            </button>
          </div>
        </td>
      </tr>
    `}).join(""),t.querySelectorAll("[data-view-receipt]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.viewReceipt,o=i.sales.find(s=>s.number===a);o&&D(o)})}),t.querySelectorAll("[data-download-xml]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.downloadXml;y(`Descargando XML: ${a}.xml (Simulado)`),G(`${a}.xml`,`<?xml version="1.0" encoding="UTF-8"?><Invoice><cbc:ID>${a}</cbc:ID></Invoice>`)})}),t.querySelectorAll("[data-download-cdr]").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.downloadCdr;y(`Descargando CDR: R-${a}.zip (Simulado)`),G(`R-${a}.xml`,`<?xml version="1.0"?><ApplicationResponse><cbc:ResponseCode>0</cbc:ResponseCode><cbc:Description>La Boleta/Factura numero ${a} ha sido aceptada</cbc:Description></ApplicationResponse>`)})}),K(),window.lucide&&window.lucide.createIcons()}function K(){const t=document.getElementById("metric-documents"),n=document.getElementById("metric-boletas"),e=document.getElementById("metric-facturas"),a=document.getElementById("metric-pending");t&&(t.textContent=i.sales.length),n&&(n.textContent=i.sales.filter(r=>r.type==="Boleta").length),e&&(e.textContent=i.sales.filter(r=>r.type==="Factura").length);const o=i.sales.filter(r=>r.status==="Pendiente").length;a&&(a.textContent=o);const s=document.getElementById("metric-pending-card");s&&(o>0?(s.classList.add("danger"),s.classList.remove("warning")):(s.classList.remove("danger"),s.classList.add("success")))}function G(t,n){const e=document.createElement("a");e.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(n)),e.setAttribute("download",t),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e)}const R={Efectivo:"#0d9488",Yape:"#8b5cf6",Plin:"#3b82f6",Tarjeta:"#f97316",Mixto:"#64748b"};function we(){const t=document.querySelectorAll("[data-sale-filter]");t.forEach(n=>{n.addEventListener("click",()=>{i.saleFilter=n.dataset.saleFilter,t.forEach(e=>e.classList.toggle("active",e===n)),j()})})}function j(){const t=i.user&&i.user.role==="cashier";let n=i.sales;if(t){const f=i.user.name;n=i.sales.filter(E=>E.cashier===f)}const e=n.filter(f=>i.saleFilter==="Todos"?!0:f.type===i.saleFilter),a=e.reduce((f,E)=>f+E.total,0),o=e.length,s=o>0?a/o:0,r=a/1.18,d=document.getElementById("report-sales"),c=document.getElementById("report-transactions"),l=document.getElementById("report-average"),u=document.getElementById("report-net");d&&(d.textContent=h.format(a)),c&&(c.textContent=o),l&&(l.textContent=h.format(s)),u&&(t?(u.textContent="S/ ***",u.parentElement.querySelector("small").textContent="Restringido para cajero"):(u.textContent=h.format(r),u.parentElement.querySelector("small").textContent="descontado IGV 18%")),Ie(n),Be(n),ke(e)}function Ie(t){const n=document.getElementById("hourly-chart");if(!n)return;const e=["8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm"],a=Array(e.length).fill(0);t.forEach(s=>{const r=parseInt(s.time.split(":")[0]);if(r>=8&&r<=17){const d=r-8;a[d]+=s.total}});const o=Math.max(...a,100);n.innerHTML=e.map((s,r)=>{const d=a[r];return`
      <div class="bar">
        <div class="bar-fill" style="height: ${Math.max(4,d/o*100)}%" data-tooltip="${h.format(d)}"></div>
        <small>${s}</small>
      </div>
    `}).join("")}function Be(t){const n=document.getElementById("payment-donut"),e=document.getElementById("payment-legend");if(!n||!e)return;const a=["Efectivo","Yape","Plin","Tarjeta","Mixto"],o=a.reduce((c,l)=>(c[l]=t.filter(u=>u.method===l).reduce((u,f)=>u+f.total,0),c),{}),s=Object.values(o).reduce((c,l)=>c+l,0)||1;let r=0;const d=a.map(c=>{const l=o[c]/s*360,u=`${R[c]} ${r}deg ${r+l}deg`;return r+=l,u});n.style.background=`conic-gradient(${d.join(", ")})`,e.innerHTML=a.map(c=>{const l=Math.round(o[c]/s*100);return`
      <div class="legend-item">
        <span class="legend-dot" style="background: ${R[c]}"></span>
        <span>${c} (${l}%)</span>
      </div>
    `}).join("")}function ke(t){const n=document.getElementById("sales-table");if(n){if(t.length===0){n.innerHTML=`
      <tr>
        <td colspan="7" style="text-align:center; padding: 40px; color: var(--muted);">
          No se registraron transacciones
        </td>
      </tr>
    `;return}n.innerHTML=t.map(e=>{const a=e.status==="Sincronizado",o=e.type==="Factura"?"purple":e.type==="Boleta"?"blue":"warning",s=a?"success":"warning";return`
      <tr style="cursor: pointer;" class="clickable-sale-row" data-sale-number="${e.number}">
        <td><strong>${e.number}</strong></td>
        <td><span class="status-pill ${o}">${e.type}</span></td>
        <td>${e.time}</td>
        <td>${e.cashier}</td>
        <td>
          <span style="display:flex; align-items:center; gap:6px;">
            <span class="legend-dot" style="background: ${R[e.method]||"#64748b"}; width: 8px; height: 8px;"></span>
            ${e.method}
          </span>
        </td>
        <td class="money">${h.format(e.total)}</td>
        <td>
          <span class="status-pill ${s}">
            ${e.status}
          </span>
        </td>
      </tr>
    `}).join(""),n.querySelectorAll(".clickable-sale-row").forEach(e=>{e.addEventListener("click",()=>{const a=e.dataset.saleNumber,o=i.sales.find(s=>s.number===a);o&&D(o)})})}}function $e(){Q(i.theme);const t=document.getElementById("theme-toggle");t&&t.addEventListener("click",()=>{i.theme=i.theme==="dark"?"light":"dark",Q(i.theme),k()})}function Q(t){t==="dark"?document.body.classList.add("dark"):document.body.classList.remove("dark"),xe(t)}function xe(t){const n=document.getElementById("theme-toggle");if(!n)return;const e=n.querySelector("i");e&&(t==="dark"?e.setAttribute("data-lucide","sun"):e.setAttribute("data-lucide","moon"),window.lucide&&window.lucide.createIcons())}const Y=t=>[...document.querySelectorAll(t)];function _(){$e(),me(t=>{pe(t),t&&P()}),ge(),he(),be(),we(),Le(),Se(),re(()=>{P()}),P()}function Le(){const t=Y(".nav-tab");t.forEach(n=>{n.addEventListener("click",()=>{const e=n.dataset.view;t.forEach(a=>a.classList.toggle("active",a===n)),Y(".view").forEach(a=>{a.id===`${e}-view`?a.classList.add("active"):a.classList.remove("active")}),Ce(e)})})}function Se(){const t=document.getElementById("clock"),n=document.getElementById("report-date"),e=()=>{const a=new Date;t&&(t.textContent=a.toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1})),n&&(n.textContent=a.toLocaleDateString("es-PE",{day:"2-digit",month:"short",year:"numeric"}))};e(),setInterval(e,1e3)}function Ce(t){t==="pos"?z():t==="inventory"?x():t==="billing"?M():t==="reports"&&j()}function P(){z(),x(),M(),j(),Ae()}function Ae(){const t=i.products.filter(e=>e.stock<=e.min).length,n=document.getElementById("stock-alert-badge");n&&(n.textContent=t,n.classList.toggle("hidden",t===0))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",_):_();
