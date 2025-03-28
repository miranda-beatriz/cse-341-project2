const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.use("/books", require("./books"));
router.use("/readers", require("./readers"));

module.exports = router;
