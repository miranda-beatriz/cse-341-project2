const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json"); // Certifique-se do caminho correto

// Rota de documentação Swagger
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota raiz apenas para teste
router.get("/", (req, res) => {
    res.send("Hello World");
});

// Importando e configurando as rotas corretamente
router.use("/books", require("./books"));
router.use("/readers", require("./readers"));

module.exports = router;
