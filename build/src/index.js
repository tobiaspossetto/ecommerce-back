"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//initializations
const app = (0, express_1.default)();
//settings
app.set('port', 4000);
//middlewares
//routes
//static files
//starting server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
