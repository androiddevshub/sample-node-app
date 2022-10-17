const express = require('express');
const router = express.Router();


let data = [
  {
    "id": 23,
    "title": "Harry potter",
    "description": "Harry Potter and The Chamber of Secrets"
  },
  {
    "id": 31,
    "name": "Inception",
    "email": "A movie about future",
  }
]

// Get all users
router.get("/", (req, res)=>{
  res.json({posts: data});
})

// Get single user
router.get("/:id", (req, res)=>{
  const id = req.params.id
  const post = data.find(post => post.id == id);
  res.json({post: post});
})


module.exports = router;