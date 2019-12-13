module.exports = {
    database: {
        host: 'localhost',
        port: '5432',
        user: 'adesuwa',
        database: 'ecommerce_single',
        connectionString: "postgresql://adesuwa:password@localhost:5432/ecommerce_single"
    },
    cors: {
        whitelist: ['http://localhost:8081']
    },
    bcrypthash: "terrymander's hash!"
}