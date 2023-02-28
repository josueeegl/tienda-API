"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_routes_1 = __importDefault(require("./users.routes"));
const products_routes_1 = __importDefault(require("./products.routes"));
const Exception_1 = require("../../../../domain/exceptions/Exception");
const route = (0, express_1.Router)();
route.use("/user", users_routes_1.default);
route.use("/products", products_routes_1.default);
route.use("/*", (req, res) => {
    res.status(404).send("invalid request, check url");
});
route.use((err, req, res, next) => {
    if (err instanceof Exception_1.Exception) {
        res.status(400).json({
            message: err.spanishMessage,
        });
    }
    else {
        next(err);
    }
});
route.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        error: err,
    });
});
exports.default = route;
