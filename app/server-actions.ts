'use server'

import minioClient from "@/connection/minio"
import { exit } from "process";


// add validation
export async function fileUpload(formData: FormData) {
    const bucket = 'amrit-ml-test'
    try {
        const file = formData.get("data");
        if (!(file instanceof File)) {
            console.warn("Potential malicious upload attempt: Received non-File object.");
            throw new Error("Invalid file type: Expected a File object.");
        }
        const allowedMimeTypes = ['text/csv', 'application/vnd.ms-excel'];
        if (!allowedMimeTypes.includes(file.type)) {
            console.warn(`Potential malicious upload attempt: Invalid MIME type - ${file.type}`);
            throw new Error(`Invalid file type. Allowed types are: ${allowedMimeTypes.join(', ')}`);
        }

        if (file.size > 10 * 1024 * 1024) {
            console.warn(`Potential malicious upload attempt: File size exceeds limit - ${file.size} bytes`);
            throw new Error("File size exceeds the allowed limit (10MB).");
        }

        const csvText = await file.text(); 
        const metadata = { 'Content-Type': 'text/csv'};
        if (/<[^>]*script[^>]*>|<\/?[a-z][\s\S]*>/i.test(csvText)) {
            console.warn("Possible script or HTML tag found in CSV content.");
            throw new Error("Possible script or HTML tag found in CSV content.");
        }
        
        minioClient.bucketExists(bucket).then(async (exists) => {
            if (!exists){
                minioClient.makeBucket(bucket, 'us-east-1').then(async () => {
                    await minioClient.putObject(bucket, file.name, csvText, file.size, metadata);
                })
            } else {
                await minioClient.putObject(bucket, file.name, csvText, file.size, metadata);
            }
        })

        return {success: true, message: "File uploaded successfully"}

    } catch (error: any) {
        console.error("Error while uploading", error.message);

        return {success: false, error: error.message}
    }

}