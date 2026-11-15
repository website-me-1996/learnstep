SET search_path = pharmacy;
-- دفعات صالحة وقريبة الانتهاء
SELECT p.trade_name, b.batch_code, b.expires_on, b.quantity
FROM products p JOIN batches b ON b.product_id = p.id
WHERE b.quantity > 0 AND b.expires_on <= CURRENT_DATE + 90
ORDER BY b.expires_on;

-- بيع آمن: اقفل الدفعة، افحص الصلاحية والكمية، ثم اكتب الحركة داخل المعاملة
BEGIN;
SELECT id, quantity, expires_on FROM batches
WHERE id = (SELECT id FROM batches ORDER BY id LIMIT 1) FOR UPDATE;
-- بعد تحقق التطبيق من النتيجة: UPDATE batches SET quantity = quantity - 2 WHERE id = ... AND quantity >= 2 AND expires_on > CURRENT_DATE;
-- يجب أن يتأكد التطبيق من عدد الصفوف المتأثرة قبل COMMIT.
COMMIT;

-- قيمة المبيعات اليومية
SELECT sold_at::date AS day, SUM(si.quantity * si.unit_price) AS revenue
FROM sales s JOIN sale_items si ON si.sale_id = s.id
WHERE s.status = 'posted'
GROUP BY sold_at::date ORDER BY day;
