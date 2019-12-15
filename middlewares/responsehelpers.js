module.exports = (req, res, next) => {
    /**
     * @params {string} gerror - Error message.
     */
    res.gerror = (message = null) => {
        res.setHeader('Content-Type', 'application/json');
        console.log("Error response helper");
        res.status(400).send({error: message||"Error", type: "display_error"});
    }
    /**
     * @params {Object} data - Send in anything. Json obj, array, string...anything
     */
    res.success = (message, data=null) => {
        res.setHeader('Content-Type', 'application/json');
        res.send({success: message, data});
    }
    res.failure = (message, data=null) => {
        res.setHeader('Content-Type', 'application/json');
        console.log(res.statusCode);
        if(res.statusCode !== 200) {
            res.send()  
        } else res.status(400).send({fail: message, data});
    }

    next();
}