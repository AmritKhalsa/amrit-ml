import * as Minio from 'minio'

const minioClient = new Minio.Client({
  endPoint: process.env.minioEndpoint || 'localhost',
  port: 9000,
  useSSL: process.env.NODE_ENV === 'production',
  accessKey: process.env.minioAccessKey,
  secretKey: process.env.minioSecretKey,
})
export default minioClient