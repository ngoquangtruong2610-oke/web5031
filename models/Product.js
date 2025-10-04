const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên sản phẩm là bắt buộc'],
        trim: true,
        maxlength: [100, 'Tên sản phẩm không được vượt quá 100 ký tự']
    },
    price: {
        type: Number,
        required: [true, 'Giá sản phẩm là bắt buộc'],
        min: [0, 'Giá sản phẩm phải lớn hơn hoặc bằng 0']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Mô tả sản phẩm không được vượt quá 500 ký tự']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware để cập nhật updatedAt trước khi save
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Middleware để cập nhật updatedAt trước khi update
productSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: Date.now() });
    next();
});

module.exports = mongoose.model('Product', productSchema);
