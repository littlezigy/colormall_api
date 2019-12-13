module.exports = (req, res, next) => {
    /**
     * @params {string} gerror - Error message.
     */
    res.gerror = (message = null) => {
        console.log("Error response helper");
        res.status(400).send({error: message||"Error", type: "display_error"});
    }
    /**
     * @params {Object} data - Send in anything. Json obj, array, string...anything
     */
    res.success = (message, data=null) => {
        res.send({success: message, data});
    }
    res.failure = (message, data=null) => {
        console.log(res.statusCode);
        if(res.statusCode !== 200) {
            res.send()  
        } else res.status(400).send({fail: message, data});
    }

    next();
}