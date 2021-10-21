const { Router } = require('express');
const multer = require('multer');

const UserController = require('./app/Controllers/UserController');
const EssenciaController = require('./app/Controllers/EssenciaController');
const ImgController = require('./app/Controllers/ImgController');
const PostController = require('./app/Controllers/PostController');

const multerConfig = require('./config/multer');

const Post = require('./app/Models/Post')

const routes = new Router();

routes.post("/user", UserController.store);
routes.delete("/user", UserController.delete);
routes.get("/user", UserController.get);
routes.put("/user", UserController.update);

// Essencia
routes.get("/essencia", EssenciaController.get);
routes.get("/essencia/:id", EssenciaController.getId);
routes.post("/essencia", EssenciaController.store);
routes.delete("/essencia", EssenciaController.delete);
routes.put("/essencia", EssenciaController.update);

//img
routes.get("/img", ImgController.get);
routes.get("/img/:id", ImgController.getId);
routes.post("/img", multer(multerConfig).single("file"), ImgController.post);
routes.delete("/img/:id", ImgController.del);

//posts
routes.get("/posts", PostController.get);
routes.get("/posts/:id", PostController.getId);
routes.post("/posts", multer(multerConfig).single("file"), PostController.post);
routes.delete("/posts/:id", PostController.del);


module.exports = routes;