Sistema de Controle de Volume de Armazenamento
Este projeto é uma aplicação desenvolvida para gerenciar volumes de estações de armazenamento de resíduos. Ele permite que os usuários monitorem o nível de ocupação de cada estação e gerenciem pedidos de coleta automaticamente quando um volume crítico for atingido.

🎯 Objetivo
Criar um painel interativo para:

Monitorar três estações de armazenamento.
Registrar o volume de ocupação de cada estação.
Gerar automaticamente um pedido de coleta ao atingir 80% de ocupação.
Confirmar as coletas e reiniciar o volume da estação para 0%.
Registrar todas as operações no Firebase para análises futuras.
🛠️ Tecnologias Utilizadas
React: Biblioteca para criação da interface.
TypeScript: Para tipagem estática.
Material UI (MUI): Para o design moderno e responsivo.
Firebase: Para salvar dados de volumes e coletas.
Node.js: Para possíveis expansões no backend (não implementado no momento).
📦 Configuração do Projeto
Pré-requisitos
Certifique-se de ter o seguinte instalado:

Node.js (versão 16 ou superior)
npm ou yarn
Conta no Firebase
Instalação
Clone este repositório:

git clone https://github.com/guideveloper00/sistema-controle-volume.git
cd sistema-controle-volume
Instale as dependências:

npm install

Configure o Firebase:

No Firebase, crie um novo projeto.

Ative o Realtime Database.

Copie as configurações do Firebase e crie um arquivo .env com as seguintes variáveis:

env
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  
npm start
Abra o navegador em http://localhost:3000.

🚀 Funcionalidades
Monitoramento de Estações:

Cada estação exibe o nome e o volume de ocupação.
O usuário pode atualizar o volume manualmente.
Gerar Pedido de Coleta:

Se o volume ultrapassar 80%, o sistema gera automaticamente um pedido de coleta.
Confirmar Coleta:

O usuário pode confirmar a coleta para uma estação, reiniciando seu volume para 0%.
Salvar no Firebase:

Os volumes e pedidos de coleta são registrados no banco de dados a cada 5 minutos.
🖼️ Interface do Usuário
A aplicação apresenta uma interface moderna e responsiva, criada com Material UI. Ela inclui:

Cartões individuais para cada estação.
Indicadores visuais para volumes acima de 80%.
Botão para confirmar coleta diretamente nos cartões.

📂 Estrutura do Projeto

src/
│
├── components/
│   ├── dtationCard.tsx       # Componente para exibir informações da estação
│
├── services/
│   ├── stationsServices.ts   # Conexões com o Firebase
│
├── pages/
│   ├── dashboard.tsx         # Página principal da aplicação
│
├── App.tsx                   # Componente raiz
├── index.tsx                 # Entrada da aplicação
└── firebase.ts         # Configurações do Firebase
