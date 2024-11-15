require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("./middleware/passport");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();


connectDB();

app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Initialize Passport and use session middleware
app.use(passport.initialize());
app.use(passport.session());

// Use authentication routes
app.use(authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
