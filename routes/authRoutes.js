const express = require("express");

const router = express.Router();

const users = [];

router.get("/register", (req, res) => {
    res.render("auth/register");
});

router.post("/register", (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.send("Mật khẩu nhập lại không đúng");
    }

    const userExists = users.find(
        user => user.email === email
    );

    if (userExists) {
        return res.send("Email đã được đăng ký");
    }

    users.push({
        name: name,
        email: email,
        password: password
    });

    res.redirect("/auth/login");
});

router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        user =>
            user.email === email &&
            user.password === password
    );

    if (!user) {
        return res.send("Email hoặc mật khẩu không đúng");
    }

    req.session.user = {
        name: user.name,
        email: user.email
    };

    res.redirect("/");
});

router.get("/profile", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/auth/login");
    }

    res.render("auth/profile", {
        user: req.session.user
    });
});

router.get("/logout", (req, res) => {
    req.session.user = null;

    res.redirect("/");
});

module.exports = router;