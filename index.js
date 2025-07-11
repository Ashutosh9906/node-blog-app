const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const Blog = require("./models/blog");

const userRoute = require("./routes/users");
const blogRoute = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middleware/authentication");

const app = express();
const PORT = 8000;

mongoose.connect("mongodb://localhost:27017/blog-app")
        .then(() => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended:false }));
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
    //console.log("user : ", req.user)
    const allBlogs = await Blog.find({});
    //console.log(allBlogs);
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
})

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));