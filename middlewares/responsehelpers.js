module.exports = (req, res, next) => {

    /**
     * @params {string} gerror - Error message.
     */
    res.gerror = function() {
        let message = arguments[0] || "Error";
        let statusCode = arguments[1] || 400;
        data = arguments[2] || null;

        res.status(statusCode).send({error: message, ...data && {data}});
    }

    /**
     * @params {message} - Error message
     */
    res.success = function() {
        let message = arguments[0] || "Operation Successful";
        let data = arguments[1] || null;
            res.send({success: message, ...data && {data}});
    }

    res.failure = () => {
        let message = arguments[0] || "Operation Successful";
        let statusCode = arguments[1] || 400;
        let data = arguments[1] || null;

        res.status(statusCode).send({fail: message, ...data && {data}});
    }
    next();
}