const express = require("express");

const router = express.Router();

const Users = require("./userDb");
const Posts = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(user => res.status(201).json({ user }))
    .catch(err =>
      res.status(500).json({ message: "cant add new user", error: err })
    );
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  const userPost = {
    user_id: req.params.id,
    text: req.body.text
  };
  Posts.insert(userPost)
    .then(post => res.status(201).json({ post }))
    .catch(err =>
      res.status(500).json({ message: "can't add this post", error: err })
    );
});

router.get("/", (req, res) => {
  // do your magic!
  Users.get()
    .then(users => res.status(200).json({ users }))
    .catch(err =>
      res.status(500).json({
        message: "cant get Users",
        error: err
      })
    );
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => res.status(200).json({ user }))
    .catch(err =>
      res.status(500).json({ message: "cant get this user", error: err })
    );
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then(posts => res.status(200).json({ posts }))
    .catch(err =>
      res.status(500).json({ message: "cant get users posts", error: err })
    );
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(user =>
      res.status(200).json({ message: "user is deleted", account: user })
    )
    .catch(err => res.status(500).json({ message: "cant delete this user" }));
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body).then(user =>
    res.status(200).json({ message: "user has been updated!" })
  );
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  Users.getById(id)
    .then(user => {
      if (!user) {
        res.status(400).json({ message: "User id doesn't exist" });
      } else {
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ message: "cant see if user exists" });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body.name) {
    res.status(400).json({ message: "user must have a name!" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body.text || !req.params.id) {
    res
      .status(400)
      .json({ message: "post must have text or you must be an user" });
  } else {
    next();
  }
}

module.exports = router;
