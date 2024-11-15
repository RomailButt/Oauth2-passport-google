const express = require("express");
const passport = require("passport");
const User = require("../model/User.js");
const router = express.Router();

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  console.log(req.user);
  req.user ? next() : res.sendStatus(401);
}

// Routes
router.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Authenticate with Google</a>");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

router.get("/auth/failure", (req, res) => {
  res.send("Authentication failed. Please try again.");
});

router.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello, ${req.user.displayName}! <a href='/logout'>Logout</a>`);
});

router.get("/userData", isLoggedIn, async (req, res) => {
  console.log(req.user);

  const result = await User.findOne({ googleId: req.user.googleId })
  res.status(200).json(result)
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
