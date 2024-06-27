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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_1 = __importDefault(require("../../domain/models/user"));
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Creating user:", name, email);
            const user = new user_1.default(null, name, email, password);
            return yield this.userRepository.save(user);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Getting user by ID:", id);
            return yield this.userRepository.findById(id);
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Getting all users");
            return yield this.userRepository.findAll();
        });
    }
    updateUser(id, name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Updating user:", id, name, email);
            const user = new user_1.default(id, name, email, password);
            return yield this.userRepository.update(user);
        });
    }
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Deleting user by ID:", id);
            return yield this.userRepository.deleteById(id);
        });
    }
}
exports.UserService = UserService;
