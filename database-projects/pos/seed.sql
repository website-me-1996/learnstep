SET search_path = pos;
INSERT INTO users (username, role) VALUES ('cashier-demo', 'cashier'), ('supervisor-demo', 'supervisor') ON CONFLICT DO NOTHING;
INSERT INTO products (barcode, name, price, stock_quantity) VALUES ('pos-1001', 'Notebook Pro', 25.00, 12), ('pos-1002', 'Pen Set', 5.00, 30) ON CONFLICT DO NOTHING;
INSERT INTO register_sessions (cashier_id, opening_cash)
SELECT id, 100.00 FROM users WHERE username = 'cashier-demo'
AND NOT EXISTS (SELECT 1 FROM register_sessions WHERE opening_cash = 100.00);
