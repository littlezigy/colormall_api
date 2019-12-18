module.exports = {
    database: {
        host: 'localhost',
        port: '5432',
        user: 'colormall_web_app',
        password: 'password',
        database: 'ecommerce_single',
        connectionString: "postgresql://colormall_web_app:password@localhost:5432/ecommerce_single"
    },
    cors: {
        whitelist: ['http://localhost:8081']
    },
    bcrypthash: "terrymander's hash!"
}