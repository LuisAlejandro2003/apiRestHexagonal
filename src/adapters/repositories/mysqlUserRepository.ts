// src/adapters/repositories/mysqlUserRepository.ts
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import User from '../../domain/models/user';
import connectMySQL from '../../infrastructure/database/mysqlConnection';
import { RowDataPacket, OkPacket, FieldPacket } from 'mysql2';

class MySQLUserRepository implements IUserRepository {
    async save(user: User): Promise<User> {
        const connection = await connectMySQL();
        const [result]: [OkPacket, FieldPacket[]] = await connection.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [user.name, user.email, user.password]
        );
        user.id = result.insertId.toString(); // Assuming `id` is a string in User model.
        return user;
    }

    async findById(id: string): Promise<User | null> {
        const connection = await connectMySQL();
        const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );
        if (rows.length === 0) return null;
        const row = rows[0];
        return new User(row.id.toString(), row.name, row.email, row.password);
    }

    async findAll(): Promise<User[]> {
        const connection = await connectMySQL();
        const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute('SELECT * FROM users');
        return rows.map(row => new User(row.id.toString(), row.name, row.email, row.password));
    }

    async update(user: User): Promise<User> {
        const connection = await connectMySQL();
        await connection.execute(
            'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
            [user.name, user.email, user.password, user.id]
        );
        return user;
    }

    async deleteById(id: string): Promise<void> {
        const connection = await connectMySQL();
        await connection.execute('DELETE FROM users WHERE id = ?', [id]);
    }
}

export default MySQLUserRepository;
