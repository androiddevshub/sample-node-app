const express = require('express')
const app = express();
app.use(express.json());
const path = require('path')
const port = 5000;
const database = require('./database')

app.get("/test", (req, res)=>{

  console.log("__dirname__", path.join(__dirname, "/html/index.html"))
  // res.send("hello world")
  res.sendFile(path.join(__dirname, "/html/index.html"))
})



const users = require('./api/users');
const posts = require('./api/posts')

app.use("/users", users);
app.use("/posts", posts);




app.listen(port, ()=>{
  console.log("App is running on port ", port)
})

