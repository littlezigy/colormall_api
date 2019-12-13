module.exports = {
    database: {
        host: 'localhost',
        port: '5432',
        user: 'adesuwa',
        database: 'ecommerce_single',
        connectionString: process.env.CONNECTION_STRING
    },
    cors: {
        whitelist: ['http://localhost:8081']
    },
    bcrypthash: process.env.BCRYPT_HASH
}