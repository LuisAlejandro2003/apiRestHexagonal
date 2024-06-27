"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/interfaces/http/expressApp.ts
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../adapters/controllers/userController");
const multerConfig_1 = require("../../infrastructure/config/multerConfig");
const storageController_1 = require("../../adapters/controllers/storageController");
const diContainer_1 = require("../../infrastructure/diContainer");
const storageService_1 = require("../../application/services/storageService");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Inicialización de servicios y controladores
const storageService = new storageService_1.StorageService(diContainer_1.storageRepository);
const storageController = new storageController_1.StorageController(storageService);
app.post('/upload', multerConfig_1.upload.single('file'), storageController.upload);
app.post('/api/users', userController_1.createUser);
app.get('/api/users/:id', userController_1.getUserById);
app.get('/api/users', userController_1.getAllUsers);
app.put('/api/users/:id', userController_1.updateUser);
app.delete('/api/users/:id', userController_1.deleteUserById);
exports.default = app;
