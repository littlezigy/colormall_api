const db = require("../../bin/database");
//TABLES
const tb_products_write = 'products';
const tb_products_readonly = 'products_v';
//IMPORTANT: Price is stored in kobo. Make sure to multiply by 100.
module.exports = {
    create: async (data) => {
        if(!data.name && !data.name_)  throw new Error("Product name not given");
        if(!data.store_id) throw new Error("Store not specified");

        const columns = [
            data.store_id && 'store_id',
            (data.name || data.name_) && 'name_',
            data.price && 'price', data.brand && 'brand', 
            data.instock && 'instock', data.shortdesc_ && 'shortdesc_', 
            (typeof data.isactive === 'boolean') && 'isactive'
        ].filter(Boolean);

        let values = [
            data.store_id && data.store_id,
            (data.name && data.name.substring(0, 50)) || (data.name_ && data.name_), data.price && parseInt(data.price * 100),
            data.brand && data.brand.substring(0, 50), data.instock && data.instock, 
            data.shortdesc_ && data.shortdesc_
        ].filter(Boolean);

        if (typeof data.isactive === 'boolean') values.push(data.isactive);

        return (await db.create(tb_products_write, columns, values)).rows;
    },
    list: async () => {
        let products = await db.list(tb_products_readonly);
        return products.rows;
    },
    /**
     * @params data - is an object. {page, limit, sortby, sorttype (asc, desc)}
     */
    paginate: async(data) => {
        let products = await db.paginate(tb_products_readonly, data);
        return products.rows;
    },
    update: async(data) => {
        console.log("Running update");
        const columns = [data.name && 'name', data.price && 'price', data.brand && 'brand', data.instock && 'instock', data.shortdesc_ && 'shortdesc_', (typeof data.isactive === 'boolean') && 'isactive'].filter(Boolean);

        let values = [
            data.name && data.name.substring(0, 50), data.price && parseInt(data.price * 100),
            data.brand && data.brand.substring(0, 50), data.instock && data.instock, 
            data.shortdesc_ && data.shortdesc_
        ].filter(Boolean);
        if (typeof data.isactive === 'boolean') values.push(data.isactive);
        return db.update(tb_products_write, columns, values, {"_id = ": data.productid, "store_id =": data.store_id});
    },
    createCategory: async(data) => {
        let columns = Object.keys(data);
        let values = Object.values(data);
        return db.create('products', columns, values);
    },
    viewCategories: async(filter, data = null) => {
        let results;
        if(filter === 'best') { //sort by thumbs only
            results = await db.list('thumbs_categories');
        } else if (filter === 'popular') { //sort by thumbs and views

        } else if (filter === 'userbest') {
            results = await db.transaction(async client => {
                let products = {rows: []};
                let categories = await client.query(`SELECT _id, categoryname, count(userid) AS uservotes
                                    FROM user_thumbs_categories WHERE userid = ${data.user_id}
                                    GROUP BY categoryname, _id
                                    order by uservotes desc limit 5;
                                `);
                for(i = 0; i< categories.rows.length; i++) {
                    let category_products = await client.query(`SELECT * FROM categories_products where _id = ${categories.rows[i]._id} limit 5`);

                    function pushToArray(arr, obj) {
                        const index = arr.findIndex((e) => e.productid === obj.productid);
                        if(index === -1) arr.push(obj);
                    }
                    category_products.rows.forEach(product => {
                        pushToArray(products.rows, product);
                    });
                }
                function comparethumbs(a, b) {
                    let athumb = parseInt(a.product_thumbs); let bthumb = parseInt(b.product_thumbs);
                    if (athumb <bthumb) return 1;
                    else if (athumb > bthumb) return -1;
                    else return 0;
                }
                return {rows: products.rows.sort(comparethumbs)};
            });
            results = results.data;
        } else {
            results = await db.list('categories_products');
        }
        
        return results.rows;
    }
}