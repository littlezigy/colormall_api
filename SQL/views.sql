create view user_thumbs_categories as select cp.*, u._id as userid, u.firstname
from thumbs t
left join users u on (u._id = t.user_id)
left join categories_products cp on (cp.productid = t.product_id);

create view user_thumbs_products as select u._id as userid, u.firstname, p._id as productid, p.name as productname
from thumbs t
left join users u on (u._id = t.user_id)
left join products p on (p._id = t.product_id);

create view thumbs_categories as select _id, categoryname, sum(thumbs) from categories_products group by _id, categoryname;

create view categories_products as select cats._id, cats.name_ as CategoryName, products._id as productid, products.name as ProductName, products.thumbs as thumbs from product_categories pcat
left join categories cats on cats._id = pcat.category_id
left join products_v products on products._id = pcat.product_id;

create view products_v as select p._id, p.name, (p.thumbs + count(thumbs.user_id)) as thumbs from products p
left join thumbs on (thumbs.product_id = p._id)
group by p._id;

create view product_categories_count as select cats._id, cats.name_ as CategoryName, count(products._id) as products from product_categories pcat
left join categories cats on cats._id = pcat.category_id
left join products on products._id = pcat.product_id
group by cats._id;