const swaggerAutogen = require("swagger-autogen")();

const doc = {
  swagger: "2.0", 
  info: {
    title: "Books API",
    description: "Books API",
    version: "1.0.0",
  },
  host: "books-jc03.onrender.com",
  schemes: ["http"], 
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"]; 

swaggerAutogen(outputFile, endpointsFiles, doc);
