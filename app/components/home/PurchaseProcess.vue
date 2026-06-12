<template>
  <section id="proceso" class="section">
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
</template>

<style scoped>
.section {
  padding: 80px 0;
  scroll-margin-top: 120px;
}

.purchase-card {
  padding: 34px;
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 30px;
  align-items: center;
}

.purchase-card h2 {
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1;
  margin: 18px 0;
  letter-spacing: -0.04em;
}

.purchase-card p {
  color: #b6c7d8;
  line-height: 1.7;
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
  flex-shrink: 0;
  border-radius: 50%;
  background: rgba(34, 211, 238, 0.18);
  color: #67e8f9;
  font-weight: 900;
}

.purchase-steps p {
  margin: 0;
}

@media (max-width: 900px) {
  .purchase-card {
    grid-template-columns: 1fr;
  }
}
</style>