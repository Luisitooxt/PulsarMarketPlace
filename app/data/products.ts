import type { Product } from '~/types/product'

export const products: Product[] = [
  {
    id: 1,
    slug: 'camara-ip-hikvision-4mp',
    name: 'Cámara IP Hikvision 4MP Visión Nocturna',
    category: 'camaras',
    categoryLabel: 'Cámaras de videovigilancia',
    brand: 'Hikvision',
    sku: 'CAM-HIK-4MP-IP',
    shortDescription: 'Cámara IP profesional para monitoreo residencial y comercial con visión nocturna.',
    price: 2499,
    oldPrice: 2799,
    stock: 12,
    availability: 'disponible',
    imageLabel: 'CAM',
    featured: true,
    specs: ['Resolución 4MP', 'Visión nocturna', 'Conexión IP', 'Uso interior/exterior']
  },
  {
    id: 2,
    slug: 'camara-domo-dahua-2mp',
    name: 'Cámara Domo Dahua 2MP Antivandálica',
    category: 'camaras',
    categoryLabel: 'Cámaras de videovigilancia',
    brand: 'Dahua',
    sku: 'CAM-DAH-DOMO-2MP',
    shortDescription: 'Cámara tipo domo para instalaciones discretas en interiores o exteriores.',
    price: 1899,
    stock: 8,
    availability: 'disponible',
    imageLabel: 'DOMO',
    featured: true,
    specs: ['Resolución 2MP', 'Formato domo', 'Carcasa resistente', 'Compatible con DVR']
  },
  {
    id: 3,
    slug: 'nvr-hikvision-8-canales',
    name: 'NVR Hikvision 8 Canales para Cámaras IP',
    category: 'dvr-nvr',
    categoryLabel: 'DVR/NVR',
    brand: 'Hikvision',
    sku: 'NVR-HIK-8CH',
    shortDescription: 'Grabador de red para administración y respaldo de cámaras IP.',
    price: 3299,
    oldPrice: 3599,
    stock: 5,
    availability: 'bajo-stock',
    imageLabel: 'NVR',
    featured: true,
    specs: ['8 canales', 'Soporte IP', 'Salida HDMI', 'Acceso remoto']
  },
  {
    id: 4,
    slug: 'dvr-dahua-4-canales',
    name: 'DVR Dahua 4 Canales Full HD',
    category: 'dvr-nvr',
    categoryLabel: 'DVR/NVR',
    brand: 'Dahua',
    sku: 'DVR-DAH-4CH',
    shortDescription: 'Grabador digital para sistemas básicos de videovigilancia.',
    price: 2199,
    stock: 10,
    availability: 'disponible',
    imageLabel: 'DVR',
    featured: false,
    specs: ['4 canales', 'Full HD', 'Salida HDMI', 'Acceso por aplicación']
  },
  {
    id: 5,
    slug: 'kit-seguridad-4-camaras',
    name: 'Kit de Seguridad 4 Cámaras Full HD',
    category: 'kits-seguridad',
    categoryLabel: 'Kits de seguridad',
    brand: 'Epcom',
    sku: 'KIT-EPC-4CAM',
    shortDescription: 'Kit completo para instalación de videovigilancia en casa o negocio pequeño.',
    price: 6899,
    oldPrice: 7399,
    stock: 6,
    availability: 'disponible',
    imageLabel: 'KIT',
    featured: true,
    specs: ['4 cámaras', 'DVR incluido', 'Cableado incluido', 'Acceso remoto']
  },
  {
    id: 6,
    slug: 'kit-seguridad-8-camaras',
    name: 'Kit de Seguridad 8 Cámaras con Grabador',
    category: 'kits-seguridad',
    categoryLabel: 'Kits de seguridad',
    brand: 'Hikvision',
    sku: 'KIT-HIK-8CAM',
    shortDescription: 'Paquete profesional para negocios, bodegas y propiedades amplias.',
    price: 11999,
    stock: 3,
    availability: 'bajo-stock',
    imageLabel: 'KIT',
    featured: false,
    specs: ['8 cámaras', 'Grabador incluido', 'Monitoreo remoto', 'Alta capacidad']
  },
  {
    id: 7,
    slug: 'motor-porton-corredizo',
    name: 'Motor para Portón Corredizo Residencial',
    category: 'motores-portones',
    categoryLabel: 'Motores para portones',
    brand: 'AccessPro',
    sku: 'MOT-ACC-CORR',
    shortDescription: 'Motor automatizador para portones corredizos residenciales.',
    price: 7499,
    stock: 4,
    availability: 'disponible',
    imageLabel: 'MOTOR',
    featured: true,
    specs: ['Portón corredizo', 'Uso residencial', 'Control remoto', 'Sistema seguro']
  },
  {
    id: 8,
    slug: 'motor-porton-batiente',
    name: 'Motor para Portón Batiente Doble Hoja',
    category: 'motores-portones',
    categoryLabel: 'Motores para portones',
    brand: 'Nice',
    sku: 'MOT-NIC-BAT',
    shortDescription: 'Sistema de automatización para portones abatibles de doble hoja.',
    price: 13499,
    stock: 2,
    availability: 'bajo-stock',
    imageLabel: 'MOTOR',
    featured: false,
    specs: ['Doble hoja', 'Control remoto', 'Uso residencial/comercial', 'Automatización segura']
  },
  {
    id: 9,
    slug: 'piston-automatico-porton',
    name: 'Pistón Automático para Portón Abatible',
    category: 'pistones-automaticos',
    categoryLabel: 'Pistones automáticos',
    brand: 'AccessPro',
    sku: 'PIS-ACC-AUTO',
    shortDescription: 'Pistón automatizado para apertura y cierre de portones abatibles.',
    price: 4599,
    stock: 7,
    availability: 'disponible',
    imageLabel: 'PISTON',
    featured: true,
    specs: ['Portón abatible', 'Apertura automática', 'Control remoto', 'Instalación residencial']
  },
  {
    id: 10,
    slug: 'piston-industrial-reforzado',
    name: 'Pistón Automático Reforzado Industrial',
    category: 'pistones-automaticos',
    categoryLabel: 'Pistones automáticos',
    brand: 'BFT',
    sku: 'PIS-BFT-IND',
    shortDescription: 'Pistón de alto rendimiento para portones pesados o de uso frecuente.',
    price: 8999,
    stock: 0,
    availability: 'agotado',
    imageLabel: 'PISTON',
    featured: false,
    specs: ['Uso industrial', 'Alto rendimiento', 'Portones pesados', 'Sistema reforzado']
  },
  {
    id: 11,
    slug: 'interphone-videoportero-wifi',
    name: 'Interphone Videoportero WiFi',
    category: 'interphones',
    categoryLabel: 'Interphones',
    brand: 'Hikvision',
    sku: 'INT-HIK-WIFI',
    shortDescription: 'Videoportero inteligente con conectividad WiFi y comunicación remota.',
    price: 3999,
    stock: 9,
    availability: 'disponible',
    imageLabel: 'INTER',
    featured: true,
    specs: ['Videoportero', 'WiFi', 'Audio bidireccional', 'Control desde app']
  },
  {
    id: 12,
    slug: 'interphone-edificio-multifamiliar',
    name: 'Interphone para Edificio Multifamiliar',
    category: 'interphones',
    categoryLabel: 'Interphones',
    brand: 'Commax',
    sku: 'INT-COM-MULTI',
    shortDescription: 'Sistema de comunicación y acceso para edificios y condominios.',
    price: 6499,
    stock: 4,
    availability: 'disponible',
    imageLabel: 'INTER',
    featured: false,
    specs: ['Uso multifamiliar', 'Control de acceso', 'Comunicación interna', 'Instalación profesional']
  }
]

export const categories = [
  {
    id: 'camaras',
    name: 'Cámaras de videovigilancia'
  },
  {
    id: 'dvr-nvr',
    name: 'DVR/NVR'
  },
  {
    id: 'kits-seguridad',
    name: 'Kits de seguridad'
  },
  {
    id: 'motores-portones',
    name: 'Motores para portones'
  },
  {
    id: 'pistones-automaticos',
    name: 'Pistones automáticos'
  },
  {
    id: 'interphones',
    name: 'Interphones'
  }
]