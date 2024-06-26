import { IUserRepository } from '../../domain/repositories/IUserRepository';
import User from '../../domain/models/user';
import { IUserDocument, UserModel } from './schemas/userSchema';

class MongoUserRepository implements IUserRepository {
    async save(user: User): Promise<User> {
        const userModel = new UserModel(user);
        const savedUser = await userModel.save();
        return new User(savedUser.id, savedUser.name, savedUser.email, savedUser.password);
    }

    async findById(id: string): Promise<User | null> {
        const user = await UserModel.findById(id);
        if (!user) return null;
        return new User(user.id, user.name, user.email, user.password);
    }

    async findAll(): Promise<User[]> {
        const users: IUserDocument[] = await UserModel.find();
        return users.map((user: IUserDocument) => new User(user.id, user.name, user.email, user.password));
    }

    async update(user: User): Promise<User> {
        const updatedUser = await UserModel.findByIdAndUpdate(user.id, user, { new: true });
        if (!updatedUser) throw new Error('User not found');
        return new User(updatedUser.id, updatedUser.name, updatedUser.email, updatedUser.password);
    }

    async deleteById(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id);
    }
}

export default MongoUserRepository;
