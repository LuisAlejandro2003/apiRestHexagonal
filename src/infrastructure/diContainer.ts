// src/infrastructure/diContainer.ts
import { IUserRepository } from '../domain/repositories/IUserRepository';
import MongoUserRepository from '../adapters/repositories/mongoUserRepository';
import MySQLUserRepository from '../adapters/repositories/mysqlUserRepository';
import { UserService } from '../application/services/userService';
import connectMongoDB from './database/mongoConnection';
import connectMySQL from './database/mysqlConnection';
import { S3StorageRepository } from '../adapters/repositories/s3StorageRepository';
import { LocalStorageRepository } from '../adapters/repositories/localStorageRepository';
import { IStorageRepository } from '../domain/repositories/IStorageRepository';



const useMongoDB: boolean = process.env.USE_MONGODB === 'true';

const useS3: boolean = process.env.USE_S3 === 'true';

let userRepository: IUserRepository;

if (useMongoDB) {
    connectMongoDB();
    userRepository = new MongoUserRepository();
} else {
    connectMySQL();
    userRepository = new MySQLUserRepository();
}



let storageRepository: IStorageRepository;

if (useS3) {
    storageRepository = new S3StorageRepository();
} else {
    storageRepository = new LocalStorageRepository();
}

const userService = new UserService(userRepository);

export { userService , storageRepository };
