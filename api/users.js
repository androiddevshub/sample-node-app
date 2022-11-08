const express = require('express');
const User = require('../schema/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { ObjectId } = require('mongodb');

// Get all users
router.get("/", async (req, res)=>{
  const users = await User.find({});
  res.json({data: users})
})

// Get single user
router.get("/:id", async (req, res)=>{
  const id = req.params.id
  const user =  await User.findById(id);
  if(user){
    res.json({user: user});
  }else{
    res.status(400).json({message: "User with this id doesn't exist"})
  }
});

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
});

router.post("/login", async (req, res)=>{
  const {email, password} = req.body;
  const user = await User.findOne({email: email});
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
});

// Update user
router.put("/:id", async (req, res)=>{
  const id = req.params.id;
  const user = await User.updateOne({_id: new ObjectId(id)}, req.body);
  if(user){
    res.json({user: user, message: "User updated successfully"});
  }else{
    res.status(400).json({message: "Something went wrong"})
  }
});

// Delete user
router.delete("/:id", async(req, res)=>{
  const id = req.params.id;
  const user = await User.deleteOne({_id: new ObjectId(id)});
  if(user){
    res.json({user: user, message: "User deleted successfully"})
  }else{
    res.status(400).json({message: "Something went wrong"})
  }
});

module.exports = router;