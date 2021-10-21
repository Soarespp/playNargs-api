
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const morgan = require('morgan');
const path = require('path');

require('./config/connection');

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(
            "/files",
            express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
        );


        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
            this.app.use(cors());
            next();
        })
    }

    routes() {
        this.app.use(routes);
    }
}

module.exports = new App().app;