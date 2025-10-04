# Hướng dẫn Test API với Postman

## 🚀 Khởi động Server

### 1. Cài đặt Dependencies
```bash
npm install
```

### 2. Khởi động MongoDB
Đảm bảo MongoDB đang chạy trên máy local:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### 3. Seed dữ liệu mẫu
```bash
npm run seed
```

### 4. Khởi động Server
```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:3000`

## 📋 Test API với Postman

### 1. GET /api/products - Lấy danh sách sản phẩm

**Request:**
- Method: `GET`
- URL: `http://localhost:3000/api/products`

**Query Parameters (tùy chọn):**
- `_page`: Số trang (mặc định: 1)
- `_limit`: Số sản phẩm mỗi trang (mặc định: 10)
- `name`: Tìm kiếm theo tên sản phẩm
- `minPrice`: Lọc theo giá tối thiểu
- `maxPrice`: Lọc theo giá tối đa

**Ví dụ:**
```
GET http://localhost:3000/api/products?_page=1&_limit=5&name=laptop&minPrice=1000000&maxPrice=20000000
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "_id": "64a1b2c3d4e5f6789abcdef0",
            "name": "Laptop Dell XPS 13",
            "price": 15000000,
            "description": "High-performance laptop for professionals",
            "createdAt": "2023-07-01T10:00:00.000Z",
            "updatedAt": "2023-07-01T10:00:00.000Z"
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 2,
        "totalProducts": 10,
        "limit": 5,
        "hasNextPage": true,
        "hasPrevPage": false
    }
}
```

### 2. GET /api/products/:id - Lấy chi tiết sản phẩm

**Request:**
- Method: `GET`
- URL: `http://localhost:3000/api/products/64a1b2c3d4e5f6789abcdef0`

**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "64a1b2c3d4e5f6789abcdef0",
        "name": "Laptop Dell XPS 13",
        "price": 15000000,
        "description": "High-performance laptop for professionals",
        "createdAt": "2023-07-01T10:00:00.000Z",
        "updatedAt": "2023-07-01T10:00:00.000Z"
    }
}
```

### 3. POST /api/products - Tạo sản phẩm mới

**Request:**
- Method: `POST`
- URL: `http://localhost:3000/api/products`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
    "name": "iPhone 15 Pro Max",
    "price": 28000000,
    "description": "iPhone 15 Pro Max 256GB"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Tạo sản phẩm thành công",
    "data": {
        "_id": "64a1b2c3d4e5f6789abcdef1",
        "name": "iPhone 15 Pro Max",
        "price": 28000000,
        "description": "iPhone 15 Pro Max 256GB",
        "createdAt": "2023-07-01T10:30:00.000Z",
        "updatedAt": "2023-07-01T10:30:00.000Z"
    }
}
```

### 4. PUT /api/products/:id - Cập nhật sản phẩm

**Request:**
- Method: `PUT`
- URL: `http://localhost:3000/api/products/64a1b2c3d4e5f6789abcdef1`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
    "name": "iPhone 15 Pro Max Updated",
    "price": 30000000,
    "description": "iPhone 15 Pro Max 512GB"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Cập nhật sản phẩm thành công",
    "data": {
        "_id": "64a1b2c3d4e5f6789abcdef1",
        "name": "iPhone 15 Pro Max Updated",
        "price": 30000000,
        "description": "iPhone 15 Pro Max 512GB",
        "createdAt": "2023-07-01T10:30:00.000Z",
        "updatedAt": "2023-07-01T11:00:00.000Z"
    }
}
```

### 5. DELETE /api/products/:id - Xóa sản phẩm

**Request:**
- Method: `DELETE`
- URL: `http://localhost:3000/api/products/64a1b2c3d4e5f6789abcdef1`

