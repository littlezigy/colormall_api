const Product = require("./model.product");
const findExistingStore = require("./services/findorCreateExistingStore");
const User = require("../auth/model.user");

module.exports = {
    create: async(req, res) => {
        //Find user's store
        /*let store;
        if(!req.body.storeid) {
            const user = await User.finduser({'_id': req.session.passport.user});
            store = await findExistingStore(user);
        } else store = req.body.storeid;
        */
       console.log("PASSING USER OBJ", req.session.passport);
        let product = await Product.create({user_id: req.session.passport.user, ...req.body});
        console.log("\n------------------\nPRODUCT\n-----------------\n", product);
        return res.success(product);
    },
    list: async(req, res) => {
        let products;
        if(req.query) {
            //console.log(req.query);
            let data = req.query;
            if(req.query.sort === 'bestof') {
                data.sortby = "thumbs";
                data.sorttype = 'desc';
            }
            products = await Product.paginate(data);
        } else products = await Product.list();
        
        return res.success(products);
    },
    read: async(req, res) => {
        
    },
    readDetailed: async(req, res)=> {

    },
    update: async(req, res) => {//res body: {store: id, product: {name, price, ...}}
        let productdata = req.body.product;
        //User can only edit product if product belongs to one of user's stores.
        //Check if product belongs to one of users' stores.

        //let updatedproduct = await Product.update
    },
    delete: async(req, res)=> {

    }
}