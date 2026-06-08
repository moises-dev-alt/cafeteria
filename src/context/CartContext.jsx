import React, { createContext, useContext, useEffect, useState } from 'react'
import products from '../data/products'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('caf_cart')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('caf_cart', JSON.stringify(items))
  }, [items])

  function add(productId, qty = 1) {
    const prod = products.find(p => p.id === productId)
    if (!prod) return
    setItems(prev => {
      const found = prev.find(i => i.id === productId)
      if (found) {
        return prev.map(i => i.id === productId ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { id: productId, qty }]
    })
  }

  function remove(productId) {
    setItems(prev => prev.filter(i => i.id !== productId))
  }

  function updateQty(productId, qty) {
    setItems(prev => prev.map(i => i.id === productId ? { ...i, qty } : i))
  }

  function clear() {
    setItems([])
  }

  const detailed = items.map(i => {
    const p = products.find(x => x.id === i.id)
    return { ...p, qty: i.qty, total: +(p.price * i.qty).toFixed(2) }
  })

  const subtotal = +detailed.reduce((s, it) => s + it.total, 0).toFixed(2)

  return (
    <CartContext.Provider value={{ items: detailed, add, remove, updateQty, clear, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}
