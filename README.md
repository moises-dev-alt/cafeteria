☕ Cafeteria Vendas

Sistema web moderno para gerenciamento e realização de pedidos em uma cafeteria, desenvolvido com React, Vite e Firebase. A plataforma permite aos clientes navegar pelo cardápio, adicionar produtos ao carrinho e concluir pedidos de forma rápida e intuitiva.

📸 Demonstração

Site online: cafeteria-vendas-gustavo.web.app

Cafeteria Vendas

🚀 Funcionalidades
👤 Cliente
Visualização do cardápio completo
Pesquisa de produtos
Filtro por categorias
Carrinho de compras dinâmico
Atualização de quantidades
Cálculo automático de valores
Checkout simplificado
Escolha entre entrega e retirada
Seleção de método de pagamento
Validação automática de CEP

🛒 Gestão de Pedidos

Registro de pedidos no Firebase Firestore
Geração automática de identificador do pedido
Controle de status
Histórico de pedidos

📱 Interface

Layout responsivo
Compatível com desktop, tablet e celular
Navegação intuitiva
Componentização com React

🛠️ Tecnologias Utilizadas

Tecnologia	Finalidade
React	Interface do usuário
Vite	Build e desenvolvimento
Firebase	Banco de dados e hospedagem
Firestore	Armazenamento de pedidos
ViaCEP	Consulta automática de CEP
CSS3	Estilização
📂 Estrutura do Projeto

src/

├── components/

├── context/

├── data/

├── pages/

├── services/

├── firebase.js

├── App.jsx

└── main.jsx

⚙️ Instalação

git clone <repositorio>
cd cafeteria
npm install
npm run dev

🔥 Firebase

Configure as credenciais do Firebase no arquivo:

firebase.js

Cole suas credenciais do projeto Firebase:

const firebaseConfig = {

  apiKey: "...",
  
  authDomain: "...",
  
  projectId: "...",
  
  storageBucket: "...",
  
  messagingSenderId: "...",
  
  appId: "..."
  
};

## 🔥 Configuração do Firebase

Este projeto utiliza **Firebase Hosting** para hospedagem e **Cloud Firestore** para armazenamento dos pedidos.

### Estrutura do Firebase

Arquivo firebase.json:

json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}


### O que cada configuração faz

#### Hosting

* public: "dist" → define a pasta gerada pelo Vite para publicação.
* rewrites → permite que o React Router funcione corretamente ao atualizar páginas ou acessar rotas diretamente.

#### Firestore

* rules → arquivo responsável pelas regras de segurança do banco de dados.
* indexes → arquivo que armazena índices utilizados em consultas mais avançadas.

---

### Configurar o Firestore

1. Acesse o Firebase Console.
2. Crie um projeto.
3. Ative o **Cloud Firestore**.
4. Crie um banco no modo Produção ou Teste.
5. Copie as credenciais do projeto para o arquivo `src/firebase.js`.

Exemplo:

javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};


---

### Publicar o Banco de Dados e Regras

Após configurar o Firebase, execute:

bash
firebase deploy --only firestore


Para publicar apenas as regras:

bash
firebase deploy --only firestore:rules


Para publicar apenas os índices:

bash
firebase deploy --only firestore:indexes


---

### Publicar a Aplicação

Gerar build:

bash
npm run build


Realizar deploy:

bash
firebase deploy


O Firebase irá publicar:

* Hosting (dist)
* Regras do Firestore (firestore.rules)
* Índices do Firestore (firestore.indexes.json)

conforme configurado no arquivo firebase.json.


📈 Melhorias Futuras

Login de usuários
Área administrativa
Dashboard de vendas
Integração com WhatsApp
Integração com Pix
Cupons de desconto
Programa de fidelidade
Rastreamento de pedidos

👨‍💻 Desenvolvedor

Gustavo

Projeto desenvolvido para fins de estudo, portfólio e demonstração de habilidades em React, Firebase e desenvolvimento web moderno.
