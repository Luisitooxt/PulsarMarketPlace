<template>
  <header class="navbar">
    <div class="container navbar-content">
      <NuxtLink to="/" class="brand">
        <img
          src="/images/LogoPulsar.png"
          alt="Pulsar Tecnologías de Seguridad y Control de Acceso"
          class="brand-logo"
        >
      </NuxtLink>

      <nav class="nav-links">
        <NuxtLink to="/#categorias">Categorías</NuxtLink>
        <NuxtLink to="/catalogo">Productos</NuxtLink>
        <NuxtLink to="/#proceso">Cómo comprar</NuxtLink>
        <NuxtLink to="/#contacto">Contacto</NuxtLink>
      </nav>

      <button class="btn btn-primary cart-button" @click="openCart">
        Ver carrito
        <span>{{ totalItems }}</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const { totalItems, openCart } = useCart()
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgba(2, 6, 23, 0.9);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}

.navbar-content {
  min-height: 86px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.brand {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.brand-logo {
  width: 250px;
  height: 64px;
  display: block;
  object-fit: contain;
  object-position: left center;
  filter: drop-shadow(0 10px 24px rgba(37, 99, 235, 0.16));
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
  color: #cbd5e1;
  font-size: 15px;
}

.nav-links a {
  color: inherit;
  text-decoration: none;
  font-weight: 600;
}

.nav-links a:hover {
  color: #67e8f9;
}

.cart-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.cart-button span {
  min-width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: rgba(2, 6, 23, 0.35);
}

@media (max-width: 980px) {
  .navbar-content {
    flex-wrap: wrap;
    padding: 14px 0;
  }

  .brand-logo {
    width: 190px;
    height: 54px;
  }

  .nav-links {
    order: 3;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 620px) {
  .navbar-content {
    align-items: flex-start;
    flex-direction: column;
  }

  .brand-logo {
    width: 180px;
    height: 52px;
  }

  .nav-links {
    justify-content: flex-start;
    gap: 18px;
  }

  .cart-button {
    width: 100%;
    justify-content: center;
  }
}
</style>