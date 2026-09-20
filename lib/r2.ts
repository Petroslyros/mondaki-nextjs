import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

function createR2Client() {
    return new S3Client({
        region: "auto",
        endpoint: process.env.R2_ENDPOINT!,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY!,
            secretAccessKey: process.env.R2_SECRET_KEY!,
        },
        requestChecksumCalculation: "WHEN_REQUIRED",
        responseChecksumValidation: "WHEN_REQUIRED",
    });
}

export async function uploadImageToR2(file: File, folder: string): Promise<string> {
    const bucket = process.env.R2_BUCKET!;
    const publicUrl = process.env.R2_PUBLIC_URL!;

    const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const fileName = `${folder}/${crypto.randomUUID()}.${extension}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const client = createR2Client();
    await client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
    }));

    return `${publicUrl}/${fileName}`;
}

export async function deleteImageFromR2(imageUrl: string): Promise<void> {
    const bucket = process.env.R2_BUCKET!;
    const publicUrl = process.env.R2_PUBLIC_URL!;
    const key = imageUrl.replace(`${publicUrl}/`, "");

    const client = createR2Client();
    await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}