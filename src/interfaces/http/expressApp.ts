// src/interfaces/http/expressApp.ts
import express from 'express';
import { createUser, getUserById, getAllUsers, updateUser, deleteUserById } from '../../adapters/controllers/userController';
import { upload } from '../../infrastructure/config/multerConfig';
import { StorageController } from '../../adapters/controllers/storageController';
import { storageRepository } from '../../infrastructure/diContainer';
import { StorageService } from '../../application/services/storageService';


const app = express();
app.use(express.json());
// Inicialización de servicios y controladores
const storageService = new StorageService(storageRepository);
const storageController = new StorageController(storageService);
app.post('/upload', upload.single('file'), storageController.upload);
app.post('/api/users', createUser);
app.get('/api/users/:id', getUserById);
app.get('/api/users', getAllUsers);
app.put('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUserById);

export default app;
