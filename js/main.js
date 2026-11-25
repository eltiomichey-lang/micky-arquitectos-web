/* ============================================================
   Micky Arquitectos — Lógica compartida
   ============================================================ */

let currentSelectedService = 'Modelado en Revit';

/* ---------- Menú móvil ---------- */
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('hidden');
}

/* ---------- Modales ---------- */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('hidden');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('hidden');
}

// Cerrar al hacer clic fuera del cuadro o con la tecla Escape
(function setupModalDismiss() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', event => {
      if (event.target === overlay) closeModal(overlay.id);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      if (!overlay.classList.contains('hidden')) closeModal(overlay.id);
    });
  });
})();

/* ---------- Cotizador rápido del hero ---------- */
function quoteFromHero(event) {
  event.preventDefault();
  const select = document.getElementById('heroService');
  if (select) selectServiceModal(select.value);
}

/* ---------- Abrir solicitud de servicio ---------- */
function selectServiceModal(serviceName) {
  currentSelectedService = serviceName;
  document.getElementById('modalServiceName').textContent = serviceName;
  openModal('serviceModal');
}

/* ---------- Enviar solicitud a WhatsApp ---------- */
function sendWhatsAppRequest(event) {
  event.preventDefault();

  const name = document.getElementById('reqName').value;
  const uni = document.getElementById('reqUni').value;
  const time = document.getElementById('reqTime').value;
  const desc = document.getElementById('reqDesc').value;

  const message = `Hola Micky Arquitectos, deseo solicitar: ${currentSelectedService}\n` +
                  `• Nombre: ${name}\n` +
                  (uni ? `• Universidad/Empresa: ${uni}\n` : '') +
                  `• Tiempo de entrega: ${time}\n` +
                  `• Proyecto: ${desc}`;

  const phone = '51934403147';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  closeModal('serviceModal');
  window.open(url, '_blank');
  showToast('Redirigiendo a WhatsApp con tu solicitud...');
}

/* ---------- Envío genérico de formularios ---------- */
function handleFormSubmit(event, message) {
  event.preventDefault();
  const modal = event.target.closest('.fixed');
  if (modal) closeModal(modal.id);
  showToast(message);
}

/* ---------- Aviso flotante ---------- */
function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  document.getElementById('toastText').textContent = text;
  toast.classList.remove('hidden');
  toast.classList.add('flex');

  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 4000);
}

/* ---------- Sombra del navbar al hacer scroll ---------- */
function setupNavShadow() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const update = () => nav.classList.toggle('shadow-lg', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ---------- Aparición suave de bloques ---------- */
function setupReveals() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  elements.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.transitionDelay = ((index % 4) * 70) + 'ms';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(element => observer.observe(element));
}

/* ---------- Año dinámico del pie de página ---------- */
function setYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

/* ---------- Arranque ---------- */
function initPage() {
  setupNavShadow();
  setupReveals();
  setYear();
}

if (document.getElementById('mainNav')) {
  initPage();
} else {
  window.addEventListener('layout-injected', initPage, { once: true });
}
