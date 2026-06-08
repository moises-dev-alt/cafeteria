import React from 'react'
import { useCart } from '../context/CartContext'

export default function CartDrawer({ open, onClose, onCheckout }) {
  const { items, remove, updateQty, subtotal, clear } = useCart()
  const freeDeliveryTarget = 35
  const remainingForFreeDelivery = Math.max(0, freeDeliveryTarget - subtotal)
  const progress = Math.min(100, (subtotal / freeDeliveryTarget) * 100)

  if (!open) return null

  return (
    <>
      <button className="cart-backdrop" onClick={onClose} aria-label="Fechar carrinho" />
      <aside className="cart-drawer" aria-label="Carrinho de compras">
        <header>
          <div>
            <p className="eyebrow">Seu pedido</p>
            <h3>Carrinho</h3>
          </div>
          <div className="cart-header-actions">
            <button className="link" onClick={() => { clear() }} disabled={items.length === 0}>Limpar</button>
            <button className="close" onClick={onClose}>Fechar</button>
          </div>
        </header>
        <div className="items">
          {items.length > 0 && (
            <div className="delivery-progress">
              <div className="progress-track">
                <span style={{ width: `${progress}%` }} />
              </div>
              <p>
                {remainingForFreeDelivery > 0
                  ? `Faltam R$ ${remainingForFreeDelivery.toFixed(2)} para entrega gratis.`
                  : 'Entrega gratis liberada para este pedido.'}
              </p>
            </div>
          )}
          {items.length === 0 && (
            <div className="empty-cart">
              <h4>Seu carrinho esta vazio.</h4>
              <p>Adicione um cafe ou lanche para continuar.</p>
            </div>
          )}
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div>
                <strong>{item.name}</strong>
                <div className="muted">R$ {item.price.toFixed(2)} cada</div>
              </div>
              <div className="controls">
                <div className="quantity-stepper compact">
                  <button onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))} aria-label="Diminuir quantidade">-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Aumentar quantidade">+</button>
                </div>
                <div className="item-total">R$ {item.total.toFixed(2)}</div>
                <button className="link" onClick={() => remove(item.id)}>Remover</button>
              </div>
            </div>
          ))}
        </div>
        <footer>
          <div>
            <span className="muted">Subtotal</span>
            <div className="subtotal">R$ {subtotal.toFixed(2)}</div>
          </div>
          <button className="btn" onClick={onCheckout} disabled={items.length === 0}>Finalizar pedido</button>
        </footer>
      </aside>
    </>
  )
}
