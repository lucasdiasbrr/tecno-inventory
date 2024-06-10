# Tecno Inventory

## Descrição do Projeto

Tecno Inventory é uma aplicação de gerenciamento de inventário que permite aos usuários criar, visualizar, atualizar e deletar registros de itens no inventário. O sistema foi desenvolvido com o objetivo de facilitar a organização e controle de estoque de itens em uma empresa ou organização.

## Tecnologias Utilizadas

### Linguagem de Programação
- JavaScript

### Frameworks e Bibliotecas
- **Frontend**: React
- **Backend**: Node.js com Express
- **Banco de Dados**: PostgreSQL
- **Gerenciamento de Pacotes**: npm (Node Package Manager)
- **Controle de Versão**: Git e GitHub

## Ambiente de Desenvolvimento Utilizado

- **Sistema Operacional**: Windows 10
- **Editor de Código**: Visual Studio Code
- **Node.js**: v14.17.0
- **npm**: v6.14.13
- **PostgreSQL**: v13

## Fiz o código em sua maior parte em inglês por que é a lingua "Universal"

## Instruções de Instalação e Execução

### Backend

1. Clone o repositório do backend:
    ```bash
    git clone https://github.com/lucasdiasbrr/tecno-inventory.git
    ```

2. Navegue até o diretório do backend:
    ```bash
    cd tecno-inventory-backend
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Configure o banco de dados PostgreSQL e ajuste as configurações no arquivo `config/database.js`.

5. Inicie o servidor:
    ```bash
    npm run dev
    ```

### Frontend

1. Clone o repositório do frontend:
    ```bash
    git clone <URL_DO_REPOSITORIO_FRONTEND>
    ```

2. Navegue até o diretório do frontend:
    ```bash
    cd tecno-inventory-frontend
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Inicie a aplicação React:
    ```bash
    npm start
    ```

### Requisitos de Sistema

- **Node.js**: v14.17.0 ou superior
- **npm**: v6.14.13 ou superior
- **PostgreSQL**: v13 ou superior

## Contribuição

Para contribuir com este projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma nova branch:
    ```bash
    git checkout -b minha-feature
    ```
3. Faça suas alterações e commite:
    ```bash
    git commit -m 'Minha nova feature'
    ```
4. Envie para o repositório original:
    ```bash
    git push origin minha-feature
    ```
5. Crie um pull request.

## Testes Automatizados

O projeto está preparado para a criação de testes automatizados utilizando as bibliotecas e frameworks padrão do React e Node.js.

## Padrão de Projeto (Opcional)

Foi aplicado o padrão de projeto **Client-Server** na arquitetura do backend para separar as responsabilidades e melhorar a manutenção do código.

---

## Package.json do Tecno Inventory Backend

```json
{
  "name": "tecno-inventory-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "axios": "^1.7.2",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "pg": "^8.12.0",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.37.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.1"
  }
}
```

## Package.json do Tecno Inventory Frontend

```json
{
  "name": "tecno-inventory-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.2",
    "date-fns": "^3.6.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```