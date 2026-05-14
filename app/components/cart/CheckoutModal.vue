<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()

const { cartItems, subtotal, totalItems, clearCart } = useCart()

const customerName = ref('')
const customerPhone = ref('')
const customerEmail = ref('')
const customerAddress = ref('')
const customerNotes = ref('')
const orderConfirmed = ref(false)

const whatsappNumber = '5214420000000'

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(price)
}

const orderSummary = computed(() => {
  return cartItems.value
    .map((item) => {
      return `- ${item.quantity} x ${item.product.name} (${formatPrice(item.product.price * item.quantity)})`
    })
    .join('\n')
})

const whatsappMessage = computed(() => {
  return encodeURIComponent(
    `Hola, soy ${customerName.value}. Ya realicé mi pedido en Pulsar MarketPlace y quiero enviar mi comprobante de pago.\n\n` +
    `Resumen del pedido:\n${orderSummary.value}\n\n` +
    `Subtotal: ${formatPrice(subtotal.value)}\n\n` +
    `Teléfono: ${customerPhone.value}\n` +
    `Correo: ${customerEmail.value}\n` +
    `Dirección: ${customerAddress.value}\n\n` +
    `Notas: ${customerNotes.value || 'Sin notas adicionales'}`
  )
})

const whatsappLink = computed(() => {
  return `https://wa.me/${whatsappNumber}?text=${whatsappMessage.value}`
})

const canConfirmOrder = computed(() => {
  return (
    cartItems.value.length > 0 &&
    customerName.value.trim() &&
    customerPhone.value.trim() &&
    customerEmail.value.trim() &&
    customerAddress.value.trim()
  )
})

const confirmOrder = () => {
  if (!canConfirmOrder.value) {
    return
  }

  orderConfirmed.value = true
}

const finishOrder = () => {
  clearCart()
  emit('close')
}
</script>

<template>
  <div class="checkout-overlay">
    <section class="checkout-modal card">
      <div class="checkout-header">
        <div>
          <span class="badge">Confirmación de pedido</span>
          <h2>Finalizar compra</h2>
          <p>
            Completa tus datos para generar la confirmación del pedido.
          </p>
        </div>

        <button class="close-button" @click="emit('close')">
          ×
        </button>
      </div>

      <div v-if="!orderConfirmed" class="checkout-grid">
        <form class="checkout-form" @submit.prevent="confirmOrder">
          <div>
            <label for="name">Nombre completo</label>
            <input
              id="name"
              v-model="customerName"
              type="text"
              placeholder="Ej. José Luis Sandoval"
            >
          </div>

          <div>
            <label for="phone">Teléfono</label>
            <input
              id="phone"
              v-model="customerPhone"
              type="tel"
              placeholder="Ej. 442 000 0000"
            >
          </div>

          <div>
            <label for="email">Correo electrónico</label>
            <input
              id="email"
              v-model="customerEmail"
              type="email"
              placeholder="Ej. correo@ejemplo.com"
            >
          </div>

          <div>
            <label for="address">Dirección de entrega</label>
            <textarea
              id="address"
              v-model="customerAddress"
              rows="3"
              placeholder="Calle, número, colonia, ciudad, estado y código postal"
            />
          </div>

          <div>
            <label for="notes">Notas adicionales</label>
            <textarea
              id="notes"
              v-model="customerNotes"
              rows="3"
              placeholder="Ej. Requiero factura, confirmar disponibilidad, datos de instalación, etc."
            />
          </div>

          <button
            class="btn btn-primary"
            type="submit"
            :disabled="!canConfirmOrder"
          >
            Confirmar pedido
          </button>
        </form>

        <aside class="checkout-summary">
          <h3>Resumen del pedido</h3>

          <div class="summary-products">
            <div
              v-for="item in cartItems"
              :key="item.product.id"
              class="summary-item"
            >
              <div>
                <strong>{{ item.product.name }}</strong>
                <span>{{ item.quantity }} x {{ formatPrice(item.product.price) }}</span>
              </div>

              <strong>{{ formatPrice(item.product.price * item.quantity) }}</strong>
            </div>
          </div>

          <div class="summary-total">
            <span>Productos</span>
            <strong>{{ totalItems }}</strong>
          </div>

          <div class="summary-total">
            <span>Subtotal</span>
            <strong>{{ formatPrice(subtotal) }}</strong>
          </div>

          <p>
            El costo de envío, disponibilidad final y tiempos de entrega serán confirmados
            por Pulsar antes de emitir el pedido.
          </p>
        </aside>
      </div>

      <div v-else class="confirmation-box">
        <div class="success-icon">✓</div>

        <h2>Pedido registrado correctamente</h2>

        <p>
          Para continuar con el proceso, realiza tu pago por transferencia bancaria.
          Después, envía tu comprobante por WhatsApp para que Pulsar pueda validar el pago
          y emitir el pedido.
        </p>

        <div class="payment-instructions">
          <h3>Instrucciones para el cliente</h3>

          <ol>
            <li>Realiza el pago por transferencia bancaria.</li>
            <li>Da clic en el botón de WhatsApp.</li>
            <li>Envía tu comprobante de pago.</li>
            <li>Espera la confirmación de Pulsar para procesar tu pedido.</li>
          </ol>
        </div>

        <div class="confirmation-actions">
          <a
            class="btn btn-primary"
            :href="whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Enviar comprobante por WhatsApp
          </a>

          <button class="btn btn-secondary" @click="finishOrder">
            Finalizar
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.checkout-overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(2, 6, 23, 0.72);
  backdrop-filter: blur(8px);
}

