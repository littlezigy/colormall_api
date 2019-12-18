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
        let data = req.body.product;
        let products = await model.create(data);
        console.log("data", data);
        return res.send(products.rows);
    },
    update: async(req, res) => {
        let data = req.body.product;
    },
    delete: async(req, res)=> {

    }
}