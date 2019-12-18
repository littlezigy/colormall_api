const express = require('express');
const router = express.Router();
const products = require("../components/products/ctrl.product");
const auth = require("../components/auth/ctrl.auth");
const responses = require("../middlewares/responsehelpers");
const authmiddleware = require("../middlewares/auth");
const passport = require("passport");
const user = require("../components/auth/ctrl.user");

router.use(responses);
router.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

router.route('/products')
.post(products.create)
.get(products.list);

router.route("/auth/signup")
.post(auth.signup);

router.post('/auth/login', function(req, res, next) {
                                passport.authenticate('local', (err, user, info) => {
                                    if(user) {
                                        req.logIn(user, function(err) {next(err)});
                                    }
                                    if(info) {
                                        console.log("Auth error", info);
                                        return res.gerror(info, 401);
                                    }
                                    if(err) return next(err);
                                })(req, res, next);
                            }, auth.login);

router.route('/auth/logout')
.get(auth.logout);

router.route('/auth/confirmaccount')
.get(auth.confirmaccount);

router.get('/user/personalize', authmiddleware.loggedin, user.personalization);
module.exports = router;


//PRODUCTS
router.use('/products', authmiddleware.loggedin)
.post(products.create)
.get(products.readDetailed)
//.patch(products.edit)
.delete(products.delete)