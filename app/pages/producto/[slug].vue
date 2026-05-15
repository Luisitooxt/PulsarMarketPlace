<script setup lang="ts">
import { computed, ref } from 'vue'
import { products } from '~/data/products'

const route = useRoute()
const router = useRouter()

const { addToCart } = useCart()

const productAdded = ref(false)

const product = computed(() => {
  return products.find((item) => item.slug === route.params.slug)
})

const relatedProducts = computed(() => {
  if (!product.value) {
    return []
  }

  return products
    .filter((item) => item.category === product.value?.category && item.id !== product.value.id)
    .slice(0, 3)
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(price)
}

const availabilityLabel = computed(() => {
  if (!product.value) {
    return ''
  }

  const labels = {
    disponible: 'Disponible',
    'bajo-stock': 'Bajo stock',
    agotado: 'Agotado'
  }

  return labels[product.value.availability]
})

const addProductToCart = () => {
  if (!product.value || product.value.availability === 'agotado') {
    return
  }

  addToCart(product.value)
  productAdded.value = true

  setTimeout(() => {
    productAdded.value = false
  }, 2200)
}

const goBack = () => {
  router.push('/#productos')
}
</script>

<template>
  <main class="product-page">
    <section v-if="product" class="product-detail">
      <div class="container">
        <button class="back-button" @click="goBack">
          ← Volver al catálogo
        </button>

        <div class="product-layout">
          <aside class="thumbnail-column">
            <button class="thumbnail is-active">
              {{ product.imageLabel }}
            </button>

            <button class="thumbnail">
              {{ product.categoryLabel.slice(0, 3).toUpperCase() }}
            </button>

            <button class="thumbnail">
              {{ product.brand.slice(0, 3).toUpperCase() }}
            </button>
          </aside>

          <section class="product-gallery card">
            <div class="product-main-image">
              <span>{{ product.imageLabel }}</span>
            </div>
          </section>

          <section class="product-info">
            <span class="badge">{{ product.categoryLabel }}</span>

            <h1>{{ product.name }}</h1>

            <p class="description">
              {{ product.shortDescription }}
            </p>

            <ul class="feature-list">
              <li v-for="spec in product.specs" :key="spec">
                {{ spec }}
              </li>
            </ul>

            <div class="technical-data">
              <div>
                <span>Modelo</span>
                <strong>{{ product.sku }}</strong>
              </div>

              <div>
                <span>Marca</span>
                <strong>{{ product.brand }}</strong>
              </div>

              <div>
                <span>Categoría</span>
                <strong>{{ product.categoryLabel }}</strong>
              </div>

              <div>
                <span>Disponibilidad</span>
                <strong>{{ availabilityLabel }}</strong>
              </div>
            </div>
          </section>

          <aside class="purchase-panel card">
            <span class="badge">Compra segura</span>

            <div class="price-box">
              <span>Precio final</span>
              <strong>{{ formatPrice(product.price) }}</strong>
              <small v-if="product.oldPrice">
                Antes {{ formatPrice(product.oldPrice) }}
              </small>
            </div>

            <div class="stock-box">
              <span>Stock estimado</span>
              <strong>{{ product.stock }} unidades</strong>
              <small>
                La disponibilidad final se confirma antes de emitir el pedido.
              </small>
            </div>

            <button
              class="btn btn-primary"
              :disabled="product.availability === 'agotado'"
              @click="addProductToCart"
            >
              {{
                product.availability === 'agotado'
                  ? 'Producto agotado'
                  : productAdded
                    ? 'Producto agregado'
                    : 'Agregar al carrito'
              }}
            </button>

            <p v-if="productAdded" class="added-message">
              Producto agregado al carrito correctamente.
            </p>

            <button class="btn btn-secondary" @click="goBack">
              Seguir comprando
            </button>

            <div class="payment-info">
              <h3>Proceso de compra</h3>
              <p>
                Después de confirmar tu pedido, recibirás instrucciones para realizar el pago
                por transferencia y enviar tu comprobante por WhatsApp.
              </p>
            </div>
          </aside>
        </div>

        <section v-if="relatedProducts.length" class="related-section">
          <div class="section-heading">
            <span class="badge">Productos relacionados</span>
            <h2>También podrían interesarte</h2>
          </div>

          <div class="related-grid">
            <ProductCard
              v-for="item in relatedProducts"
              :key="item.id"
              :product="item"
              @add-to-cart="addToCart"
            />
          </div>
        </section>
      </div>
    </section>

    <section v-else class="not-found">
      <div class="container">
        <div class="not-found-card card">
          <h1>Producto no encontrado</h1>
          <p>
            El producto que buscas no existe o ya no está disponible en el catálogo.
          </p>
          <button class="btn btn-primary" @click="goBack">
            Volver al catálogo
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.product-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(34, 211, 238, 0.14), transparent 32rem),
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.10), transparent 32rem),
    #020617;
  color: #e5f3ff;
}

