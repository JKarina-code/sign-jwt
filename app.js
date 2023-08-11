const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "nodejs and jwt",
  });
});

app.post("/api/login", (req, res) => {
  const user = { id: 1, name: "Jymma", email: "jkmogollon@gmail.com" };
  jwt.sign({ user }, "secretKey", {expiresIn: "32s"},(err, token) => {
    res.json({
      token,
    });
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    }

    res.json({
      message: " Post was created",
      authData,
    });
  });

  res.json({
    message: "Post was created ",
  });
});

function  verifyToken (req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  }

  res.sendStatus(403);
};
app.listen(3000, () => {
  console.log(" node app running");
});
