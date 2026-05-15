<script setup lang="ts">
import { computed, ref } from 'vue'
import { categories, products } from '~/data/products'
import type { Product } from '~/types/product'

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedAvailability = ref('all')
const selectedSort = ref('featured')
const productAddedName = ref('')

const { addToCart, totalItems, openCart } = useCart()

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

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  selectedAvailability.value = 'all'
  selectedSort.value = 'featured'
}

const handleAddToCart = (product: Product) => {
  addToCart(product)
  productAddedName.value = product.name

  setTimeout(() => {
    productAddedName.value = ''
  }, 2200)
}
</script>

<template>
  <main class="catalog-page">
    <header class="catalog-navbar">
      <div class="container catalog-navbar-content">
        <NuxtLink to="/" class="brand">
          <div class="brand-icon">P</div>
          <div>
            <strong>Pulsar MarketPlace</strong>
            <span>Catálogo de seguridad electrónica</span>
          </div>
        </NuxtLink>

        <nav class="nav-links">
          <NuxtLink to="/">Inicio</NuxtLink>
          <NuxtLink to="/catalogo">Catálogo</NuxtLink>
          <a href="#productos">Productos</a>
        </nav>

        <button class="btn btn-primary cart-button" @click="openCart">
  Carrito
  <span>{{ totalItems }}</span>
</button>
      </div>
    </header>

    <section class="catalog-hero">
      <div class="container catalog-hero-grid">
        <div>
          <span class="badge">Catálogo especializado</span>
          <h1>Encuentra equipos de seguridad electrónica para tu proyecto</h1>
          <p>
            Explora cámaras de videovigilancia, DVR/NVR, kits de seguridad, motores para
            portones, pistones automáticos e interphones. Usa los filtros para encontrar
            rápidamente el producto que necesitas.
          </p>
        </div>

        <div class="catalog-info-card card">
          <strong>{{ products.length }}</strong>
          <span>productos iniciales</span>
          <p>
            Este catálogo usa datos simulados. Más adelante se conectará a base de datos
            y a proveedores oficiales.
          </p>
        </div>
      </div>
    </section>

    <section id="productos" class="section">
      <div class="container">
        <div v-if="productAddedName" class="added-toast">
          Producto agregado al carrito: <strong>{{ productAddedName }}</strong>
        </div>

        <div class="catalog-layout">
          <aside class="filters-panel card">
            <div class="filters-header">
              <h2>Filtros</h2>
              <button class="clear-button" @click="resetFilters">
                Limpiar
              </button>
            </div>

            <div class="filter-control">
              <label for="search">Buscar producto</label>
              <input
                id="search"
                v-model="searchQuery"
                type="text"
                placeholder="Nombre, marca, SKU..."
              >
            </div>

            <div class="filter-control">
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

            <div class="filter-control">
              <label for="availability">Disponibilidad</label>
              <select id="availability" v-model="selectedAvailability">
                <option value="all">Todas</option>
                <option value="disponible">Disponible</option>
                <option value="bajo-stock">Bajo stock</option>
                <option value="agotado">Agotado</option>
              </select>
            </div>

            <div class="filter-control">
              <label for="sort">Ordenar por</label>
              <select id="sort" v-model="selectedSort">
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio menor a mayor</option>
                <option value="price-desc">Precio mayor a menor</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>
          </aside>

          <section class="catalog-results">
            <div class="results-header">
              <div>
                <span class="badge">Productos</span>
                <h2>Catálogo completo</h2>
              </div>

              <p>
                Mostrando <strong>{{ filteredProducts.length }}</strong> de
                <strong>{{ products.length }}</strong> productos
              </p>
            </div>

            <div v-if="filteredProducts.length" class="products-grid">
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
          </section>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.catalog-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(34, 211, 238, 0.14), transparent 32rem),
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.10), transparent 32rem),
    #020617;
  color: #e5f3ff;
}

.catalog-navbar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(2, 6, 23, 0.86);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}

.catalog-navbar-content {
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
  color: inherit;
  text-decoration: none;
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

.nav-links a {
  color: inherit;
  text-decoration: none;
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

.catalog-hero {
  padding: 84px 0 56px;
}

.catalog-hero-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
  align-items: center;
}

.catalog-hero h1 {
  margin: 18px 0;
  max-width: 860px;
  font-size: clamp(42px, 6vw, 76px);
  line-height: 0.95;
  letter-spacing: -0.06em;
}

.catalog-hero p {
  max-width: 760px;
  color: #b6c7d8;
  font-size: 18px;
  line-height: 1.7;
}

.catalog-info-card {
  padding: 28px;
}

.catalog-info-card strong {
  display: block;
  color: #67e8f9;
  font-size: 52px;
  line-height: 1;
}

.catalog-info-card span {
  display: block;
  margin-top: 8px;
  color: white;
  font-weight: 800;
}

.catalog-info-card p {
  margin: 18px 0 0;
  color: #94a3b8;
  font-size: 14px;
}

.added-toast {
  position: sticky;
  top: 92px;
  z-index: 15;
  margin-bottom: 18px;
  padding: 14px 18px;
  border-radius: 16px;
  background: rgba(22, 163, 74, 0.16);
  border: 1px solid rgba(134, 239, 172, 0.28);
  color: #bbf7d0;
}

.added-toast strong {
  color: white;
}

.catalog-layout {
  display: grid;
  grid-template-columns: 290px 1fr;
  gap: 24px;
  align-items: start;
}

.filters-panel {
  padding: 22px;
  position: sticky;
  top: 110px;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.filters-header h2 {
  margin: 0;
  color: white;
}

.clear-button {
  border: none;
  background: transparent;
  color: #67e8f9;
  cursor: pointer;
  font-weight: 800;
}

.filter-control {
  margin-bottom: 18px;
}

.filter-control label {
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

.results-header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-end;
  margin-bottom: 24px;
}

.results-header h2 {
  margin: 14px 0 0;
  font-size: clamp(30px, 4vw, 46px);
  line-height: 1;
  letter-spacing: -0.04em;
}

.results-header p {
  color: #cbd5e1;
}

.results-header strong {
  color: #67e8f9;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.empty-state {
  padding: 44px;
  text-align: center;
}

.empty-state h3 {
  margin: 0 0 8px;
  color: white;
}

.empty-state p {
  margin: 0 0 22px;
  color: #94a3b8;
}

@media (max-width: 1100px) {
  .catalog-layout {
    grid-template-columns: 1fr;
  }

  .filters-panel {
    position: static;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .catalog-hero-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .catalog-navbar-content {
    align-items: flex-start;
    flex-direction: column;
    padding: 18px 0;
  }

  .nav-links {
    flex-wrap: wrap;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .results-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>