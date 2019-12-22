module.exports = {
    database: {
        host: 'localhost',
        port: '5432',
        user: 'colormall_web_app',
        password: 'password',
        database: 'ecommerce_single',
        connectionString: process.env.TEST_DATABASE_PG
    },
    cors: {
        whitelist: ['http://localhost:8081']
    },
    bcrypthash: "terrymander's hash!"
}