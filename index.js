const express = require('express')
const app = express();
app.use(express.json());

const port = 5000;

let data = [
  {
    "id": 23,
    "name": "Shubham",
    "email": "shubham@gmail.com",
    "phone": "432423434"
  },
  {
    "id": 31,
    "name": "Utkarsh",
    "email": "utkarsh@gmail.com",
    "phone": "423423423"
  }
]

// Get all users
app.get("/users", (req, res)=>{
  res.json({users: data});
})

// Get single user
app.get("/users/:id", (req, res)=>{
  const id = req.params.id
  const user = data.find(user => user.id == id);
  res.json({user: user});
})

// Create user
app.post("/users", (req, res)=>{
  const user = req.body
  data.push(user);
  res.json({user: user, message: "User saved successfully"})
})

// Update user
app.put("/users/:id", (req, res)=>{
  const id = req.params.id
  const { name, email, phone } = req.body;
  const user = data.find(user=> {
    if(user.id == id){
      user.name = name;
      user.email = email;
      user.phone = phone;
      return user;
    }
  });
  res.json({user: user, message: "User updated successfully"});
})

// Delete user
app.delete("/users/:id", (req, res)=>{
  const id = req.params.id;
  const index = data.findIndex(user => user.id == id);
  const user = data.splice(index, 1);
  res.json({user: user, message: "User deleted successfully"})
})

app.listen(port, ()=>{
  console.log("App is running on port ", port)
})