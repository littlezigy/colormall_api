const db = require('../../bin/database');

module.exports = {
    create: async(data)=> {
        let columns = Object.keys(data);
        let values = Object.values(data);

        await db.create('', columns, values);
        return ;
    },
    read: async(identifier)=> {

    },
    /* ONLY FOR ADMIN USE or maybe not at all*/
    list: async(data)=> {
        return db.list('cart');
    }
}