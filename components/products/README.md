# Products Service 

## Product Controller
#### Creating a product
##### Request body
```
{
    storeid: Optional but recommended,
    name: required,
    price: required,
    brand: Optional,
    instock: Optional,
    shortdesc_: Optional,
    isactive: Optional. default=false
}
```
- If no store is specified in request body, product will be added to user's default store.
    - User's default store name for a user is: Firstname's Store!
        - For a user named Shrek Ogre, the default store name will be Shrek's Store!
    - This process is taken care of in `services/   findorCreateExistingStore.js`
    - To change the behavior, you either remove the service call in `ctrl.product.js` and replace store_id with a default valid store id, or change the service behavior.
- instock is optional in request body but not in application. instock is set to 0 in the `model.product` if none is set.

##### Editing a Product
```
{
    name:
    price:
    brand:
    instock:
    shortdesc_:
    isactive:
}
```
All parameters are optional but at least one must be specified.
