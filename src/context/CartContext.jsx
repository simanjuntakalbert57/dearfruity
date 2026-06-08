import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addToCart = useCallback((cartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.id === cartItem.id &&
          i.size === cartItem.size
      )
      if (existing) {
        return prev.map((i) =>
          i === existing
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...cartItem, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((cartId) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId))
  }, [])

  const updateQuantity = useCallback((cartId, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.cartId !== cartId))
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.cartId === cartId ? { ...i, quantity } : i
      )
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
