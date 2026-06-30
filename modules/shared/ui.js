// Shared UI helpers for RumiMarket (toasts, generic models, barcode scanner simulator)

export function toast(message, type = "success") {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }

  el.textContent = message;
  el.className = `toast show toast-${type}`;
  
  // Custom styled border & shadows based on type
  if (type === "success") {
    el.style.borderColor = "var(--brand)";
    el.style.borderLeft = "4px solid var(--brand)";
  } else if (type === "danger") {
    el.style.borderColor = "var(--danger)";
    el.style.borderLeft = "4px solid var(--danger)";
  } else if (type === "warning") {
    el.style.borderColor = "var(--warning)";
    el.style.borderLeft = "4px solid var(--warning)";
  } else {
    el.style.borderColor = "var(--blue)";
    el.style.borderLeft = "4px solid var(--blue)";
  }

  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    el.classList.remove("show");
  }, 3500);
}

// Generate random barcode strings
export function generateBarcode() {
  const code = Math.floor(100000000000 + Math.random() * 900000000000);
  return code.toString();
}

// Simulate a barcode scanner sound and event
export function simulateBarcodeScan(callback) {
  // Beep Sound using Web Audio API
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime); // high frequency beep
    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime); // low volume

    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
      audioCtx.close();
    }, 80);
  } catch (e) {
    console.warn("Audio context not supported or user gesture needed.", e);
  }
  
  callback();
}
