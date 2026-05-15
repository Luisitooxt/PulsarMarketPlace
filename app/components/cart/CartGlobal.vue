<script setup lang="ts">
const {
  cartItems,
  isCartOpen,
  isCheckoutOpen,
  openCart,
  closeCart,
  openCheckout,
  closeCheckout,
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
</script>

<template>
  <button class="floating-cart-button" @click="openCart">
    <span>Carrito</span>
    <strong>{{ totalItems }}</strong>
  </button>

  <aside class="cart-drawer" :class="{ 'is-open': isCartOpen }">
    <div class="cart-drawer-content card">
      <div class="cart-drawer-header">
        <div>
          <span class="badge">Carrito de compras</span>
          <h2>Tu pedido</h2>
        </div>

        <button class="close-button" @click="closeCart">
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
    @click="closeCart"
  />

  <CartCheckoutModal
    v-if="isCheckoutOpen"
    @close="closeCheckout"
  />
</template>

<style scoped>
.floating-cart-button {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 35;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(34, 211, 238, 0.34);
  border-radius: 999px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.95), rgba(37, 99, 235, 0.95));
  color: white;
  cursor: pointer;
  font-weight: 800;
  box-shadow: 0 18px 45px rgba(37, 99, 235, 0.28);
}

.floating-cart-button strong {
  min-width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: rgba(2, 6, 23, 0.38);
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: -460px;
  width: min(440px, 100%);
  height: 100vh;
  z-index: 60;
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

.cart-drawer-header,
.drawer-summary div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-drawer-header h2 {
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1;
  margin: 18px 0;
  letter-spacing: -0.04em;
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
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.20), rgba(37, 99, 235, 0.3));
  color: #67e8f9;
  font-weight: 900;
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

.drawer-info strong,
.drawer-summary strong {
  color: #67e8f9;
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

.drawer-empty h3 {
  margin: 0 0 8px;
  color: white;
}

.drawer-empty p {
  margin: 0 0 22px;
  color: #94a3b8;
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
  z-index: 50;
  background: rgba(2, 6, 23, 0.62);
  backdrop-filter: blur(4px);
}
</style>