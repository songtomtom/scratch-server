/**
 * Default configuration
 */
const defaultConfig = {
  app: {
    title: 'LUXROBO ENTRY',
    description: 'Luxrobo Entry'
  },
  host: process.env.HOST || '0.0.0.0',
  domain: process.env.DOMAIN || 'dev-entry.luxrobo.com',
  port: process.env.PORT || 3000,
  templateEngine: 'swig',

  sessionCookie: {
    maxAge: 24 * (60 * 60 * 1000),
    httpOnly: true,
    secure: false
  },

  aws: {
    s3: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      bucket: process.env.S3_BUCKET
    }
  },

  uploads: {
    dest: './public/uploads/',
    limits: {
      fileSize: 20 * 1024 * 1024
    }
  }
}

export default defaultConfig
