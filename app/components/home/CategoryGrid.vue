<template>
  <section id="categorias" class="section">
    <div class="container">
      <div class="section-heading">
        <span class="badge">Categorías principales</span>
        <h2>Productos especializados para seguridad electrónica</h2>
        <p>
          El catálogo público de Pulsar MarketPlace estará enfocado únicamente en
          las líneas de producto autorizadas para el proyecto.
        </p>
      </div>

      <div class="category-grid">
        <article class="category-card card">
          <span>01</span>
          <h3>Cámaras de videovigilancia</h3>
          <p>Cámaras IP, analógicas, domos, bullet y soluciones profesionales.</p>
        </article>

        <article class="category-card card">
          <span>02</span>
          <h3>DVR / NVR</h3>
          <p>Grabadores digitales y de red para sistemas de monitoreo.</p>
        </article>

        <article class="category-card card">
          <span>03</span>
          <h3>Kits de seguridad</h3>
          <p>Paquetes completos para instalaciones residenciales y comerciales.</p>
        </article>

        <article class="category-card card">
          <span>04</span>
          <h3>Motores para portones</h3>
          <p>Automatización de accesos vehiculares y portones eléctricos.</p>
        </article>

        <article class="category-card card">
          <span>05</span>
          <h3>Pistones automáticos</h3>
          <p>Sistemas para apertura automatizada de puertas y portones.</p>
        </article>

        <article class="category-card card">
          <span>06</span>
          <h3>Interphones</h3>
          <p>Comunicación, acceso y control para edificios y residencias.</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 80px 0;
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

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.category-card {
  padding: 24px;
}

.category-card span {
  color: #67e8f9;
  font-weight: 900;
}

.category-card h3 {
  margin: 14px 0 10px;
}

.category-card p {
  color: #94a3b8;
  line-height: 1.6;
}

@media (max-width: 900px) {
  .category-grid {
    grid-template-columns: 1fr;
  }
}
</style>
