const db = require("../../bin/database");

module.exports = {
    list: async () => {
        let products = await db.list('products', {"isactive =": true});
        return products.rows;
    },
    /**
     * @params data - is an object. {page, limit, sortby, sorttype (asc, desc)}
     */
    paginate: async(data) => {
        let products = await db.paginate('products', data, {"isactive = ": true});
        return products.rows;
    },
    create: async (data) => {
        let columns = Object.keys(data);
        let values = Object.values(data);
        console.log("Runnign create");
        return db.create('products', columns, values);
    },
    update: async(data, productid) => {
        let columns = Object.keys(data);
        let values = Object.values(data);

        console.log("Running update");
        return db.update('products', columns, values, {"_id = ": productid});
    },
    createCategory: async(data) => {
        let columns = Object.keys(data);
        let values = Object.values(data);
        console.log("Runnign create");
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
                    console.log("\n\n***************CATEGORY PRODUCTS*********************\n");

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
            console.log("RESULTS", results);
            results = results.data;
        } else {
            results = await db.list('categories_products');
        }

        
        return results.rows;
    }
}