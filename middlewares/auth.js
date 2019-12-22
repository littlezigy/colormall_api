module.exports = {
    loggedin: (req, res, next) => {
        try{
            if(!req.session.passport) {
                console.log("ERROR. NOT LOGGED IN!"); 
                return res.gerror("Not logged in", 401);
            } else if(req.session.passport.user) {
                console.log("Passport obj", req.session.passport);
                return next();
            }
        } catch(e) {
            return res.gerror("Stupid Error");
        }
    }
}