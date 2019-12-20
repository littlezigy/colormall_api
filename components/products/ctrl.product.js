const model = require("./model.product");
const findExistingStore = require("./services/findExistingStore");
const users = require("../auth/model.user");

module.exports = {
    create: async(req, res) => {
        //Find user's store
        let store;
        if(!req.body.storeid) {
            const user = await users.finduser({'_id': req.session.passport.user});
            store = await findExistingStore(user);
        } else store = req.body.storeid;
        
        let product = await model.create({store_id: store._id, ...req.body});
        return res.success(product);
    },
    list: async(req, res) => {
        let products;
        if(req.query) {
            //console.log(req.query);
            let data = req.query;
            if(req.query.sort == 'bestof') {
                data.sortby = "thumbs";
                data.sorttype = 'desc';
            }
            products = await model.paginate(data);
        } else products = await model.list();
        console.log(products);
        return res.success(products);
    },
    read: async(req, res) => {

    },
    readDetailed: async(req, res)=> {

    },
    update: async(req, res) => {
        let data = req.body.product;
    },
    delete: async(req, res)=> {

    }
}