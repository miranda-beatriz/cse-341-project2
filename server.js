require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const errorHandler = require("./middleware/errorHandler");

const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Inicializa os bancos antes de iniciar o servidor
mongodb.initDbBooks((err) => {
  if (err) {
    console.error('Erro ao inicializar o banco de Books:', err);
  } else {
    console.log('Banco de Books inicializado.');
  }
});

mongodb.initDbReaders((err) => {
  if (err) {
    console.error('Erro ao inicializar o banco de Readers:', err);
  } else {
    console.log('Banco de Readers inicializado.');
  }
});

const booksRoutes = require('./routes/books');  
const readersRoutes = require('./routes/readers');

app.use('/books', booksRoutes);  
app.use('/readers', readersRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
