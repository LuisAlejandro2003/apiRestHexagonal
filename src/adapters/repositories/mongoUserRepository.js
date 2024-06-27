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
const user_1 = __importDefault(require("../../domain/models/user"));
const userSchema_1 = require("./schemas/userSchema");
class MongoUserRepository {
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = new userSchema_1.UserModel(user);
            const savedUser = yield userModel.save();
            return new user_1.default(savedUser.id, savedUser.name, savedUser.email, savedUser.password);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userSchema_1.UserModel.findById(id);
            if (!user)
                return null;
            return new user_1.default(user.id, user.name, user.email, user.password);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userSchema_1.UserModel.find();
            return users.map((user) => new user_1.default(user.id, user.name, user.email, user.password));
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield userSchema_1.UserModel.findByIdAndUpdate(user.id, user, { new: true });
            if (!updatedUser)
                throw new Error('User not found');
            return new user_1.default(updatedUser.id, updatedUser.name, updatedUser.email, updatedUser.password);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userSchema_1.UserModel.findByIdAndDelete(id);
        });
    }
}
exports.default = MongoUserRepository;
