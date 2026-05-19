<script setup lang="ts">
import { products } from '~/data/products'

const { cartItems, totalItems, subtotal } = useCart()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(price)
}

const previewCartProducts = computed(() => {
  return cartItems.value.slice(0, 2)
})

const previewSubtotal = computed(() => {
  return previewCartProducts.value.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)
})
</script>

<template>
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
          <NuxtLink class="btn btn-primary" to="/catalogo">Explorar productos</NuxtLink>
          <a class="btn btn-secondary" href="#compra">Ver proceso de compra</a>
        </div>

        <div class="hero-stats">
          <div>
            <strong>6</strong>
            <span>Categorías principales</span>
          </div>
          <div>
            <strong>{{ products.length }}</strong>
            <span>Productos iniciales</span>
          </div>
          <div>
            <strong>{{ totalItems }}</strong>
            <span>Productos en carrito</span>
          </div>
        </div>
      </div>

      <div class="hero-panel card">
        <div class="panel-header">
          <span>Resumen de compra</span>
          <small>Carrito</small>
        </div>

        <div v-if="cartItems.length" class="cart-preview">
          <div
            v-for="item in previewCartProducts"
            :key="item.product.id"
            class="cart-item"
          >
            <div class="product-image">{{ item.product.imageLabel }}</div>
            <div>
              <h3>{{ item.product.name }}</h3>
              <p>Cantidad: {{ item.quantity }}</p>
              <strong>{{ formatPrice(item.product.price * item.quantity) }}</strong>
            </div>
          </div>
        </div>

        <div v-else class="hero-empty-cart">
          <h3>Tu carrito está vacío</h3>
          <p>Agrega productos del catálogo para ver el resumen de compra.</p>
        </div>

        <div class="checkout-summary">
          <div>
            <span>Productos</span>
            <strong>{{ totalItems }}</strong>
          </div>
          <div>
            <span>Envío estimado</span>
            <strong>Por confirmar</strong>
          </div>
          <div class="total">
            <span>Subtotal</span>
            <strong>{{ formatPrice(previewSubtotal || subtotal) }}</strong>
          </div>
        </div>

        <div class="payment-note">
          Después de realizar el pedido, el cliente recibirá instrucciones para
          enviar su comprobante de pago por WhatsApp.
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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

.panel-header {
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

.hero-empty-cart {
  padding: 28px 18px;
  margin: 28px 0;
  border-radius: 18px;
  background: rgba(2, 6, 23, 0.45);
  text-align: center;
}

.hero-empty-cart h3 {
  margin: 0 0 8px;
}

.hero-empty-cart p {
  margin: 0;
  color: #94a3b8;
}

.checkout-summary {
  display: grid;
  gap: 12px;
  padding: 18px;
  border-radius: 18px;
  background: rgba(8, 47, 73, 0.35);
}

.checkout-summary div {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }
}
</style>
