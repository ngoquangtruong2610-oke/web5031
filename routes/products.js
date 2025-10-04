const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// GET /api/products - Lấy danh sách sản phẩm với phân trang, tìm kiếm và lọc
router.get('/', getAllProducts);

// GET /api/products/:id - Lấy chi tiết sản phẩm theo ID
router.get('/:id', getProductById);

// POST /api/products - Tạo sản phẩm mới
router.post('/', createProduct);

// PUT /api/products/:id - Cập nhật sản phẩm theo ID
router.put('/:id', updateProduct);

// DELETE /api/products/:id - Xóa sản phẩm theo ID
router.delete('/:id', deleteProduct);

module.exports = router;
