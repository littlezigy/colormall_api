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
            //console.log("data", data)
            let user = await db.findone('users', {'email = ': data.email});
            if(user.rows.length<1) throw "User not found";
            console.log("user data", user.rows);
            return user.rows[0];
        } catch(e) {
            console.log(e);
            return e;
        }
    }
}