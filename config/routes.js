const express = require('express');
const router = express.Router();
const products = require("../components/products/ctrl.product");
const auth = require("../components/auth/ctrl.auth");
const responses = require("@littlezigy/responsehelper");
const authmiddleware = require("../middlewares/auth");
const passport = require("passport");
const user = require("../components/auth/ctrl.user");


router.use(responses);
router.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

router.route("/auth/signup")
.post(auth.signup);

router.post('/auth/login', function(req, res, next) {
                                passport.authenticate('local', (err, user, info) => {
                                    if(user) {
                                        console.log("USER VALID. Loggin in");
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


//PRODUCTS
router.get('/products/:id/preview', products.readDetailed);
router.get('/products/:id', authmiddleware.loggedin, products.readDetailed);

router.get('/products', products.list);

router.post('/products', authmiddleware.loggedin, products.create);
router.patch('/products/:id', authmiddleware.loggedin, products.update);
//.patch(products.edit)
//.delete(products.delete);

//STORES
router.get("/stores", )


module.exports = router;