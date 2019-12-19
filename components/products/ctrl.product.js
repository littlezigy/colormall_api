const model = require("./model.product");

module.exports = {
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
        return res.send(products);
    },
    read: async(req, res) => {

    },
    readDetailed: async(req, res)=> {

    },
    create: async(req, res) => {
        let product = await model.create(req.body);
        console.log("New product", product);
        return res.send(product);
    },
    update: async(req, res) => {
        let data = req.body.product;
    },
    delete: async(req, res)=> {

    }
}