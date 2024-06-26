// src/adapters/controllers/userController.ts
import { Request, Response } from 'express';
import { userService } from '../../infrastructure/diContainer';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    try {
        console.log("Request to create user:", name, email);
        const user = await userService.createUser(name, email, password);
        res.status(201).json(user);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in createUser:", error.message);
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        console.log("Request to get user by ID:", id);
        const user = await userService.getUserById(id);
        res.status(200).json(user);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in getUserById:", error.message);
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Request to get all users");
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in getAllUsers:", error.message);
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        console.log("Request to update user:", id, name, email);
        const user = await userService.updateUser(id, name, email, password);
        res.status(200).json(user);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in updateUser:", error.message);
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        console.log("Request to delete user by ID:", id);
        await userService.deleteUserById(id);
        res.status(204).send();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in deleteUserById:", error.message);
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};
