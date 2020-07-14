declare namespace NodeJS {
    interface Process {
      /** running on server */
      isServer: boolean
    }
    interface ProcessEnv {
      /** node environment */
      SESSION_SECRET: string,
      MONGODB_URI: string,
    }
  }