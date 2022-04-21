export default {
	node: {
		env: process.env.NODE_ENV,
	},
	server: {
		prefix: process.env.API_PREFIX ?? '/api/v1',
		port: process.env.PORT,
		salt: +process.env.SALT,
	},
	db: {
		uri: process.env.DB_URI,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		accessToken: {
			expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
		},
		refreshToken: {
			expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
		},
	},
}
