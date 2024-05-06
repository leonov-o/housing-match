import {DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";


const s3Client = new S3Client({
    region: process.env.BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
});


export function uploadFile(fileBuffer, fileName, mimetype) {
    const uploadParams = {
        Bucket: process.env.BUCKET_NAME,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype
    }

    return s3Client.send(new PutObjectCommand(uploadParams));
}

export function deleteFile(fileName) {
    const deleteParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
    }

    return s3Client.send(new DeleteObjectCommand(deleteParams));
}

export async function getObjectSignedUrl(fileName) {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName
    }

    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, {expiresIn: 60});

    return url
}
