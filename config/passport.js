//const passport = require('passport');
const LocalStrategy = require('passport-local');

const usermodel = require("../components/auth/model.user");
const bcrypt = require('bcrypt-node');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email'
        },
        async function(username, password, done) {
            try{
                let user = await usermodel.finduser({email: username});
                if(!user) {
                    return done(null, false, {message: "No account with that email exists"});
                }
                let result = bcrypt.compareSync(password, user.password);
                if(result !== true) return done(null, false, {message: 'Wrong username or password'});
                return done(null, user);
            } catch(e) {
                console.log("\n\nERROR PASSPORT\n", {message: e});
                return done(e);
            }
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(async function(id, done) {
        try {
            let user = await usermodel.finduser({_id: id});
            done(null, user);
        } catch(e) {
            console.log("big bad error", e);
            return done(null,false)
        }
    })
}