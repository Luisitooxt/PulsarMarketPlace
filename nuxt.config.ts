export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/images/Pulsar_Square.png'
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      whatsappNumber: '5214611152450',
      contactEmail: 'gerencia@pulsartecnologias.com'
    }
  }
})