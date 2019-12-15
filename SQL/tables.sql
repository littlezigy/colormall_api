create table product(
    name varchar(20) NOT NULL unique,
    price int not null,
    brand varchar(20),
    instock not null default 0,
    _id serial primary key
);
