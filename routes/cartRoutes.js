const express = require("express");

const router = express.Router();

const products = [
    {
        id: 1,
        name: "iPhone",
        price: 20000000
    },
    {
        id: 2,
        name: "Laptop",
        price: 20000000
    },
    {
        id: 3,
        name: "Tai nghe",
        price: 1500000
    },
    {
        id: 4,
        name: "Loa Bluetooth",
        price: 2000000
    },
    {
        id: 5,
        name: "Chuột không dây",
        price: 500000
    }
];

router.get("/", (req, res) => {
    const cart = req.session.cart || [];

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    res.render("cart/index", {
        cart: cart,
        total: total
    });
});

router.post("/add", (req, res) => {
    const productId = Number(req.body.productId);

    const product = products.find(
        product => product.id === productId
    );

    if (!product) {
        return res.send("Không tìm thấy sản phẩm");
    }

    if (!req.session.cart) {
        req.session.cart = [];
    }

    const existingProduct = req.session.cart.find(
        item => item.id === productId
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        req.session.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    res.redirect("/cart");
});

router.post("/increase/:id", (req, res) => {
    const id = Number(req.params.id);

    const item = (req.session.cart || []).find(
        item => item.id === id
    );

    if (item) {
        item.quantity += 1;
    }

    res.redirect("/cart");
});

router.post("/decrease/:id", (req, res) => {
    const id = Number(req.params.id);

    const item = (req.session.cart || []).find(
        item => item.id === id
    );

    if (item) {
        item.quantity -= 1;

        if (item.quantity <= 0) {
            req.session.cart = req.session.cart.filter(
                item => item.id !== id
            );
        }
    }

    res.redirect("/cart");
});

router.post("/remove/:id", (req, res) => {
    const id = Number(req.params.id);

    req.session.cart = (req.session.cart || []).filter(
        item => item.id !== id
    );

    res.redirect("/cart");
});

module.exports = router;