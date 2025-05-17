import * as Minio from 'minio'

const minioClient = new Minio.Client({
  endPoint: process.env.minioEndpoint || 'localhost',
  port: 9000,
  useSSL: process.env.NODE_ENV === 'production',
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
})
export default minioClient