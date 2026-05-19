<script setup lang="ts">
import AppNavbar from '~/components/layout/AppNavbar.vue'
import HeroSection from '~/components/home/HeroSection.vue'
import CategoryGrid from '~/components/home/CategoryGrid.vue'
import ProductCatalog from '~/components/home/ProductCatalog.vue'
import PurchaseProcess from '~/components/home/PurchaseProcess.vue'
import AppFooter from '~/components/layout/AppFooter.vue'

useSeoMeta({
  title: 'Pulsar MarketPlace - Seguridad Electrónica y Control de Acceso',
  description: 'Marketplace especializado en cámaras de videovigilancia, motores para portones, alarmas y más. Cotiza y compra en línea de forma sencilla.',
  ogTitle: 'Pulsar MarketPlace - Seguridad Electrónica',
  ogDescription: 'Encuentra soluciones de seguridad para hogares y negocios.',
  ogImage: '/favicon.ico', // Placeholder, ideally a real image
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="page">
    <AppNavbar />

    <main>
      <HeroSection />
      <CategoryGrid />
      <ProductCatalog />
      <PurchaseProcess />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
/* Page-level global-ish styles or layout tweaks if needed */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
