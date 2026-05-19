<template>
  <footer id="contacto" class="footer">
    <div class="container footer-content">
      <strong>Pulsar MarketPlace</strong>
      <span>Seguridad electrónica, automatización y control de acceso.</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid rgba(148, 163, 184, 0.14);
  padding: 28px 0;
  color: #94a3b8;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer strong {
  color: white;
}

@media (max-width: 900px) {
  .footer-content {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
