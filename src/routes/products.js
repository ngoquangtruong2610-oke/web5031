const express = require('express');
const router = express.Router();

// GET /products - Lấy danh sách sản phẩm
router.get('/', (req, res) => {
    res.json({
        message: 'Danh sách sản phẩm',
        products: [
            { id: 1, name: 'Laptop Dell', price: 15000000 },
            { id: 2, name: 'iPhone 15', price: 25000000 }
        ]
    });
});

// POST /products - Thêm sản phẩm mới
router.post('/', (req, res) => {
    const { name, price } = req.body;
    res.json({
        message: 'Tạo sản phẩm thành công',
        product: { id: Date.now(), name, price }
    });
});

module.exports = router;
