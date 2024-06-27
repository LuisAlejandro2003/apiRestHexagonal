"use strict";
// src/adapters/repositories/s3StorageRepository.ts
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
exports.S3StorageRepository = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class S3StorageRepository {
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
        this.s3 = new aws_sdk_1.default.S3({
            accessKeyId,
            secretAccessKey,
            sessionToken: sessionToken || undefined, // Incluir el sessionToken si está presente
            region, // Asegurarse de configurar la región
        });
    }
    upload(file) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const result = yield this.s3.upload(params).promise();
            // Retornar la URL del archivo subido
            return result.Location;
        });
    }
}
exports.S3StorageRepository = S3StorageRepository;
