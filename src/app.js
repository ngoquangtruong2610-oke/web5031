const express = require('express');
const app = express();
const port = 3000;

// Middleware để parse JSON
app.use(express.json());

// Import các routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const postRoutes = require('./routes/posts'); // Thêm dòng này

// Sử dụng routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/api/posts', postRoutes); // Thêm dòng này

// Route mặc định
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to Node.js Router Tutorial!',
        endpoints: {
            users: '/users',
            products: '/products',
            posts: '/api/posts' // Thêm endpoint mới
        }
    });
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
