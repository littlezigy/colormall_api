module.exports = {
    loggedin: (req, res, next) => {
        console.log("Checking login object\n\nSEssion==>", req.session);
        try{
            if(req.session.passport.user) {
                return next();
            } else return res.failure("Not logged in");
        } catch(e) {
            return res.gerror("Error");
        }
    }
}