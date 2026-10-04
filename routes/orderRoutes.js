const express = require("express");

const router = express.Router();

router.get("/checkout", (req, res) => {
    const cart = req.session.cart || [];

    if (cart.length === 0) {
        return res.send("Giỏ hàng đang trống");
    }

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    res.render("orders/checkout", {
        cart: cart,
        total: total
    });
});

router.post("/checkout", (req, res) => {
    const cart = req.session.cart || [];

    if (cart.length === 0) {
        return res.send("Giỏ hàng đang trống");
    }

    const { name, phone, address } = req.body;

    if (!name || !phone || !address) {
        return res.send("Vui lòng nhập đầy đủ thông tin");
    }

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    req.session.lastOrder = {
        name: name,
        phone: phone,
        address: address,
        cart: cart,
        total: total
    };

    req.session.cart = [];

    res.redirect("/orders/success");
});

router.get("/success", (req, res) => {
    const order = req.session.lastOrder;

    if (!order) {
        return res.redirect("/products");
    }

    res.render("orders/success", {
        order: order
    });
});

module.exports = router;