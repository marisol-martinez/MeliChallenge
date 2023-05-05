const express = require("express");
require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.app.use(express.json())
    this.port = process.env.PORT;
    // Rutas de mi aplicación
    this.routes();
  }

  routes() {
    this.app.use("/api",require('../routes/items'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto: ", this.port);
    });
  }
}

module.exports = Server;
