declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      BROWSER: 'chrome'
      DOMAIN: 'http://localhost'
      PORT_FRONT_END: '3005'
      PORT_BACK_END: '3006'
      MONGO_DB_USER_NAME: string
      MONGO_DB_PASSWORD: string
      MONGO_DB_CONNECTION_STRING: string
      JWT_ACCESS_SECRET: string
      JWT_REFRESH_SECRET: string
      SMTP_HOST: 'smtp.gmail.com'
      SMTP_PORT: '587'
      SMTP_USER: string
      SMTP_PASSWORD: string
      VITE_SOME_KEY: string
      REACT_SOME_KEY: string
    }
  }
}

export { }