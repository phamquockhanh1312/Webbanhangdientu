const express = require("express");

const router = express.Router();

const products = [
    {
        id: 1,
        name: "iPhone",
        category: "Điện thoại",
        description: "Điện thoại thông minh",
        price: "20.000.000 VNĐ"
    },
    {
        id: 2,
        name: "Laptop",
        category: "Laptop",
        description: "Laptop phục vụ học tập và làm việc",
        price: "20.000.000 VNĐ"
    },
    {
        id: 3,
        name: "Tai nghe",
        category: "Tai nghe",
        description: "Tai nghe không dây",
        price: "1.500.000 VNĐ"
    },
    {
        id: 4,
        name: "Loa Bluetooth",
        category: "Loa",
        description: "Loa Bluetooth không dây",
        price: "2.000.000 VNĐ"
    },
    {
        id: 5,
        name: "Chuột không dây",
        category: "Phụ kiện",
        description: "Chuột máy tính không dây",
        price: "500.000 VNĐ"
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

router.get("/category/:category", (req, res) => {
    const category = req.params.category;

    const result = products.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
    );

    res.render("products/category", {
        products: result,
        category: category
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