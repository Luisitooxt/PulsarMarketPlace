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
const formSubmitted = ref(false)

const config = useRuntimeConfig()
const whatsappNumber = config.public.whatsappNumber

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(price)
}

const onlyNumbers = (event: Event) => {
  const input = event.target as HTMLInputElement
  input.value = input.value.replace(/\D/g, '').slice(0, 10)
  customerPhone.value = input.value
}

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(customerEmail.value.trim())
})

const isValidPhone = computed(() => {
  return /^[0-9]{10}$/.test(customerPhone.value.trim())
})

const nameError = computed(() => {
  if (!formSubmitted.value) return ''
  if (!customerName.value.trim()) return 'El nombre completo es obligatorio.'
  if (customerName.value.trim().length < 5) return 'Escribe tu nombre completo.'
  return ''
})

const phoneError = computed(() => {
  if (!formSubmitted.value) return ''
  if (!customerPhone.value.trim()) return 'El teléfono es obligatorio.'
  if (!isValidPhone.value) return 'El teléfono debe contener exactamente 10 números.'
  return ''
})

const emailError = computed(() => {
  if (!formSubmitted.value) return ''
  if (!customerEmail.value.trim()) return 'El correo electrónico es obligatorio.'
  if (!isValidEmail.value) return 'Escribe un correo electrónico válido.'
  return ''
})

const addressError = computed(() => {
  if (!formSubmitted.value) return ''
  if (!customerAddress.value.trim()) return 'La dirección de entrega es obligatoria.'
  if (customerAddress.value.trim().length < 12) return 'Agrega una dirección más completa.'
  return ''
})

const canConfirmOrder = computed(() => {
  return (
    cartItems.value.length > 0 &&
    customerName.value.trim().length >= 5 &&
    isValidPhone.value &&
    isValidEmail.value &&
    customerAddress.value.trim().length >= 12
  )
})

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
    `Productos: ${totalItems.value}\n` +
    `Subtotal: ${formatPrice(subtotal.value)}\n\n` +
    `Datos del cliente:\n` +
    `Nombre: ${customerName.value}\n` +
    `Teléfono: ${customerPhone.value}\n` +
    `Correo: ${customerEmail.value}\n` +
    `Dirección: ${customerAddress.value}\n\n` +
    `Notas: ${customerNotes.value || 'Sin notas adicionales'}\n\n` +
    `Adjunto mi comprobante de pago para validación.`
  )
})

const whatsappLink = computed(() => {
  return `https://wa.me/${whatsappNumber}?text=${whatsappMessage.value}`
})

