const usermodel = require("./model.user");

module.exports = {
    signup: async(req, res) => {
        console.log("signup");
        try {
            let user = await usermodel.create(req.body);
            console.log("User created.", user);
            return res.success("Account created. Please sign in");
            
        } catch(e) {
            console.log(e);
            return res.gerror("Error!");
        }
    },
    login: async(req, res) => {
        console.log("Login");
        return res.success(true, {id: req.user._id, firstname: req.user.firstname, confirmed: req.user.confirmed});
    },
    logout: async(req, res) => {
        console.log(req.logout());
        return res.success("done");

    },
    confirmaccount: async(req, res) => {
        console.log(req.query);
        res.success("done");
    }
}