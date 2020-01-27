CREATE VIEW products_v AS 
SELECT p._id, p.name_ AS productname, p.price, p.shortdesc_, p.instock, p.brand, p.store_id, store.name_ AS storename, store.user_id AS storeowner, (p.thumbs + count(thumbs.user_id)) AS thumbs FROM products p
LEFT JOIN thumbs ON (thumbs.product_id = p._id)
LEFT JOIN stores store ON (store._id = p.store_id)
WHERE p.isactive = true
GROUP BY p._id, store.name_, store.user_id, store._id;

CREATE VIEW products_v_admin AS 
SELECT p._id, p.name_ AS productname, p.price, p.shortdesc_, p.brand, p.store_id, store.name_ AS storename, store.user_id AS storeowner, (p.thumbs + count(thumbs.user_id)) AS thumbs, p.isactive FROM products p
LEFT JOIN thumbs ON (thumbs.product_id = p._id)
LEFT JOIN stores store ON (store._id = p.store_id)
GROUP BY p._id, store.name_, store.user_id, store._id;

CREATE view categories_products AS
SELECT cats._id, cats.name_ AS CategoryName,  p._id AS productid, p.productname, p.price AS productprice, p.shortdesc_, p.storename AS productsdesc, p.brand AS productbrand, p.thumbs AS product_thumbs FROM product_categories pcat
LEFT JOIN categories cats ON cats._id = pcat.category_id
LEFT JOIN products_v p ON p._id = pcat.product_id;

CREATE VIEW user_thumbs_categories AS
SELECT cp.*, u._id AS userid, u.firstname
FROM thumbs t
LEFT JOIN users u ON (u._id = t.user_id)
LEFT JOIN categories_products cp ON (cp.productid = t.product_id);

CREATE VIEW user_thumbs_products AS
SELECT u._id AS userid, u.firstname, p._id AS productid, p.name_ AS productname
FROM thumbs t
LEFT JOIN users u ON (u._id = t.user_id)
LEFT JOIN products p ON (p._id = t.product_id);

CREATE VIEW thumbs_categories AS
SELECT _id, categoryname, sum(product_thumbs) FROM categories_products GROUP BY _id, categoryname;

CREATE view product_categories_count AS
SELECT cats._id, cats.name_ AS CategoryName, count(products._id) AS products FROM product_categories pcat
LEFT JOIN categories cats ON cats._id = pcat.category_id
LEFT JOIN products ON products._id = pcat.product_id
GROUP BY cats._id;