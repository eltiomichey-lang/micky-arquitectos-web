/* ============================================================
   Layout loader: carga header y footer desde archivos HTML
   compartidos. Si falla (p. ej. file:// con CORS), usa fallback
   embebido para que el sitio siga funcionando sin servidor.
   ============================================================ */

const HEADER_FALLBACK = `
<!-- ==================== HEADER / NAVBAR (RESPALDO) ==================== -->
<nav id="mainNav" class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brandBorder shadow-sm transition-shadow duration-300">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
    <a href="index.html" class="flex items-center gap-3 group">
      <img src="imagenes/logo_micky_arquitectos_horizontal.jpg" alt="Micky Arquitectos" class="h-10 w-auto object-contain" onerror="this.src='imagenes/logo_micky_arquitectos_solo.jpeg'">
    </a>
    <div class="hidden md:flex items-center space-x-8 font-medium text-sm text-brandPrimary">
      <a href="index.html" class="nav-link text-brandPrimary hover:text-brandAccent transition-colors">Inicio</a>
      <a href="nosotros.html" class="nav-link text-brandPrimary hover:text-brandAccent transition-colors">Nosotros</a>
      <a href="servicios.html" class="nav-link text-brandPrimary hover:text-brandAccent transition-colors">Servicios</a>
      <a href="flujo.html" class="nav-link text-brandPrimary hover:text-brandAccent transition-colors">Cómo funciona</a>
    </div>
    <div class="hidden md:flex items-center space-x-3">
      <a href="servicios.html" class="px-5 py-2.5 text-sm font-semibold bg-brandGreen text-white rounded-lg hover:bg-brandAccent transition-colors shadow-sm"><i class="fa-brands fa-whatsapp mr-1.5"></i>Cotizar</a>
    </div>
    <div class="md:hidden flex items-center">
      <button id="mobileMenuBtn" onclick="toggleMobileMenu()" class="p-2 text-brandPrimary focus:outline-none" aria-label="Abrir menú"><i class="fa-solid fa-bars text-xl"></i></button>
    </div>
  </div>
  <div id="mobileMenu" class="hidden md:hidden bg-white border-b border-brandBorder px-4 pt-2 pb-4 space-y-3">
    <a href="index.html" class="nav-link block text-brandPrimary font-medium py-1">Inicio</a>
    <a href="nosotros.html" class="nav-link block text-brandPrimary font-medium py-1">Nosotros</a>
    <a href="servicios.html" class="nav-link block text-brandPrimary font-medium py-1">Servicios</a>
    <a href="flujo.html" class="nav-link block text-brandPrimary font-medium py-1">Cómo funciona</a>
    <div class="pt-2 flex flex-col space-y-2">
      <a href="servicios.html" class="w-full py-2 text-center text-sm font-semibold bg-brandGreen text-white rounded-lg"><i class="fa-brands fa-whatsapp mr-1.5"></i>Cotizar</a>
    </div>
  </div>
</nav>
`;

const FOOTER_FALLBACK = `
<!-- ==================== FOOTER (RESPALDO) ==================== -->
<footer class="bg-brandBg border-t border-brandBorder py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
    <div>
      <img src="imagenes/logo_micky_arquitectos_solo.jpeg" alt="Micky Arquitectos" class="h-8 w-auto mb-2" onerror="this.style.display='none'">
      <strong class="text-brandPrimary text-lg font-bold tracking-wider block">Micky Arquitectos</strong>
      <p class="text-[12px] text-brandSecondary mt-1">Arquitectura | Ingeniería Civil — Revit · AutoCAD · SketchUp</p>
    </div>
    <div class="text-xs">
      <p class="text-[10px] font-bold tracking-widest text-brandSecondary uppercase mb-3">Secciones</p>
      <ul class="space-y-2">
        <li><a href="index.html" class="text-brandSecondary hover:text-brandAccent transition-colors">Inicio</a></li>
        <li><a href="nosotros.html" class="text-brandSecondary hover:text-brandAccent transition-colors">Nosotros</a></li>
        <li><a href="servicios.html" class="text-brandSecondary hover:text-brandAccent transition-colors">Servicios</a></li>
        <li><a href="flujo.html" class="text-brandSecondary hover:text-brandAccent transition-colors">Cómo funciona</a></li>
      </ul>
    </div>
    <div class="text-xs flex flex-col items-center md:items-end gap-2">
      <span class="inline-flex items-center gap-2 bg-brandPrimary px-3 py-1.5 rounded-lg border border-brandBorder text-white"><i class="fa-brands fa-whatsapp text-brandGreen text-sm"></i> Atención directa personalizada</span>
      <p class="text-[12px] text-brandSecondary">© <span id="year">2026</span> Micky Arquitectos. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>
`;

(async function loadLayout() {
  const headerContainer = document.getElementById('site-header');
  const footerContainer = document.getElementById('site-footer');
  if (!headerContainer && !footerContainer) return;

  async function inject(id, url, fallback) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const res = await fetch(url);
      el.innerHTML = await res.text();
    } catch (e) {
      el.innerHTML = fallback;
    }

    if (id === 'site-header') {
      const path = location.pathname.replace(/\/+$/, '') || '/index.html';
      const normalized = path === '/' ? 'index.html' : path.split('/').pop();
      el.querySelectorAll('.nav-link').forEach(a => {
        const href = a.getAttribute('href');
        if (href && normalized === href) a.classList.add('nav-active');
      });
    }
  }

  await inject('site-header', 'includes/header.html', HEADER_FALLBACK);
  await inject('site-footer', 'includes/footer.html', FOOTER_FALLBACK);

  window.dispatchEvent(new Event('layout-injected'));
})();
