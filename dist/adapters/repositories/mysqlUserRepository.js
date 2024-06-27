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
const mysqlConnection_1 = __importDefault(require("../../infrastructure/database/mysqlConnection"));
class MySQLUserRepository {
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            const [result] = yield connection.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password]);
            user.id = result.insertId.toString(); // Assuming `id` is a string in User model.
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            const [rows] = yield connection.execute('SELECT * FROM users WHERE id = ?', [id]);
            if (rows.length === 0)
                return null;
            const row = rows[0];
            return new user_1.default(row.id.toString(), row.name, row.email, row.password);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            const [rows] = yield connection.execute('SELECT * FROM users');
            return rows.map(row => new user_1.default(row.id.toString(), row.name, row.email, row.password));
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            yield connection.execute('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [user.name, user.email, user.password, user.id]);
            return user;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            yield connection.execute('DELETE FROM users WHERE id = ?', [id]);
        });
    }
}
exports.default = MySQLUserRepository;
