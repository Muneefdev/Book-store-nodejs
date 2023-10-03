import {
	DeleteObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";

export async function s3upload(file) {
	const s3 = new S3Client();

	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: `uploads/${uuid()}-${file.originalname}`,
		Body: file.buffer,
	};

	await s3.send(new PutObjectCommand(params));

	return `${process.env.BASE_IMAGE_URL}/${params.Key}`;
}

export async function s3deleteImage(key) {
	const s3 = new S3Client();

	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: key,
	};

	await s3.send(new DeleteObjectCommand(params));
}
