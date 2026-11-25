/* ============================================================
   Widgets compartidos: modales, aviso (toast) y botón de WhatsApp
   Se insertan en el contenedor <div id="site-widgets"></div>
   ============================================================ */

(function renderWidgets() {
  const host = document.getElementById('site-widgets');
  if (!host) return;

  host.innerHTML = `
  <!-- ==================== MODAL: REGISTRO ==================== -->
  <div id="registerModal" class="modal-overlay fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
    <div class="bg-brandSurface border border-brandBorder rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
      <button onclick="closeModal('registerModal')" class="absolute top-4 right-4 text-brandSecondary hover:text-brandPrimary p-1" aria-label="Cerrar">
        <i class="fa-solid fa-xmark text-xl"></i>
      </button>
      <div class="mb-6">
        <span class="text-[10px] font-bold tracking-widest text-brandSecondary uppercase">CREAR CUENTA</span>
        <h3 class="text-2xl font-extrabold text-brandPrimary">Registro de Cliente</h3>
      </div>
      <form onsubmit="handleFormSubmit(event, 'Registro exitoso. ¡Bienvenido a Micky Arquitectos!')" class="space-y-4 text-sm">
        <div>
          <label class="block font-semibold text-brandPrimary mb-1">Nombre y Apellidos *</label>
          <input type="text" required placeholder="Ej: Maria Torres" class="w-full px-3.5 py-2.5 rounded-xl border border-brandBorder bg-white focus:outline-none focus:border-brandPrimary">
        </div>
        <div>
          <label class="block font-semibold text-brandPrimary mb-1">Correo Electrónico *</label>
          <input type="email" required placeholder="tu@correo.com" class="w-full px-3.5 py-2.5 rounded-xl border border-brandBorder bg-white focus:outline-none focus:border-brandPrimary">
        </div>
        <div>
          <label class="block font-semibold text-brandPrimary mb-1">Teléfono / WhatsApp *</label>
          <input type="tel" required placeholder="+51 900 000 000" class="w-full px-3.5 py-2.5 rounded-xl border border-brandBorder bg-white focus:outline-none focus:border-brandPrimary">
        </div>
        <div>
          <label class="block font-semibold text-brandPrimary mb-1">Universidad / Empresa (Opcional)</label>
          <input type="text" list="listaUniversidades" autocomplete="off" placeholder="Ej: PUCP, UPC, UNI y otras" class="w-full px-3.5 py-2.5 rounded-xl border border-brandBorder bg-white focus:outline-none focus:border-brandPrimary">
        </div>
        <div>
          <label class="block font-semibold text-brandPrimary mb-1">Contraseña *</label>
          <input type="password" required placeholder="••••••••" class="w-full px-3.5 py-2.5 rounded-xl border border-brandBorder bg-white focus:outline-none focus:border-brandPrimary">
        </div>
        <button type="submit" class="w-full py-3 bg-brandPrimary text-white font-bold rounded-xl hover:bg-brandAccent transition-colors mt-2">
          Completar Registro
        </button>
      </form>
    </div>
  </div>

  <!-- ==================== MODAL: LOGIN ==================== -->
  <div id="loginModal" class="modal-overlay fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
    <div class="bg-brandSurface border border-brandBorder rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
      <button onclick="closeModal('loginModal')" class="absolute top-4 right-4 text-brandSecondary hover:text-brandPrimary p-1" aria-label="Cerrar">
        <i class="fa-solid fa-xmark text-xl"></i>
      </button>
      <div class="mb-6">
        <span class="text-[10px] font-bold tracking-widest text-brandSecondary uppercase">ACCESO CLIENTES</span>
        <h3 class="text-2xl font-extrabold text-brandPrimary">Iniciar Sesión</h3>
      </div>
      <form onsubmit="handleFormSubmit(event, 'Sesión iniciada correctamente.')" class="space-y-4 text-sm">
        <div>
          <label class="block font-semibold text-brandPrimary mb-1">Correo Electrónico *</label>
          <input type="email" required placeholder="tu@correo.com" class="w-full px-3.5 py-2.5 rounded-xl border border-brandBorder bg-white focus:outline-none focus:border-brandPrimary">
        </div>
        <div>
          <label class="block font-semibold text-brandPrimary mb-1">Contraseña *</label>
          <input type="password" required placeholder="••••••••" class="w-full px-3.5 py-2.5 rounded-xl border border-brandBorder bg-white focus:outline-none focus:border-brandPrimary">
        </div>
        <div class="flex justify-between items-center text-xs">
          <label class="flex items-center gap-1.5 text-brandSecondary">
            <input type="checkbox" class="rounded border-brandBorder"> Recordarme
          </label>
          <a href="#" class="text-brandPrimary font-semibold hover:underline">¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit" class="w-full py-3 bg-brandPrimary text-white font-bold rounded-xl hover:bg-brandAccent transition-colors mt-2">
          Ingresar al Panel
        </button>
      </form>
    </div>
  </div>

  <!-- ==================== MODAL: SOLICITUD DE SERVICIO ==================== -->
  <div id="serviceModal" class="modal-overlay fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
    <div class="bg-brandSurface border border-brandBorder rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
      <button onclick="closeModal('serviceModal')" class="absolute top-4 right-4 text-brandSecondary hover:text-brandPrimary p-1" aria-label="Cerrar">
        <i class="fa-solid fa-xmark text-xl"></i>
      </button>
      <div class="mb-6">
        <span class="text-[10px] font-bold tracking-widest text-brandSecondary uppercase">FORMULARIO DE ATENCIÓN</span>
        <h3 id="modalServiceName" class="text-2xl font-extrabold text-brandPrimary">Solicitar Servicio</h3>
      </div>

      <form onsubmit="sendWhatsAppRequest(event)" class="space-y-4 text-sm">
        <div>
          <label class="block font-semibold text-brandPrimary mb-1">Nombre Completo *</label>
          <input id="reqName" type="text" required placeholder="Ej: Carlos Mendoza" class="w-full px-3.5 py-2.5 rounded-xl border border-brandBorder bg-white focus:outline-none">
        </div>
        <div>
          <label class="block font-semibold text-brandPrimary mb-1">Universidad</label>
          <input id="reqUni" type="text" list="listaUniversidades" autocomplete="off" placeholder="Ej: PUCP, UPC, UNI y otras" class="w-full px-3.5 py-2.5 rounded-xl border border-brandBorder bg-white focus:outline-none">
          <datalist id="listaUniversidades">
            <option value="PUCP - Pontificia Universidad Católica del Perú"></option>
            <option value="UPC - Universidad Peruana de Ciencias Aplicadas"></option>
            <option value="UNI - Universidad Nacional de Ingeniería"></option>
            <option value="Universidad de Lima"></option>
            <option value="Universidad del Pacífico"></option>
            <option value="USIL - Universidad San Ignacio de Loyola"></option>
            <option value="URP - Universidad Ricardo Palma"></option>
            <option value="Particular / Empresa"></option>
          </datalist>
        </div>
        <div>
          <label class="block font-semibold text-brandPrimary mb-1">Tiempo de entrega deseado *</label>
          <select id="reqTime" class="w-full px-3.5 py-2.5 rounded-xl border border-brandBorder bg-white focus:outline-none">
            <option>Urgente (24 a 48 horas)</option>
            <option selected>3 a 5 días</option>
            <option>1 semana</option>
            <option>2 semanas o más</option>
          </select>
        </div>
        <div>
          <label class="block font-semibold text-brandPrimary mb-1">Detalles de tu proyecto *</label>
          <textarea id="reqDesc" rows="3" required placeholder="Describe brevemente lo que necesitas: escala, número de pisos, entregables..." class="w-full px-3.5 py-2.5 rounded-xl border border-brandBorder bg-white focus:outline-none"></textarea>
        </div>

        <div class="pt-2">
          <button type="submit" class="w-full py-3.5 bg-brandGreen text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 text-base">
            <i class="fa-brands fa-whatsapp text-xl"></i> Enviar por WhatsApp
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- ==================== MODAL: CLASES (9 CLASES) ==================== -->
  <div id="clasesModal" class="modal-overlay fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
    <div class="bg-brandSurface border border-brandBorder rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
      <button onclick="closeModal('clasesModal')" class="absolute top-4 right-4 text-brandSecondary hover:text-brandPrimary p-1" aria-label="Cerrar">
        <i class="fa-solid fa-xmark text-xl"></i>
      </button>
      <div class="mb-6">
        <span class="text-[10px] font-bold tracking-widest text-brandSecondary uppercase">CAPACITACIÓN</span>
        <h3 class="text-2xl font-extrabold text-brandPrimary">Clases por programa y nivel</h3>
      </div>

      <div class="space-y-6">
        <!-- Revit -->
        <div>
          <h4 class="text-lg font-bold text-brandPrimary mb-3 flex items-center gap-2">
            <span class="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center text-sm font-bold">R</span>
            Revit
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button class="bg-white border border-brandBorder rounded-xl px-4 py-3 text-sm font-semibold text-brandPrimary hover:bg-brandBg transition-colors">Nivel Básico</button>
            <button class="bg-white border border-brandBorder rounded-xl px-4 py-3 text-sm font-semibold text-brandPrimary hover:bg-brandBg transition-colors">Nivel Intermedio</button>
            <button class="bg-white border border-brandBorder rounded-xl px-4 py-3 text-sm font-semibold text-brandPrimary hover:bg-brandBg transition-colors">Nivel Avanzado</button>
          </div>
        </div>

        <!-- AutoCAD -->
        <div>
          <h4 class="text-lg font-bold text-brandPrimary mb-3 flex items-center gap-2">
            <span class="w-8 h-8 bg-red-600 text-white rounded flex items-center justify-center text-sm font-bold">A</span>
            AutoCAD
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button class="bg-white border border-brandBorder rounded-xl px-4 py-3 text-sm font-semibold text-brandPrimary hover:bg-brandBg transition-colors">Nivel Básico</button>
            <button class="bg-white border border-brandBorder rounded-xl px-4 py-3 text-sm font-semibold text-brandPrimary hover:bg-brandBg transition-colors">Nivel Intermedio</button>
            <button class="bg-white border border-brandBorder rounded-xl px-4 py-3 text-sm font-semibold text-brandPrimary hover:bg-brandBg transition-colors">Nivel Avanzado</button>
          </div>
        </div>

        <!-- SketchUp -->
        <div>
          <h4 class="text-lg font-bold text-brandPrimary mb-3 flex items-center gap-2">
            <span class="w-8 h-8 bg-amber-600 text-white rounded flex items-center justify-center text-sm font-bold">S</span>
            SketchUp
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button class="bg-white border border-brandBorder rounded-xl px-4 py-3 text-sm font-semibold text-brandPrimary hover:bg-brandBg transition-colors">Nivel Básico</button>
            <button class="bg-white border border-brandBorder rounded-xl px-4 py-3 text-sm font-semibold text-brandPrimary hover:bg-brandBg transition-colors">Nivel Intermedio</button>
            <button class="bg-white border border-brandBorder rounded-xl px-4 py-3 text-sm font-semibold text-brandPrimary hover:bg-brandBg transition-colors">Nivel Avanzado</button>
          </div>
        </div>
      </div>

      <div class="pt-6 border-t border-brandBorder">
        <p class="text-sm text-brandSecondary mb-4">Todas las clases son en vivo y adaptadas a tus propios proyectos prácticos.</p>
        <button onclick="selectServiceModal('Asesorías personalizadas'); closeModal('clasesModal');" class="w-full py-3 bg-brandGreen text-white font-bold rounded-xl hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2">
          <i class="fa-brands fa-whatsapp"></i> Cotizar clases por WhatsApp
        </button>
      </div>
    </div>
  </div>

  <!-- Aviso flotante -->
  <div id="toast" class="fixed bottom-6 right-6 bg-brandPrimary text-white px-5 py-3 rounded-xl shadow-2xl hidden items-center gap-3 z-[60] text-sm border border-brandAccent">
    <i class="fa-solid fa-circle-check text-brandGreen text-lg"></i>
    <span id="toastText">Acción completada con éxito.</span>
  </div>

  <!-- Botón flotante de WhatsApp -->
  <a href="https://wa.me/51934403147?text=Hola%20Micky%20Arquitectos%2C%20quiero%20cotizar%20un%20servicio."
     target="_blank" rel="noopener"
     class="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-brandGreen text-white shadow-xl shadow-black/25 flex items-center justify-center hover:scale-105 transition-transform"
     aria-label="Escribir por WhatsApp">
    <i class="fa-brands fa-whatsapp text-2xl"></i>
  </a>
  `;
})();
