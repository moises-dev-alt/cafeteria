import React, { useMemo, useState } from 'react'
import products from '../data/products'
import ProductCard from './ProductCard'

export default function Menu() {
  const [filter, setFilter] = useState('Todos')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const categories = useMemo(() => ['Todos', ...Array.from(new Set(products.map(p => p.category)) )], [])
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const visible = products.filter(product => {
      const matchesCategory = filter === 'Todos' || product.category === filter
      const matchesQuery = !normalizedQuery || `${product.name} ${product.description}`.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })

    if (sort === 'price-asc') return [...visible].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...visible].sort((a, b) => b.price - a.price)
    return visible
  }, [filter, query, sort])

  return (
    <main className="container menu-page">
      <div className="menu-head">
        <div>
          <p className="eyebrow">Cardapio</p>
          <h1>Escolha seu cafe sem pressa.</h1>
        </div>
        <div className="menu-tools">
          <label className="search-box">
            <span>Buscar</span>
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Latte, bolo, queijo..."
            />
          </label>
          <label className="select-box">
            <span>Ordenar</span>
            <select value={sort} onChange={event => setSort(event.target.value)}>
              <option value="featured">Relevancia</option>
              <option value="price-asc">Menor preco</option>
              <option value="price-desc">Maior preco</option>
            </select>
          </label>
        </div>
      </div>
      <div className="filters" role="list" aria-label="Categorias">
        {categories.map(c => (
          <button key={c} className={c === filter ? 'active' : ''} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>
      <div className="result-count">{filtered.length} item(ns) encontrado(s)</div>
      <div className="grid">
        {filtered.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <h3>Nada por aqui ainda.</h3>
            <p>Tente outra busca ou categoria.</p>
          </div>
        )}
      </div>
    </main>
  )
}
