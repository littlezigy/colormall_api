module.exports = {
    loggedin: (req, res, next) => {
        try{
            if(!req.session.passport) {
                console.log("ERROR. NOT LOGGED IN! \n\nreq.sessio", req.session); 
                return res.gerror("Not logged in", 401);
            } else if(req.session.passport.user) {
                console.log("Passport obj exitsi n here", req.session.passport);
                return next();
            }
        } catch(e) {
            return res.gerror("Stujpid Error");
        }
    }
}