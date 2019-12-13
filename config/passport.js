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
                console.log("req body user", {email: username});
                let user = await usermodel.finduser({email: username});

                console.log("blah", user);

                let result = bcrypt.compareSync(password, user.password);

                console.log("REsult of login", result);
                if(result !== true) return done(null, false, {message: "Wrong username or password"});

                done(null, user);
            } catch(e) {
                console.log("ERROR", e);
                return done(e);
            }
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(async function(id, done) {
        let user = await usermodel.finduser({_id: id});
        console.log("Deserializee User", user);
        done(null, user);
    })
}