import type { Product } from '~/types/product'

export interface CartItem {
  product: Product
  quantity: number
}

const cartItems = ref<CartItem[]>([])
const isCartOpen = ref(false)
const isCheckoutOpen = ref(false)

export const useCart = () => {
  const openCart = () => {
    isCartOpen.value = true
  }

  const closeCart = () => {
    isCartOpen.value = false
  }

  const openCheckout = () => {
    if (!cartItems.value.length) {
      return
    }

    isCartOpen.value = false
    isCheckoutOpen.value = true
  }

  const closeCheckout = () => {
    isCheckoutOpen.value = false
  }

  const addToCart = (product: Product) => {
    if (product.availability === 'agotado') {
      return
    }

    const existingItem = cartItems.value.find((item) => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
      return
    }

    cartItems.value.push({
      product,
      quantity: 1
    })
  }

  const removeFromCart = (productId: number) => {
    cartItems.value = cartItems.value.filter((item) => item.product.id !== productId)
  }

  const increaseQuantity = (productId: number) => {
    const item = cartItems.value.find((cartItem) => cartItem.product.id === productId)

    if (item) {
      item.quantity += 1
    }
  }

  const decreaseQuantity = (productId: number) => {
    const item = cartItems.value.find((cartItem) => cartItem.product.id === productId)

    if (!item) {
      return
    }

    if (item.quantity === 1) {
      removeFromCart(productId)
      return
    }

    item.quantity -= 1
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)
  })

  return {
    cartItems,
    isCartOpen,
    isCheckoutOpen,
    openCart,
    closeCart,
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