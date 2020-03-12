const express = require("express");
const postsRouter = require("./posts/postRouter");
const usersRouter = require("./users/userRouter");

const server = express();

server.use(express.json());
server.use(logger);
server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;
  console.log(`${method} to ${endpoint}`);

  next();
}

module.exports = server;
