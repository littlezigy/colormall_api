const db = require("../../bin/database");

module.exports = {
    create: async(data) => {
        /*const newstore = await db.create('stores', ['name_', 'user_Id'], [data.name, data.user_id]);
        console.log("new store", newstore.rows[0]);
        return newstore.rows[0];*/
        return (await db.create('stores', ['name_', 'user_Id'], [data.name, data.user_id])).rows[0];
    },
    findOne: async(data) => {
        const store = (data.user_id) ? await db.findone('stores', {'user_id = ': data.user_id}) : await db.findone('stores', {'_id = ': data._id});
        return store.rows[0];
    }
}