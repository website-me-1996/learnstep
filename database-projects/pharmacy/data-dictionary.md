# قاموس بيانات الصيدلية

| الجدول | الحقول المهمة | القاعدة |
|---|---|---|
| products | trade_name, active_ingredient, barcode | الباركود هوية بيع، والمادة الفعالة ليست اسمًا تجاريًا |
| batches | batch_code, expires_on, quantity | المخزون يتبع الدفعة لا المنتج المجرد |
| sales | sold_at, status | لا نحذف البيع؛ نغيّر حالته ونسجل الأثر |
| sale_items | sale_id, batch_id, quantity | كيان رابط يحمل كمية وسعر لحظة البيع |
| stock_movements | quantity_delta, reason | يسجل التاريخ بدل الاكتفاء برصيد حالي |
| audit_log | actor, action, entity_id | أثر العمليات الحساسة قابل للمراجعة |
