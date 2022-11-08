const express = require('express');
const router = express.Router();
const Post = require('./../schema/Post')

// Get all users
router.get("/", (req, res)=>{
  // posts = Post
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

router.delete("/del_img", (req, res)=> {
  Post.findByIdAndUpdate(
    req.body.id, { $pull: { "images": { id: req.body.imgId } } }, { safe: true, upsert: true },
    function(err, node) {
        if (err) { return handleError(res, err); }
        return res.status(200).json({data: node, message: "Yup deleted"});
    });
});


module.exports = router;