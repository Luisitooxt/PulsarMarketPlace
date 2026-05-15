<script setup lang="ts">
import { computed, ref } from 'vue'
import { categories, products } from '~/data/products'
import type { Product } from '~/types/product'

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedAvailability = ref('all')
const selectedSort = ref('featured')
const isCartOpen = ref(false)
const isCheckoutOpen = ref(false)

const {
  cartItems,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  totalItems,
  subtotal
} = useCart()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(price)
}

const filteredProducts = computed(() => {
  let result = [...products]

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()

    result = result.filter((product) =>
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.categoryLabel.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value !== 'all') {
    result = result.filter((product) => product.category === selectedCategory.value)
  }

  if (selectedAvailability.value !== 'all') {
    result = result.filter((product) => product.availability === selectedAvailability.value)
  }

  if (selectedSort.value === 'price-asc') {
    result.sort((a, b) => a.price - b.price)
  }

  if (selectedSort.value === 'price-desc') {
    result.sort((a, b) => b.price - a.price)
  }

  if (selectedSort.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  }

  if (selectedSort.value === 'featured') {
    result.sort((a, b) => Number(b.featured) - Number(a.featured))
  }

  return result
})

const previewCartProducts = computed(() => {
  return cartItems.value.slice(0, 2)
})

const previewSubtotal = computed(() => {
  return previewCartProducts.value.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)
})

const handleAddToCart = (product: Product) => {
  addToCart(product)
  isCartOpen.value = true
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  selectedAvailability.value = 'all'
  selectedSort.value = 'featured'
}

const openCheckout = () => {
  if (!cartItems.value.length) {
    return
  }

  isCartOpen.value = false
  isCheckoutOpen.value = true
}
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
          <NuxtLink to="/catalogo">Productos</NuxtLink>
          <a href="#compra">Cómo comprar</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <button class="btn btn-primary cart-button" @click="isCartOpen = true">
          Ver carrito
          <span>{{ totalItems }}</span>
        </button>
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
            <h2>Catálogo de productos</h2>
            <p>
              Busca, filtra y ordena productos de seguridad electrónica. Por ahora usamos
              datos simulados; después conectaremos esta sección a la base de datos.
            </p>
          </div>

          <div class="catalog-toolbar card">
            <div class="search-box">
              <label for="search">Buscar producto</label>
              <input
                id="search"
                v-model="searchQuery"
                type="text"
                placeholder="Buscar por nombre, marca, SKU o categoría..."
              >
            </div>

            <div class="filter-grid">
              <div>
                <label for="category">Categoría</label>
                <select id="category" v-model="selectedCategory">
                  <option value="all">Todas las categorías</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>

              <div>
                <label for="availability">Disponibilidad</label>
                <select id="availability" v-model="selectedAvailability">
                  <option value="all">Todas</option>
                  <option value="disponible">Disponible</option>
                  <option value="bajo-stock">Bajo stock</option>
                  <option value="agotado">Agotado</option>
                </select>
              </div>

              <div>
                <label for="sort">Ordenar por</label>
                <select id="sort" v-model="selectedSort">
                  <option value="featured">Destacados</option>
                  <option value="price-asc">Precio menor a mayor</option>
                  <option value="price-desc">Precio mayor a menor</option>
                  <option value="name">Nombre A-Z</option>
                </select>
              </div>
            </div>

            <div class="catalog-summary">
              <span>
                Mostrando <strong>{{ filteredProducts.length }}</strong> de
                <strong>{{ products.length }}</strong> productos
              </span>

              <button class="btn btn-secondary" @click="resetFilters">
                Limpiar filtros
              </button>
            </div>
          </div>

          <div v-if="filteredProducts.length" class="featured-grid">
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
              @add-to-cart="handleAddToCart"
            />
          </div>

          <div v-else class="empty-state card">
            <h3>No encontramos productos</h3>
            <p>
              Intenta limpiar los filtros o buscar con otra palabra clave.
            </p>
            <button class="btn btn-primary" @click="resetFilters">
              Ver todos los productos
            </button>
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

    <aside class="cart-drawer" :class="{ 'is-open': isCartOpen }">
      <div class="cart-drawer-content card">
        <div class="cart-drawer-header">
          <div>
            <span class="badge">Carrito de compras</span>
            <h2>Tu pedido</h2>
          </div>

          <button class="close-button" @click="isCartOpen = false">
            ×
          </button>
        </div>

        <div v-if="cartItems.length" class="cart-list">
          <div
            v-for="item in cartItems"
            :key="item.product.id"
            class="drawer-item"
          >
            <div class="drawer-image">{{ item.product.imageLabel }}</div>

            <div class="drawer-info">
              <h3>{{ item.product.name }}</h3>
              <p>{{ item.product.brand }} • {{ item.product.sku }}</p>
              <strong>{{ formatPrice(item.product.price) }}</strong>

              <div class="quantity-controls">
                <button @click="decreaseQuantity(item.product.id)">−</button>
                <span>{{ item.quantity }}</span>
                <button @click="increaseQuantity(item.product.id)">+</button>
              </div>
            </div>

            <button class="remove-button" @click="removeFromCart(item.product.id)">
              Quitar
            </button>
          </div>
        </div>

        <div v-else class="drawer-empty">
          <h3>Tu carrito está vacío</h3>
          <p>Agrega productos para iniciar tu pedido.</p>
        </div>

        <div class="drawer-summary">
          <div>
            <span>Productos</span>
            <strong>{{ totalItems }}</strong>
          </div>

          <div>
            <span>Subtotal</span>
            <strong>{{ formatPrice(subtotal) }}</strong>
          </div>

          <p>
            El costo de envío y disponibilidad final se confirmarán antes de emitir el pedido.
          </p>

          <button
            class="btn btn-primary"
            :disabled="!cartItems.length"
            @click="openCheckout"
          >
            Continuar pedido
          </button>

          <button
            v-if="cartItems.length"
            class="btn btn-secondary"
            @click="clearCart"
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    </aside>

    <div
      v-if="isCartOpen"
      class="cart-overlay"
      @click="isCartOpen = false"
    />

    <CartCheckoutModal
      v-if="isCheckoutOpen"
      @close="isCheckoutOpen = false"
    />

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

