SET search_path = pharmacy;
INSERT INTO categories (name) VALUES ('مسكنات'), ('مستلزمات') ON CONFLICT DO NOTHING;
INSERT INTO suppliers (name, phone) VALUES ('مورد تجريبي', '01000000000') ON CONFLICT DO NOTHING;
INSERT INTO products (trade_name, active_ingredient, category_id, barcode, reorder_level)
SELECT 'Paracetamol Demo', 'Paracetamol', id, 'demo-1001', 10 FROM categories WHERE name = 'مسكنات'
ON CONFLICT DO NOTHING;
INSERT INTO batches (product_id, supplier_id, batch_code, produced_on, expires_on, purchase_price, sale_price, quantity)
SELECT p.id, s.id, 'BATCH-DEMO-1', CURRENT_DATE - 30, CURRENT_DATE + 180, 10.00, 14.00, 25
FROM products p CROSS JOIN suppliers s WHERE p.barcode = 'demo-1001' AND s.name = 'مورد تجريبي'
ON CONFLICT DO NOTHING;
INSERT INTO customers (name, phone) VALUES ('عميل تجريبي', '01111111111') ON CONFLICT DO NOTHING;
