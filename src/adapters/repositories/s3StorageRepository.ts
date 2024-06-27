// src/adapters/repositories/s3StorageRepository.ts

import AWS from 'aws-sdk';
import { IStorageRepository } from '../../domain/repositories/IStorageRepository';

export class S3StorageRepository implements IStorageRepository {
    private s3: AWS.S3;

    constructor() {
        // Obtener las credenciales de AWS del entorno
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
        const sessionToken = process.env.AWS_SESSION_TOKEN; // Obtener el AWS_SESSION_TOKEN del entorno
        const region = process.env.AWS_REGION;

        // Validar las credenciales y la región
        if (!accessKeyId || !secretAccessKey || !region) {
            throw new Error('AWS credentials or region are not defined in .env');
        }

        // Configurar el cliente S3 con el token de sesión si está disponible
        this.s3 = new AWS.S3({
            accessKeyId,
            secretAccessKey,
            sessionToken: sessionToken || undefined, // Incluir el sessionToken si está presente
            region, // Asegurarse de configurar la región
        });
    }

    async upload(file: Express.Multer.File): Promise<string> {
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        
        // Validar el nombre del bucket
        if (!bucketName) {
            throw new Error('AWS S3 bucket name is not defined in .env');
        }

        // Configurar los parámetros para la carga del archivo
        const params = {
            Bucket: bucketName,
            Key: `${Date.now()}-${file.originalname}`, // Generar un nombre único para el archivo
            Body: file.buffer,
        };

        // Subir el archivo a S3
        const result = await this.s3.upload(params).promise();

        // Retornar la URL del archivo subido
        return result.Location;
    }
}
