import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: "auto",
  endpoint: "https://xxx.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

export async function getPresignedUrl(fileKey) {
  const command = new GetObjectCommand({
    Bucket: "egitim-videolari",
    Key: fileKey,
  });

  return await getSignedUrl(client, command, { expiresIn: 3600 });
}
