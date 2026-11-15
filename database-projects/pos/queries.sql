SET search_path = pos;
-- المنتجات الأكثر مبيعًا
SELECT p.name, SUM(ii.quantity) AS units_sold
FROM products p JOIN invoice_items ii ON ii.product_id = p.id
JOIN invoices i ON i.id = ii.invoice_id
WHERE i.status = 'posted'
GROUP BY p.id, p.name ORDER BY units_sold DESC;

-- بيع منتج مع منع السباق على آخر قطعة
BEGIN;
SELECT id, stock_quantity FROM products WHERE barcode = 'pos-1001' FOR UPDATE;
-- بعد التأكد أن stock_quantity >= 1: أنشئ invoice، ثم:
-- UPDATE products SET stock_quantity = stock_quantity - 1 WHERE id = ... AND stock_quantity >= 1;
-- إذا لم يتأثر صف، نفّذ ROLLBACK بدل تسجيل فاتورة ناقصة.
COMMIT;

-- تقرير الوردية
SELECT rs.id, u.username, rs.opened_at, COALESCE(SUM(i.subtotal - i.discount + i.tax), 0) AS gross_sales
FROM register_sessions rs JOIN users u ON u.id = rs.cashier_id
LEFT JOIN invoices i ON i.session_id = rs.id AND i.status = 'posted'
GROUP BY rs.id, u.username, rs.opened_at;
