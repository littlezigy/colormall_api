const usermodel = require("./model.user");
const productmodel =require("../products/model.product");

module.exports = {
    personalization: async(req, res) => {
            //get user last view products
            console.log("Getting recently viewed items");
            //get related products
            console.log("Getting related products");
            //get top items from favorite category
            console.log("Fetching products from favorite category");
            console.log("SESSION OBJECT", req.session);
            let best = await productmodel.viewCategories('userbest', {user_id: req.session.passport.user});
            
            return res.success("done", {best});
    }
}