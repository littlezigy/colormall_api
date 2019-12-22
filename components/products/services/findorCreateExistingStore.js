const stores = require("../../stores/model.store");

module.exports = async function(user) {
    //Find and return the first store belonging to user. If user has none, create one for them.
    if(!user.firstname) return res.gerror("Please complete your profile, or create a new store");

    const existingStore = await stores.findOne({user_id: user._id});
    console.log("Exising store", existingStore);
    if(existingStore) return existingStore;
    else {
        const storename = arguments[1] || `${user.firstname}\'s Store!`
        return await stores.create({user_id: user._id, name: storename});
    }
}