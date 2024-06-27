"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUser = exports.getAllUsers = exports.getUserById = exports.createUser = void 0;
const diContainer_1 = require("../../infrastructure/diContainer");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        console.log("Request to create user:", name, email);
        const user = yield diContainer_1.userService.createUser(name, email, password);
        res.status(201).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in createUser:", error.message);
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.createUser = createUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        console.log("Request to get user by ID:", id);
        const user = yield diContainer_1.userService.getUserById(id);
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in getUserById:", error.message);
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.getUserById = getUserById;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request to get all users");
        const users = yield diContainer_1.userService.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in getAllUsers:", error.message);
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.getAllUsers = getAllUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        console.log("Request to update user:", id, name, email);
        const user = yield diContainer_1.userService.updateUser(id, name, email, password);
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in updateUser:", error.message);
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.updateUser = updateUser;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        console.log("Request to delete user by ID:", id);
        yield diContainer_1.userService.deleteUserById(id);
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in deleteUserById:", error.message);
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.deleteUserById = deleteUserById;
