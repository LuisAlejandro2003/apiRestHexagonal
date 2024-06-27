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
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
        if (!accessKeyId || !secretAccessKey) {
            throw new Error('AWS credentials are not defined in .env');
        }
        this.s3 = new aws_sdk_1.default.S3({
            accessKeyId,
            secretAccessKey,
        });
    }
    upload(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const bucketName = process.env.AWS_S3_BUCKET_NAME;
            if (!bucketName) {
                throw new Error('AWS S3 bucket name is not defined in .env');
            }
            const params = {
                Bucket: bucketName,
                Key: `${Date.now()}-${file.originalname}`,
                Body: file.buffer,
            };
            const result = yield this.s3.upload(params).promise();
            return result.Location;
        });
    }
}
exports.S3StorageRepository = S3StorageRepository;
