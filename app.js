const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

var port = process.env.PORT || 3000;
app.use(express.json());
const rateLimit = require("express-rate-limit");
 
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);
 
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 10 // limit each IP to 100 requests per windowMs
});
 
//  apply to all requests
app.use(limiter);

const Users = [
    {
      "username": "ron35",
      "firstName": "Robert",
      "lastName": "Kennedy",
      "password": "password",
      "email": "email234@email.com",
      "country": "USA",
      "shippingAddress": {
        "address": "72 Cardinal St. Mechanicsburg",
        "state": "Pennsylvania",
        "country": "USA",
        "pin_code": 17050
      }
    },
    {
        "username": "kane",
        "password": "password",
      },
      {
        "username": "rick",
        "password": "password",
      },
      {
        "username": "vaibhav",
        "password": "password",
      },
      {
        "username": "murphy",
        "password": "password",
      },
      {
        "username": "matt",
        "password": "password",
      }
  ]

//middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, 12345, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

function userExists(username) {
    return arr.some(function(el) {
      return el.username === username;
    }); 
  }

function displayUser(username) {
    return arr.some(function(el) {
      if(el.username === username) return el;
      else return "error";
    }); 
  }

function passExists(password) {
  return arr.some(function(el) {
    return el.password === password;
  }); 
}

app.get("/api/users", (req, res)=>{
    res.status(200).send(Users);
})

app.post("/api/users", (req, res)=>{
    Users.append(req.body);
    res.status(201).send("Created successfully.")
})

app.get("/api/users/:username", (req, res)=>{
    res.status(200).send(displayUser(req.params.username));
});

app.delete("/api/users/:username", authenticateToken, (req, res)=>{
    res.status(201).send("Successfully deleted");
});

app.post("/api/users/login", (req, res)=>{
    if(userExists(req.username) && passExists(req.password)){
        const user = {username: username}
        const accessToken = jwt.sign(user, 12345);
        res.json({accessToken: accessToken});
    }
    else{
        res.status(400).send({"Error":"Invalid password or username."});
    }
})

app.get("/*", function(req, res){
    res.status(501).send("Feature currently unimplemented.");
})

app.post("/*", function(req, res){
    res.status(501).send("Feature currently unimplemented.");
})

app.delete("/*", function(req, res){
    res.status(501).send("Feature currently unimplemented.");
})

app.put("/*", function(req, res){
    res.status(501).send("Feature currently unimplemented.");
})

app.patch("/*", function(req, res){
    res.status(501).send("Feature currently unimplemented.");
})

app.listen(port);
