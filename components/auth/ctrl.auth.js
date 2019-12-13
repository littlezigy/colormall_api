module.exports = {
    signup: async(req, res) => {
        try {
            let user = await usermodel.create(req.body.user);
            req.login(user);
            return res.send("Account created. Please sign in");
            
        } catch(e) {
            console.log(e);
            return res.send("Error!");
        }
    },
    login: async(req, res) => {
        console.log("Login");
        console.log("req orbject", req.user, req.session);
        return res.success(true, {id: req.user._id, firstname: req.user.firstname, confirmed: req.user.confirmed});
    },
    logout: async(req, res) => {

    },
    confirmaccount: async(req, res) => {
        console.log(req.query);
        res.send("done");
    }
}