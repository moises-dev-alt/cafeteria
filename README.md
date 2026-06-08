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
