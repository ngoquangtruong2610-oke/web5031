const Product = require('../models/Product');

// GET /api/products - Lấy danh sách sản phẩm với phân trang, tìm kiếm và lọc
const getAllProducts = async (req, res) => {
    try {
        const { 
            _page = 1, 
            _limit = 10, 
            name = '', 
            minPrice = '', 
            maxPrice = '' 
        } = req.query;

        // Xây dựng query filter
        const filter = {};

        // Tìm kiếm theo tên (không phân biệt hoa thường)
        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }

        // Lọc theo khoảng giá
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) {
                filter.price.$gte = parseFloat(minPrice);
            }
            if (maxPrice) {
                filter.price.$lte = parseFloat(maxPrice);
            }
        }

        // Tính toán phân trang
        const page = parseInt(_page);
        const limit = parseInt(_limit);
        const skip = (page - 1) * limit;

        // Lấy tổng số sản phẩm
        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);

        // Lấy sản phẩm với phân trang
        const products = await Product.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            success: true,
            data: products,
            pagination: {
                currentPage: page,
                totalPages,
                totalProducts,
                limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy danh sách sản phẩm',
            error: error.message
        });
    }
};

// GET /api/products/:id - Lấy chi tiết sản phẩm theo ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm'
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'ID sản phẩm không hợp lệ'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy chi tiết sản phẩm',
            error: error.message
        });
    }
};

// POST /api/products - Tạo sản phẩm mới
const createProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        // Validation cơ bản
        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: 'Tên và giá sản phẩm là bắt buộc'
            });
        }

        if (price < 0) {
            return res.status(400).json({
                success: false,
                message: 'Giá sản phẩm phải lớn hơn hoặc bằng 0'
            });
        }

        const product = new Product({
            name,
            price,
            description
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: 'Tạo sản phẩm thành công',
            data: product
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Dữ liệu không hợp lệ',
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Lỗi server khi tạo sản phẩm',
            error: error.message
        });
    }
};

// PUT /api/products/:id - Cập nhật sản phẩm theo ID
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description } = req.body;

        // Validation cơ bản
        if (price !== undefined && price < 0) {
            return res.status(400).json({
                success: false,
                message: 'Giá sản phẩm phải lớn hơn hoặc bằng 0'
            });
        }

        const product = await Product.findByIdAndUpdate(
            id,
            { name, price, description },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm'
            });
        }

        res.json({
            success: true,
            message: 'Cập nhật sản phẩm thành công',
            data: product
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'ID sản phẩm không hợp lệ'
            });
        }

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Dữ liệu không hợp lệ',
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Lỗi server khi cập nhật sản phẩm',
            error: error.message
        });
    }
};

// DELETE /api/products/:id - Xóa sản phẩm theo ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm'
            });
        }

        res.json({
            success: true,
            message: 'Xóa sản phẩm thành công',
            data: product
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'ID sản phẩm không hợp lệ'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Lỗi server khi xóa sản phẩm',
            error: error.message
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
