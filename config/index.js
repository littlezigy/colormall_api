config = {}

const cloudinary = require('cloudinary');

if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'devtest') {
    config = require("./env/development");
}
else if(process.env.NODE_ENV === 'production') config = require("./env/production");
else if(process.env.NODE_ENV === 'test') config = require("./env/test");
else config = "No environment specified";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("CLOUDINARY CONFIG\n------------------------\n",{
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = config;