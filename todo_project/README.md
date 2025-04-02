Done é um site de tarefas simples em vanilla

todo/
├── public/
│   ├── favicon.ico       # Ícone do site
│   ├── imagens/          # Imagens do projeto (ex.: logo.png)
│   └── fonts/            # Fontes personalizadas
└── src/
    ├── css/
    │   └── style.css     # Estilos globais
    ├── js/
    │   ├── main.js       # Inicialização da aplicação e gerenciamento de estado
    │   ├── router.js     # Gerencia as rotas da SPA (com lazy loading simples)
    │   ├── auth.js       # Gerencia login e autenticação
    │   ├── storage.js    # Gerencia o armazenamento das tarefas
    │   ├── components/
    │   │   ├── header.js  # Cabeçalho do site (com template HTML)
    │   │   └── todoList.js # Lógica e renderização da lista de tarefas
    │   └── pages/
    │       ├── home.js      # Módulo da página principal
    │       ├── login.js     # Módulo da página de login
    │       ├── about.js     # Módulo da página "Sobre"
    │       └── notfound.js  # Módulo para página 404
    └── index.html         # Único arquivo HTML
