const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs')

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
fs.writeFile('home.html', '<h1>welcome to ExpressJs tutorial</h1>', (err) => {
  if (err) throw err
})

router.get('/home', (req,res) => {
  res.sendFile(__dirname + '/home.html');
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  res.sendFile(__dirname + '/user.json');
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
var user_data = JSON.parse(fs.readFileSync("./user.json"))
const username = user_data['username']
const password = user_data['password']

router.get('/login', (req,res) => {
  let u = req.query.username
  let p = req.query.password
  let response
  if (u != username)
    response = {status: false, message: "Username is invalid"}
  else if (p != password)
    response = {status: false, message: "Password is invalid"}
  else
    response = {status: true, message: "User is valid"}

  res.send(response)
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  let u = req.params.username
  res.send(`<b>${u} successfully logged out.<b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));