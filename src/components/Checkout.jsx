import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { saveOrder } from '../services/orders'

const initialAddress = {
  cep: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: '',
  complement: ''
}

const paymentOptions = [
  { id: 'pix', label: 'Pix', detail: 'Aprovacao imediata' },
  { id: 'card', label: 'Cartao', detail: 'Credito ou debito' },
  { id: 'cash', label: 'Dinheiro', detail: 'Pagamento na entrega' }
]

export default function Checkout({ onDone, onBack }) {
  const { items, subtotal, clear } = useCart()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState(initialAddress)
  const [payment, setPayment] = useState('pix')
  const [fulfillment, setFulfillment] = useState('delivery')
  const [notes, setNotes] = useState('')
  const [changeFor, setChangeFor] = useState('')
  const [addressStatus, setAddressStatus] = useState('idle')
  const [addressMessage, setAddressMessage] = useState('')
  const [processing, setProcessing] = useState(false)
  const deliveryFee = fulfillment === 'delivery' && subtotal < 35 ? 4.9 : 0
  const total = +(subtotal + deliveryFee).toFixed(2)
  const cleanPhone = phone.replace(/\D/g, '')

  function updateAddress(field, value) {
    setAddress(current => ({ ...current, [field]: value }))
    if (field === 'cep') {
      setAddressStatus('idle')
      setAddressMessage('')
    }
  }

  async function validateCep(cepValue = address.cep) {
    const cep = cepValue.replace(/\D/g, '')

    if (cep.length !== 8) {
      setAddressStatus('error')
      setAddressMessage('Digite um CEP valido com 8 numeros.')
      return false
    }

    setAddressStatus('checking')
    setAddressMessage('Verificando endereco...')

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()

      if (data.erro) {
        setAddressStatus('error')
        setAddressMessage('CEP nao encontrado. Confira o endereco informado.')
        return false
      }

      setAddress(current => ({
        ...current,
        cep,
        street: current.street || data.logradouro || '',
        neighborhood: current.neighborhood || data.bairro || '',
        city: data.localidade || current.city,
        state: data.uf || current.state
      }))
      setAddressStatus('valid')
      setAddressMessage('Endereco localizado. Confira numero e complemento.')
      return true
    } catch {
      setAddressStatus('error')
      setAddressMessage('Nao foi possivel verificar o CEP agora. Tente novamente.')
      return false
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const needsDelivery = fulfillment === 'delivery'
    const cepIsValid = !needsDelivery || addressStatus === 'valid' || await validateCep()
    const missingAddress = needsDelivery && (!address.street || !address.number || !address.neighborhood || !address.city || !address.state)

    if (!cepIsValid || missingAddress) {
      setAddressStatus('error')
      setAddressMessage('Preencha um endereco completo antes de finalizar.')
      return
    }

    if (cleanPhone.length < 10) return

    setProcessing(true)
    try {
      const orders = JSON.parse(localStorage.getItem('caf_orders') || '[]')
      const order = {
        id: String(Date.now()),
        name,
        phone,
        address: needsDelivery ? address : null,
        fulfillment,
        payment,
        notes,
        changeFor: payment === 'cash' ? changeFor : '',
        items,
        subtotal,
        deliveryFee,
        total
      }
      const firestoreId = await saveOrder(order)
      const savedOrder = { ...order, firestoreId }
      orders.push(savedOrder)
      localStorage.setItem('caf_orders', JSON.stringify(orders))
      clear()
      onDone(savedOrder)
    } catch (error) {
      setAddressStatus('error')
      setAddressMessage('Nao foi possivel salvar o pedido no Firebase. Tente novamente.')
    } finally {
      setProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="checkout empty-checkout">
        <p className="eyebrow">Carrinho vazio</p>
        <h2>Escolha alguns itens primeiro.</h2>
        <p className="muted">Seu pedido aparece aqui assim que voce adiciona produtos ao carrinho.</p>
        <button className="btn" onClick={onBack}>Voltar ao cardapio</button>
      </div>
    )
  }

  return (
    <div className="checkout">
      <p className="eyebrow">Quase la</p>
      <h2>Finalize seu pedido</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Nome
          <input required value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Telefone
          <input
            required
            inputMode="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="(11) 99999-9999"
          />
        </label>
        {phone && cleanPhone.length < 10 && <p className="field-message error">Informe um telefone com DDD.</p>}

        <fieldset className="form-section">
          <legend>Como deseja receber?</legend>
          <div className="payment-options two-columns">
            <label className={fulfillment === 'delivery' ? 'payment-card active' : 'payment-card'}>
              <input
                type="radio"
                name="fulfillment"
                value="delivery"
                checked={fulfillment === 'delivery'}
                onChange={e => setFulfillment(e.target.value)}
              />
              <strong>Entrega</strong>
              <span>{deliveryFee > 0 ? `Taxa R$ ${deliveryFee.toFixed(2)}` : 'Entrega gratis'}</span>
            </label>
            <label className={fulfillment === 'pickup' ? 'payment-card active' : 'payment-card'}>
              <input
                type="radio"
                name="fulfillment"
                value="pickup"
                checked={fulfillment === 'pickup'}
                onChange={e => setFulfillment(e.target.value)}
              />
              <strong>Retirada</strong>
              <span>Sem taxa, pronto em media 15 min</span>
            </label>
          </div>
        </fieldset>

        {fulfillment === 'delivery' && (
          <fieldset className="form-section">
            <legend>Endereco de entrega</legend>
            <div className="address-grid">
              <label>
                CEP
                <input
                  required
                  inputMode="numeric"
                  maxLength="9"
                  value={address.cep}
                  onBlur={() => validateCep()}
                  onChange={e => updateAddress('cep', e.target.value)}
                  placeholder="00000-000"
                />
              </label>
              <label className="span-2">
                Rua
                <input required value={address.street} onChange={e => updateAddress('street', e.target.value)} />
              </label>
              <label>
                Numero
                <input required value={address.number} onChange={e => updateAddress('number', e.target.value)} />
              </label>
              <label>
                Bairro
                <input required value={address.neighborhood} onChange={e => updateAddress('neighborhood', e.target.value)} />
              </label>
              <label>
                Cidade
                <input required value={address.city} onChange={e => updateAddress('city', e.target.value)} />
              </label>
              <label>
                UF
                <input required maxLength="2" value={address.state} onChange={e => updateAddress('state', e.target.value.toUpperCase())} />
              </label>
              <label className="span-2">
                Complemento
                <input value={address.complement} onChange={e => updateAddress('complement', e.target.value)} placeholder="Apto, bloco, referencia..." />
              </label>
            </div>
            {addressMessage && <p className={`field-message ${addressStatus}`}>{addressMessage}</p>}
          </fieldset>
        )}

        <fieldset className="form-section">
          <legend>Forma de pagamento</legend>
          <div className="payment-options">
            {paymentOptions.map(option => (
              <label key={option.id} className={payment === option.id ? 'payment-card active' : 'payment-card'}>
                <input
                  type="radio"
                  name="payment"
                  value={option.id}
                  checked={payment === option.id}
                  onChange={e => setPayment(e.target.value)}
                />
                <strong>{option.label}</strong>
                <span>{option.detail}</span>
              </label>
            ))}
          </div>
          {payment === 'cash' && (
            <label>
              Troco para
              <input value={changeFor} onChange={e => setChangeFor(e.target.value)} placeholder="Ex: R$ 50,00" />
            </label>
          )}
        </fieldset>

        <label>
          Observacoes
          <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Ex: sem canela, entregar na portaria..." />
        </label>

        <div className="summary order-summary">
          <span>Subtotal <strong>R$ {subtotal.toFixed(2)}</strong></span>
          <span>Entrega <strong>{deliveryFee > 0 ? `R$ ${deliveryFee.toFixed(2)}` : 'Gratis'}</strong></span>
          <span>Total <strong>R$ {total.toFixed(2)}</strong></span>
        </div>
        <button className="btn" disabled={processing || items.length===0}>
          {processing ? 'Processando...' : 'Confirmar pedido'}
        </button>
      </form>
    </div>
  )
}
