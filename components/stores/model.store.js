const db = require("../../bin/database");

module.exports = {
    create: async(data) => {
        console.log("DATA FOR NEW STORE", data);
        return (await db.create('stores', ['name_', 'user_id'], [data.name, data.user_id])).rows[0];
    },
    findOne: async(data) => {
        const store = (data.user_id) ? await db.findone('stores', {'user_id = ': data.user_id}) : await db.findone('stores', {'_id = ': data._id});
        return store.rows[0];
    },
    findOrCreateStore: async(data) => {
        //Checks if user has existing store.
    }
}