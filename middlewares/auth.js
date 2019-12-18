module.exports = {
    loggedin: (req, res, next) => {
        try{
            if(!req.session.passport) return res.failure("Not logged in");
            
            if(req.session.passport.user) {
                return next();
            }
        } catch(e) {
            return res.gerror("Error");
        }
    }
}