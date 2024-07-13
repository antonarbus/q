import copy from 'rollup-plugin-copy'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './back/index.ts',
  output: {
    dir: './back/build/',
    format: 'es',
  },
  plugins: [
    typescript(),
    copy({
      targets: [
        {
          dest: './back/build',
          src: './back/package.json',
        },
        {
          dest: './back/build',
          src: './back/package-lock.json',
        },
        {
          dest: './back/build',
          src: './.env',
        },
      ],
    }),
  ],
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
