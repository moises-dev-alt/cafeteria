import React from 'react'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Home({ onNavigate }) {
  const featured = products.filter(product => ['latte', 'croissant', 'bolo-cenoura'].includes(product.id))

  return (
    <main>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow hero-enter">Cafe especial todos os dias</p>
          <h1 className="hero-enter delay-1">Seu pedido pronto para aquecer a rotina.</h1>
          <p className="hero-enter delay-2">Escolha bebidas, salgados e doces fresquinhos para retirar no balcao ou receber em casa.</p>
          <div className="hero-actions hero-enter delay-3">
            <button className="btn" onClick={() => onNavigate('menu')}>Ver cardapio</button>
            <button className="ghost-btn" onClick={() => onNavigate('menu')}>Pedir agora</button>
          </div>
          <div className="hero-stats hero-enter delay-4" aria-label="Destaques da cafeteria">
            <span><strong>15 min</strong> preparo medio</span>
            <span><strong>4.9</strong> avaliacao</span>
            <span><strong>9</strong> opcoes</span>
          </div>
        </div>
        <div className="hero-media">
          <img alt="Cafes e paes frescos em uma mesa de cafeteria" src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop" />
          <div className="floating-note">
            <strong>Combo da manha</strong>
            <span>Latte + croissant</span>
          </div>
        </div>
      </section>

      <section className="container section-head">
        <div>
          <p className="eyebrow">Mais pedidos</p>
          <h2>Favoritos da casa</h2>
        </div>
        <button className="link-button" onClick={() => onNavigate('menu')}>Explorar tudo</button>
      </section>

      <section className="container featured-grid">
        {featured.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </section>
    </main>
  )
}
