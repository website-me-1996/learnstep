/**
 * curriculum/database/builder_helper.cjs
 *
 * Helper utilities for constructing, validating, and formatting SQL & Database curriculum lessons.
 * Provides canonical schema enforcement, 4-tier hint validation, and step execution verification.
 */

const { validateLesson } = require("../../validate-curriculum-json.cjs");
const { SQL_RULES } = require("./rules_catalog.cjs");

/**
 * Generates an Arabic guiding question ending with '؟' based on SQL step context.
 */
function generateSqlGuidingQuestion(ruleText, taskText, to, from) {
  if (ruleText && ruleText.includes("؟")) return "";
  const target = (to || "").trim();

  if (/IS\s+(NOT\s+)?NULL/i.test(target)) {
    return "هل استخدمت معامل التحقق من القيمة المجهولة IS NULL بدلاً من علامة المساواة؟";
  }
  if (/LIMIT\s+\d+/i.test(target)) {
    return "هل حددت سقف السجلات المسترجعة بعبارة LIMIT بعد اسم الجدول؟";
  }
  if (/ORDER\s+BY/i.test(target)) {
    return "هل حددت حقل الترتيب واتجاه الفرز ASC أو DESC بدقة؟";
  }
  if (/GROUP\s+BY/i.test(target)) {
    return "هل ضمنت كافة الأعمدة غير المجمعة في عبارة GROUP BY؟";
  }
  if (/HAVING/i.test(target)) {
    return "هل استخدمت شرط HAVING بعد عبارة GROUP BY لتصفية التجميعات؟";
  }
  if (/JOIN/i.test(target)) {
    return "هل حددت نوع الربط وشرط التطابق عبر عبارة ON بدقة؟";
  }
  if (/PRIMARY\s+KEY/i.test(target)) {
    return "هل أعلنت المفتاح الأساسي للجدول لضمان فرادية وسرعة الوصول للسجلات؟";
  }
  if (/FOREIGN\s+KEY/i.test(target) || /REFERENCES/i.test(target)) {
    return "هل أنشأت قيد التكامل المرجعي وحددت الجدول والعمود المرجعي؟";
  }
  if (/WITH(\s+RECURSIVE)?/i.test(target)) {
    return "هل بدأت صياغة التعبير الجدولي باسم التعبير والكلمة المفتاحية AS؟";
  }
  if (/OVER\s*\(/i.test(target)) {
    return "هل استخدمت عبارة OVER لتفعيل دالة النافذة التحليلية وتحديد التقسيم؟";
  }
  if (/CREATE\s+INDEX/i.test(target)) {
    return "هل حددت اسم الفهرس والجدول والأعمدة المستهدفة بالتسريع؟";
  }
  return "هل راجعت صياغة الأمر وتأكدت من كتابة الكلمات المفتاحية والفاصلة المنقوطة بدقة؟";
}

/**
 * Validates a single database lesson object against canonical rules.
 */
function checkDatabaseLesson(lesson, orderIndex) {
  return validateLesson(lesson, orderIndex, "database");
}

module.exports = {
  SQL_RULES,
  generateSqlGuidingQuestion,
  checkDatabaseLesson
};
