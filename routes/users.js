const { Router } = require("express")
const User = require("../models/users")

const router = Router();

router.get("/signin", (req, res) => {
    try {
        console.log("Rendering signin page");
        return res.render("signin");
    }
    catch (err) {
        console.error("Render failed:", err);
        // if (!res.headersSent) {
        //     return res.status(500).send("View render failed");
        // }
    }
});


router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);

        return res.cookie("token", token).redirect("/");
    } catch (error) {
        console.log(error);
        return res.render("signin", {
            error: "Invalid Credentials"
        });
    }
})

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
});

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    // console.log("fullname", fullName);
    // console.log("email", email);
    // console.log("password", password);
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
})

module.exports = router;