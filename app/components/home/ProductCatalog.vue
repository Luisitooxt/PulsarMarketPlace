<script setup lang="ts">
import { categories, products } from '~/data/products'
import ProductCard from '~/components/product/ProductCard.vue'

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedAvailability = ref('all')
const selectedSort = ref('featured')

const { addToCart, openCart } = useCart()

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

const handleAddToCart = (product: any) => {
  addToCart(product)
  openCart()
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  selectedAvailability.value = 'all'
  selectedSort.value = 'featured'
}
</script>

<template>
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
</template>

<style scoped>
.section {
  padding: 80px 0;
}

.products-section {
  background: rgba(15, 23, 42, 0.28);
}

.section-heading {
  max-width: 780px;
  margin-bottom: 34px;
}

.section-heading h2 {
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1;
  margin: 18px 0;
  letter-spacing: -0.04em;
}

.section-heading p {
  color: #b6c7d8;
  line-height: 1.7;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid rgba(148, 163, 184, 0.14);
  gap: 16px;
}

.catalog-summary span {
  color: #cbd5e1;
}

.catalog-summary strong {
  color: #67e8f9;
}

.featured-grid {
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

@media (max-width: 900px) {
  .filter-grid {
    grid-template-columns: 1fr;
  }

  .featured-grid {
    grid-template-columns: 1fr;
  }

  .catalog-summary {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
