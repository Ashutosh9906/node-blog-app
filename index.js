const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const userRoute = require("./routes/users")

const app = express();
const PORT = 8000;

mongoose.connect("mongodb://localhost:27017/blog-app")
        .then(() => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended:false }));    

app.get("/", (req, res) => {
    res.render("home");
})

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));