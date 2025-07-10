const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/users");
const { checkForAuthenticationCookie } = require("./middleware/authentication");

const app = express();
const PORT = 8000;

mongoose.connect("mongodb://localhost:27017/blog-app")
        .then(() => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended:false }));
app.use(cookieParser())
//app.use(checkForAuthenticationCookie("token"));

app.use("/user", userRoute);

app.get("/", checkForAuthenticationCookie("token"), (req, res) => {
    console.log("user : ", req.user)
    res.render("home", {
        user: req.user,
    });
})

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));