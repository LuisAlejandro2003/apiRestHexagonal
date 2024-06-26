// src/domain/repositories/IStorageRepository.ts

export interface IStorageRepository {
    upload(file: Express.Multer.File): Promise<string>;
}