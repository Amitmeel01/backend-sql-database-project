create table user(
  id varchar(50) primary key,
  username varchar(30),
  email varchar(30) not null,
  password varchar(30) not null
);