**Response:**
```json
{
    "success": true,
    "message": "Xóa sản phẩm thành công",
    "data": {
        "_id": "64a1b2c3d4e5f6789abcdef1",
        "name": "iPhone 15 Pro Max Updated",
        "price": 30000000,
        "description": "iPhone 15 Pro Max 512GB",
        "createdAt": "2023-07-01T10:30:00.000Z",
        "updatedAt": "2023-07-01T11:00:00.000Z"
    }
}
```

## 🧪 Test Cases với Postman Collection

### Collection Setup
1. Tạo Collection mới trong Postman
2. Thêm Environment variables:
   - `base_url`: `http://localhost:3000`
   - `product_id`: (sẽ được set sau khi tạo sản phẩm)

### Test Cases

#### 1. Test Tạo Sản Phẩm
- **Test Name**: "Create Product"
- **Method**: POST
- **URL**: `{{base_url}}/api/products`
- **Body**: 
```json
{
    "name": "Test Product",
    "price": 1000000,
    "description": "Test Description"
}
```
- **Tests Script**:
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has success true", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.eql(true);
});

pm.test("Product has _id", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data._id).to.exist;
    pm.environment.set("product_id", jsonData.data._id);
});
```

#### 2. Test Lấy Danh Sách Sản Phẩm
- **Test Name**: "Get All Products"
- **Method**: GET
- **URL**: `{{base_url}}/api/products`
- **Tests Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has pagination", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.pagination).to.exist;
});
```

#### 3. Test Tìm Kiếm Sản Phẩm
- **Test Name**: "Search Products"
- **Method**: GET
- **URL**: `{{base_url}}/api/products?name=Test&_limit=5`
- **Tests Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Products contain search term", function () {
    var jsonData = pm.response.json();
    if (jsonData.data.length > 0) {
        pm.expect(jsonData.data[0].name.toLowerCase()).to.include("test");
    }
});
```

#### 4. Test Lọc Theo Giá
- **Test Name**: "Filter Products by Price"
- **Method**: GET
- **URL**: `{{base_url}}/api/products?minPrice=500000&maxPrice=2000000`
- **Tests Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("All products are within price range", function () {
    var jsonData = pm.response.json();
    jsonData.data.forEach(function(product) {
        pm.expect(product.price).to.be.at.least(500000);
        pm.expect(product.price).to.be.at.most(2000000);
    });
});
```

#### 5. Test Cập Nhật Sản Phẩm
- **Test Name**: "Update Product"
- **Method**: PUT
- **URL**: `{{base_url}}/api/products/{{product_id}}`
- **Body**:
```json
{
    "name": "Updated Test Product",
    "price": 1500000,
    "description": "Updated Description"
}
```
- **Tests Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Product is updated", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.name).to.eql("Updated Test Product");
    pm.expect(jsonData.data.price).to.eql(1500000);
});
```

#### 6. Test Xóa Sản Phẩm
- **Test Name**: "Delete Product"
- **Method**: DELETE
- **URL**: `{{base_url}}/api/products/{{product_id}}`
- **Tests Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Product is deleted", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.eql(true);
});
```

## Error Handling Tests

### 1. Test Validation Errors
- **Test Name**: "Create Product with Invalid Data"
- **Method**: POST
- **URL**: `{{base_url}}/api/products`
- **Body**:
```json
{
    "name": "",
    "price": -1000
}
```
- **Tests Script**:
```javascript
pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});
```

### 2. Test Not Found Error
- **Test Name**: "Get Non-existent Product"
- **Method**: GET
- **URL**: `{{base_url}}/api/products/000000000000000000000000`
- **Tests Script**:
```javascript
pm.test("Status code is 404", function () {
    pm.response.to.have.status(404);
});
```

## Chạy Tests

1. Mở Postman Collection
2. Click "Run" để chạy tất cả tests
3. Kiểm tra kết quả trong Test Results tab

## Lưu ý

- Đảm bảo MongoDB đang chạy trước khi test
- Server phải được khởi động (`npm run dev`)
- Sử dụng environment variables để quản lý URLs
- Test theo thứ tự: Create → Read → Update → Delete