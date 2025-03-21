-- Tạo database
CREATE DATABASE sneaker_shop2;
GO

USE sneaker_shop2;
GO

-- Bảng Users
CREATE TABLE users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name NVARCHAR(100),
    address NVARCHAR(255),
    phone VARCHAR(15),
    created_at DATETIME DEFAULT GETDATE()
);
GO
CREATE TABLE roles (
    role_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description NVARCHAR(255)
);
GO
CREATE TABLE user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);
GO
-- Bảng Categories
CREATE TABLE categories (
    category_id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(50) NOT NULL,
    description NVARCHAR(255)
);
GO
-- Bảng Products
CREATE TABLE products (
    product_id INT IDENTITY(1,1) PRIMARY KEY,
    category_id INT,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    size VARCHAR(50),
    image_url VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);
GO
-- Bảng Orders
CREATE TABLE orders (
    order_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    order_date DATETIME DEFAULT GETDATE(),
    shipping_address NVARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
GO
-- Bảng Order_Details
CREATE TABLE order_details (
    order_detail_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
GO
-- Bảng Cart
CREATE TABLE cart (
    cart_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
GO
INSERT INTO Roles (name, description)
VALUES 
    ('ADMIN', 'Administrator with full access'),
    ('CUSTOMER', 'Regular customer with limited access'),
    ('MODERATOR', 'Moderator with access to orders and reviews');
	GO
INSERT INTO Users (username, password, email, full_name, address, phone, created_at)
VALUES 
    ('admin', '$2a$10$XURP2.9.7Xz5z5z5z5z5z5u', 'admin@example.com', 'Admin User', '123 Admin St', '0123456789', GETDATE()),
    ('john_doe', '$2a$10$XURP2.9.7Xz5z5z5z5z5z5u', 'john@example.com', 'John Doe', '456 Main St', '0987654321', GETDATE()),
    ('jane_smith', '$2a$10$XURP2.9.7Xz5z5z5z5z5z5u', 'jane@example.com', 'Jane Smith', '789 Elm St', '0123456788', GETDATE()),
    ('moderator', '$2a$10$XURP2.9.7Xz5z5z5z5z5z5u', 'moderator@example.com', 'Moderator User', '101 Pine St', '0123456787', GETDATE()),
    ('alice', '$2a$10$XURP2.9.7Xz5z5z5z5z5z5u', 'alice@example.com', 'Alice Brown', '202 Oak St', '0123456786', GETDATE());
GO
INSERT INTO User_Roles (user_id, role_id)
VALUES 
    (1, 1), -- admin là ADMIN
    (2, 2), -- john_doe là CUSTOMER
    (3, 2), -- jane_smith là CUSTOMER
    (4, 3), -- moderator là MODERATOR
    (5, 2); -- alice là CUSTOMER
GO
INSERT INTO Categories (name, description)
VALUES 
    ('Running Shoes', 'Shoes designed for running and jogging.'),
    ('Basketball Shoes', 'Shoes designed for basketball players.'),
    ('Casual Shoes', 'Shoes for everyday wear.'),
    ('Training Shoes', 'Shoes for gym and training activities.');
GO
INSERT INTO Products (category_id, name, description, price, stock, size, image_url)
VALUES 
    (1, 'Nike Air Zoom Pegasus', 'Lightweight running shoes with excellent cushioning.', 120.00, 50, '38-44', 'nike_pegasus.jpg'),
    (2, 'Jordan 1 Retro High', 'Iconic basketball sneakers.', 180.00, 20, '40-46', 'jordan_1.jpg'),
    (3, 'Adidas Stan Smith', 'Classic casual sneakers.', 90.00, 30, '38-44', 'stan_smith.jpg'),
    (4, 'Under Armour HOVR', 'Training shoes with responsive cushioning.', 110.00, 25, '39-45', 'ua_hovr.jpg'),
    (2, 'LeBron 18', 'High-performance basketball shoes.', 200.00, 15, '40-46', 'lebron_18.jpg');
GO
INSERT INTO Cart (user_id, product_id, quantity)
VALUES 
    (2, 1, 2), -- john_doe thêm 2 đôi Nike Air Zoom Pegasus
    (2, 2, 1), -- john_doe thêm 1 đôi Jordan 1 Retro High
    (3, 3, 1), -- jane_smith thêm 1 đôi Adidas Stan Smith
    (5, 4, 3), -- alice thêm 3 đôi Under Armour HOVR
    (5, 5, 1); -- alice thêm 1 đôi LeBron 18
GO
INSERT INTO Orders (user_id, total_amount, status, order_date, shipping_address)
VALUES 
    (2, 420.00, 'Pending', GETDATE(), '456 Main St'), -- john_doe đặt hàng
    (3, 90.00, 'Shipped', GETDATE(), '789 Elm St'),   -- jane_smith đặt hàng
    (5, 530.00, 'Delivered', GETDATE(), '202 Oak St'); -- alice đặt hàng
GO
INSERT INTO Order_Details (order_id, product_id, quantity, price)
VALUES 
    (1, 1, 2, 120.00), -- john_doe mua 2 đôi Nike Air Zoom Pegasus (2 * 120 = 240)
    (1, 2, 1, 180.00), -- john_doe mua 1 đôi Jordan 1 Retro High (1 * 180 = 180) => Tổng 420
    (2, 3, 1, 90.00),  -- jane_smith mua 1 đôi Adidas Stan Smith (1 * 90 = 90)
    (3, 4, 3, 110.00), -- alice mua 3 đôi Under Armour HOVR (3 * 110 = 330)
    (3, 5, 1, 200.00); -- alice mua 1 đôi LeBron 18 (1 * 200 = 200) => Tổng 530
GO