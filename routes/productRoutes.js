const express = require("express");

const router = express.Router();

const products = [
    {
        id: 1,
        name: "iPhone",
        category: "Điện thoại",
        description: "Điện thoại thông minh cao cấp",
        price: "20.000.000 VNĐ",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 2,
        name: "Laptop",
        category: "Laptop",
        description: "Laptop phục vụ học tập và làm việc",
        price: "20.000.000 VNĐ",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 3,
        name: "Tai nghe",
        category: "Tai nghe",
        description: "Tai nghe không dây",
        price: "1.500.000 VNĐ",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 4,
        name: "Loa Bluetooth",
        category: "Loa",
        description: "Loa Bluetooth không dây",
        price: "2.000.000 VNĐ",
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 5,
        name: "Chuột không dây",
        category: "Phụ kiện",
        description: "Chuột máy tính không dây",
        price: "500.000 VNĐ",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85"
    }
];

router.get("/", (req, res) => {
    res.render("products/index", {
        products: products,
        sessionUser: req.session.user
    });
});

router.get("/search", (req, res) => {
    const keyword = req.query.keyword || "";

    const result = products.filter(product =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
    );

    res.render("products/search", {
        products: result,
        keyword: keyword,
        sessionUser: req.session.user
    });
});

router.get("/category/:category", (req, res) => {
    const category = req.params.category;

    const result = products.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
    );

    res.render("products/category", {
        products: result,
        category: category,
        sessionUser: req.session.user
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    const product = products.find(
        product => product.id == id
    );

    res.render("products/detail", {
        product: product,
        sessionUser: req.session.user
    });
});

module.exports = router;