"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/domain/models/User.ts
class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
exports.default = User;
