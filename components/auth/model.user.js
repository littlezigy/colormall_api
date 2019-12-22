const db = require('../../bin/database');
const bcrypt = require("bcrypt-node");
const config = require("../../config/index");

module.exports = {
    create: async (data) => {
        let password = bcrypt.hashSync(data.password);
        return (await db.create('users', ['displayname', 'firstname', 'lastname', 'email', 'password'], [data.displayname, data.firstname, data.lastname, data.email, password])).rows;
    },
    finduser: async(data) => {
        try {
            let user = (data._id)? await db.findone('users', {'_id = ': data._id}) : await db.findone('users', {'email = ': data.email});
            return user.rows[0];
        } catch(e) {
            throw e;
        }
    },
    /**
     * For admin users or diagnostics purposes only
     */
    findRandomUser: async(conditions=null) => {
        console.log("CONDITIONS", conditions);
        return (await db.findonerandom('users', conditions)).rows[0];
    }
}