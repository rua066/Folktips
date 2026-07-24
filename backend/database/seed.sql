USE folktips;

DELETE FROM categories;

INSERT INTO categories(name, description, icon)
VALUES
('Sức khỏe', 'Các mẹo chăm sóc sức khỏe', '🩺'),
('Nhà bếp', 'Các mẹo nấu ăn và bảo quản thực phẩm', '🍳'),
('Làm vườn', 'Các mẹo trồng cây', '🌱'),
('Gia đình', 'Các mẹo hữu ích trong gia đình', '🏡');

SELECT * FROM categories;