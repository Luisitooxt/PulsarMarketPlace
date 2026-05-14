import type { Product } from '~/types/product'

export interface CartItem {
  product: Product
  quantity: number
}

const cartItems = ref<CartItem[]>([])

export const useCart = () => {
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
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    subtotal
  }
}