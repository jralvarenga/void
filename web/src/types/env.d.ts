/* eslint-disable prettier/prettier */
declare global {
  export namespace NodeJS {
    export interface ProcessEnv {
      BASE_URL: string

      // firebase Client
      NEXT_PUBLIC_FIREBASE_API_KEY: string
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: string
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string
      NEXT_PUBLIC_FIREBASE_APP_ID: string
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string

      // firebase admin
      FIREBASE_TYPE: string
      FIREBASE_PROJECT_ID: string
      FIREBASE_PRIVATE_KEY_ID: string
      FIREBASE_PRIVATE_KEY: string
      FIREBASE_CLIENT_EMAIL: string
      FIREBASE_CLIENT_ID: string
      FIREBASE_AUTH_URI: string
      FIREBASE_TOKEN_URI: string
      FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string
      FIREBASE_CLIENT_X509_CERT_URL: string
      FIREBASE_UNIVERSE_DOMAIN: string

      FIREBASE_AUTH_EMULATOR_HOST: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }