const express = require("express");

const router = express.Router();

const products = [
    {
        id: 1,
        name: "iPhone",
        description: "Điện thoại thông minh",
        price: "20.000.000 VNĐ"
    },
    {
        id: 2,
        name: "Laptop",
        description: "Laptop phục vụ học tập và làm việc",
        price: "20.000.000 VNĐ"
    },
    {
        id: 3,
        name: "Tai nghe",
        description: "Tai nghe không dây",
        price: "1.500.000 VNĐ"
    }
];

router.get("/", (req, res) => {
    res.render("products/index", {
        products: products
    });
});

router.get("/search", (req, res) => {
    const keyword = req.query.keyword || "";

    const result = products.filter(product =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
    );

    res.render("products/search", {
        products: result,
        keyword: keyword
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    const product = products.find(product => product.id == id);

    res.render("products/detail", {
        id: id,
        product: product
    });
});

module.exports = router;