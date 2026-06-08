import React, { useState } from 'react'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Menu from './components/Menu'
import Home from './pages/Home'
import CartDrawer from './components/CartDrawer'
import Checkout from './components/Checkout'

export default function App() {
  const [openCart, setOpenCart] = useState(false)
  const [view, setView] = useState('home')
  const [lastOrder, setLastOrder] = useState(null)

  function handleOrderDone(order) {
    setLastOrder(order)
    setView('home')
    window.setTimeout(() => setLastOrder(null), 5200)
  }

  return (
    <CartProvider>
      <Header
        activeView={view}
        onNavigate={setView}
        onOpenCart={() => setOpenCart(true)}
      />
      {lastOrder && (
        <div className="order-toast" role="status">
          <strong>Pedido confirmado #{lastOrder.id}</strong>
          <span>{lastOrder.fulfillment === 'delivery' ? 'Entrega em preparo' : 'Retirada em preparo'} - Total R$ {lastOrder.total.toFixed(2)}</span>
        </div>
      )}
      {view === 'home' && <Home onNavigate={setView} />}
      {view === 'menu' && <Menu />}
      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} onCheckout={() => { setOpenCart(false); setView('checkout') }} />
      {view === 'checkout' && <div className="container"><Checkout onDone={handleOrderDone} onBack={() => setView('menu')} /></div>}
      <footer className="footer container">&copy; Cafeteria - Pedidos simulados localmente</footer>
    </CartProvider>
  )
}
