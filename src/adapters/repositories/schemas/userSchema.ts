import { Schema, model, Document } from 'mongoose';

interface IUserDocument extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const UserModel = model<IUserDocument>('User', userSchema);

export { IUserDocument, UserModel };
