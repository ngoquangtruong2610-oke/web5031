const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const productRoutes = require('./routes/products');


app.use('/api/products', productRoutes);


app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to Product Management API!',
        version: '1.0.0',
        endpoints: {
            products: '/api/products'
        },
        productEndpoints: {
            'GET /api/products': 'Lấy danh sách sản phẩm với phân trang, tìm kiếm và lọc',
            'GET /api/products/:id': 'Lấy chi tiết sản phẩm theo ID',
            'POST /api/products': 'Tạo sản phẩm mới',
            'PUT /api/products/:id': 'Cập nhật sản phẩm theo ID',
            'DELETE /api/products/:id': 'Xóa sản phẩm theo ID'
        },
        queryParameters: {
            '_page': 'Số trang (mặc định: 1)',
            '_limit': 'Số sản phẩm mỗi trang (mặc định: 10)',
            'name': 'Tìm kiếm theo tên sản phẩm',
            'minPrice': 'Lọc theo giá tối thiểu',
            'maxPrice': 'Lọc theo giá tối đa'
        }
    });
});


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/product_management';

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ Could not connect to MongoDB:', err));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra trên server',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});

// Middleware xử lý route không tồn tại
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route không tồn tại'
    });
});

app.listen(port, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
    console.log(`📚 API Documentation: http://localhost:${port}`);
});
