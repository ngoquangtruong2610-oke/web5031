const express = require('express');
const router = express.Router();

// GET /api/posts/greet?name=Ken
router.get('/greet', (req, res) => {
    const name = req.query.name;
    
    // Kiểm tra nếu không có name trong query
    if (!name) {
        return res.json({
            error: 'Vui lòng cung cấp tham số name',
            example: '/api/posts/greet?name=Ken'
        });
    }
    
    res.json({
        message: `Xin chào ${name}!`,
        greeting: `Hello ${name}, welcome to our API!`
    });
});

// GET /api/posts/sum?a=5&b=3
router.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    
    // Kiểm tra nếu thiếu tham số
    if (!a || !b) {
        return res.json({
            error: 'Vui lòng cung cấp cả hai tham số a và b',
            example: '/api/posts/sum?a=5&b=3'
        });
    }
    
    // Chuyển đổi sang số
    const numA = parseInt(a);
    const numB = parseInt(b);
    
    // Kiểm tra nếu không phải số hợp lệ
    if (isNaN(numA) || isNaN(numB)) {
        return res.json({
            error: 'a và b phải là số hợp lệ',
            example: '/api/posts/sum?a=5&b=3'
        });
    }
    
    const sum = numA + numB;
    
    res.json({
        a: numA,
        b: numB,
        sum: sum,
        calculation: `${numA} + ${numB} = ${sum}`
    });
});

module.exports = router;
