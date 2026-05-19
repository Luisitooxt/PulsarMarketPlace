import type { Product } from '~/types/product'

export interface CartItem {
  product: Product
  quantity: number
}

export const useCart = () => {
  const cartItems = useState<CartItem[]>('cart-items', () => [])
  const isCartOpen = useState<boolean>('is-cart-open', () => false)
  const isCheckoutOpen = useState<boolean>('is-checkout-open', () => false)

  // Actions
  const openCart = () => {
    isCartOpen.value = true
  }

  const closeCart = () => {
    isCartOpen.value = false
  }

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
  }

  const openCheckout = () => {
    if (!cartItems.value.length) return
    isCartOpen.value = false
    isCheckoutOpen.value = true
  }

  const closeCheckout = () => {
    isCheckoutOpen.value = false
  }

  const addToCart = (product: Product) => {
    if (product.availability === 'agotado') return

    const existingItem = cartItems.value.find((item) => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({
        product,
        quantity: 1
      })
    }
  }

  const removeFromCart = (productId: number) => {
    cartItems.value = cartItems.value.filter((item) => item.product.id !== productId)
  }

  const increaseQuantity = (productId: number) => {
    const item = cartItems.value.find((item) => item.product.id === productId)
    if (item) item.quantity += 1
  }

  const decreaseQuantity = (productId: number) => {
    const item = cartItems.value.find((item) => item.product.id === productId)
    if (!item) return

    if (item.quantity === 1) {
      removeFromCart(productId)
    } else {
      item.quantity -= 1
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  // Getters
  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)
  })

  // Persistence (Client-side only)
  if (import.meta.client) {
    onMounted(() => {
      const saved = localStorage.getItem('pulsar-cart')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed)) {
            cartItems.value = parsed
          }
        } catch (e) {
          console.error('Error parsing cart from localStorage', e)
        }
      }
    })

    watch(cartItems, (newVal) => {
      localStorage.setItem('pulsar-cart', JSON.stringify(newVal))
    }, { deep: true })
  }

  return {
    cartItems,
    isCartOpen,
    isCheckoutOpen,
    openCart,
    closeCart,
    toggleCart,
    openCheckout,
    closeCheckout,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    subtotal
  }
}
