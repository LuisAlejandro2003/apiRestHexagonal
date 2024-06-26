// src/domain/models/User.ts
export default class User {
    id: string | null;  // Si el ID puede ser nulo al crear un nuevo usuario que aún no está en la base de datos
    name: string;
    email: string;
    password: string;

    constructor(id: string | null, name: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
