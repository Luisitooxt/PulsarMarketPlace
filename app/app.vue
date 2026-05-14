<script setup lang="ts">
import { products } from '~/data/products'

const featuredProducts = products.filter((product) => product.featured).slice(0, 6)
</script>

<template>
  <div class="page">
    <header class="navbar">
      <div class="container navbar-content">
        <a href="#" class="brand">
          <div class="brand-icon">P</div>
          <div>
            <strong>Pulsar MarketPlace</strong>
            <span>Seguridad electrónica y control de acceso</span>
          </div>
        </a>

        <nav class="nav-links">
          <a href="#categorias">Categorías</a>
          <a href="#productos">Productos</a>
          <a href="#compra">Cómo comprar</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <button class="btn btn-primary">Ver carrito</button>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-content">
            <span class="badge">Marketplace especializado en seguridad electrónica</span>

            <h1>
              Tecnología de seguridad para hogares, negocios y proyectos profesionales
            </h1>

            <p>
              Encuentra cámaras de videovigilancia, DVR/NVR, kits de seguridad,
              motores para portones, pistones automáticos e interphones en una tienda
              digital diseñada para cotizar y comprar de forma sencilla.
            </p>

            <div class="hero-actions">
              <a class="btn btn-primary" href="#productos">Explorar productos</a>
              <a class="btn btn-secondary" href="#compra">Ver proceso de compra</a>
            </div>

            <div class="hero-stats">
              <div>
                <strong>6</strong>
                <span>Categorías principales</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Catálogo disponible</span>
              </div>
              <div>
                <strong>MXN</strong>
                <span>Pago por transferencia</span>
              </div>
            </div>
          </div>

          <div class="hero-panel card">
            <div class="panel-header">
              <span>Resumen de compra</span>
              <small>Carrito</small>
            </div>

            <div class="cart-preview">
              <div class="cart-item">
                <div class="product-image">CAM</div>
                <div>
                  <h3>Cámara IP profesional</h3>
                  <p>Videovigilancia • Stock sujeto a disponibilidad</p>
                  <strong>$2,499 MXN</strong>
                </div>
              </div>

              <div class="cart-item">
                <div class="product-image">DVR</div>
                <div>
                  <h3>DVR/NVR de seguridad</h3>
                  <p>Grabación y monitoreo para proyectos</p>
                  <strong>$3,299 MXN</strong>
                </div>
              </div>
            </div>

            <div class="checkout-summary">
              <div>
                <span>Subtotal</span>
                <strong>$5,798 MXN</strong>
              </div>
              <div>
                <span>Envío estimado</span>
                <strong>Por confirmar</strong>
              </div>
              <div class="total">
                <span>Total</span>
                <strong>$5,798 MXN</strong>
              </div>
            </div>

            <div class="payment-note">
              Después de realizar el pedido, el cliente recibirá instrucciones para
              enviar su comprobante de pago por WhatsApp.
            </div>
          </div>
        </div>
      </section>

      <section id="categorias" class="section">
        <div class="container">
          <div class="section-heading">
            <span class="badge">Categorías principales</span>
            <h2>Productos especializados para seguridad electrónica</h2>
            <p>
              El catálogo público de Pulsar MarketPlace estará enfocado únicamente en
              las líneas de producto autorizadas para el proyecto.
            </p>
          </div>

          <div class="category-grid">
            <article class="category-card card">
              <span>01</span>
              <h3>Cámaras de videovigilancia</h3>
              <p>Cámaras IP, analógicas, domos, bullet y soluciones profesionales.</p>
            </article>

            <article class="category-card card">
              <span>02</span>
              <h3>DVR / NVR</h3>
              <p>Grabadores digitales y de red para sistemas de monitoreo.</p>
            </article>

            <article class="category-card card">
              <span>03</span>
              <h3>Kits de seguridad</h3>
              <p>Paquetes completos para instalaciones residenciales y comerciales.</p>
            </article>

            <article class="category-card card">
              <span>04</span>
              <h3>Motores para portones</h3>
              <p>Automatización de accesos vehiculares y portones eléctricos.</p>
            </article>

            <article class="category-card card">
              <span>05</span>
              <h3>Pistones automáticos</h3>
              <p>Sistemas para apertura automatizada de puertas y portones.</p>
            </article>

            <article class="category-card card">
              <span>06</span>
              <h3>Interphones</h3>
              <p>Comunicación, acceso y control para edificios y residencias.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="productos" class="section products-section">
        <div class="container">
          <div class="section-heading">
            <span class="badge">Catálogo inicial</span>
            <h2>Productos destacados</h2>
            <p>
              Estos productos son datos simulados para construir la primera versión funcional
              del catálogo. Después se conectarán a la base de datos y al sistema de sincronización.
            </p>
          </div>

          <div class="featured-grid">
            <ProductCard
              v-for="product in featuredProducts"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </section>

      <section id="compra" class="section">
        <div class="container purchase-card card">
          <div>
            <span class="badge">Proceso de compra</span>
            <h2>Compra con confirmación de pago por WhatsApp</h2>
            <p>
              El cliente podrá agregar productos al carrito, llenar sus datos de contacto
              y confirmar su pedido. Después recibirá instrucciones para realizar el pago
              por transferencia y enviar el comprobante por WhatsApp.
            </p>
          </div>

          <div class="purchase-steps">
            <div>
              <span>1</span>
              <p>Agrega productos al carrito</p>
            </div>
            <div>
              <span>2</span>
              <p>Llena tus datos de contacto y entrega</p>
            </div>
            <div>
              <span>3</span>
              <p>Confirma tu pedido</p>
            </div>
            <div>
              <span>4</span>
              <p>Realiza el pago por transferencia</p>
            </div>
            <div>
              <span>5</span>
              <p>Envía tu comprobante por WhatsApp</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer id="contacto" class="footer">
      <div class="container footer-content">
        <strong>Pulsar MarketPlace</strong>
        <span>Seguridad electrónica, automatización y control de acceso.</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(2, 6, 23, 0.86);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}

