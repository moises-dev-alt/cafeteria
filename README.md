☕ Cafeteria React

Uma aplicação web moderna para gerenciamento de pedidos de cafeteria, desenvolvida com React, Vite e Firebase Firestore. O sistema permite que clientes naveguem pelo cardápio, adicionem produtos ao carrinho, realizem pedidos para entrega ou retirada e tenham seus pedidos armazenados em banco de dados na nuvem.

📖 Sobre o Projeto

O Cafeteria React foi criado para simular a experiência de compra em uma cafeteria online. A aplicação possui uma interface intuitiva e responsiva, permitindo que os usuários:

Visualizem produtos em destaque.

Naveguem pelo cardápio completo.

Pesquisem e filtrem itens por categoria.

Adicionem produtos ao carrinho.

Ajustem quantidades dos itens.

Escolham entre entrega ou retirada.

Validem automaticamente o CEP utilizando a API ViaCEP.

Finalizem pedidos com diferentes métodos de pagamento.

Armazenem pedidos no Firebase Firestore.

✨ Funcionalidades

🏠 Página Inicial

Banner principal com chamada para ação.

Produtos em destaque.

Navegação rápida para o cardápio.

📋 Cardápio

Listagem completa de produtos.

Filtro por categorias.

Busca por nome ou descrição.

Ordenação por preço (crescente e decrescente).

🛒 Carrinho de Compras

Adição e remoção de itens.

Alteração de quantidades.

Cálculo automático do subtotal.

Persistência local utilizando localStorage.

🚚 Checkout

Escolha entre:

Entrega

Retirada no balcão

Validação de endereço via CEP.

Seleção de método de pagamento:

Pix

Cartão

Dinheiro

Campo para observações do pedido.

Cálculo automático da taxa de entrega.

☁️ Integração com Firebase

Armazenamento dos pedidos em Firestore.

Registro automático da data de criação.

Status inicial do pedido definido como novo.

🛠️ Tecnologias Utilizadas

Frontend

React 18

React DOM

Vite

Backend / Serviços

Firebase Firestore

APIs Externas

ViaCEP (consulta automática de CEP)

Armazenamento Local

LocalStorage

📂 Estrutura do Projeto

src/

│

├── components/

│   ├── CartDrawer.jsx

│   ├── Checkout.jsx

│   ├── Header.jsx

│   ├── Menu.jsx

│   └── ProductCard.jsx

│

├── context/

│   └── CartContext.jsx

│

├── data/

│   └── products.js

│

├── pages/

│   └── Home.jsx

│

├── services/

│   └── orders.js

│
├── firebase.js

├── App.jsx

├── main.jsx

└── styles.css

🍰 Produtos Disponíveis

☕ Bebidas

Espresso

Café Latte

Cappuccino

Iced Coffee

🥐 Salgados

Croissant

Pão de Queijo

Sanduíche Natural

Quiche de Alho-Poró

🍫 Doces
Bolo de Cenoura

⚙️ Instalação

1. Clonar o repositório
git clone https://github.com/seu-usuario/cafeteria-react.git
2. Entrar na pasta do projeto
cd cafeteria-react
3. Instalar dependências
npm install
4. Executar em ambiente de desenvolvimento
npm run dev

A aplicação ficará disponível em:

http://localhost:5173
🚀 Build para Produção

Gerar arquivos otimizados:

npm run build

Visualizar build localmente:

npm run preview
🔥 Configuração do Firebase

O projeto utiliza o Firebase Firestore para armazenar pedidos.

Coleção utilizada
orders
Estrutura básica do documento

{
 
  "id": "171234567890",
  
  "name": "João Silva",
  
  "phone": "11999999999",
  
  "fulfillment": "delivery",
  
  "payment": "pix",
  
  "items": [],
  
  "subtotal": 20.00,
  
  "deliveryFee": 4.90,
  
  "total": 24.90,
  
  "status": "novo",
  
  "createdAt": "timestamp"
  
}

📦 Fluxo do Pedido
Cliente
   ↓
Seleciona produtos
   ↓
Adiciona ao carrinho
   ↓
Preenche checkout
   ↓
Validação de CEP
   ↓
Escolhe pagamento
   ↓
Pedido salvo no Firestore
   ↓
Confirmação exibida na tela
💾 Persistência de Dados

O sistema utiliza:

LocalStorage

Para armazenar:

caf_cart

Carrinho atual do usuário.

caf_orders

Histórico local de pedidos.

Firebase Firestore

Para armazenar:

orders

Pedidos persistentes na nuvem.

🎨 Características da Interface
Layout responsivo.
Navegação simples e intuitiva.
Experiência semelhante a aplicativos de delivery.
Destaque visual para produtos.
Feedback imediato após confirmação do pedido.
Busca e filtros dinâmicos.
🔒 Validações Implementadas
Checkout

✔ Nome do cliente

✔ Telefone válido

✔ CEP válido

✔ Endereço completo para entregas

✔ Método de pagamento selecionado

✔ Valor para troco quando necessário

📈 Possíveis Melhorias Futuras
Sistema de autenticação com Firebase Auth.
Painel administrativo.
Rastreamento de pedidos em tempo real.
Integração com gateway de pagamento.
Cupons de desconto.
Favoritos.
Avaliações de produtos.
Histórico completo de pedidos.
Notificações por e-mail ou WhatsApp.
Dashboard com métricas de vendas.
👨‍💻 Autor

Projeto desenvolvido utilizando:

React
Vite
Firebase Firestore
