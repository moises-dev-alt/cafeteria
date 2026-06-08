import React, { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    add(product.id, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 900)
  }

  return (
    <article className={`card fade-in ${added ? 'added' : ''}`}>
      {product.image && (
        <div className="card-media">
          <img src={product.image} alt={product.name} />
          <div className="badge">{product.category}</div>
        </div>
      )}
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="muted">{product.description}</p>
        <div className="card-footer">
          <div className="price">R$ {product.price.toFixed(2)}</div>
          <div className="quantity-stepper" aria-label={`Quantidade de ${product.name}`}>
            <button onClick={() => setQty(current => Math.max(1, current - 1))} aria-label="Diminuir quantidade">-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(current => current + 1)} aria-label="Aumentar quantidade">+</button>
          </div>
        </div>
        <button onClick={handleAdd} className="btn add-btn">
          {added ? 'Adicionado' : 'Adicionar ao carrinho'}
        </button>
      </div>
    </article>
  )
}
