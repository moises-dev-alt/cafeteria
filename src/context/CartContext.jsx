import React, { createContext, useContext, useEffect, useState } from 'react'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import products from '../data/products'
import { db } from '../firebase'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

function readLocalCart(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function mergeCartItems(...carts) {
  const merged = new Map()

  carts.flat().forEach((item) => {
    if (!item?.id || !item.qty) return
    const current = merged.get(item.id) || 0
    merged.set(item.id, current + item.qty)
  })

  return Array.from(merged, ([id, qty]) => ({ id, qty }))
}

export function CartProvider({ children, userId }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const storageKey = userId ? `caf_cart_${userId}` : 'caf_cart_guest'

  useEffect(() => {
    let active = true
    setLoading(true)

    if (!userId) {
      setItems(readLocalCart(storageKey))
      setLoading(false)
      return () => { active = false }
    }

    getDoc(doc(db, 'carts', userId))
      .then((snapshot) => {
        if (!active) return
        const accountItems = snapshot.exists() && Array.isArray(snapshot.data().items)
          ? snapshot.data().items
          : readLocalCart(storageKey)
        const guestItems = readLocalCart('caf_cart_guest')
        const savedItems = guestItems.length ? mergeCartItems(accountItems, guestItems) : accountItems

        setItems(savedItems)
        if (guestItems.length) localStorage.removeItem('caf_cart_guest')
      })
      .catch(() => {
        if (active) setItems(readLocalCart(storageKey))
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [userId, storageKey])

  useEffect(() => {
    if (loading) return

    try {
      localStorage.setItem(storageKey, JSON.stringify(items))
    } catch {
      // O carrinho autenticado continua salvo no Firestore mesmo sem localStorage.
    }

    if (userId) {
      setDoc(doc(db, 'carts', userId), {
        items,
        updatedAt: serverTimestamp()
      }).catch(() => {})
    }
  }, [items, loading, storageKey, userId])

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
    <CartContext.Provider value={{ items: detailed, add, remove, updateQty, clear, subtotal, loading }}>
      {children}
    </CartContext.Provider>
  )
}
