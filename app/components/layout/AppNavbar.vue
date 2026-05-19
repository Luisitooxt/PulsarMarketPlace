<script setup lang="ts">
const { totalItems, openCart } = useCart()
</script>

<template>
  <header class="navbar">
    <div class="container navbar-content">
      <NuxtLink to="/" class="brand">
        <div class="brand-icon">P</div>
        <div>
          <strong>Pulsar MarketPlace</strong>
          <span>Seguridad electrónica y control de acceso</span>
        </div>
      </NuxtLink>

      <nav class="nav-links">
        <a href="/#categorias">Categorías</a>
        <NuxtLink to="/catalogo">Productos</NuxtLink>
        <a href="/#compra">Cómo comprar</a>
        <a href="/#contacto">Contacto</a>
      </nav>

      <button class="btn btn-primary cart-button" @click="openCart">
        Ver carrito
        <span>{{ totalItems }}</span>
      </button>
    </div>
  </header>
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
  text-decoration: none;
  color: inherit;
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
  text-decoration: none;
  color: inherit;
  transition: color 0.2s;
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

@media (max-width: 900px) {
  .navbar-content {
    align-items: flex-start;
    flex-direction: column;
    padding: 18px 0;
  }

  .nav-links {
    flex-wrap: wrap;
    margin: 10px 0;
  }
}
</style>
