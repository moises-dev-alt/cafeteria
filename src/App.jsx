import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Menu from './components/Menu'
import Home from './pages/Home'
import CartDrawer from './components/CartDrawer'
import Checkout from './components/Checkout'
import Auth from './pages/Auth'
import { auth } from './firebase'

export default function App() {
  const [openCart, setOpenCart] = useState(false)
  const [view, setView] = useState('home')
  const [lastOrder, setLastOrder] = useState(null)
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [afterAuthView, setAfterAuthView] = useState(null)

  useEffect(() => {
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setAuthLoading(false)
    })
  }, [])

  function handleOrderDone(order) {
    setLastOrder(order)
    setView('home')
    window.setTimeout(() => setLastOrder(null), 5200)
  }

  function handleCheckoutStart() {
    setOpenCart(false)

    if (!user) {
      setAfterAuthView('checkout')
      setView('login')
      return
    }

    setView('checkout')
  }

  function handleAuthDone() {
    setView(afterAuthView || 'home')
    setAfterAuthView(null)
  }

  return (
    <CartProvider key={user?.uid || 'guest'} userId={user?.uid}>
      <Header
        activeView={view}
        onNavigate={setView}
        onOpenCart={() => setOpenCart(true)}
        user={user}
        onSignOut={() => signOut(auth)}
      />
      {lastOrder && (
        <div className="order-toast" role="status">
          <strong>Pedido confirmado #{lastOrder.id}</strong>
          <span>{lastOrder.fulfillment === 'delivery' ? 'Entrega em preparo' : 'Retirada em preparo'} - Total R$ {lastOrder.total.toFixed(2)}</span>
        </div>
      )}
      {view === 'home' && <Home onNavigate={setView} />}
      {view === 'menu' && <Menu />}
      {!authLoading && view === 'login' && <Auth onNavigate={setView} onAuthenticated={handleAuthDone} returnToCheckout={afterAuthView === 'checkout'} />}
      {!authLoading && view === 'signup' && <Auth mode="signup" onNavigate={setView} onAuthenticated={handleAuthDone} returnToCheckout={afterAuthView === 'checkout'} />}
      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} onCheckout={handleCheckoutStart} />
      {!authLoading && view === 'checkout' && user && <div className="container"><Checkout onDone={handleOrderDone} onBack={() => setView('menu')} /></div>}
      {!authLoading && view === 'checkout' && !user && <Auth onNavigate={setView} onAuthenticated={handleAuthDone} returnToCheckout />}
      <footer className="footer container">&copy; Cafeteria - Pedidos simulados localmente</footer>
    </CartProvider>
  )
}
