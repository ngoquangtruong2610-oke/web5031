const mongoose = require('mongoose');
const Product = require('./models/Product');

// Kết nối MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/product_management';

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ Could not connect to MongoDB:', err));

// Dữ liệu mẫu
const sampleProducts = [
    {
        name: 'Laptop Dell XPS 13',
        price: 15000000,
        description: 'High-performance laptop for professionals with 13-inch display'
    },
    {
        name: 'iPhone 15 Pro',
        price: 25000000,
        description: 'Latest iPhone with advanced camera system and A17 Pro chip'
    },
    {
        name: 'Samsung Galaxy S24',
        price: 20000000,
        description: 'Android flagship smartphone with AI-powered features'
    },
    {
        name: 'MacBook Pro M3',
        price: 35000000,
        description: 'Apple MacBook Pro with M3 chip for professional work'
    },
    {
        name: 'iPad Air 5th Gen',
        price: 12000000,
        description: 'Tablet with M1 chip and 10.9-inch Liquid Retina display'
    },
    {
        name: 'Sony WH-1000XM5',
        price: 5000000,
        description: 'Premium noise-canceling wireless headphones'
    },
    {
        name: 'Apple Watch Series 9',
        price: 8000000,
        description: 'Smartwatch with health monitoring and fitness tracking'
    },
    {
        name: 'Dell Monitor 27"',
        price: 3000000,
        description: '4K UHD monitor for professional and gaming use'
    },
    {
        name: 'Logitech MX Master 3',
        price: 1500000,
        description: 'Wireless mouse with precision tracking and ergonomic design'
    },
    {
        name: 'Mechanical Keyboard',
        price: 2000000,
        description: 'RGB mechanical keyboard with Cherry MX switches'
    }
];

// Function để seed dữ liệu
async function seedDatabase() {
    try {
        // Xóa tất cả sản phẩm hiện có
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Tạo sản phẩm mới
        const products = await Product.insertMany(sampleProducts);
        console.log(`✅ Created ${products.length} sample products`);

        // Hiển thị danh sách sản phẩm đã tạo
        console.log('\n📦 Sample Products Created:');
        products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - ${product.price.toLocaleString('vi-VN')} VND`);
        });

        console.log('\n🎉 Database seeding completed successfully!');
        console.log('🚀 You can now test the API endpoints');
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        // Đóng kết nối
        mongoose.connection.close();
        console.log('🔌 Database connection closed');
    }
}

// Chạy seed function
seedDatabase();