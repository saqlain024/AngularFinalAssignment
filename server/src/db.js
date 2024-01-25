const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mgs@12345',
    database: 'finalExam'
  });

  
  const query ='create table if not exists customer (customerId varchar(30), customerName varchar(30), customerMobile varchar(30), customerAddress varchar(30), customerEmail varchar(30), password varchar(30) )';

  const query2 = 'create table if not exists products (productId varchar(30), productTitle varchar(30), productPrice varchar(30), productDescription varchar(30) )';
  
  connection.query(query, (err, result) => {
    if (err) throw err;
    else console.log('Customer table is created!');
  });
  
  connection.query(query2, (err, result) => {
    if (err) throw err;
    else console.log('Products table is created!');
  });
  

  


  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      throw err;
    }
    console.log('Connected to MySQL');
  });

  module.exports.conn = connection;