.navbar-content {
  min-height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #06b6d4, #2563eb);
  font-weight: 900;
  color: white;
}

.brand strong {
  display: block;
  font-size: 16px;
}

.brand span {
  display: block;
  color: #94a3b8;
  font-size: 12px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 22px;
  color: #cbd5e1;
  font-size: 14px;
}

.nav-links a:hover {
  color: #67e8f9;
}

.hero {
  padding: 96px 0 72px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 42px;
  align-items: center;
}

.hero-content h1 {
  margin: 22px 0;
  font-size: clamp(42px, 6vw, 76px);
  line-height: 0.95;
  letter-spacing: -0.06em;
}

.hero-content p {
  max-width: 720px;
  color: #b6c7d8;
  font-size: 18px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 32px;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 42px;
}

.hero-stats div {
  padding: 18px;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(148, 163, 184, 0.14);
}

.hero-stats strong {
  display: block;
  color: #67e8f9;
  font-size: 24px;
}

.hero-stats span {
  color: #94a3b8;
  font-size: 13px;
}

.hero-panel {
  padding: 26px;
}

.panel-header,
.footer-content,
.checkout-summary div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header span {
  color: white;
  font-weight: 800;
}

.panel-header small {
  color: #67e8f9;
  border: 1px solid rgba(34, 211, 238, 0.34);
  border-radius: 999px;
  padding: 6px 10px;
}

.cart-preview {
  display: grid;
  gap: 14px;
  margin: 28px 0;
}

.cart-item {
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 16px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(2, 6, 23, 0.5);
}

.product-image {
  height: 84px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.20), rgba(37, 99, 235, 0.3));
  color: #67e8f9;
  font-weight: 900;
}

.cart-item h3 {
  margin: 0 0 8px;
}

.cart-item p {
  color: #94a3b8;
  margin: 0 0 12px;
}

.cart-item strong,
.checkout-summary strong {
  color: #67e8f9;
}

.checkout-summary {
  display: grid;
  gap: 12px;
  padding: 18px;
  border-radius: 18px;
  background: rgba(8, 47, 73, 0.35);
}

.checkout-summary span {
  color: #94a3b8;
}

.checkout-summary .total {
  padding-top: 12px;
  border-top: 1px solid rgba(148, 163, 184, 0.18);
}

.payment-note {
  margin-top: 16px;
  color: #b6c7d8;
  font-size: 14px;
  line-height: 1.6;
}

.section-heading {
  max-width: 780px;
  margin-bottom: 34px;
}

.section-heading h2,
.purchase-card h2 {
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1;
  margin: 18px 0;
  letter-spacing: -0.04em;
}

.section-heading p,
.purchase-card p {
  color: #b6c7d8;
  line-height: 1.7;
}

.category-grid,
.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.category-card {
  padding: 24px;
}

.category-card span {
  color: #67e8f9;
  font-weight: 900;
}

.category-card h3 {
  margin: 14px 0 10px;
}

.category-card p {
  color: #94a3b8;
  line-height: 1.6;
}

.products-section {
  background: rgba(15, 23, 42, 0.28);
}

.purchase-card {
  padding: 34px;
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 30px;
  align-items: center;
}

.purchase-steps {
  display: grid;
  gap: 12px;
}

.purchase-steps div {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(8, 47, 73, 0.52);
  border: 1px solid rgba(34, 211, 238, 0.16);
}

.purchase-steps span {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(34, 211, 238, 0.18);
  color: #67e8f9;
  font-weight: 900;
}

.purchase-steps p {
  margin: 0;
}

.footer {
  border-top: 1px solid rgba(148, 163, 184, 0.14);
  padding: 28px 0;
  color: #94a3b8;
}

.footer strong {
  color: white;
}

@media (max-width: 900px) {
  .navbar-content {
    align-items: flex-start;
    flex-direction: column;
    padding: 18px 0;
  }

  .nav-links {
    flex-wrap: wrap;
  }

  .hero-grid,
  .purchase-card {
    grid-template-columns: 1fr;
  }

  .hero-stats,
  .category-grid,
  .featured-grid {
    grid-template-columns: 1fr;
  }

  .footer-content {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
}
</style>