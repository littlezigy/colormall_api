const storemodel = require("./model.store");

module.exports = {
    create: async (req, res) => {
        console.log("REQ OBJ\n", req, "\n\nreq body\n", req.body);
        const newstore = await storemodel.create({...req.body, user_id: req.session.passport.user});
        return res.success(newstore);
    },
    list: async (req, res) => {
        const liststores = await storemodel.list();
        return res.success(liststores);
    }
}