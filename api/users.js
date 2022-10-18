const express = require('express');
const User = require('../schema/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;


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
router.get("/", (req, res)=>{
  res.json({users: data});
})

// Get single user
router.get("/:id", (req, res)=>{
  const id = req.params.id
  const user = data.find(user => user.id == id);
  res.json({user: user});
})


// Create user
router.post("/signup", async (req, res)=>{
  const user = req.body;
  const hashedPwd = await bcrypt.hash(user.password, saltRounds);
  console.log("hashedPwd", hashedPwd);
  user.password = hashedPwd;
  const userObj = new User(user);
  // data.push(user);
  userObj.save((err)=>{
    if(err){
      return;
    }
    res.json({user: userObj, message: "User saved successfully"})
  });
  
})

router.post("/login", async (req, res)=>{
  const {email, password} = req.body;

  const user = await User.findOne({email: email});
  

  console.log("userrrrrrr", user)
  if(user){
    const compare = await bcrypt.compare(password, user.password);
    if(compare){
      res.json({user: user, message: "Login successful"})
    }else{
      res.status(400).json({message: "Email and password do not match"})
    }
    
  }else{
    res.json({message: "User doesn't exist"}, 400)
  }

})



// Update user
router.put("/:id", (req, res)=>{
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
router.delete("/:id", (req, res)=>{
  const id = req.params.id;
  const index = data.findIndex(user => user.id == id);
  const user = data.splice(index, 1);
  res.json({user: user, message: "User deleted successfully"})
})

module.exports = router;