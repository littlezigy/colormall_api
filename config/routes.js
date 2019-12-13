const express = require('express');
const router = express.Router();
const products = require("../components/products/ctrl.product");
const auth = require("../components/auth/ctrl.auth");
const responses = require("../middlewares/responsehelpers");
const authmiddleware = require("../middlewares/auth");
const passport = require("passport");
const user = require("../components/auth/ctrl.user");

router.use(responses);
router.route('/products')
.post(products.create)
.get(products.list);

router.route("/auth/signup")
.post(auth.signup);

router.post('/auth/login', passport.authenticate('local'), auth.login);

router.route('/auth/logout')
.get(auth.logout);

router.route('/auth/confirmaccount')
.get(auth.confirmaccount);

router.get('/user/personalize', authmiddleware.loggedin, user.personalization);
module.exports = router;