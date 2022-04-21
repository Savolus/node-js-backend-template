declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production'
			PORT: string
			API_PREFIX?: string
			DB_URI: string
			SALT: string
			JWT_SECRET: string
			JWT_ACCESS_TOKEN_EXPIRES_IN: string
			JWT_REFRESH_TOKEN_EXPIRES_IN: string
		}
	}
}

export {}
