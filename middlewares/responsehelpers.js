module.exports = (req, res, next) => {
    /**
     * @params {string} gerror - Error message.
     */
    res.gerror = function() {
        console.log("Error response helper");
        let message = arguments[0];
        let statusCode = arguments[1] || 400;
        data = arguments[2] || null;

        console.log("Using spread\n", {message, statusCode, ...data});
        console.log("Using amps and spread\n", {message, statusCode, ...data&&{data}})

        res.status(statusCode).send({error: "Error", ...data && {data}});
    }
    /**
     * @params {Object} data - Send in anything. Json obj, array, string...anything
     */
    res.success = function(message, data=null) {
        console.log("Success response");
        res.send({success: message, data});
    }
    res.failure = (message, data=null) => {
  //      res.setHeader('Content-Type', 'application/json');
        console.log(res.statusCode);
        if(res.statusCode !== 200) {
            res.send()  
        } else res.status(400).send({fail: message, data});
    }

    next();
}