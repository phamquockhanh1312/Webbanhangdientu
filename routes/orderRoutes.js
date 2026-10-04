const express = require("express");

const router = express.Router();

router.get("/checkout", (req, res) => {
    const cart = req.session.cart || [];

    if (cart.length === 0) {
        return res.redirect("/cart");
    }

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    res.render("orders/checkout", {
        cart: cart,
        total: total,
        sessionUser: req.session.user
    });
});

router.post("/checkout", (req, res) => {
    const cart = req.session.cart || [];

    if (cart.length === 0) {
        return res.redirect("/cart");
    }

    const { name, phone, address } = req.body;

    if (!name || !phone || !address) {
        return res.send("Vui lòng nhập đầy đủ thông tin");
    }

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const order = {
        id: Date.now(),
        name: name,
        phone: phone,
        address: address,
        cart: [...cart],
        total: total,
        date: new Date().toLocaleString("vi-VN"),
        status: "Chờ xác nhận"
    };

    if (!req.session.orders) {
        req.session.orders = [];
    }

    req.session.orders.push(order);
    req.session.lastOrder = order;
    req.session.cart = [];

    res.redirect("/orders/success");
});

router.get("/success", (req, res) => {
    const order = req.session.lastOrder;

    if (!order) {
        return res.redirect("/products");
    }

    res.render("orders/success", {
        order: order,
        sessionUser: req.session.user
    });
});

router.get("/history", (req, res) => {
    const orders = req.session.orders || [];

    res.render("orders/history", {
        orders: orders,
        sessionUser: req.session.user
    });
});

module.exports = router;