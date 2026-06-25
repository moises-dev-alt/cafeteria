import React, { useState } from 'react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

function friendlyError(error) {
  const messages = {
    'auth/email-already-in-use': 'Este e-mail já possui uma conta.',
    'auth/invalid-email': 'Informe um e-mail válido.',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
    'auth/operation-not-allowed': 'O cadastro por e-mail ainda não está ativado no Firebase. Ative Authentication > Sign-in method > E-mail/senha.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/too-many-requests': 'Muitas tentativas. Aguarde um momento e tente novamente.',
    'auth/profile-not-found': 'Este e-mail não possui cadastro no sistema. Crie sua conta para continuar.',
    'permission-denied': 'O Firebase recusou o salvamento do perfil. Atualize a página e tente novamente.'
  }

  return messages[error.code] || 'Não foi possível concluir a operação. Tente novamente.'
}

const googleProvider = new GoogleAuthProvider()

async function ensureUserProfile(user) {
  const profileRef = doc(db, 'users', user.uid)
  const profile = await getDoc(profileRef)

  if (!profile.exists()) {
    await setDoc(profileRef, {
      name: user.displayName || '',
      email: user.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return
  }

  await setDoc(profileRef, {
    name: user.displayName || profile.data().name || '',
    email: user.email || profile.data().email || '',
    updatedAt: serverTimestamp()
  }, { merge: true })
}

export default function Auth({ mode = 'login', onNavigate, onAuthenticated, returnToCheckout = false }) {
  const isSignup = mode === 'signup'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function finishAuth() {
    if (onAuthenticated) {
      onAuthenticated()
      return
    }

    onNavigate('home')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      if (isSignup) {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password)
        await updateProfile(credential.user, { displayName: name.trim() })
        await setDoc(doc(db, 'users', credential.user.uid), {
          name: name.trim(),
          email: credential.user.email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })
      } else {
        const credential = await signInWithEmailAndPassword(auth, email.trim(), password)
        const profile = await getDoc(doc(db, 'users', credential.user.uid))

        if (!profile.exists()) {
          await auth.signOut()
          const error = new Error('Perfil não encontrado')
          error.code = 'auth/profile-not-found'
          throw error
        }
      }
      await finishAuth()
    } catch (error) {
      setMessage(friendlyError(error))
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setMessage('')
    setLoading(true)

    try {
      const credential = await signInWithPopup(auth, googleProvider)
      await ensureUserProfile(credential.user)
      await finishAuth()
    } catch (error) {
      setMessage(friendlyError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page container">
      <section className="auth-card fade-in" aria-labelledby="auth-title">
        <p className="eyebrow">Cafeteria Dos Amigões</p>
        <h1 id="auth-title">{isSignup ? 'Crie sua conta' : 'Que bom ter você de volta'}</h1>
        <p className="muted">
          {returnToCheckout
            ? 'Entre ou crie sua conta para finalizar o pagamento com seguranca.'
            : isSignup ? 'Cadastre-se para acompanhar seus pedidos e deixar a próxima compra ainda mais rápida.' : 'Entre para continuar seu pedido.'}
        </p>
        <button className="google-btn" onClick={handleGoogleSignIn} disabled={loading} type="button">
          <span aria-hidden="true">G</span>
          Continuar com Google
        </button>
        <div className="auth-divider"><span>ou</span></div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <label>
              Nome completo
              <input value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" placeholder="Seu nome" />
            </label>
          )}
          <label>
            E-mail
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" placeholder="voce@email.com" />
          </label>
          <label>
            Senha
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength="6" autoComplete={isSignup ? 'new-password' : 'current-password'} placeholder="Mínimo de 6 caracteres" />
          </label>
          {message && <p className="field-message error" role="alert">{message}</p>}
          <button className="btn" disabled={loading}>{loading ? 'Aguarde...' : isSignup ? 'Criar conta' : 'Entrar'}</button>
        </form>
        <p className="auth-switch">
          {isSignup ? 'Já tem uma conta?' : 'Ainda não tem uma conta?'}{' '}
          <button className="link" onClick={() => onNavigate(isSignup ? 'login' : 'signup')} type="button">{isSignup ? 'Entrar' : 'Cadastre-se'}</button>
        </p>
      </section>
    </main>
  )
}
