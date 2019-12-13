module.exports = {
    database: {
        host: 'localhost',
        port: '5432',
        user: 'adesuwa',
        database: 'ecommerce_single',
        connectionString: process.env.DATABASE_URL
    },
    cors: {
        whitelist: ['http://localhost:8081']
    },
    bcrypthash: process.env.BCRYPT_HASH
}