const { Router } = require('express');
const UserController = require('./app/Controllers/UserController');
const EssenciaController = require('./app/Controllers/EssenciaController');

const routes = new Router();

routes.post("/user", UserController.store);
routes.delete("/user", UserController.delete);
routes.get("/user", UserController.get);
routes.put("/user", UserController.update);
// Essencia
routes.post("/essencia", EssenciaController.store);
routes.delete("/essencia", EssenciaController.delete);
routes.get("/essencia", EssenciaController.get);
routes.put("/essencia", EssenciaController.update);

module.exports = routes;