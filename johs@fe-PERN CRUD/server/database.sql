CREATE DATABASE contacts;


CREATE TABLE my_user(
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_contact VARCHAR(255) NOT NULL
);
 

 --AOB
--inserting a fake user
INSERT INTO my_user(user_name,user_email,user_contact) VALUES('jose','joseph@gmail.com' ,0745736);

-- insert new user
INSERT INTO my_user (user_name,user_email,user_contact) VALUES ($1 ,$2 ,$3) RETURNING *, [email,name];

--GET ALL USERS
SELECT * FROM my_user;

--GET A USER
SELECT * FROM my_user WHERE user_id = $1, [id ];

--delete a user
DELETE  FROM my_user WHERE user_id= $1 ,[id] ;

--update many values
UPDATE my_user SET  user_name=$1, user_contact=$2 WHERE user_id =$3 ,[description ,contact,id]

--update one data value part
UPDATE my_user SET description=$1 WHERE user_id =$2,[description,id]