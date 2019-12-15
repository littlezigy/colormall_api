const db = require('../../bin/database');
const bcrypt = require("bcrypt-node");
const config = require("../../config/index");

module.exports = {
    create: async (data) => {
        console.log("data", data);
        let password = bcrypt.hashSync(data.password);
        console.log("Password", data.password, "hassed", password);
        return (await db.create('users', ['firstname', 'lastname', 'email', 'password'], [data.firstname, data.lastname, data.email, password])).rows;
    },
    finduser: async(data) => {
        try {
            let user = (data._id)? await db.findone('users', {'_id = ': data._id}) : await db.findone('users', {'email = ': data.email});
            console.log("Users ", user.rows[0]);
            //if(user.rows.length<1) throw AppError("User not found");
            return user.rows[0];
        } catch(e) {
            throw e;
        }
    }
}