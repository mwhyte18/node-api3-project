const express = require("express");

const router = express.Router();
const Posts = require("./postDb");

router.get("/", (req, res) => {
  // do your magic!
  Posts.get()
    .then(posts => res.status(200).json({ posts }))
    .catch(err => {
      res.status(500).json({
        message: "something went wrong with getting data",
        error: err
      });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
    .then(post => res.status(200).json({ post }))
    .catch(err =>
      res.status(500).json({ message: "error with individual get" })
    );
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
    .then(post => res.status(200).json({ message: "deleted post" }))
    .catch(err =>
      res.status(500).json({ message: "error delete post", error: err })
    );
});

router.put("/:id", validatePostId, (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body).then(post => {
    res.status(200).json({ post });
  });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const postId = req.params.id;
  Posts.getById(postId)
    .then(posts => {
      if (!posts) {
        res.status(400).json({ message: "Post Id Doesn't exist" });
      } else {
        next();
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "can't check if post ID exists"
      });
    });
}

module.exports = router;
