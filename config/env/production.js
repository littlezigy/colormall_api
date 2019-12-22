module.exports = {
    database: {
        host: 'localhost',
        port: '5432',
        user: 'adesuwa',
        database: 'ecommerce_single',
        connectionString: process.env.DATABASE_URL,
        testdb: process.env.TEST_DATABASE_PG
    },
    cors: {
        whitelist: ['http://*.adesuwademos.tk', 'http://ecommerce.adesuwademos.tk']
    },
    bcrypthash: process.env.BCRYPT_HASH
}