const confirmOrder = () => {
  formSubmitted.value = true

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
            Completa tus datos para generar la confirmación del pedido y continuar
            con el pago por transferencia.
          </p>
        </div>

        <button class="close-button" @click="emit('close')">
          ×
        </button>
      </div>

      <div v-if="!orderConfirmed" class="checkout-grid">
        <form class="checkout-form" @submit.prevent="confirmOrder">
          <div class="form-group">
            <label for="name">Nombre completo</label>
            <input
              id="name"
              v-model.trim="customerName"
              type="text"
              placeholder="Ej. José Luis Sandoval Fuentes"
              autocomplete="name"
            >
            <small v-if="nameError" class="error-message">
              {{ nameError }}
            </small>
          </div>

          <div class="form-group">
            <label for="phone">Teléfono</label>
            <input
              id="phone"
              v-model="customerPhone"
              type="tel"
              inputmode="numeric"
              maxlength="10"
              placeholder="Ej. 4420000000"
              autocomplete="tel"
              @input="onlyNumbers"
            >
            <small v-if="phoneError" class="error-message">
              {{ phoneError }}
            </small>
            <small v-else class="help-message">
              Escribe 10 dígitos, sin espacios ni guiones.
            </small>
          </div>

          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input
              id="email"
              v-model.trim="customerEmail"
              type="email"
              placeholder="Ej. correo@ejemplo.com"
              autocomplete="email"
            >
            <small v-if="emailError" class="error-message">
              {{ emailError }}
            </small>
          </div>

          <div class="form-group">
            <label for="address">Dirección de entrega</label>
            <textarea
              id="address"
              v-model.trim="customerAddress"
              rows="3"
              placeholder="Calle, número, colonia, ciudad, estado y código postal"
              autocomplete="street-address"
            />
            <small v-if="addressError" class="error-message">
              {{ addressError }}
            </small>
          </div>

          <div class="form-group">
            <label for="notes">Notas adicionales</label>
            <textarea
              id="notes"
              v-model.trim="customerNotes"
              rows="3"
              placeholder="Ej. Requiero factura, confirmar disponibilidad, datos de instalación, etc."
            />
          </div>

          <div class="checkout-alert">
            <strong>Importante:</strong>
            El pedido será confirmado por WhatsApp después de enviar el comprobante de pago.
          </div>

          <button
            class="btn btn-primary"
            type="submit"
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
          Tu pedido fue generado. Para continuar, realiza tu pago por transferencia bancaria
          y envía el comprobante por WhatsApp para que Pulsar pueda validar el pago.
        </p>

        <div class="payment-instructions">
          <h3>Instrucciones para finalizar la compra</h3>

          <ol>
            <li>Realiza el pago por transferencia bancaria.</li>
            <li>Da clic en el botón de WhatsApp.</li>
            <li>Envía tu comprobante de pago en la conversación.</li>
            <li>Espera la confirmación de Pulsar para procesar tu pedido.</li>
          </ol>
        </div>

        <div class="whatsapp-preview">
          <div class="phone-mockup">
            <div class="phone-header">
              <span>Pulsar</span>
              <small>Confirmación de pago</small>
            </div>

            <div class="chat-area">
              <div class="message received">
                Hola, gracias por comprar en Pulsar. Envíanos tu comprobante para validar el pago.
              </div>

              <div class="message sent">
                Hola, ya realicé mi pedido. Adjunto mi comprobante de pago.
              </div>

              <div class="image-message sent">
                <div class="image-placeholder">
                  Comprobante.jpg
                </div>
              </div>

              <div class="message received">
                Recibido. Validaremos tu pago y te confirmaremos el estado de tu pedido.
              </div>
            </div>
          </div>
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

.form-group {
  display: grid;
  gap: 8px;
}

.checkout-form label {
  display: block;
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

.error-message {
  color: #fca5a5;
  font-size: 13px;
  font-weight: 700;
}

.help-message {
  color: #94a3b8;
  font-size: 13px;
}

.checkout-alert {
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(8, 47, 73, 0.42);
  border: 1px solid rgba(34, 211, 238, 0.18);
  color: #cbd5e1;
  line-height: 1.5;
}

.checkout-alert strong {
  color: #67e8f9;
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
  max-width: 820px;
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

.whatsapp-preview {
  margin: 26px auto;
  display: flex;
  justify-content: center;
}

.phone-mockup {
  width: min(360px, 100%);
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid rgba(34, 211, 238, 0.24);
  background: #020617;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.38);
}

.phone-header {
  display: grid;
  gap: 4px;
  padding: 16px 18px;
  background: rgba(15, 23, 42, 0.92);
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
  text-align: left;
}

.phone-header span {
  color: white;
  font-weight: 900;
}

.phone-header small {
  color: #94a3b8;
}

.chat-area {
  display: grid;
  gap: 12px;
  padding: 18px;
  background:
    radial-gradient(circle at top left, rgba(34, 211, 238, 0.12), transparent 18rem),
    #03131f;
}

.message {
  max-width: 82%;
  padding: 11px 13px;
  border-radius: 16px;
  color: #e5f3ff;
  font-size: 13px;
  line-height: 1.45;
  text-align: left;
}

.message.received {
  justify-self: start;
  background: rgba(15, 23, 42, 0.95);
  border-top-left-radius: 4px;
}

.message.sent,
.image-message.sent {
  justify-self: end;
  background: rgba(8, 145, 178, 0.42);
  border-top-right-radius: 4px;
}

.image-message {
  max-width: 72%;
  padding: 8px;
  border-radius: 16px;
}

.image-placeholder {
  height: 92px;
  min-width: 180px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(226, 232, 240, 0.18), rgba(103, 232, 249, 0.22));
  color: #e5f3ff;
  font-size: 13px;
  font-weight: 800;
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