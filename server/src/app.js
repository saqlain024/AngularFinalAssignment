const express = require("express");
const cors = require("cors");
const mysqlconnection = require("./db");
const app = express();

app.use(cors());

app.use(express.json())


//api

//login
app.post("/verifyUser", (req, res) => {
  const data = req.body
  const email = data.email
  const pass = data.password

  let querystr = "select * from customer where customerEmail = ? and password = ?"
  mysqlconnection.conn.query(querystr, [email, pass], (err, result) => {
      if (err) {
          console.log(err)
          res.send(err)
      }
      else if (result.length === 0) {
          console.log(result)
          res.send(result)
      }
      else {
          res.send(result)
          console.log(result)
      }
  })
})


//signup
app.post('/postData', (req, res) => {
  console.log('Received POST request to /postData');
  const formData = req.body;
  const insertQuery = `
    INSERT INTO customer (customerId, customerName, customerMobile, customerAddress, customerEmail, password)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    formData.username,
    formData.fullname,
    formData.mobilenumber,
    formData.address,
    formData.email,
    formData.password
  ];

  mysqlconnection.conn.query(insertQuery, values, (err, result) => {
      
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Data inserted successfully');
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
});


// products show
app.get("/getData", (req, res) => {
  let querystr = "select * from products"
  mysqlconnection.conn.query(querystr, (err, data) => {
      if (err) {
          console.log(err)
          res.send(err)
      }
      else if (data.length === 0) {
          res.send("No Data Found")
      }
      else {
          res.send(data)
      }
  })

})



// Get product details by ID
app.get("/getProductDetails/:productId", (req, res) => {
  const productId = req.params.productId;
  const querystr = "SELECT * FROM products WHERE productId = ?";
  
  mysqlconnection.conn.query(querystr, [productId], (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (data.length === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(data[0]);
    }
  });
});




app.listen(8000, () => {
  console.log("server is running in port 8000 yaa hooo !!!");
});



