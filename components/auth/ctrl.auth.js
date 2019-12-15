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
        return res.success(true, {id: req.user._id, firstname: req.user.firstname, confirmed: req.user.confirmed});
    },
    logout: async(req, res) => {
        console.log(req.logout());
        return res.success("done");

    },
    confirmaccount: async(req, res) => {
        console.log(req.query);
        res.send("done");
    }
}