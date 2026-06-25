import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDAOpqvwyqCicQC48c0fg15RByqac81EOA',
  authDomain: 'cafeteria-vendas-gustavo.firebaseapp.com',
  projectId: 'cafeteria-vendas-gustavo',
  storageBucket: 'cafeteria-vendas-gustavo.firebasestorage.app',
  messagingSenderId: '252369350943',
  appId: '1:252369350943:web:0bda52cb8fda759ebb402a'
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