.cart-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.cart-button span {
  min-width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: rgba(2, 6, 23, 0.35);
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
.checkout-summary div,
.catalog-summary,
.drawer-summary div,
.cart-drawer-header {
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

.product-image,
.drawer-image {
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
.checkout-summary strong,
.catalog-summary strong,
.drawer-summary strong,
.drawer-info strong {
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
.purchase-card h2,
.cart-drawer-header h2 {
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

.catalog-toolbar {
  padding: 24px;
  margin-bottom: 28px;
}

.search-box {
  margin-bottom: 18px;
}

.search-box label,
.filter-grid label {
  display: block;
  margin-bottom: 8px;
  color: #cbd5e1;
  font-weight: 700;
  font-size: 14px;
}

input,
select {
  width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 14px;
  padding: 13px 14px;
  background: rgba(2, 6, 23, 0.72);
  color: #e5f3ff;
  outline: none;
}

input:focus,
select:focus {
  border-color: rgba(34, 211, 238, 0.7);
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.catalog-summary {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid rgba(148, 163, 184, 0.14);
  gap: 16px;
}

.catalog-summary span {
  color: #cbd5e1;
}

.empty-state {
  padding: 44px;
  text-align: center;
}

.empty-state h3,
.drawer-empty h3 {
  margin: 0 0 8px;
  color: white;
}

.empty-state p,
.drawer-empty p {
  margin: 0 0 22px;
  color: #94a3b8;
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

.cart-drawer {
  position: fixed;
  top: 0;
  right: -460px;
  width: min(440px, 100%);
  height: 100vh;
  z-index: 50;
  transition: right 0.25s ease;
  padding: 14px;
}

.cart-drawer.is-open {
  right: 0;
}

.cart-drawer-content {
  height: 100%;
  overflow-y: auto;
  padding: 24px;
}

.close-button {
  width: 42px;
  height: 42px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 14px;
  background: rgba(2, 6, 23, 0.6);
  color: white;
  cursor: pointer;
  font-size: 26px;
}

.cart-list {
  display: grid;
  gap: 14px;
  margin: 20px 0;
}

.drawer-item {
  display: grid;
  grid-template-columns: 74px 1fr;
  gap: 14px;
  position: relative;
  padding: 14px;
  border-radius: 18px;
  background: rgba(2, 6, 23, 0.45);
}

.drawer-image {
  height: 74px;
  font-size: 13px;
}

.drawer-info h3 {
  margin: 0 0 6px;
  color: white;
  font-size: 15px;
}

.drawer-info p {
  margin: 0 0 8px;
  color: #94a3b8;
  font-size: 13px;
}

.quantity-controls {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding: 6px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.85);
}

.quantity-controls button {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: rgba(34, 211, 238, 0.18);
  color: #67e8f9;
  cursor: pointer;
  font-weight: 900;
}

.remove-button {
  position: absolute;
  right: 14px;
  bottom: 14px;
  border: none;
  background: transparent;
  color: #fca5a5;
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
}

.drawer-empty {
  padding: 34px 0;
  text-align: center;
}

.drawer-summary {
  display: grid;
  gap: 14px;
  padding-top: 18px;
  border-top: 1px solid rgba(148, 163, 184, 0.14);
}

.drawer-summary span,
.drawer-summary p {
  color: #94a3b8;
}

.drawer-summary p {
  line-height: 1.6;
  margin: 0;
  font-size: 14px;
}

.drawer-summary button {
  width: 100%;
}

.drawer-summary button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cart-overlay {
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(2, 6, 23, 0.62);
  backdrop-filter: blur(4px);
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
  .featured-grid,
  .filter-grid {
    grid-template-columns: 1fr;
  }

  .catalog-summary,
  .footer-content {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>