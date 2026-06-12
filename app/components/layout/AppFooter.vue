<template>
  <footer id="contacto" class="footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <NuxtLink to="/" class="brand-link">
          <div class="footer-logo">P</div>

          <div>
            <strong>Pulsar MarketPlace</strong>
            <span>Seguridad electrónica, automatización y control de acceso.</span>
          </div>
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
      </div>
    </div>

    <div class="container footer-bottom">
      <span>© 2026 Pulsar MarketPlace. Todos los derechos reservados.</span>
      <span>Proyecto web en desarrollo.</span>
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
  gap: 16px;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: inherit;
  text-decoration: none;
}

.footer-logo {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: linear-gradient(135deg, #06b6d4, #2563eb);
  color: white;
  font-weight: 900;
  font-size: 20px;
  box-shadow: 0 16px 38px rgba(37, 99, 235, 0.22);
}

.footer-brand strong {
  display: block;
  color: white;
  font-size: 17px;
}

.footer-brand span {
  display: block;
  margin-top: 4px;
  color: #94a3b8;
  font-size: 13px;
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

  .footer-bottom {
    flex-direction: column;
  }
}
</style>