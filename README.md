# Guia de perguntas Curso Udemy:
Arquivos da Atividade do curso de NodeJS.
## Instalar Dependências do Projeto:
```node
npm install
```
### Alterar as configurações do arquivo database.js
```javascript
const Sequelize = require('sequelize');

const connection = new Sequelize('DatabaseName','User','Pass',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
```
