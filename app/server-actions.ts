'use server'

import minioClient from "@/connection/minio";
import { verifySession } from "./actions/sessions";
import { v4 as uuidv4 } from 'uuid';

export async function fileUpload(formData: FormData) {
    if (!formData) return { success: false, error: "Form data is undefined" };

    const session = await verifySession();
    const userId = session?.userId;
    if (!userId) {
        return { success: false, error: "Session validation error" };
    }

    try {
        const file = formData.get("data");
        if (!file || !(file instanceof File)) {
            return { success: false, error: "Invalid file input" };
        }

        const allowedMimeTypes = ['text/csv', 'application/vnd.ms-excel'];
        if (!allowedMimeTypes.includes(file.type)) {
            console.warn(`Invalid MIME type - ${file.type}`);
            throw new Error(`Invalid file type. Allowed types are: ${allowedMimeTypes.join(', ')}`);
        }

        if (file.size > 10 * 1024 * 1024) {
            console.warn(`File size exceeds limit - ${file.size} bytes`);
            throw new Error("File size exceeds the allowed limit (10MB).");
        }

        const csvText = await file.text();

        // Scan for potentially malicious content in the CSV
        if (/<[^>]*script[^>]*>|<\/?[a-z][\s\S]*>/i.test(csvText)) {
            console.warn("Possible script or HTML tag found in CSV content.");
            throw new Error("Possible script or HTML tag found in CSV content.");
        }

        // Sanitize and build object key
        const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
        const uniqueFileName = `${uuidv4()}_${sanitizedFileName}`;
        const objectKey = `uploads/${userId}/${uniqueFileName}`;

        const bucket = process.env.MINIO_BUCKET;
        if (!bucket) return { success: false, error: "Bucket name is undefined" };

        // Ensure bucket exists
        const bucketExists = await minioClient.bucketExists(bucket);
        if (!bucketExists) {
            await minioClient.makeBucket(bucket, 'us-east-1');
        }

        const metadata = { 'Content-Type': 'text/csv' };
        await minioClient.putObject(bucket, objectKey, csvText, file.size, metadata);

        return { success: true, message: "File uploaded successfully" };
    } catch (error: any) {
        console.error("Error during file upload:", error.message);
        return { success: false, error: error.message };
    }
}
