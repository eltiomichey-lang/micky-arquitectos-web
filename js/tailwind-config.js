/* Configuración compartida de Tailwind (debe cargarse después del CDN) */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brandBg: '#FAFAF7',        /* Fondo general, blanco cálido */
        brandSurface: '#FFFFFF',   /* Tarjetas */
        brandBorder: '#E8E6E0',    /* Bordes finos */
        brandPrimary: '#1F1F1F',   /* Texto y botones principales */
        brandSecondary: '#6B6B66', /* Texto secundario */
        brandAccent: '#1F6F54',    /* Verde de marca (marca y acción) */
        brandGreen: '#25D366'      /* WhatsApp Green (SOLO WhatsApp) */
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
        display: ['Sora', 'Segoe UI', 'sans-serif']
      }
    }
  }
};