.product-detail {
  padding: 34px 0 80px;
}

.back-button {
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(15, 23, 42, 0.78);
  color: #cbd5e1;
  border-radius: 14px;
  padding: 12px 16px;
  margin-bottom: 24px;
  cursor: pointer;
  font-weight: 700;
}

.back-button:hover {
  color: #67e8f9;
  border-color: rgba(34, 211, 238, 0.4);
}

.product-layout {
  display: grid;
  grid-template-columns: 92px minmax(360px, 1fr) minmax(320px, 0.8fr) 330px;
  gap: 22px;
  align-items: start;
}

.thumbnail-column {
  display: grid;
  gap: 14px;
}

.thumbnail {
  min-height: 76px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(15, 23, 42, 0.7);
  color: #67e8f9;
  font-weight: 900;
  cursor: pointer;
}

.thumbnail.is-active {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}

.product-gallery {
  min-height: 560px;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.product-main-image {
  width: min(520px, 92%);
  aspect-ratio: 1 / 1;
  border-radius: 34px;
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at center, rgba(34, 211, 238, 0.28), transparent 58%),
    linear-gradient(135deg, rgba(15, 23, 42, 0.88), rgba(2, 6, 23, 0.95));
}

.product-main-image span {
  font-size: clamp(58px, 8vw, 116px);
  font-weight: 1000;
  color: #67e8f9;
  letter-spacing: -0.09em;
}

.product-info h1 {
  margin: 18px 0 16px;
  color: white;
  font-size: clamp(32px, 4vw, 52px);
  line-height: 1.05;
  letter-spacing: -0.05em;
}

.description {
  color: #b6c7d8;
  font-size: 17px;
  line-height: 1.7;
}

.feature-list {
  display: grid;
  gap: 14px;
  padding: 0;
  margin: 26px 0;
  list-style: none;
}

.feature-list li {
  position: relative;
  padding-left: 30px;
  color: #cbd5e1;
  font-size: 16px;
  line-height: 1.6;
}

.feature-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  top: 0;
  color: #34d399;
  font-weight: 900;
}

.technical-data {
  display: grid;
  gap: 14px;
  padding-top: 24px;
  border-top: 1px solid rgba(148, 163, 184, 0.16);
}

.technical-data div {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 14px;
}

.technical-data span {
  color: #64748b;
}

.technical-data strong {
  color: #dbeafe;
}

.purchase-panel {
  padding: 24px;
  position: sticky;
  top: 96px;
}

.price-box,
.stock-box {
  display: grid;
  gap: 8px;
  margin-top: 22px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}

.price-box span,
.stock-box span {
  color: #94a3b8;
}

.price-box strong {
  color: #67e8f9;
  font-size: 36px;
  line-height: 1;
}

.price-box small,
.stock-box small {
  color: #94a3b8;
  line-height: 1.5;
}

.stock-box strong {
  color: #dbeafe;
}

.purchase-panel .btn {
  width: 100%;
  margin-top: 16px;
}

.purchase-panel button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.added-message {
  margin: 12px 0 0;
  color: #86efac;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
}

.payment-info {
  margin-top: 22px;
  padding: 18px;
  border-radius: 18px;
  background: rgba(8, 47, 73, 0.35);
  border: 1px solid rgba(34, 211, 238, 0.14);
}

.payment-info h3 {
  margin: 0 0 8px;
  color: white;
}

.payment-info p {
  color: #b6c7d8;
  line-height: 1.6;
  margin: 0;
  font-size: 14px;
}

.related-section {
  margin-top: 72px;
}

.section-heading {
  max-width: 760px;
  margin-bottom: 28px;
}

.section-heading h2 {
  font-size: clamp(30px, 4vw, 46px);
  line-height: 1;
  margin: 18px 0;
  letter-spacing: -0.04em;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.not-found {
  min-height: 100vh;
  display: grid;
  place-items: center;
}

.not-found-card {
  padding: 38px;
  text-align: center;
}

.not-found-card h1 {
  margin: 0 0 12px;
}

.not-found-card p {
  color: #94a3b8;
  margin-bottom: 24px;
}

@media (max-width: 1200px) {
  .product-layout {
    grid-template-columns: 80px 1fr 1fr;
  }

  .purchase-panel {
    grid-column: 2 / 4;
    position: static;
  }
}

@media (max-width: 900px) {
  .product-layout {
    grid-template-columns: 1fr;
  }

  .thumbnail-column {
    grid-template-columns: repeat(3, 1fr);
  }

  .product-gallery {
    min-height: 360px;
  }

  .technical-data div {
    grid-template-columns: 1fr;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>