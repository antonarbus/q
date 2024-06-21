import typescript from '@rollup/plugin-typescript'

export default {
  input: './back/index.ts',
  output: {
    dir: './back/build/',
    format: 'es',
  },
  plugins: [typescript()],
  external: [
    '@google-cloud/storage',
    '@sendgrid/mail',
    'bcryptjs',
    'cookie-parser',
    'cors',
    'dotenv',
    'express',
    'express-validator',
    'jsonwebtoken',
    'mongoose',
    'morgan',
    'multer',
    'nanoid',
  ],
}
