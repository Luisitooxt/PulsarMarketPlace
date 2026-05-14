<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  product: Product
}>()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(price)
}

const availabilityLabel = {
  disponible: 'Disponible',
  'bajo-stock': 'Bajo stock',
  agotado: 'Agotado'
}

const availabilityClass = {
  disponible: 'is-available',
  'bajo-stock': 'is-low',
  agotado: 'is-out'
}
</script>

<template>
  <article class="product-card card">
    <div class="product-media">
      <span>{{ product.imageLabel }}</span>
    </div>

    <div class="product-info">
      <div class="product-meta">
        <span>{{ product.categoryLabel }}</span>
        <small :class="availabilityClass[product.availability]">
          {{ availabilityLabel[product.availability] }}
        </small>
      </div>

      <h3>{{ product.name }}</h3>

      <p>{{ product.shortDescription }}</p>

      <div class="product-details">
        <span>Marca: {{ product.brand }}</span>
        <span>SKU: {{ product.sku }}</span>
      </div>

      <ul>
        <li v-for="spec in product.specs.slice(0, 3)" :key="spec">
          {{ spec }}
        </li>
      </ul>

      <div class="price-row">
        <div>
          <strong>{{ formatPrice(product.price) }}</strong>
          <span v-if="product.oldPrice">{{ formatPrice(product.oldPrice) }}</span>
        </div>

        <button class="btn btn-secondary" :disabled="product.availability === 'agotado'">
          {{ product.availability === 'agotado' ? 'Agotado' : 'Agregar' }}
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.product-media {
  height: 190px;
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at center, rgba(34, 211, 238, 0.24), transparent 70%),
    rgba(2, 6, 23, 0.72);
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}

.product-media span {
  color: #67e8f9;
  font-size: 34px;
  font-weight: 900;
  letter-spacing: -0.06em;
}

.product-info {
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 14px;
}

.product-meta span {
  color: #67e8f9;
  font-size: 13px;
  font-weight: 800;
}

.product-meta small {
  border-radius: 999px;
  padding: 6px 9px;
  font-size: 12px;
  font-weight: 800;
}

.is-available {
  color: #86efac;
  background: rgba(22, 163, 74, 0.14);
}

.is-low {
  color: #fde68a;
  background: rgba(217, 119, 6, 0.14);
}

.is-out {
  color: #fecaca;
  background: rgba(220, 38, 38, 0.14);
}

.product-info h3 {
  margin: 0 0 10px;
  color: white;
  line-height: 1.2;
}

.product-info p {
  color: #94a3b8;
  line-height: 1.6;
  margin: 0 0 14px;
}

.product-details {
  display: grid;
  gap: 6px;
  color: #b6c7d8;
  font-size: 13px;
  margin-bottom: 14px;
}

ul {
  margin: 0 0 20px;
  padding-left: 18px;
  color: #cbd5e1;
  line-height: 1.7;
  font-size: 14px;
}

.price-row {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.price-row strong {
  display: block;
  color: #67e8f9;
  font-size: 22px;
}

.price-row span {
  color: #64748b;
  text-decoration: line-through;
  font-size: 14px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>