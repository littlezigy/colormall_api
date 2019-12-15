module.exports = (req, res, next) => {
    function AppError (description, commonType) {
        //constructor(description, commonType) {
            Error.call(this);
            Error.captureStackTrace(this);
            this.commonType = commonType;
            this.description = description;
            this.isOperational = true;
        //}
    }
    console.log("error helper");
    next();

    //throw new AppError(errorManagement.commonErrors.InvalidInput, 'Describe here what happened', true);
}