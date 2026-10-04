const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("products/index");
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    res.render("products/detail", {
        id: id
    });
});

module.exports = router;