const express = require('express');
const router = express.Router();
const Post = require('./../schema/Post')

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

router.post("/", (req, res)=>{
  const postData = req.body;
  const post = new Post(postData);
  post.save((err)=>{
    if(err){
      return;
    }
    res.json({data: post})
  })

})


module.exports = router;