.checkout-modal {
  width: min(1080px, 100%);
  max-height: 92vh;
  overflow-y: auto;
  padding: 28px;
}

.checkout-header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-start;
  margin-bottom: 26px;
}

.checkout-header h2 {
  margin: 16px 0 8px;
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1;
  letter-spacing: -0.04em;
}

.checkout-header p {
  margin: 0;
  color: #94a3b8;
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

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 0.85fr;
  gap: 24px;
}

.checkout-form {
  display: grid;
  gap: 16px;
}

.checkout-form label {
  display: block;
  margin-bottom: 8px;
  color: #cbd5e1;
  font-weight: 700;
  font-size: 14px;
}

.checkout-form input,
.checkout-form textarea {
  width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 14px;
  padding: 13px 14px;
  background: rgba(2, 6, 23, 0.72);
  color: #e5f3ff;
  outline: none;
  resize: vertical;
}

.checkout-form input:focus,
.checkout-form textarea:focus {
  border-color: rgba(34, 211, 238, 0.7);
}

.checkout-form button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkout-summary {
  padding: 22px;
  border-radius: 22px;
  background: rgba(2, 6, 23, 0.42);
  border: 1px solid rgba(148, 163, 184, 0.14);
}

.checkout-summary h3 {
  margin: 0 0 18px;
}

.summary-products {
  display: grid;
  gap: 14px;
  margin-bottom: 18px;
}

.summary-item,
.summary-total {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
}

.summary-item {
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
}

.summary-item span,
.summary-total span,
.checkout-summary p {
  color: #94a3b8;
}

.summary-item strong,
.summary-total strong {
  color: #67e8f9;
}

.summary-item div {
  display: grid;
  gap: 6px;
}

.summary-total {
  padding: 12px 0;
}

.checkout-summary p {
  line-height: 1.6;
  margin: 18px 0 0;
  font-size: 14px;
}

.confirmation-box {
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
  padding: 24px 0;
}

.success-icon {
  width: 78px;
  height: 78px;
  margin: 0 auto 18px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(34, 211, 238, 0.16);
  color: #67e8f9;
  font-size: 44px;
  font-weight: 900;
}

.confirmation-box h2 {
  font-size: clamp(32px, 5vw, 56px);
  line-height: 1;
  letter-spacing: -0.05em;
  margin: 0 0 18px;
}

.confirmation-box p {
  color: #b6c7d8;
  line-height: 1.7;
}

.payment-instructions {
  text-align: left;
  margin: 24px auto;
  padding: 22px;
  border-radius: 22px;
  background: rgba(8, 47, 73, 0.36);
  border: 1px solid rgba(34, 211, 238, 0.16);
}

.payment-instructions h3 {
  margin-top: 0;
}

.payment-instructions li {
  margin-bottom: 10px;
  color: #cbd5e1;
}

.confirmation-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

@media (max-width: 900px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }

  .checkout-header {
    flex-direction: column;
  }
}
</style>