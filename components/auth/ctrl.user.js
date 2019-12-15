const usermodel = require("./model.user");
const productmodel =require("../products/model.product");

module.exports = {
    personalization: async(req, res) => {
        console.log("personalizing products for user");
            //get user last view products
            //get related products
            //get top items from favorite category
            let best = await productmodel.viewCategories('userbest', {user_id: req.session.passport.user});
            
            console.log("gotten best for", req.session);
            return res.success("done", {best});
    }
}