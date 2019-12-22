create table users(
    _id serial primary key,
    displayname varchar(50),
    firstname varchar(255),
    lastname varchar(255),
    email varchar(255) not null unique,
    password varchar(70) not null,
    confirmed boolean not null default false
);

create table stores(
    _id serial primary key,
    name_ varchar(225) not null,
    user_id int not null references users(_id)
);

create table products(
    _id serial primary key,
    name_ varchar(225) not null,
    price int not null default 100,
    brand varchar(255),
    instock int not null default 0,
    isactive boolean not null default true,
    thumbs int not null default 0,
    shortdesc_ varchar(225),
    store_id int not null references stores(_id)
);

CREATE TABLE cart(
    user_id int not null primary key references users(_id),
    guid varchar(70) not null unique
);

CREATE TABLE categories(
    _id serial not null primary key,
    name_ varchar(225) not null
);

create table product_categories(
    product_id int not null references products(_id),
    category_id int not null references categories(_id),
    
    constraint product_categories_pkey primary key(product_id, category_id)
);

create table thumbs(
    user_id int not null references users(_id),
    product_id int not null references products(_id),
    
    constraint thumbs_pk primary key(user_id, product_id)
);