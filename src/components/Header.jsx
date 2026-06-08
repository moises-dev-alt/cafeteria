import React from 'react'
import { useCart } from '../context/CartContext'

export default function Header({ activeView, onNavigate, onOpenCart }) {
  const { items } = useCart()
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <header className="header">
      <button className="brand" onClick={() => onNavigate('home')}>Cafeteria Dos Amigões</button>
      <nav className="topnav" aria-label="Navegacao principal">
        <button onClick={() => onNavigate('home')} className={activeView === 'home' ? 'active' : ''}>Home</button>
        <button onClick={() => onNavigate('menu')} className={activeView === 'menu' ? 'active' : ''}>Cardapio</button>
        <button className="cart-btn" onClick={onOpenCart} aria-label="Abrir carrinho">
          <span>Carrinho</span>
          <strong>{count}</strong>
        </button>
      </nav>
    </header>
  )
}
