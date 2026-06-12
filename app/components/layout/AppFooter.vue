<template>
  <footer id="contacto" class="footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <NuxtLink to="/" class="brand-link">
          <img
            src="/images/LogoPulsar.png"
            alt="Pulsar Tecnologías de Seguridad y Control de Acceso"
            class="footer-logo"
          >
        </NuxtLink>

        <p>
          Plataforma especializada en productos de videovigilancia, control de acceso,
          automatización de portones e intercomunicación.
        </p>
      </div>

      <div class="footer-column">
        <h3>Navegación</h3>

        <NuxtLink to="/">Inicio</NuxtLink>
        <NuxtLink to="/catalogo">Catálogo</NuxtLink>
        <NuxtLink to="/#proceso">Cómo comprar</NuxtLink>
        <NuxtLink to="/#contacto">Contacto</NuxtLink>
      </div>

      <div class="footer-column">
        <h3>Información legal</h3>

        <NuxtLink to="/terminos-y-condiciones">
          Términos y Condiciones
        </NuxtLink>

        <NuxtLink to="/aviso-de-privacidad">
          Aviso de Privacidad
        </NuxtLink>
      </div>

      <div class="footer-column">
        <h3>Atención</h3>

        <span>Compra con confirmación por WhatsApp.</span>
        <span>Pagos por transferencia bancaria.</span>
        <span>Validación manual del comprobante.</span>

        <a
          class="contact-email"
          href="mailto:gerencia@pulsartecnologias.com"
        >
          gerencia@pulsartecnologias.com
        </a>
      </div>
    </div>

    <div class="container footer-bottom">
      <span>© 2026 Pulsar MarketPlace. Todos los derechos reservados.</span>
      <span>Tecnologías de seguridad y control de acceso.</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid rgba(148, 163, 184, 0.14);
  padding: 46px 0 22px;
  color: #94a3b8;
  background:
    radial-gradient(circle at bottom left, rgba(34, 211, 238, 0.08), transparent 28rem),
    rgba(2, 6, 23, 0.96);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr 0.9fr 1fr;
  gap: 34px;
}

.footer-brand {
  display: grid;
  gap: 18px;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  text-decoration: none;
}

.footer-logo {
  width: 240px;
  height: auto;
  display: block;
  object-fit: contain;
  filter: drop-shadow(0 12px 30px rgba(37, 99, 235, 0.18));
}

.footer-brand p {
  max-width: 420px;
  margin: 0;
  color: #94a3b8;
  line-height: 1.7;
}

.footer-column {
  display: grid;
  align-content: start;
  gap: 10px;
}

.footer-column h3 {
  margin: 0 0 8px;
  color: white;
  font-size: 15px;
}

.footer-column a,
.footer-column span {
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  line-height: 1.6;
}

.footer-column a:hover {
  color: #67e8f9;
}

.contact-email {
  margin-top: 8px;
  color: #67e8f9 !important;
  font-weight: 700;
  word-break: break-word;
}

.contact-email:hover {
  color: white !important;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-top: 34px;
  padding-top: 22px;
  border-top: 1px solid rgba(148, 163, 184, 0.12);
  font-size: 13px;
}

@media (max-width: 1050px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-logo {
    width: 210px;
  }

  .footer-bottom {
    flex-direction: column;
  }
}
</style>