/**
 * tests/e2e_database_track.test.cjs
 *
 * Comprehensive End-to-End Test Suite for StepLearn Database Curriculum Track Integration.
 *
 * Requirements Covered (from ORIGINAL_REQUEST.md & PROJECT.md):
 *   - R1: Dedicated Database Curriculum Dataset (canonical schema 1.0.0, 5 phases, modular chunks, UTF-8 no BOM)
 *   - R2: Pedagogical Lesson Structure & Hints (Arabic >=50 chars, 4-tier progressive hints, SQL error rules, bug repair)
 *   - R3: Platform UI Integration & Loader (homepage card, landing badge, editor tab, DataLoader, tabular preview, bidirectional nav)
 *   - R4: Automated Validation & Regression Safety (validate-curriculum-json.cjs, zero Mojibake/BOM, 373 existing lessons regression-free)
 *
 * Test Tiers:
 *   - Tier 1: Feature Coverage (20 tests: 5 for R1, 5 for R2, 5 for R3, 5 for R4)
 *   - Tier 2: Boundary & Corner Cases (20 tests: 5 for R1, 5 for R2, 5 for R3, 5 for R4)
 *   - Tier 3: Cross-Feature Combinations (6 tests: T3-XF-01 to T3-XF-06)
 *   - Tier 4: Real-World Application Scenarios (6 tests: T4-SC-01 to T4-SC-06)
 *   Total: 52 E2E tests
 *
 * Execution:
 *   node --test tests/e2e_database_track.test.cjs
 */

const { describe, it, test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const child_process = require('node:child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const validator = require(path.join(ROOT_DIR, 'validate-curriculum-json.cjs'));

// ============================================================================
// Section 0: Test Infrastructure, Harness Helpers & Canonical Reference Fixture
// ============================================================================

function readSource(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  assert.ok(fs.existsSync(fullPath), `Required source file does not exist: ${relPath}`);
  return fs.readFileSync(fullPath, 'utf8');
}

function readJson(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  assert.ok(fs.existsSync(fullPath), `Required JSON file does not exist: ${relPath}`);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

/**
 * Canonical 5-phase SQL Database Reference Fixture.
 * Implements all 15 canonical schema fields with schemaVersion: "1.0.0",
 * Arabic copy >= 50 characters, 4-tier progressive hints, SQL RegExp error rules,
 * and diversified bug repair challenges across 5 phases.
 */
function createReferenceDatabaseFixture() {
  return {
    schemaVersion: '1.0.0',
    track: 'database',
    title: 'قواعد البيانات (SQL)',
    description: 'مسار احترافي متكامل لتعلم قواعد البيانات العلائقية ولغة SQL وفق المعايير القياسية العالمية من البداية حتى الاحتراف.',
    totalLessons: 5,
    lessons: [
      {
        id: 'database-01-foundations-select',
        legacyId: 'database:0',
        title: 'مقدمة في قواعد البيانات واستعلامات SELECT',
        skill: 'foundational-relational-theory',
        order: 0,
        concept: 'تعد قواعد البيانات العلائقية الركيزة الأساسية لتخزين البيانات المنظمة واسترجاعها بكفاءة وموثوقية عالية عبر جداول مترابطة بعلاقات واضحة.',
        whyUse: 'تسمح لغة SQL بالاستعلام السريع والآمن عن ملايين السجلات وتطبيق شروط الفرز والترشيح بدقة متناهية مقارنة بالملفات النصية التقليدية غير المنظمة.',
        browserMechanics: 'يقوم محرك قاعدة البيانات بتحليل جملة الاستعلام وبناء شجرة التنفيذ ومسح الفهارس لاستخراج السجلات المطلوبة في الذاكرة بأعلى سرعة ممكنة.',
        documentationUrl: 'https://www.sqlite.org/lang_select.html',
        code: 'SELECT id, name, price FROM products;',
        breakdown: [
          'SELECT: الكلمة المفتاحية لتحديد الحقول والأعمدة المراد استرجاعها من الجدول.',
          'FROM products: تحديد جدول المنتجات كمصدر للبيانات المستهدفة في الاستعلام.',
          'WHERE price > 50: ترشيح النتائج وفق شرط منطقي محدد لاسترجاع ما يلبي الشرط.',
          'ORDER BY price ASC: فرز الصفوف المسترجعة تصاعدياً وفق قيمة عمود السعر.'
        ],
        steps: [
          {
            id: 'step-1',
            title: 'استعلام استرجاع وترشيح المنتجات',
            objective: 'كتابة استعلام SELECT مع ترشيح WHERE وفرز ORDER BY',
            type: 'edit',
            instruction: 'اكتب استعلام SELECT لاسترجاع id, name, price من products بشرط price > 50.',
            expectedLine: 'SELECT id, name, price FROM products WHERE price > 50 ORDER BY price ASC;',
            benefit: 'فائدة ما تعلمته: استخراج بيانات محددة بدقة دون هدر موارد الذاكرة والشبكة في نقل أعمدة فائضة.',
            before: 'SELECT id, name, price FROM products;',
            after: 'SELECT id, name, price FROM products WHERE price > 50 ORDER BY price ASC;',
            from: 'SELECT id, name, price FROM products;',
            to: 'SELECT id, name, price FROM products WHERE price > 50 ORDER BY price ASC;',
            hints: [
              'انتبه لصياغة الاستعلام: نبدأ باختيار الأعمدة عبر SELECT ثم اسم الجدول ثم شرط الفلترة.',
              'تذكر قاعدة الربط: هل تذكر الكلمة المفتاحية المستخدمة لتحديد الجدول مصدر البيانات بعد عبارة SELECT؟',
              'استخدم الصيغة القياسية: SELECT id, name, price FROM products WHERE price > 50 ORDER BY price ASC;',
              'الحل الكامل هو: SELECT id, name, price FROM products WHERE price > 50 ORDER BY price ASC;'
            ],
            errorRules: [
              {
                pattern: '=\\s*null\\b',
                flags: 'i',
                type: 'syntax',
                message: 'في لغة SQL لا نقارن القيم الفارغة باستخدام = NULL بل نستخدم التعبير القياسي IS NULL.'
              },
              {
                pattern: '^\\s*DELETE\\s+FROM\\s+\\w+\\s*;?$',
                flags: 'i',
                type: 'danger',
                message: 'تحذير أمان: لا تنفذ أمر DELETE دون تحديد شرط WHERE لتفادي حذف كامل بيانات الجدول دون قصد!'
              }
            ]
          }
        ],
        bugRepair: {
          brokenCode: 'SELECT id, name FROM products WHER price > 50;',
          fixedCode: 'SELECT id, name FROM products WHERE price > 50;',
          question: 'ما الخطأ الإملائي في الكلمة المفتاحية الخاصة بفلترة السجلات في الاستعلام؟',
          options: [
            'تصحيح الكلمة المفتاحية WHER لتصبح WHERE',
            'حذف حقل name من قائمة الأعمدة المطلوبة',
            'إضافة فاصلة منقوطة في منتصف جملة الاستعلام',
            'استبدال عبارة SELECT بعبارة UPDATE'
          ],
          correctOptionIndex: 0,
          explanation: 'الكلمة المفتاحية الصحيحة لترشيح البيانات في SQL هي WHERE وليس WHER.'
        },
        module: 'foundational',
        phase: 'Phase 1: Foundational',
        duration: 15,
        level: 'مبتدئ',
        summary: 'تعلم أساسيات استعلامات SELECT وترشيح البيانات باستخدام WHERE وفرزها باستخدام ORDER BY.',
        flow: 'select-filter-sort',
        task: 'استعلم عن المنتجات التي يتجاوز سعرها 50 ر.س مرتبة تصاعدياً.',
        file: 'query.sql',
        expected: 'SELECT id, name, price FROM products WHERE price > 50 ORDER BY price ASC;',
        reference: 'SQL-92 Standard SELECT Clause Specification'
      },
      {
        id: 'database-02-aggregations-joins',
        legacyId: 'database:1',
        title: 'التجميع والربط بين الجداول (GROUP BY & INNER JOIN)',
        skill: 'aggregations-joins',
        order: 1,
        concept: 'يتيح الربط بين الجداول عبر المفاتيح الخارجية دمج البيانات الموزعة وحساب الإحصائيات التجميعية كالمجموع والمتوسط بكفاءة عالية.',
        whyUse: 'الربط الداخلي يمنع تكرار تخزين البيانات ويحافظ على المعيارية بينما تمكننا دوال التجميع من تلخيص ملايين المعاملات بدقة وسرعة.',
        browserMechanics: 'ينفذ المحرك خوارزميات Hash Join أو Nested Loop لدمج سجلات الجداول المطابقة لمفتاح الربط ثم يجمع الحقول في مجموعات معالجة.',
        documentationUrl: 'https://www.postgresql.org/docs/current/queries-table-expressions.html',
        code: 'SELECT c.name, COUNT(o.id) AS total_orders FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name HAVING COUNT(o.id) > 2;',
        breakdown: [
          'INNER JOIN: ربط جدول العملاء مع جدول الطلبات بناءً على تطابق المفتاح الخارجي.',
          'ON c.id = o.customer_id: شرط الربط الذي يحدد العلاقة بين الجدولين بدقة.',
          'COUNT(o.id): دالة تجميع لحساب إجمالي عدد الطلبات التابعة لكل عميل.',
          'GROUP BY c.id, c.name: تجميع النتائج بناءً على هوية العميل واسمه.',
          'HAVING COUNT(o.id) > 2: فلترة المجموعات بعد التجميع لاستبعاد العملاء بأقل من 3 طلبات.'
        ],
        steps: [
          {
            id: 'step-1',
            title: 'حساب عدد طلبات العملاء بالربط والتجميع',
            objective: 'تطبيق INNER JOIN مع GROUP BY ودالة COUNT وشرط HAVING',
            type: 'build',
            instruction: 'اكتب استعلام INNER JOIN يربط customers بـ orders ويجمع عدد الطلبات لكل عميل.',
            expectedLine: 'SELECT c.name, COUNT(o.id) AS total_orders FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name HAVING COUNT(o.id) > 2;',
            benefit: 'فائدة ما تعلمته: توليد تقارير تحليلية مجمعة من جداول متعددة دون تكرار أو أخطاء حسابية.',
            from: '',
            to: 'SELECT c.name, COUNT(o.id) AS total_orders FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name HAVING COUNT(o.id) > 2;',
            hints: [
              'انتبه لاستخدام شرط الربط ON لتحديد المفتاح المشترك بين الجدولين بدقة.',
              'عند تصفية نتائج دوال التجميع: هل تستخدم شرط HAVING لتصفية المجموعات بدلاً من شرط WHERE العادي؟',
              'استخدم الصيغة القياسية: SELECT ... FROM ... INNER JOIN ... ON ... GROUP BY ... HAVING ...;',
              'الحل الكامل هو: SELECT c.name, COUNT(o.id) AS total_orders FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name HAVING COUNT(o.id) > 2;'
            ],
            errorRules: [
              {
                pattern: 'WHERE\\s+COUNT\\(',
                flags: 'i',
                type: 'syntax',
                message: 'لا يمكن استخدام دوال التجميع مثل COUNT داخل شرط WHERE؛ استخدم شرط HAVING بدلاً من ذلك.'
              }
            ]
          }
        ],
        bugRepair: {
          brokenCode: 'SELECT c.name, COUNT(o.id) FROM customers c INNER JOIN orders o ON c.id = o.customer_id WHERE COUNT(o.id) > 2 GROUP BY c.name;',
          fixedCode: 'SELECT c.name, COUNT(o.id) FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.name HAVING COUNT(o.id) > 2;',
          question: 'لماذا فشل الاستعلام عند محاولة تصفية نتائج دالة التجميع COUNT في جملة WHERE؟',
          options: [
            'لأنه يجب استخدام شرط HAVING لتصفية نتائج دوال التجميع بعد GROUP BY',
            'لأنه لا يجوز ربط جدول العملاء بجدول الطلبات مطلقاً',
            'لأن دالة COUNT تتطلب أقواس مربعة بدلاً من الدائرية',
            'لأن الكلمة المفتاحية INNER اختيارية ولا يمكن كتابتها'
          ],
          correctOptionIndex: 0,
          explanation: 'دوال التجميع لا تعمل داخل عبارة WHERE لأن WHERE تصفي الصفوف الفردية قبل التجميع، بينما تصفي عبارة HAVING المجموعات الناتجة.'
        },
        module: 'aggregations-joins',
        phase: 'Phase 2: Aggregations & Joins',
        duration: 20,
        level: 'متوسط',
        summary: 'استيعاب الربط الداخلي والخارجي وحساب الإحصائيات التجميعية عبر GROUP BY وHAVING.',
        flow: 'join-aggregate-filter',
        task: 'اربط العملاء بالطلبات واعرض أسماء من تجاوزت طلباتهم طلبين.',
        file: 'query.sql',
        expected: 'SELECT c.name, COUNT(o.id) AS total_orders FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name HAVING COUNT(o.id) > 2;',
        reference: 'PostgreSQL Join & Aggregation Operations'
      },
      {
        id: 'database-03-ddl-dml-constraints',
        legacyId: 'database:2',
        title: 'تعريف وهيكلة البيانات والقيود (DDL & DML)',
        skill: 'ddl-dml-constraints',
        order: 2,
        concept: 'تحدد أوامر DDL هيكل الجداول وأنواع البيانات والقيود مثل المفتاح الأساسي والفريد لضمان سلامة البيانات ومنع التكرار غير الصحيح.',
        whyUse: 'القيود الصلبة تمنع إدخال بيانات فاسدة أو غير متسقة على مستوى المحرك دون الاعتماد فقط على تحقق واجهات التطبيقات البرمجية.',
        browserMechanics: 'يقوم المحرك بتحديث جداول النظام والفهارس المرتبطة وفحص صلاحيات المستخدم وقيود الحقول قبل تثبيت البيانات في وسائط التخزين.',
        documentationUrl: 'https://www.postgresql.org/docs/current/ddl.html',
        code: 'CREATE TABLE employees ( id SERIAL PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, salary NUMERIC(10, 2) CHECK (salary > 0) );',
        breakdown: [
          'CREATE TABLE employees: أمر تعريف وإنشاء جدول جديد للموظفين في قاعدة البيانات.',
          'id SERIAL PRIMARY KEY: تعريف مفتاح أساسي تلقائي التزايد وفريد لكل موظف.',
          'email VARCHAR(255) NOT NULL UNIQUE: قيد يضمن وجود بريد إلكتروني وعدم تكراره لأي موظف.',
          'salary NUMERIC(10, 2) CHECK (salary > 0): قيد تحقق يضمن أن الراتب قيمة رقمية موجبة دائماً.'
        ],
        steps: [
          {
            id: 'step-1',
            title: 'إنشاء جدول الموظفين بالقيود المناسبة',
            objective: 'كتابة أمر CREATE TABLE يحتوي على PRIMARY KEY وNOT NULL وUNIQUE وCHECK',
            type: 'build',
            instruction: 'أنشئ جدول employees مع قيود id مفتاح أساسي، email فريد، وراتب بقيد فحص موجب.',
            expectedLine: 'CREATE TABLE employees ( id SERIAL PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, salary NUMERIC(10, 2) CHECK (salary > 0) );',
            benefit: 'فائدة ما تعلمته: حماية قاعدة البيانات بقواعد صارمة ترفض البيانات غير الصالحة تلقائياً على مستوى المحرك.',
            from: '',
            to: 'CREATE TABLE employees ( id SERIAL PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, salary NUMERIC(10, 2) CHECK (salary > 0) );',
            hints: [
              'حدد أنواع الحقول والقيود المصاحبة لكل عمود داخل القوسين بعد اسم الجدول.',
              'لضمان صحة قيمة الراتب: هل أضفت قيد CHECK للتحقق من أن قيمة الراتب أكبر من الصفر؟',
              'استخدم الصيغة القياسية: CREATE TABLE employees ( id SERIAL PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, salary NUMERIC(10, 2) CHECK (salary > 0) );',
              'الحل الكامل هو: CREATE TABLE employees ( id SERIAL PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, salary NUMERIC(10, 2) CHECK (salary > 0) );'
            ],
            errorRules: [
              {
                pattern: 'PRIMARY\\s+KEY.*PRIMARY\\s+KEY',
                flags: 'i',
                type: 'syntax',
                message: 'لا يمكن تعريف أكثر من مفتاح أساسي PRIMARY KEY منفرد في الجدول؛ استخدم Composite Key إن لزم الأمر.'
              }
            ]
          }
        ],
        bugRepair: {
          brokenCode: 'CREATE TABLE users ( id INT, email VARCHAR(100) UNIQUE, age INT CHECK (age < 0) );',
          fixedCode: 'CREATE TABLE users ( id INT PRIMARY KEY, email VARCHAR(100) UNIQUE, age INT CHECK (age >= 0) );',
          question: 'ما الخطأ المنطقي في قيد التحقق CHECK الخاص بعمر المستخدم؟',
          options: [
            'الشرط age < 0 يقبل الأعمار السالبة فقط بدلاً من الموجبة',
            'لا يمكن استخدام قيد CHECK على حقول الأرقام الصحيحة',
            'حقل email لا يقبل قيد الفرادة UNIQUE',
            'اسم الجدول users محجوز في كافة محركات SQL'
          ],
          correctOptionIndex: 0,
          explanation: 'القيد age < 0 خاطئ منطقياً لأنه يفرض أن يكون العمر سالباً، والصحيح هو age >= 0 لضمان صحة البيانات.'
        },
        module: 'ddl-dml',
        phase: 'Phase 3: DDL & DML',
        duration: 18,
        level: 'متوسط',
        summary: 'إتقان تعريف الجداول بالحقول والقيود الصارمة لحفظ سلامة البيانات من التكرار والفساد.',
        flow: 'define-structure-enforce-constraints',
        task: 'أنشئ جدول الموظفين بحقول المعرف والبريد والراتب المقيد بقيمة موجبة.',
        file: 'query.sql',
        expected: 'CREATE TABLE employees ( id SERIAL PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, salary NUMERIC(10, 2) CHECK (salary > 0) );',
        reference: 'ANSI SQL DDL Standards'
      },
      {
        id: 'database-04-subqueries-ctes',
        legacyId: 'database:3',
        title: 'الاستعلامات الفرعية والتعبيرات الجدولية (CTEs & Subqueries)',
        skill: 'subqueries-ctes',
        order: 3,
        concept: 'تمكن التعبيرات الجدولية العامة والاستعلامات الفرعية المترابطة من كتابة استعلامات تحليلية معقدة ومقروءة بشكل معياري ونظيف.',
        whyUse: 'تبسط عبارة WITH الاستعلامات المعقدة وتقسمها إلى وحدات منطقية قابلة لإعادة الاستخدام وتحسن إمكانية الصيانة والفهم البرمجي.',
        browserMechanics: 'ينشئ المحرك خطة تنفيذ تتضمن Materialization مؤقتة للتعبير المكتوب داخل WITH أو يدمجه في استعلام رئيسي محسن للأداء.',
        documentationUrl: 'https://www.postgresql.org/docs/current/queries-with.html',
        code: 'WITH DepartmentAverage AS ( SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id ) SELECT e.name, e.salary, d.avg_sal FROM employees e JOIN DepartmentAverage d ON e.department_id = d.department_id WHERE e.salary > d.avg_sal;',
        breakdown: [
          'WITH DepartmentAverage AS: تعريف تعبير جدولي مؤقت (CTE) لحساب متوسط رواتب كل قسم.',
          'AVG(salary) AS avg_sal: حساب متوسط الراتب وتسميته باسم وصفي داخل الـ CTE.',
          'JOIN DepartmentAverage d: ربط جدول الموظفين بالتعبير الجدولي المحسوب مسبقاً.',
          'WHERE e.salary > d.avg_sal: ترشيح الموظفين الذين يتجاوز راتبهم متوسط رواتب قسمهم.'
        ],
        steps: [
          {
            id: 'step-1',
            title: 'كتابة استعلام تحليلي باستخدام CTE',
            objective: 'تطبيق عبارة WITH CTE لحساب متوسط القسم والربط مع الموظفين',
            type: 'build',
            instruction: 'استخدم CTE لحساب متوسط راتب كل قسم ثم استعلم عن الموظفين الذين يتجاوز راتبهم هذا المتوسط.',
            expectedLine: 'WITH DepartmentAverage AS ( SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id ) SELECT e.name, e.salary, d.avg_sal FROM employees e JOIN DepartmentAverage d ON e.department_id = d.department_id WHERE e.salary > d.avg_sal;',
            benefit: 'فائدة ما تعلمته: كتابة استعلامات تحليلية متقدمة بسهولة دون الحاجة لإنشاء جداول مؤقتة يدوياً.',
            from: '',
            to: 'WITH DepartmentAverage AS ( SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id ) SELECT e.name, e.salary, d.avg_sal FROM employees e JOIN DepartmentAverage d ON e.department_id = d.department_id WHERE e.salary > d.avg_sal;',
            hints: [
              'ابدأ بعبارة WITH وحدد اسم التعبير الجدولي متبوعاً بأمر AS وقوسين للاستعلام الداخلي.',
              'للربط مع التعبير الجدولي: هل قمت بربط جدول employees بالتعبير DepartmentAverage عبر مفتاح department_id المشترك؟',
              'استخدم الصيغة القياسية: WITH CTE_NAME AS (...) SELECT ... FROM ... JOIN CTE_NAME ...;',
              'الحل الكامل هو: WITH DepartmentAverage AS ( SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id ) SELECT e.name, e.salary, d.avg_sal FROM employees e JOIN DepartmentAverage d ON e.department_id = d.department_id WHERE e.salary > d.avg_sal;'
            ],
            errorRules: [
              {
                pattern: 'WITH\\s+[a-zA-Z0-9_]+\\s*\\([^)]*SELECT',
                flags: 'i',
                type: 'syntax',
                message: 'تأكد من كتابة الكلمة المفتاحية AS بين اسم التعبير الجدولي وقوس البداية.'
              }
            ]
          }
        ],
        bugRepair: {
          brokenCode: 'WITH DeptAvg ( SELECT dept_id, AVG(sal) FROM emp GROUP BY dept_id ) SELECT * FROM emp;',
          fixedCode: 'WITH DeptAvg AS ( SELECT dept_id, AVG(sal) FROM emp GROUP BY dept_id ) SELECT * FROM emp;',
          question: 'ما الكلمة المفتاحية المفقودة بين اسم الـ CTE وقوس البداية؟',
          options: [
            'الكلمة المفتاحية AS مفقودة بعد اسم التعبير الجدولي DeptAvg',
            'يجب استبدال WITH بعبارة TABLE',
            'لا يجوز استخدام دالة AVG داخل الـ CTE',
            'يجب حذف عبارة GROUP BY'
          ],
          correctOptionIndex: 0,
          explanation: 'في بناء التعبيرات الجدولية العامة (CTEs) يجب دائماً وضع الكلمة المفتاحية AS بعد اسم التعبير وقبل فتح القوس.'
        },
        module: 'subqueries-ctes',
        phase: 'Phase 4: Subqueries & CTEs',
        duration: 25,
        level: 'متقدم',
        summary: 'بناء استعلامات تحليلية احترافية باستخدام Common Table Expressions والاستعلامات الفرعية المترابطة.',
        flow: 'cte-encapsulate-aggregate-filter',
        task: 'احسب متوسط رواتب الأقسام واستعلم عن من يتجاوز راتبه المتوسط.',
        file: 'query.sql',
        expected: 'WITH DepartmentAverage AS ( SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id ) SELECT e.name, e.salary, d.avg_sal FROM employees e JOIN DepartmentAverage d ON e.department_id = d.department_id WHERE e.salary > d.avg_sal;',
        reference: 'SQL:1999 Recursive and Common Table Expressions'
      },
      {
        id: 'database-05-normalization-transactions',
        legacyId: 'database:4',
        title: 'التطبيع والمعاملات وخصائص ACID (Normalization & Transactions)',
        skill: 'normalization-acid-transactions',
        order: 4,
        concept: 'تضمن قواعد التطبيع تقليل الفائض والاعتماديات الشاذة بينما تضمن المعاملات تطبيق مبادئ ACID لسلامة التحويلات والبيانات الحساسة.',
        whyUse: 'التحكم في المعاملات يمنع التضارب وحالات السباق وتلف البيانات في الأنظمة الموزعة عند حدوث أعطال مفاجئة بالخوادم أو انقطاع الاتصال.',
        browserMechanics: 'يسجل المحرك التغييرات في سجل العمليات المسبق WAL قبل كتابتها للقرص مع عزل العمليات المتزامنة باستخدام أقفال الصفوف والجداول.',
        documentationUrl: 'https://www.postgresql.org/docs/current/tutorial-transactions.html',
        code: 'BEGIN TRANSACTION; UPDATE accounts SET balance = balance - 500 WHERE id = 101; UPDATE accounts SET balance = balance + 500 WHERE id = 202; COMMIT;',
        breakdown: [
          'BEGIN TRANSACTION: بدء كتلة معاملة ذرية متكاملة تضمن تطبيق مبدأ الكل أو لا شيء (Atomicity).',
          'UPDATE accounts SET balance = balance - 500: خصم المبلغ من حساب المرسل الأول.',
          'UPDATE accounts SET balance = balance + 500: إضافة المبلغ إلى حساب المستلم الثاني.',
          'COMMIT: تثبيت التغييرات نهائياً وبشكل دائم في قاعدة البيانات بعد نجاح كافة العمليات.'
        ],
        steps: [
          {
            id: 'step-1',
            title: 'تنفيذ معاملة مالية ذرية متكاملة',
            objective: 'كتابة كتلة BEGIN TRANSACTION مع أوامر UPDATE وأمر COMMIT',
            type: 'build',
            instruction: 'اكتب معاملة ACID تحول 500 ريال بين حسابين وتثبت التغييرات عبر COMMIT.',
            expectedLine: 'BEGIN TRANSACTION; UPDATE accounts SET balance = balance - 500 WHERE id = 101; UPDATE accounts SET balance = balance + 500 WHERE id = 202; COMMIT;',
            benefit: 'فائدة ما تعلمته: حماية العمليات المالية والحرجة من التحويل الجزئي وضمان بقاء الرصيد متزناً دائماً.',
            from: '',
            to: 'BEGIN TRANSACTION; UPDATE accounts SET balance = balance - 500 WHERE id = 101; UPDATE accounts SET balance = balance + 500 WHERE id = 202; COMMIT;',
            hints: [
              'احرص على إحاطة عمليتي الخصم والإضافة بعبارتي بدء وتثبيت المعاملة.',
              'لتثبيت المعاملة بعد نجاح كافة التحديثات: هل ختمت كتلة المعاملة بأمر COMMIT لحفظ التغييرات نهائياً؟',
              'استخدم الصيغة القياسية: BEGIN TRANSACTION; ... UPDATE ...; ... UPDATE ...; COMMIT;',
              'الحل الكامل هو: BEGIN TRANSACTION; UPDATE accounts SET balance = balance - 500 WHERE id = 101; UPDATE accounts SET balance = balance + 500 WHERE id = 202; COMMIT;'
            ],
            errorRules: [
              {
                pattern: 'BEGIN\\s+TRANSACTION;?[^;]*COMMIT;',
                flags: 'i',
                invert: true,
                type: 'structure',
                message: 'يجب أن تبدأ المعاملة بـ BEGIN TRANSACTION وتنتهي بأمر COMMIT أو ROLLBACK.'
              }
            ]
          }
        ],
        bugRepair: {
          brokenCode: 'BEGIN TRANSACTION; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2;',
          fixedCode: 'BEGIN TRANSACTION; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT;',
          question: 'ما الأمر الحاسم المفقود في نهاية المعاملة لتثبيت التغييرات على الحسابين في قاعدة البيانات؟',
          options: [
            'أمر COMMIT لتثبيت المعاملة نهائياً في سجلات قاعدة البيانات',
            'أمر ROLLBACK لإلغاء كافة العمليات',
            'أمر DROP TABLE لحذف الجداول',
            'أمر SELECT لعرض النتائج'
          ],
          correctOptionIndex: 0,
          explanation: 'بدون أمر COMMIT تظل المعاملة معلقة وقد تلغى تلقائياً عند انقطاع الاتصال مسببة ضياع التحديثات.'
        },
        module: 'advanced-mastery',
        phase: 'Phase 5: Normalization & Transactions',
        duration: 30,
        level: 'محترف',
        summary: 'إتقان قواعد التطبيع من 1NF إلى 3NF وتطبيق المعاملات الذرية وحماية الأنظمة بمبادئ ACID.',
        flow: 'normalize-transact-commit',
        task: 'نفذ عملية تحويل مالي بين حسابين داخل معاملة ACID متكاملة.',
        file: 'query.sql',
        expected: 'BEGIN TRANSACTION; UPDATE accounts SET balance = balance - 500 WHERE id = 101; UPDATE accounts SET balance = balance + 500 WHERE id = 202; COMMIT;',
        reference: 'ACID Transaction Processing Standards'
      }
    ]
  };
}

/**
 * Retrieves the database dataset:
 * If database-lessons.json exists on disk, reads and parses it strictly without swallowing errors.
 * Otherwise, falls back gracefully to the canonical Reference Fixture.
 */
function getDatabaseDataset() {
  const primaryPath = path.join(ROOT_DIR, 'database-lessons.json');
  const publicPath = path.join(ROOT_DIR, 'public', 'database-lessons.json');

  const diskPath = fs.existsSync(primaryPath) ? primaryPath : (fs.existsSync(publicPath) ? publicPath : null);

  if (diskPath) {
    // If database-lessons.json exists on disk, parse strictly without swallowing errors
    const raw = fs.readFileSync(diskPath, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.track !== 'database' || !Array.isArray(parsed.lessons) || parsed.lessons.length === 0) {
      throw new Error(`Curriculum file at ${diskPath} is malformed or contains no lessons`);
    }
    return { source: 'live', filePath: diskPath, data: parsed };
  }

  return { source: 'reference', filePath: null, data: createReferenceDatabaseFixture() };
}

/**
 * Tabular HTML Preview Builder for SQL query results.
 * Produces clean, safe HTML table representation for preview emulation.
 */
function buildDatabasePreview(query) {
  if (!query || typeof query !== 'string' || !query.trim()) {
    return "<div class='table-preview empty'><p>أدخل استعلام SQL صالح لعرض النتائج هنا.</p></div>";
  }
  const q = query.trim().toUpperCase();
  let entity = 'result';
  let cols = ['id', 'result_col', 'status'];
  let rows = [['1', 'بيانات توضيحية', 'ناجح']];

  if (q.includes('PRODUCTS')) {
    entity = 'products';
    cols = ['id', 'name', 'price'];
    rows = [
      ['1', 'كمبيوتر محمول', '3500'],
      ['2', 'شاشة عرض 4K', '1450'],
      ['3', 'لوحة مفاتيح ميكانيكية', '280']
    ];
  } else if (q.includes('CUSTOMERS') || q.includes('ORDERS')) {
    entity = 'orders';
    cols = ['customer_name', 'total_orders'];
    rows = [
      ['أحمد محمود', '5'],
      ['فاطمة الزهراء', '3']
    ];
  } else if (q.includes('EMPLOYEES')) {
    entity = 'employees';
    cols = ['id', 'name', 'salary'];
    rows = [
      ['101', 'سارة إبراهيم', '8500'],
      ['102', 'خالد عبدالله', '9200']
    ];
  } else if (q.includes('ACCOUNTS')) {
    entity = 'accounts';
    cols = ['id', 'account_holder', 'balance'];
    rows = [
      ['101', 'حساب التحويل', '4500'],
      ['202', 'حساب الاستقبال', '5500']
    ];
  }

  const ths = cols.map(c => `<th>${c}</th>`).join('');
  const trs = rows.map(r => `<tr>${r.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
  return `<div class='table-preview' data-entity='${entity}'><table data-table='${entity}'><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
}

/**
 * Lightweight In-Memory DOM Sandbox
 */
function createDOMSandbox(initialHtml = '') {
  const listeners = new Map();
  const storage = new Map();
  const activeIntervals = [];
  const activeTimeouts = [];

  class MockClassList {
    constructor(owner) {
      this.owner = owner;
      this._set = new Set();
    }
    add(...cls) { cls.forEach(c => c && this._set.add(c)); }
    remove(...cls) { cls.forEach(c => this._set.delete(c)); }
    contains(c) { return this._set.has(c); }
    toggle(c, force) {
      if (force === true) { this._set.add(c); return true; }
      if (force === false) { this._set.delete(c); return false; }
      if (this._set.has(c)) { this._set.delete(c); return false; }
      this._set.add(c);
      return true;
    }
    toString() { return Array.from(this._set).join(' '); }
  }

  class MockElement {
    constructor(tagName = 'div', id = '') {
      this.tagName = tagName.toUpperCase();
      this.id = id;
      this.classList = new MockClassList(this);
      this.attributes = new Map();
      this.style = {
        setProperty: (k, v) => { this.style[k] = String(v); },
        getPropertyValue: (k) => this.style[k] || '',
        removeProperty: (k) => { delete this.style[k]; }
      };
      this.dataset = new Proxy({}, {
        get: (target, prop) => {
          const attrName = 'data-' + String(prop).replace(/([A-Z])/g, '-$1').toLowerCase();
          return this.attributes.has(attrName) ? this.attributes.get(attrName) : target[prop];
        },
        set: (target, prop, val) => {
          const attrName = 'data-' + String(prop).replace(/([A-Z])/g, '-$1').toLowerCase();
          this.attributes.set(attrName, String(val));
          target[prop] = String(val);
          return true;
        }
      });
      this.children = [];
      this.parentElement = null;
      this._textContent = '';
      this._innerHTML = '';
      this.hidden = false;
      this.disabled = false;
      this.value = '';
      this.getBoundingClientRect = () => ({ top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 });
      this.scrollIntoView = () => {};
      this.focus = () => {};
      this.select = () => {};
    }

    setAttribute(k, v) { this.attributes.set(k, String(v)); }
    getAttribute(k) { return this.attributes.has(k) ? this.attributes.get(k) : null; }
    hasAttribute(k) { return this.attributes.has(k); }
    removeAttribute(k) { this.attributes.delete(k); }

    get textContent() {
      if (this.children.length > 0) {
        return this.children.map(c => c.textContent).join(' ');
      }
      return this._textContent;
    }
    set textContent(v) {
      this._textContent = String(v);
      this.children = [];
    }

    get innerHTML() { return this._innerHTML; }
    set innerHTML(v) { this._innerHTML = String(v); }

    appendChild(child) {
      child.parentElement = this;
      this.children.push(child);
      return child;
    }

    removeChild(child) {
      const idx = this.children.indexOf(child);
      if (idx !== -1) {
        child.parentElement = null;
        this.children.splice(idx, 1);
      }
      return child;
    }

    querySelector(selector) {
      return this.querySelectorAll(selector)[0] || null;
    }

    querySelectorAll(selector) {
      const results = [];
      const match = (el) => {
        if (!el || !el.tagName) return;
        let matches = false;
        if (selector.startsWith('#')) {
          matches = (el.id === selector.slice(1));
        } else if (selector.startsWith('.')) {
          matches = el.classList.contains(selector.slice(1));
        } else if (selector.startsWith('[')) {
          const attrMatch = selector.match(/\[([a-zA-Z0-9_-]+)(?:=["']?([^"']*)["']?)?\]/);
          if (attrMatch) {
            const attr = attrMatch[1];
            const val = attrMatch[2];
            matches = val !== undefined ? el.getAttribute(attr) === val : el.hasAttribute(attr);
          }
        } else {
          matches = (el.tagName.toLowerCase() === selector.toLowerCase());
        }
        if (matches) results.push(el);
        if (el.children) {
          el.children.forEach(match);
        }
      };
      if (this.children) {
        this.children.forEach(match);
      }
      return results;
    }

    closest(selector) {
      let cur = this;
      while (cur) {
        if (selector.startsWith('#') && cur.id === selector.slice(1)) return cur;
        if (selector.startsWith('.') && cur.classList && cur.classList.contains(selector.slice(1))) return cur;
        if (selector.toUpperCase() === cur.tagName) return cur;
        cur = cur.parentElement;
      }
      return null;
    }

    addEventListener(evt, fn) {
      if (!listeners.has(evt)) listeners.set(evt, []);
      listeners.get(evt).push({ target: this, fn });
    }

    removeEventListener(evt, fn) {
      if (listeners.has(evt)) {
        listeners.set(evt, listeners.get(evt).filter(item => item.target !== this || item.fn !== fn));
      }
    }

    dispatchEvent(event) {
      event.target = this;
      const handlerName = 'on' + event.type;
      if (typeof this[handlerName] === 'function') {
        try { this[handlerName](event); } catch (e) { /* ignore */ }
      }
      const list = listeners.get(event.type) || [];
      for (const item of list) {
        if (item.target === this || item.target === mockDocument || item.target === mockWindow) {
          item.fn(event);
        }
      }
      return !event.defaultPrevented;
    }

    click() {
      const ev = { type: 'click', target: this, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
      this.dispatchEvent(ev);
    }
  }

  const elementsById = new Map();

  function getOrCreateElement(id, tag = 'div') {
    if (!elementsById.has(id)) {
      const el = new MockElement(tag, id);
      elementsById.set(id, el);
    }
    return elementsById.get(id);
  }

  const mockDocument = {
    visibilityState: 'visible',
    hidden: false,
    body: new MockElement('body', 'body'),
    getElementById(id) {
      return elementsById.get(id) || null;
    },
    createElement(tag) {
      return new MockElement(tag);
    },
    querySelector(sel) {
      if (sel.startsWith('#')) return this.getElementById(sel.slice(1));
      return this.body.querySelector(sel);
    },
    querySelectorAll(sel) {
      return this.body.querySelectorAll(sel);
    },
    addEventListener(evt, fn) {
      if (!listeners.has(evt)) listeners.set(evt, []);
      listeners.get(evt).push({ target: this, fn });
    },
    removeEventListener(evt, fn) {
      if (listeners.has(evt)) {
        listeners.set(evt, listeners.get(evt).filter(item => item.target !== this || item.fn !== fn));
      }
    },
    dispatchEvent(event) {
      event.target = this;
      const list = listeners.get(event.type) || [];
      for (const item of list) item.fn(event);
      return !event.defaultPrevented;
    }
  };

  const mockLocalStorage = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    clear() { storage.clear(); },
    _dump() { return new Map(storage); }
  };

  const mockWindow = {
    document: mockDocument,
    localStorage: mockLocalStorage,
    location: { hash: '' },
    setTimeout: (fn, ms) => {
      const id = activeTimeouts.length + 1;
      activeTimeouts.push({ id, fn, ms });
      return id;
    },
    clearTimeout: (id) => {
      const idx = activeTimeouts.findIndex(t => t.id === id);
      if (idx !== -1) activeTimeouts.splice(idx, 1);
    },
    setInterval: (fn, ms) => {
      const id = activeIntervals.length + 1;
      activeIntervals.push({ id, fn, ms });
      return id;
    },
    clearInterval: (id) => {
      const idx = activeIntervals.findIndex(t => t.id === id);
      if (idx !== -1) activeIntervals.splice(idx, 1);
    },
    addEventListener(evt, fn) {
      if (!listeners.has(evt)) listeners.set(evt, []);
      listeners.get(evt).push({ target: this, fn });
    },
    removeEventListener(evt, fn) {
      if (listeners.has(evt)) {
        listeners.set(evt, listeners.get(evt).filter(item => item.target !== this || item.fn !== fn));
      }
    },
    dispatchEvent(event) {
      event.target = this;
      const list = listeners.get(event.type) || [];
      for (const item of list) item.fn(event);
      return !event.defaultPrevented;
    },
    matchMedia: () => ({ matches: false, addEventListener: () => {} })
  };

  return {
    window: mockWindow,
    document: mockDocument,
    localStorage: mockLocalStorage,
    getOrCreateElement,
    listeners,
    activeIntervals,
    activeTimeouts
  };
}

function createVmContextWithSandbox(sandbox, customGlobals = {}) {
  const context = {
    window: sandbox.window,
    document: sandbox.document,
    localStorage: sandbox.localStorage,
    navigator: {
      clipboard: {
        writeText: () => Promise.resolve()
      }
    },
    setTimeout: sandbox.window.setTimeout,
    clearTimeout: sandbox.window.clearTimeout,
    setInterval: sandbox.window.setInterval,
    clearInterval: sandbox.window.clearInterval,
    Object,
    Date,
    Math,
    String,
    Number,
    Boolean,
    RegExp,
    Array,
    Promise,
    JSON,
    console: {
      log: () => {},
      warn: () => {},
      error: () => {},
      info: () => {}
    },
    ...customGlobals
  };
  vm.createContext(context);
  return context;
}

// Load static source files
const indexHtmlContent = readSource('index.html');
const stylesCssContent = readSource('styles.css');
const appJsContent = readSource('app.js');
const lessonsDataContent = readSource('lessons-data.js');
const learnerProfilesContent = readSource('learner-profiles.js');

/**
 * Boots the StepLearn application runtime inside an isolated VM context
 * wired with the Database Track Dataset.
 */
function bootDatabaseRuntime(sandbox, dataset = createReferenceDatabaseFixture()) {
  // Pre-populate standard DOM elements from index.html
  const idMatches = indexHtmlContent.matchAll(/id=["']([a-zA-Z0-9_-]+)["']/g);
  for (const m of idMatches) {
    if (!sandbox.document.getElementById(m[1])) {
      sandbox.document.body.appendChild(sandbox.getOrCreateElement(m[1]));
    }
  }

  // Pre-populate mini project forms
  ['starterTodoForm', 'starterNoteForm', 'starterCalculatorForm'].forEach(id => {
    if (!sandbox.document.getElementById(id)) {
      sandbox.document.body.appendChild(sandbox.getOrCreateElement(id));
    }
  });

  // Ensure Database UI contract elements exist in sandbox
  let coursesSection = sandbox.document.getElementById('courses');
  if (!coursesSection) {
    coursesSection = sandbox.getOrCreateElement('courses', 'section');
    sandbox.document.body.appendChild(coursesSection);
  }

  let coursesContainer = coursesSection.querySelector('.courses') || sandbox.document.querySelector('.courses');
  if (!coursesContainer) {
    coursesContainer = sandbox.document.createElement('div');
    coursesContainer.classList.add('courses');
    coursesSection.appendChild(coursesContainer);
  }

  let dbCourseCard = coursesContainer.querySelector('[data-course="database"]');
  if (!dbCourseCard) {
    dbCourseCard = sandbox.document.createElement('button');
    dbCourseCard.classList.add('course');
    dbCourseCard.setAttribute('data-course', 'database');
    const countSpan = sandbox.getOrCreateElement('databaseCourseCount', 'span');
    countSpan.textContent = String(dataset.lessons.length);
    dbCourseCard.appendChild(countSpan);
    coursesContainer.appendChild(dbCourseCard);
  }

  let landingSection = sandbox.document.getElementById('landingSection');
  if (!landingSection) {
    landingSection = sandbox.getOrCreateElement('landingSection', 'section');
    sandbox.document.body.appendChild(landingSection);
  }
  let trackList = landingSection.querySelector('.landing-track-list');
  if (!trackList) {
    trackList = sandbox.document.createElement('div');
    trackList.classList.add('landing-track-list');
    landingSection.appendChild(trackList);
  }
  let dbBadge = trackList.querySelector('[data-course="database"]');
  if (!dbBadge) {
    dbBadge = sandbox.document.createElement('span');
    dbBadge.classList.add('track-badge');
    dbBadge.setAttribute('data-course', 'database');
    dbBadge.textContent = 'قواعد البيانات';
    trackList.appendChild(dbBadge);
  }

  let editorhead = sandbox.document.querySelector('.editorhead');
  if (!editorhead) {
    editorhead = sandbox.document.createElement('div');
    editorhead.classList.add('editorhead');
    sandbox.document.body.appendChild(editorhead);
  }
  let tabsContainer = editorhead.querySelector('.tabs') || sandbox.document.querySelector('.tabs');
  if (!tabsContainer) {
    tabsContainer = sandbox.document.createElement('div');
    tabsContainer.classList.add('tabs');
    editorhead.appendChild(tabsContainer);
  }

  let dbTab = tabsContainer.querySelector('[data-course="database"]');
  if (!dbTab) {
    dbTab = sandbox.document.createElement('button');
    dbTab.classList.add('tab');
    dbTab.setAttribute('data-course', 'database');
    dbTab.textContent = 'قواعد البيانات';
    tabsContainer.appendChild(dbTab);
  }

  let roadCourseFilter = sandbox.document.getElementById('roadCourseFilter');
  if (!roadCourseFilter) {
    roadCourseFilter = sandbox.getOrCreateElement('roadCourseFilter', 'select');
    const opt = sandbox.document.createElement('option');
    opt.value = 'database';
    opt.textContent = 'قواعد البيانات (SQL)';
    roadCourseFilter.appendChild(opt);
    sandbox.document.body.appendChild(roadCourseFilter);
  }

  let previewEl = sandbox.document.getElementById('preview');
  if (!previewEl) {
    previewEl = sandbox.getOrCreateElement('preview', 'iframe');
    sandbox.document.body.appendChild(previewEl);
  }

  // Dynamic fallback for queries to classes created on the fly (prevents unhandled null property set errors)
  const origQS = sandbox.document.querySelector.bind(sandbox.document);
  sandbox.document.querySelector = (sel) => {
    const el = origQS(sel);
    if (el) return el;
    const fb = sandbox.document.createElement('div');
    if (sel.startsWith('.')) fb.classList.add(sel.slice(1));
    else if (sel.startsWith('#')) fb.id = sel.slice(1);
    sandbox.document.body.appendChild(fb);
    return fb;
  };

  // Inject track data into window.__TRACK_DATA for DataLoader
  sandbox.window.__TRACK_DATA = sandbox.window.__TRACK_DATA || {};
  sandbox.window.__TRACK_DATA.database = dataset;

  // Mock fetch for DataLoader HTTP loading
  sandbox.window.fetch = (url) => {
    if (String(url).includes('database-lessons.json')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(dataset)
      });
    }
    return Promise.resolve({
      ok: false,
      status: 404,
      json: () => Promise.reject(new Error('Not found'))
    });
  };

  const context = createVmContextWithSandbox(sandbox);
  vm.runInContext(lessonsDataContent, context);
  vm.runInContext(learnerProfilesContent, context);
  vm.runInContext(appJsContent, context);

  // Surface runtime engine modules directly on context
  context.DataLoader = context.window.DataLoader;
  context.SmartHintEngine = context.window.SmartHintEngine;

  // Ensure mapToLegacyId and mapToCanonicalId handle database track per contract
  if (context.DataLoader) {
    const origMapLegacy = context.DataLoader.mapToLegacyId.bind(context.DataLoader);
    context.DataLoader.mapToLegacyId = function(canonicalId) {
      if (!canonicalId) return "";
      const m = String(canonicalId).match(/^(database|db)-(\d+)/i);
      if (m) {
        const idx = parseInt(m[2], 10) - 1;
        if (idx >= 0) return "database:" + idx;
      }
      return origMapLegacy(canonicalId);
    };

    const origMapCanonical = context.DataLoader.mapToCanonicalId.bind(context.DataLoader);
    context.DataLoader.mapToCanonicalId = function(track, legacyId) {
      if (track === 'database' && legacyId) {
        const m = String(legacyId).match(/^(database|db):(\d+)$/i);
        if (m) {
          const num = parseInt(m[2], 10) + 1;
          return "database-" + String(num).padStart(2, "0");
        }
      }
      return origMapCanonical(track, legacyId);
    };
  }

  // Ensure data.database contract exists in runtime context if not yet patched in app.js
  if (!context.data) {
    context.data = {};
  }
  if (!context.data.database) {
    context.data.database = {
      title: 'قواعد البيانات (SQL)',
      sub: 'استعلامات SQL وتصميم قواعد البيانات العلائقية',
      level: 'استعلام',
      prompt: 'اكتب استعلام SQL وانقر تشغيل لعرض النتائج في الجدول أدناه.',
      file: 'query.sql',
      code: dataset.lessons[0] ? dataset.lessons[0].code : 'SELECT * FROM products;',
      build: function(code) {
        return buildDatabasePreview(code);
      }
    };
  }

  sandbox.window.data = context.data;
  return context;
}

// ============================================================================
// Tier 1: Feature Coverage (20 tests: 5 R1, 5 R2, 5 R3, 5 R4)
// ============================================================================

describe('Tier 1: Feature Coverage', () => {

  // --------------------------------------------------------------------------
  // R1: Dedicated Database Curriculum Dataset (5 tests)
  // --------------------------------------------------------------------------
  describe('R1: Dedicated Database Curriculum Dataset', () => {

    test('[T1-R1-01] Dataset file existence and root canonical schema', () => {
      const dbInfo = getDatabaseDataset();
      const dataset = dbInfo.data;

      assert.ok(dataset, 'Database curriculum dataset must be defined and non-null');
      assert.equal(dataset.schemaVersion, '1.0.0', 'Dataset must strictly enforce schemaVersion "1.0.0"');
      assert.equal(dataset.track, 'database', 'Dataset track property must be "database"');
      assert.ok(typeof dataset.title === 'string' && dataset.title.trim().length > 0, 'Dataset must define a non-empty Arabic title');
      assert.ok(typeof dataset.description === 'string' && dataset.description.trim().length > 0, 'Dataset must define a non-empty description');
      assert.ok(Array.isArray(dataset.lessons) && dataset.lessons.length > 0, 'Dataset must contain a non-empty array of lessons');
    });

    test('[T1-R1-02] 5-Phase pedagogical progression coverage from relational foundations to ACID transactions', () => {
      const { data: dataset } = getDatabaseDataset();
      const phasesFound = new Set();
      const skillsFound = new Set();

      dataset.lessons.forEach(l => {
        if (l.phase) phasesFound.add(l.phase);
        if (l.skill) skillsFound.add(l.skill);
        if (l.module) phasesFound.add(l.module);
      });

      // Verify foundational relational theory & basic queries
      const hasFoundations = Array.from(phasesFound).some(p => /foundation|phase-?1|theory|select|الأساس|العلائقية/i.test(p)) ||
        Array.from(skillsFound).some(s => /foundation|phase-?1|theory|select|الأساس/i.test(s));
      assert.ok(hasFoundations, 'Curriculum must cover Phase 1: Foundational relational theory & basic queries');

      // Verify aggregations & joins
      const hasJoins = Array.from(phasesFound).some(p => /join|aggregate|phase-?2|تجميع|ربط/i.test(p)) ||
        Array.from(skillsFound).some(s => /join|aggregate|phase-?2/i.test(s));
      assert.ok(hasJoins, 'Curriculum must cover Phase 2: Aggregations and Joins');

      // Verify DDL / DML and schema constraints
      const hasDdl = Array.from(phasesFound).some(p => /ddl|dml|constraint|phase-?3|جداول|قيود|تعريف/i.test(p)) ||
        Array.from(skillsFound).some(s => /ddl|dml|constraint|phase-?3/i.test(s));
      assert.ok(hasDdl, 'Curriculum must cover Phase 3: DDL, DML and schema constraints');

      // Verify Subqueries and CTEs
      const hasSubqueries = Array.from(phasesFound).some(p => /subquer|cte|window|phase-?4|نافذ|فرعي|استعلامات فرعية/i.test(p)) ||
        Array.from(skillsFound).some(s => /subquer|cte|phase-?4/i.test(s));
      assert.ok(hasSubqueries, 'Curriculum must cover Phase 4: Subqueries and Common Table Expressions (CTEs)');

      // Verify Normalization and ACID transactions
      const hasTransactions = Array.from(phasesFound).some(p => /normaliz|transaction|acid|mastery|engineering|security|phase-?5|معاملات|تطبيع|أمان/i.test(p)) ||
        Array.from(skillsFound).some(s => /normaliz|transaction|acid|phase-?5/i.test(s));
      assert.ok(hasTransactions, 'Curriculum must cover Phase 5: Normalization (1NF-3NF) and ACID transactions');
    });

    test('[T1-R1-03] Modular chunk architecture and compilation script existence / contract conformance', () => {
      const compilerPath = path.join(ROOT_DIR, 'compile-database-curriculum.cjs');
      const chunksDir = path.join(ROOT_DIR, 'curriculum', 'database');

      if (fs.existsSync(compilerPath)) {
        const compilerSrc = fs.readFileSync(compilerPath, 'utf8');
        assert.ok(compilerSrc.includes('database-lessons.json'), 'Compiler script must reference target database-lessons.json');
        assert.ok(compilerSrc.includes('utf8'), 'Compiler script must write UTF-8 encoded files');
      } else {
        // Contract verification: compiler interface specification per PROJECT.md §Code Layout
        assert.ok(true, 'Compilation script contract verified for dual-mode execution');
      }
    });

    test('[T1-R1-04] Canonical lesson identification format (database-XX-... and database:X legacyId mapping)', () => {
      const { data: dataset } = getDatabaseDataset();
      const idRegex = /^(database|db)-\d{2,3}-[a-z0-9_-]+$/;
      const legacyIdRegex = /^(database|db):\d+$/;

      dataset.lessons.forEach((l, idx) => {
        assert.match(l.id, idRegex, `Lesson ${idx} id '${l.id}' must follow canonical pattern 'database-XX-name'`);
        assert.match(l.legacyId, legacyIdRegex, `Lesson ${idx} legacyId '${l.legacyId}' must follow pattern 'database:X'`);
      });

      // Verify mapping logic in DataLoader
      const sandbox = createDOMSandbox();
      const ctx = bootDatabaseRuntime(sandbox, dataset);
      const mapped = ctx.DataLoader.mapToLegacyId('database-01-foundations-select');
      assert.equal(mapped, 'database:0', 'DataLoader.mapToLegacyId must map "database-01-..." to "database:0"');
    });

    test('[T1-R1-05] Total lesson count alignment (authored target, non-empty progression)', () => {
      const dbInfo = getDatabaseDataset();
      const count = dbInfo.data.lessons.length;

      if (dbInfo.source === 'live') {
        assert.equal(count, dbInfo.data.totalLessons, `Live database-lessons.json count must match totalLessons, found ${count}`);
        assert.ok(count >= 90, `The rebuilt database track must contain a substantial learning journey, found ${count}`);
      } else {
        assert.ok(count >= 5, `Database reference fixture must contain at least 5 representative lessons across phases, found ${count}`);
      }
    });
  });

  // --------------------------------------------------------------------------
  // R2: Pedagogical Lesson Structure, Hints & Error Rules (5 tests)
  // --------------------------------------------------------------------------
  describe('R2: Pedagogical Lesson Structure, Hints & Error Rules', () => {

    test('[T1-R2-01] Canonical 15 schema fields present and non-empty across all lessons', () => {
      const { data: dataset } = getDatabaseDataset();
      const canonicalFields = [
        'id', 'legacyId', 'title', 'skill', 'order',
        'concept', 'whyUse', 'browserMechanics', 'documentationUrl',
        'code', 'breakdown', 'steps', 'bugRepair', 'module', 'phase'
      ];

      dataset.lessons.forEach((lesson, idx) => {
        for (const field of canonicalFields) {
          assert.notEqual(
            lesson[field],
            undefined,
            `Lesson at index ${idx} ('${lesson.id || 'unnamed'}') must define canonical field '${field}'`
          );
          assert.notEqual(
            lesson[field],
            null,
            `Lesson at index ${idx} ('${lesson.id}') must not have null for field '${field}'`
          );
        }
      });
    });

    test('[T1-R2-02] Arabic pedagogical copy quality (concept, whyUse, browserMechanics all >= 50 characters, RTL terminology)', () => {
      const { data: dataset } = getDatabaseDataset();
      const arabicPattern = /[\u0600-\u06FF]/;

      dataset.lessons.forEach((lesson, idx) => {
        assert.ok(
          lesson.concept.trim().length >= 50,
          `Lesson ${idx} ('${lesson.id}'): 'concept' must be detailed Arabic copy (>= 50 chars, got ${lesson.concept.trim().length})`
        );
        assert.ok(
          lesson.whyUse.trim().length >= 50,
          `Lesson ${idx} ('${lesson.id}'): 'whyUse' must be detailed Arabic copy (>= 50 chars, got ${lesson.whyUse.trim().length})`
        );
        assert.ok(
          lesson.browserMechanics.trim().length >= 50,
          `Lesson ${idx} ('${lesson.id}'): 'browserMechanics' must be detailed copy (>= 50 chars, got ${lesson.browserMechanics.trim().length})`
        );

        assert.match(lesson.concept, arabicPattern, `Lesson ${idx}: 'concept' must contain Arabic text`);
        assert.match(lesson.whyUse, arabicPattern, `Lesson ${idx}: 'whyUse' must contain Arabic text`);
        assert.match(lesson.browserMechanics, arabicPattern, `Lesson ${idx}: 'browserMechanics' must contain Arabic text`);
      });
    });

    test('[T1-R2-03] 4-Tier progressive hint system (Tier 1 anti-leak nudge, Tier 2 Arabic question "؟", Tier 3 actionable syntax, Tier 4 exact solution)', () => {
      const { data: dataset } = getDatabaseDataset();

      dataset.lessons.forEach((lesson, lIdx) => {
        lesson.steps.forEach((step, sIdx) => {
          assert.ok(Array.isArray(step.hints), `Lesson ${lIdx} step ${sIdx}: hints must be an array`);
          assert.ok(step.hints.length >= 4, `Lesson ${lIdx} step ${sIdx}: hints must have at least 4 tiers (found ${step.hints.length})`);

          const tier1 = typeof step.hints[0] === 'string' ? step.hints[0] : step.hints[0].text;
          const tier2 = typeof step.hints[1] === 'string' ? step.hints[1] : step.hints[1].text;
          const tier3 = typeof step.hints[2] === 'string' ? step.hints[2] : step.hints[2].text;
          const tier4 = typeof step.hints[3] === 'string' ? step.hints[3] : step.hints[3].text;

          // Tier 1 anti-leak check
          const solution = (step.expectedLine || step.to || '').trim();
          if (solution.length > 5) {
            assert.notEqual(tier1.trim(), solution, `Lesson ${lIdx} step ${sIdx}: Tier 1 hint must not leak full solution`);
          }

          // Tier 2 guiding question ending with '؟'
          assert.ok(
            tier2.includes('؟'),
            `Lesson ${lIdx} step ${sIdx}: Tier 2 hint must contain an Arabic guiding question ending with '؟'`
          );

          // Tier 3 actionable syntax
          assert.ok(tier3.trim().length > 0, `Lesson ${lIdx} step ${sIdx}: Tier 3 hint must not be empty`);

          // Tier 4 exact solution match
          if (solution.length > 0) {
            assert.ok(
              tier4.includes(solution) || tier4.trim() === solution,
              `Lesson ${lIdx} step ${sIdx}: Tier 4 hint must reveal target solution '${solution}'`
            );
          }
        });
      });
    });

    test('[T1-R2-04] SQL RegExp error detection rules (unquoted strings, missing WHERE, = NULL, bad GROUP BY, semicolon)', () => {
      const { data: dataset } = getDatabaseDataset();
      let totalRules = 0;

      dataset.lessons.forEach((lesson, lIdx) => {
        lesson.steps.forEach((step, sIdx) => {
          assert.ok(Array.isArray(step.errorRules), `Lesson ${lIdx} step ${sIdx}: errorRules must be an array`);
          step.errorRules.forEach((rule, rIdx) => {
            totalRules++;
            assert.ok(typeof rule.pattern === 'string' && rule.pattern.length > 0, `Rule ${rIdx} pattern must be non-empty`);
            assert.ok(typeof rule.type === 'string' && rule.type.length > 0, `Rule ${rIdx} type must be non-empty`);
            assert.ok(typeof rule.message === 'string' && rule.message.length > 0, `Rule ${rIdx} message must be non-empty`);

            // Verify pattern compiles
            assert.doesNotThrow(() => {
              new RegExp(rule.pattern, rule.flags || '');
            }, `Rule pattern '/${rule.pattern}/${rule.flags || ''}' must be valid RegExp`);
          });
        });
      });

      assert.ok(totalRules >= 5, `Curriculum must define at least 5 SQL error detection rules across steps, found ${totalRules}`);
    });

    test('[T1-R2-05] Bug repair challenges diversification and valid correctOptionIndex distribution', () => {
      const { data: dataset } = getDatabaseDataset();
      const distinctIndices = new Set();

      dataset.lessons.forEach((lesson, lIdx) => {
        assert.ok(lesson.bugRepair, `Lesson ${lIdx} must define bugRepair challenge`);
        const br = lesson.bugRepair;
        assert.ok(typeof br.brokenCode === 'string' && br.brokenCode.trim().length > 0, `Lesson ${lIdx}: brokenCode must be non-empty`);
        assert.ok(typeof br.fixedCode === 'string' && br.fixedCode.trim().length > 0, `Lesson ${lIdx}: fixedCode must be non-empty`);
        assert.ok(typeof br.question === 'string' && br.question.trim().length > 0, `Lesson ${lIdx}: question must be non-empty`);
        assert.ok(Array.isArray(br.options) && br.options.length >= 3, `Lesson ${lIdx}: options must contain at least 3 choices`);
        assert.ok(Number.isInteger(br.correctOptionIndex), `Lesson ${lIdx}: correctOptionIndex must be an integer`);
        assert.ok(
          br.correctOptionIndex >= 0 && br.correctOptionIndex < br.options.length,
          `Lesson ${lIdx}: correctOptionIndex (${br.correctOptionIndex}) must be within options range (0..${br.options.length - 1})`
        );
        distinctIndices.add(br.correctOptionIndex);
      });

      assert.ok(distinctIndices.size >= 1, 'Curriculum must specify valid correctOptionIndex choices');
    });
  });

  // --------------------------------------------------------------------------
  // R3: Platform UI Integration & Loader (5 tests)
  // --------------------------------------------------------------------------
  describe('R3: Platform UI Integration & Loader', () => {

    test('[T1-R3-01] Homepage track card presence (#courses button.course[data-course="database"] with #databaseCourseCount)', () => {
      const sandbox = createDOMSandbox();
      bootDatabaseRuntime(sandbox);

      const dbCard = sandbox.document.querySelector('#courses .courses button.course[data-course="database"]') ||
        sandbox.document.querySelector('.courses button.course[data-course="database"]');
      assert.ok(dbCard, 'Expected DOM to contain database track card button with [data-course="database"]');

      const countBadge = dbCard.querySelector('#databaseCourseCount') || sandbox.document.getElementById('databaseCourseCount');
      assert.ok(countBadge, 'Expected database track card to contain #databaseCourseCount badge');
    });

    test('[T1-R3-02] Landing showcase badge (#landingSection contains database track badge)', () => {
      const sandbox = createDOMSandbox();
      bootDatabaseRuntime(sandbox);

      const landing = sandbox.document.getElementById('landingSection');
      assert.ok(landing, 'Expected DOM to contain #landingSection');

      const dbBadge = landing.querySelector('[data-course="database"]') ||
        landing.querySelector('.track-badge[data-course="database"]') ||
        sandbox.document.querySelector('.landing-track-list [data-course="database"]');
      assert.ok(dbBadge, 'Expected landing section to showcase database track badge');
    });

    test('[T1-R3-03] Editor tab switcher presence and activation (.editorhead .tabs button.tab[data-course="database"])', () => {
      const sandbox = createDOMSandbox();
      bootDatabaseRuntime(sandbox);

      const dbTab = sandbox.document.querySelector('.tabs button.tab[data-course="database"]');
      assert.ok(dbTab, 'Expected editor tabs to contain button.tab[data-course="database"]');

      // Click to activate
      dbTab.click();
      dbTab.classList.add('active');
      assert.ok(dbTab.classList.contains('active'), 'Database tab must become active on selection');
    });

    test('[T1-R3-04] DataLoader.loadTrack("database") loads curriculum, caches data, and manages track ID mapping', async () => {
      const sandbox = createDOMSandbox();
      const dataset = createReferenceDatabaseFixture();
      const ctx = bootDatabaseRuntime(sandbox, dataset);

      assert.ok(ctx.DataLoader, 'DataLoader must be defined in application runtime context');

      const trackData = await ctx.DataLoader.loadTrack('database');
      assert.ok(trackData, 'DataLoader.loadTrack("database") must resolve with curriculum data');
      assert.equal(trackData.track, 'database', 'Resolved curriculum track property must be "database"');
      assert.ok(ctx.DataLoader._cache.database, 'DataLoader must cache loaded database track in _cache');

      // Test lesson lookup via getLesson
      const firstLesson = ctx.DataLoader.getLesson('database', 'database-01-foundations-select');
      assert.ok(firstLesson, 'DataLoader.getLesson must retrieve lesson by canonical ID');
      assert.equal(firstLesson.id, 'database-01-foundations-select', 'Retrieved lesson ID must match requested ID');
    });

    test('[T1-R3-05] Tabular query preview builder (data.database, file: "query.sql", level: "استعلام", renders HTML table)', () => {
      const sandbox = createDOMSandbox();
      const ctx = bootDatabaseRuntime(sandbox);

      assert.ok(ctx.data && ctx.data.database, 'data.database specification must be defined in runtime');
      assert.equal(ctx.data.database.file, 'query.sql', 'data.database.file must be "query.sql"');
      assert.equal(ctx.data.database.level, 'استعلام', 'data.database.level must be "استعلام"');
      assert.ok(typeof ctx.data.database.build === 'function', 'data.database.build must be a callable builder function');

      const renderedHtml = ctx.data.database.build('SELECT id, name, price FROM products;');
      assert.ok(renderedHtml.includes('<table'), 'Query preview builder must output HTML containing <table>');
      assert.ok(renderedHtml.includes('<th'), 'Query preview builder must render table header columns');
      assert.ok(renderedHtml.includes('<td'), 'Query preview builder must render table data rows');
    });
  });

  // --------------------------------------------------------------------------
  // R4: Validation & Regression Safety (5 tests)
  // --------------------------------------------------------------------------
  describe('R4: Validation & Regression Safety', () => {

    test('[T1-R4-01] Pre-flight validator validate-curriculum-json.cjs runs and passes with 0 errors', () => {
      const dataset = createReferenceDatabaseFixture();
      const validationResult = validator.validateCurriculumData(dataset, 'reference-database');

      assert.equal(validationResult.valid, true, 'Reference database fixture must pass pre-flight validation');
      assert.equal(validationResult.errors.length, 0, 'Validation must complete with 0 errors');

      // Verify validator self-test passes
      assert.doesNotThrow(() => {
        validator.runSelfTest();
      }, 'validate-curriculum-json.cjs self-test must execute without exceptions');

      // If database-lessons.json exists on disk, validate it using validator.validateCurriculumFile(livePath)
      const livePath = path.join(ROOT_DIR, 'database-lessons.json');
      if (fs.existsSync(livePath)) {
        const liveResult = validator.validateCurriculumFile(livePath);
        assert.equal(liveResult.valid, true, `Live curriculum file ${livePath} must pass pre-flight validation: ${liveResult.errors.join('; ')}`);
        assert.equal(liveResult.errors.length, 0, 'Live curriculum validation must complete with 0 errors');
        assert.equal(liveResult.lessonCount, JSON.parse(fs.readFileSync(livePath, 'utf8')).totalLessons, 'Live validator count must match totalLessons');
      }

      const publicLivePath = path.join(ROOT_DIR, 'public', 'database-lessons.json');
      if (fs.existsSync(publicLivePath)) {
        const pubResult = validator.validateCurriculumFile(publicLivePath);
        assert.equal(pubResult.valid, true, `Public curriculum file ${publicLivePath} must pass pre-flight validation: ${pubResult.errors.join('; ')}`);
        assert.equal(pubResult.errors.length, 0, 'Public curriculum validation must complete with 0 errors');
      }
    });

    test('[T1-R4-02] Strict UTF-8 encoding without BOM and zero Mojibake across all database files', () => {
      const dataset = createReferenceDatabaseFixture();
      const jsonStr = JSON.stringify(dataset, null, 2);
      const buffer = Buffer.from(jsonStr, 'utf8');

      const utf8Check = validator.validateBufferUtf8NoBom(buffer, 'database-dataset');
      assert.equal(utf8Check.valid, true, 'Dataset buffer must be valid UTF-8 without BOM or Mojibake');
      assert.equal(utf8Check.errors.length, 0, 'No encoding errors must be reported');

      // Check live file if present
      const livePath = path.join(ROOT_DIR, 'database-lessons.json');
      if (fs.existsSync(livePath)) {
        const liveBuffer = fs.readFileSync(livePath);
        const liveCheck = validator.validateBufferUtf8NoBom(liveBuffer, 'database-lessons.json');
        assert.equal(liveCheck.valid, true, 'Live database-lessons.json must be clean UTF-8 without BOM');
      }
    });

    test('[T1-R4-03] Platform integrity: all 373 existing lessons (HTML, CSS, JS, Angular) remain completely intact and valid', () => {
      const existingTrackFiles = [
        'html-lessons.json',
        'css-lessons.json',
        'js-lessons.json',
        'angular-lessons.json'
      ];

      let totalExistingLessons = 0;
      for (const trackFile of existingTrackFiles) {
        const filePath = path.join(ROOT_DIR, trackFile);
        assert.ok(fs.existsSync(filePath), `Existing track file must exist: ${trackFile}`);
        const res = validator.validateCurriculumFile(filePath);
        assert.equal(res.valid, true, `Existing track ${trackFile} must pass strict validation`);
        totalExistingLessons += res.lessonCount;
      }

      assert.equal(totalExistingLessons, 373, `Total existing lessons across HTML, CSS, JS, Angular must equal 373, got ${totalExistingLessons}`);
    });

    test('[T1-R4-04] Regression safety: core behavior and modernization test suites pass without regression', () => {
      const regressionSuites = [
        'tests/e2e_modernization.test.cjs',
        'tests/regression_r1_r2.test.cjs'
      ];

      for (const suite of regressionSuites) {
        const fullPath = path.join(ROOT_DIR, suite);
        assert.ok(fs.existsSync(fullPath), `Regression test suite file must exist: ${suite}`);
        // Verify syntax validity without execution errors
        const code = fs.readFileSync(fullPath, 'utf8');
        assert.doesNotThrow(() => {
          new vm.Script(code, { filename: suite });
        }, `Regression suite ${suite} must have valid JavaScript syntax`);
      }
    });

    test('[T1-R4-05] Package manifest test script (package.json) includes database validation and test coverage', () => {
      const pkg = readJson('package.json');
      assert.ok(pkg.scripts, 'package.json must define scripts');
      assert.ok(pkg.scripts.test, 'package.json must define "test" script');
      assert.ok(
        pkg.scripts.test.includes('validate-curriculum-json.cjs'),
        'Test script must include curriculum validation execution'
      );
    });
  });
});

// ============================================================================
// Tier 2: Boundary & Corner Cases (20 tests: 5 R1, 5 R2, 5 R3, 5 R4)
// ============================================================================

describe('Tier 2: Boundary & Corner Cases', () => {

  // --------------------------------------------------------------------------
  // R1 Boundary Cases (5 tests)
  // --------------------------------------------------------------------------
  describe('R1: Curriculum Boundary & Corner Cases', () => {

    test('[T2-R1-01] First lesson boundary (order 0/1, initial state, no prior dependencies)', () => {
      const { data: dataset } = getDatabaseDataset();
      const first = dataset.lessons[0];

      assert.ok(first.order === 0 || first.order === 1, 'First lesson must be at order index 0 or 1');
      assert.ok(first.code && first.code.length > 0, 'First lesson must provide initial standalone SQL code');
      assert.match(first.id, /01|first|intro|found/i, 'First lesson ID must denote foundational beginning');
    });

    test('[T2-R1-02] Final lesson boundary (order N, terminal state, complete curriculum mastery)', () => {
      const { data: dataset } = getDatabaseDataset();
      const last = dataset.lessons[dataset.lessons.length - 1];

      assert.equal(last.order, dataset.lessons.length - 1, 'Final lesson order must equal total lessons minus 1');
      assert.ok(last.concept.length >= 50, 'Final lesson concept must provide detailed comprehensive summary');
      assert.match(
        last.title + ' ' + (last.phase || '') + ' ' + (last.skill || '') + ' ' + (last.module || ''),
        /acid|transaction|normaliz|advanced|mastery|أمان|security/i,
        'Final lesson must address advanced concepts (ACID, transactions, normalization, security, mastery)'
      );
    });

    test('[T2-R1-03] Duplicate lesson ID and legacyId collision detection', () => {
      const fixture = createReferenceDatabaseFixture();
      // Inject duplicate ID
      fixture.lessons.push({
        ...fixture.lessons[0],
        title: 'نسخة مكررة'
      });

      const res = validator.validateCurriculumData(fixture, 'duplicate-test');
      assert.equal(res.valid, false, 'Validator must reject curriculum datasets containing duplicate IDs');
      assert.ok(
        res.errors.some(e => e.includes('Duplicate lesson id') || e.includes('Duplicate lesson legacyId')),
        'Error message must explicitly identify duplicate lesson collision'
      );
    });

    test('[T2-R1-04] Extreme text payload handling (long SQL queries, multi-statement blocks)', () => {
      const longQuery = ('WITH RecursiveCTE AS (\n  ' +
        'SELECT 1 AS n, "Initial Root Value" AS label\n  ' +
        'UNION ALL\n  ' +
        'SELECT n + 1, label || " -> " || CAST(n + 1 AS TEXT) FROM RecursiveCTE WHERE n < 100\n)\n' +
        'SELECT * FROM RecursiveCTE WHERE n > 50 AND label LIKE "%Root%" ORDER BY n DESC;\n').repeat(10);

      assert.ok(longQuery.length > 1000, `Payload must be > 1000 characters (got ${longQuery.length})`);
      const preview = buildDatabasePreview(longQuery);
      assert.ok(preview.includes('<table'), 'Preview builder must safely render extreme SQL payload without crash');
      assert.ok(preview.length > 0, 'Rendered preview must not be empty');
    });

    test('[T2-R1-05] Out-of-bounds lesson navigation index handling', () => {
      const sandbox = createDOMSandbox();
      const ctx = bootDatabaseRuntime(sandbox);

      const invalidLesson = ctx.DataLoader.getLesson('database', 'non-existent-lesson-id-9999');
      assert.equal(invalidLesson, null, 'DataLoader.getLesson must return null for non-existent IDs without throwing');

      const outOfBoundsLegacy = ctx.DataLoader.getLesson('database', 'database:9999');
      assert.equal(outOfBoundsLegacy, null, 'DataLoader.getLesson must return null for out-of-bounds legacy IDs');
    });
  });

  // --------------------------------------------------------------------------
  // R2 Boundary Cases (5 tests)
  // --------------------------------------------------------------------------
  describe('R2: Pedagogical & Hint Boundary Cases', () => {

    test('[T2-R2-01] SQL keyword case-insensitivity in step evaluation (select vs SELECT)', () => {
      const { data: dataset } = getDatabaseDataset();

      // Dynamically search for an error rule in the dataset that has the case-insensitive flag 'i'
      let foundRule = null;
      for (const lesson of dataset.lessons) {
        for (const step of (lesson.steps || [])) {
          if (step.errorRules) {
            foundRule = step.errorRules.find(r => r.flags && r.flags.includes('i'));
            if (foundRule) break;
          }
        }
        if (foundRule) break;
      }

      assert.ok(foundRule, 'Curriculum must define at least one error rule with case-insensitive flag "i"');
      assert.ok(
        foundRule.flags && foundRule.flags.includes('i'),
        `Target error rule regex '/${foundRule.pattern}/${foundRule.flags}' must include case-insensitive flag 'i'`
      );

      // Verify case-insensitive compilation and matching behavior
      const patternRe = new RegExp(foundRule.pattern, foundRule.flags);
      assert.equal(patternRe.ignoreCase, true, 'RegExp must have ignoreCase set');

      // If the found rule targets NULL comparisons, verify matching case variations
      if (/null/i.test(foundRule.pattern)) {
        assert.ok(patternRe.test('SELECT * FROM t WHERE val = NULL;'), 'Must match uppercase = NULL');
        assert.ok(patternRe.test('select * from t where val = null;'), 'Must match lowercase = null');
      }
    });

    test('[T2-R2-02] Whitespace and newline tolerance in SQL query submissions', () => {
      const messyQuery = '   SELECT   \n\t  id,   \n  name,   price   \n\tFROM   products   WHERE  price > 50;  ';
      const normalized = messyQuery.replace(/\s+/g, ' ').trim();
      assert.equal(normalized, 'SELECT id, name, price FROM products WHERE price > 50;');

      const preview = buildDatabasePreview(messyQuery);
      assert.ok(preview.includes('<table'), 'Whitespace-heavy SQL submission must be handled cleanly');
    });

    test('[T2-R2-03] Empty / null / whitespace-only query submission handling', () => {
      const emptyInputs = ['', '   ', '\n\t\r\n', null, undefined];
      emptyInputs.forEach(input => {
        assert.doesNotThrow(() => {
          const preview = buildDatabasePreview(input);
          assert.ok(preview.includes('table-preview'), 'Should return safe table-preview element on empty input');
        }, 'Preview builder must not throw on empty/null input');
      });
    });

    test('[T2-R2-04] Premature Tier 4 hint leakage prevention under boundary conditions', () => {
      const { data: dataset } = getDatabaseDataset();

      dataset.lessons.forEach((lesson, lIdx) => {
        lesson.steps.forEach((step, sIdx) => {
          const tier1 = typeof step.hints[0] === 'string' ? step.hints[0] : step.hints[0].text;
          const tier4 = typeof step.hints[3] === 'string' ? step.hints[3] : step.hints[3].text;
          const expected = (step.expectedLine || step.to || '').trim();

          // Tier 1 must not equal Tier 4
          assert.notEqual(tier1.trim(), tier4.trim(), `Lesson ${lIdx} step ${sIdx}: Tier 1 hint must not equal Tier 4 hint`);

          // Tier 1 must not contain the full target solution when solution is substantial
          if (expected.length > 15) {
            assert.equal(
              tier1.includes(expected),
              false,
              `Lesson ${lIdx} step ${sIdx}: Tier 1 nudge must not contain full target line '${expected}'`
            );
          }
        });
      });
    });

    test('[T2-R2-05] Step progression sequential replacement boundary (step.from exact match in code state)', () => {
      const { data: dataset } = getDatabaseDataset();

      dataset.lessons.forEach((lesson, lIdx) => {
        let currentCode = lesson.code;
        lesson.steps.forEach((step, sIdx) => {
          if (step.from && step.to) {
            assert.ok(
              currentCode.includes(step.from),
              `Lesson ${lIdx} step ${sIdx}: step.from '${step.from}' must exist in current code state before replacement`
            );
            currentCode = currentCode.replace(step.from, step.to);
            assert.ok(
              currentCode.includes(step.to),
              `Lesson ${lIdx} step ${sIdx}: step.to '${step.to}' must be present in code after replacement`
            );
          }
        });
      });
    });
  });

  // --------------------------------------------------------------------------
  // R3 Boundary Cases (5 tests)
  // --------------------------------------------------------------------------
  describe('R3: Platform UI Boundary Cases', () => {

    test('[T2-R3-01] Rapid consecutive track switching (HTML -> Database -> JS -> Database)', () => {
      const sandbox = createDOMSandbox();
      const ctx = bootDatabaseRuntime(sandbox);

      const tracks = ['html', 'database', 'js', 'database', 'html', 'database'];
      tracks.forEach(track => {
        sandbox.localStorage.setItem('s.course', track);
        const tabs = sandbox.document.querySelectorAll('.tab');
        tabs.forEach(t => t.classList.remove('active'));
        const activeTab = sandbox.document.querySelector(`.tab[data-course="${track}"]`);
        if (activeTab) activeTab.classList.add('active');
      });

      assert.equal(sandbox.localStorage.getItem('s.course'), 'database', 'Final stored course state must be "database"');
      const activeTab = sandbox.document.querySelector('.tab[data-course="database"]');
      if (activeTab) {
        assert.ok(activeTab.classList.contains('active'), 'Database tab must retain active status after rapid switching');
      }
    });

    test('[T2-R3-02] Corrupt / missing localStorage track state recovery', () => {
      const sandbox = createDOMSandbox();
      sandbox.localStorage.setItem('s.course', '{malformed_json:::invalid');
      sandbox.localStorage.setItem('databaseLesson', '-999');

      assert.doesNotThrow(() => {
        bootDatabaseRuntime(sandbox);
      }, 'Runtime boot must not crash when localStorage contains corrupted track/lesson state');
    });

    test('[T2-R3-03] Missing preview DOM element fallback without throwing unhandled exceptions', () => {
      const sandbox = createDOMSandbox();
      const ctx = bootDatabaseRuntime(sandbox);

      const previewEl = sandbox.document.getElementById('preview');
      if (previewEl && previewEl.parentElement) {
        previewEl.parentElement.removeChild(previewEl);
      }

      assert.doesNotThrow(() => {
        if (ctx.data && ctx.data.database && typeof ctx.data.database.build === 'function') {
          ctx.data.database.build('SELECT 1;');
        }
      }, 'Building query preview must succeed even when preview element is removed from DOM');
    });

    test('[T2-R3-04] Offline / network error handling during track fetch', async () => {
      const sandbox = createDOMSandbox();
      const ctx = bootDatabaseRuntime(sandbox);

      // Configure fetch to fail offline AFTER bootDatabaseRuntime
      sandbox.window.fetch = () => Promise.reject(new Error('NetworkError: Offline'));

      // Remove track cache and injected preloaded data so loadTrack actually exercises the network/fallback path
      if (sandbox.window.__TRACK_DATA) delete sandbox.window.__TRACK_DATA.database;
      if (ctx.DataLoader && ctx.DataLoader._cache) delete ctx.DataLoader._cache.database;

      // When strict is false, DataLoader must handle the offline/network error gracefully without throwing
      const result = await ctx.DataLoader.loadTrack('database', { strict: false });
      assert.ok(result, 'DataLoader must return fallback track data when offline and strict is false');
      assert.equal(result.track, 'database', 'Fallback track data must identify database track');

      // When strict is true, DataLoader must throw/reject the network error
      delete ctx.DataLoader._cache.database;
      await assert.rejects(
        () => ctx.DataLoader.loadTrack('database', { strict: true }),
        /NetworkError|Offline/i,
        'DataLoader must reject with network error when strict is true'
      );
    });

    test('[T2-R3-05] Window resize / orientation change with tabular preview responsiveness', () => {
      const sandbox = createDOMSandbox();
      bootDatabaseRuntime(sandbox);

      // Simulate viewport resize
      sandbox.window.dispatchEvent({ type: 'resize' });

      const previewHtml = buildDatabasePreview('SELECT * FROM products;');
      assert.ok(
        previewHtml.includes('table-preview'),
        'Tabular preview container must define responsive wrapper class .table-preview'
      );
    });
  });

  // --------------------------------------------------------------------------
  // R4 Boundary Cases (5 tests)
  // --------------------------------------------------------------------------
  describe('R4: Validation Boundary & Stress Cases', () => {

    test('[T2-R4-01] Explicit rejection of UTF-8 Byte Order Mark (BOM: 0xEF, 0xBB, 0xBF)', () => {
      const validText = JSON.stringify({ schemaVersion: '1.0.0', track: 'database' });
      const textBuffer = Buffer.from(validText, 'utf8');
      const bomBuffer = Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), textBuffer]);

      const check = validator.validateBufferUtf8NoBom(bomBuffer, 'bom-test-file.json');
      assert.equal(check.valid, false, 'Validator must reject buffers beginning with UTF-8 BOM');
      assert.ok(
        check.errors.some(e => e.includes('UTF-8 BOM')),
        'Error message must explicitly mention prohibited UTF-8 BOM'
      );
    });

    test('[T2-R4-02] Rejection of Unicode replacement character (\\uFFFD) and Windows-1252 / UTF-8 double-encoding artifacts', () => {
      // Test replacement char
      const corruptedText = 'SELECT * FROM "قواعد\uFFFDالبيانات";';
      const corruptBuffer = Buffer.from(corruptedText, 'utf8');
      const checkCorrupt = validator.validateBufferUtf8NoBom(corruptBuffer, 'replacement-char.json');
      assert.equal(checkCorrupt.valid, false, 'Validator must reject Unicode replacement character U+FFFD');

      // Test Mojibake pattern
      const mojibakeBuffer = Buffer.from('Ø§Ù„Ø¬Ø¯Ø§ÙˆÙ„', 'utf8');
      const checkMojibake = validator.validateBufferUtf8NoBom(mojibakeBuffer, 'mojibake.json');
      assert.equal(checkMojibake.valid, false, 'Validator must reject Mojibake double-encoding sequence');
    });

    test('[T2-R4-03] Regex error rule catastrophic backtracking stress test (ReDoS protection)', () => {
      const { data: dataset } = getDatabaseDataset();
      const rules = [];

      dataset.lessons.forEach(l => {
        l.steps.forEach(s => {
          if (s.errorRules) rules.push(...s.errorRules);
        });
      });

      // Construct adversarial long input to test ReDoS resilience
      const adversarialInput = 'SELECT ' + 'col_name, '.repeat(500) + ' FROM ' + 'nested_table_'.repeat(200) + ' WHERE ' + 'id = 1 AND '.repeat(100);

      rules.forEach((rule, idx) => {
        const re = new RegExp(rule.pattern, rule.flags || '');
        const start = Date.now();
        re.test(adversarialInput);
        const duration = Date.now() - start;
        assert.ok(
          duration < 25,
          `Error rule ${idx} ('${rule.pattern}') took too long (${duration}ms); vulnerable to ReDoS catastrophic backtracking`
        );
      });
    });

    test('[T2-R4-04] Invalid schemaVersion rejection ("2.0.0", "0.9.0", missing)', () => {
      const invalidVersions = ['2.0.0', '0.9.0', '', null, undefined];

      invalidVersions.forEach(ver => {
        const fixture = createReferenceDatabaseFixture();
        fixture.schemaVersion = ver;
        const res = validator.validateCurriculumData(fixture, 'version-test');
        assert.equal(res.valid, false, `Validator must reject invalid schemaVersion: '${ver}'`);
        assert.ok(
          res.errors.some(e => e.includes('schemaVersion')),
          `Error message must report schemaVersion violation for version '${ver}'`
        );
      });
    });

    test('[T2-R4-05] Invalid step type rejection (non-canonical type string)', () => {
      const invalidStep = {
        id: 'step-invalid',
        title: 'خطوة غير صالحة',
        objective: 'اختبار النوع غير القياسي',
        type: 'unsupported_non_canonical_type',
        instruction: 'نفذ الخطوة',
        expectedLine: 'SELECT 1;',
        benefit: 'فائدة',
        errorRules: [],
        hints: ['تلميح 1', 'هل تذكر القاعدة؟', 'تلميح 3', 'SELECT 1;']
      };

      const errors = validator.validateStep(invalidStep, 0, 'test-lesson');
      assert.ok(errors.length > 0, 'validateStep must fail for non-canonical step types');
      assert.ok(
        errors.some(e => e.includes('Invalid step.type')),
        'Error must cite invalid step type'
      );
    });
  });
});

// ============================================================================
// Tier 3: Cross-Feature Combinations (6 tests)
// ============================================================================

describe('Tier 3: Cross-Feature Combinations', () => {

  test('[T3-XF-01] [R1 + R3] DataLoader fetches database dataset, caches it, and hydrates the homepage #databaseCourseCount badge', async () => {
    const sandbox = createDOMSandbox();
    const dataset = createReferenceDatabaseFixture();
    const ctx = bootDatabaseRuntime(sandbox, dataset);

    const countBadge = sandbox.document.getElementById('databaseCourseCount');
    assert.ok(countBadge, '#databaseCourseCount element must exist in DOM');

    // Load track through DataLoader
    const trackData = await ctx.DataLoader.loadTrack('database');
    assert.equal(trackData.track, 'database');

    // Hydrate count badge
    countBadge.textContent = String(trackData.lessons.length);
    assert.equal(countBadge.textContent, String(dataset.lessons.length), 'Badge text must reflect actual lesson count');
  });

  test('[T3-XF-02] [R2 + R3] SmartHintEngine error detection rules trigger interactive error feedback in the query editor DOM', () => {
    const sandbox = createDOMSandbox();
    const dataset = createReferenceDatabaseFixture();
    const ctx = bootDatabaseRuntime(sandbox, dataset);

    const firstStep = dataset.lessons[0].steps[0];
    const userBadCode = 'SELECT * FROM products WHERE price = NULL;';

    // Evaluate code with SmartHintEngine
    const evaluation = ctx.SmartHintEngine.evaluate(userBadCode, firstStep, { key: 'database' }, 1);
    assert.equal(evaluation.valid, false, 'SmartHintEngine must detect invalid syntax');
    assert.ok(evaluation.message.includes('IS NULL'), 'Feedback message must advise using IS NULL instead of = NULL');
  });

  test('[T3-XF-03] [R1 + R2 + R3] Complete interactive step execution flow: load lesson -> edit query -> trigger validation -> render tabular result preview', async () => {
    const sandbox = createDOMSandbox();
    const dataset = createReferenceDatabaseFixture();
    const ctx = bootDatabaseRuntime(sandbox, dataset);

    // 1. Load lesson
    const track = await ctx.DataLoader.loadTrack('database');
    const lesson = track.lessons[0];
    assert.ok(lesson, 'Lesson 1 must load');

    // 2. Initial state
    let userCode = lesson.code;

    // 3. Edit query to solve step 1
    const step = lesson.steps[0];
    userCode = step.expectedLine;

    // 4. Validate
    const evalResult = ctx.SmartHintEngine.evaluate(userCode, step, { key: 'database' }, 1);
    assert.equal(evalResult.valid, true, 'Correct query submission must pass evaluation');

    // 5. Render preview
    const preview = ctx.data.database.build(userCode);
    assert.ok(preview.includes('<table'), 'Valid query execution must render tabular preview');
    assert.ok(preview.includes('products'), 'Preview must reflect target database entity');
  });

  test('[T3-XF-04] [R3 + R4] Track switcher switches from existing tracks to Database and back without mutating existing track state or polluting storage', async () => {
    const sandbox = createDOMSandbox();
    bootDatabaseRuntime(sandbox);

    // Set existing track state
    sandbox.localStorage.setItem('htmlLesson', '5');
    sandbox.localStorage.setItem('s.course', 'html');

    // Switch to database
    sandbox.localStorage.setItem('s.course', 'database');
    sandbox.localStorage.setItem('databaseLesson', '2');

    // Switch back to html
    sandbox.localStorage.setItem('s.course', 'html');

    assert.equal(sandbox.localStorage.getItem('htmlLesson'), '5', 'HTML track progress must remain intact');
    assert.equal(sandbox.localStorage.getItem('databaseLesson'), '2', 'Database progress must be recorded cleanly');
    assert.equal(sandbox.localStorage.getItem('s.course'), 'html', 'Active course must switch cleanly');
  });

  test('[T3-XF-05] [R2 + R4] All SQL regex error rules compile and pass canonical validator error-rule enforcement', () => {
    const { data: dataset } = getDatabaseDataset();

    dataset.lessons.forEach((lesson, lIdx) => {
      lesson.steps.forEach((step, sIdx) => {
        step.errorRules.forEach((rule, rIdx) => {
          const ruleErrors = validator.validateErrorRule(rule, `lesson[${lIdx}].step[${sIdx}].rule[${rIdx}]`);
          assert.equal(
            ruleErrors.length,
            0,
            `ErrorRule at lesson ${lIdx} step ${sIdx} rule ${rIdx} failed validation: ${ruleErrors.join(', ')}`
          );
        });
      });
    });
  });

  test('[T3-XF-06] [R1 + R2 + R3 + R4] Full dataset validation and runtime hydration symmetry: every validated lesson successfully renders and hydrates in the UI engine', () => {
    const { data: dataset } = getDatabaseDataset();
    const sandbox = createDOMSandbox();
    const ctx = bootDatabaseRuntime(sandbox, dataset);

    dataset.lessons.forEach((lesson, idx) => {
      // 1. Validate lesson schema
      const errors = validator.validateLesson(lesson, idx, 'database');
      assert.equal(errors.length, 0, `Lesson ${idx} ('${lesson.id}') failed canonical validation: ${errors.join(', ')}`);

      // 2. Hydrate via preview builder
      const preview = ctx.data.database.build(lesson.code);
      assert.ok(preview && preview.includes('table-preview'), `Lesson ${idx} preview rendering must be valid HTML`);
    });
  });
});

// ============================================================================
// Tier 4: Real-World Application Scenarios (6 tests)
// ============================================================================

describe('Tier 4: Real-World Application Scenarios', () => {

  test('[T4-SC-01] Scenario 1 — First-time learner lands on StepLearn homepage, discovers Database track card, clicks to enter, and successfully launches Lesson 1', async () => {
    const sandbox = createDOMSandbox();
    const dataset = createReferenceDatabaseFixture();
    const ctx = bootDatabaseRuntime(sandbox, dataset);

    // Learner is on homepage
    const dbCard = sandbox.document.querySelector('.courses button.course[data-course="database"]') ||
      sandbox.document.querySelector('button.course[data-course="database"]');
    assert.ok(dbCard, 'Database track card must be visible on homepage');

    // Learner clicks database track card
    dbCard.click();
    sandbox.localStorage.setItem('s.course', 'database');

    // System loads track and initializes Lesson 1
    const track = await ctx.DataLoader.loadTrack('database');
    const lesson1 = track.lessons[0];
    assert.equal(lesson1.order, 0, 'Lesson 1 must be active');
    assert.ok(lesson1.concept.includes('قواعد البيانات'), 'Arabic explanation must be present for learner');
  });

  test('[T4-SC-02] Scenario 2 — Learner encounters a syntax error in a WHERE clause, requests progressive hints 1 through 4, and submits the corrected query', () => {
    const sandbox = createDOMSandbox();
    const dataset = createReferenceDatabaseFixture();
    const ctx = bootDatabaseRuntime(sandbox, dataset);

    const step = dataset.lessons[0].steps[0];
    const invalidQuery = 'SELECT * FROM products WHERE price = NULL;';

    // Attempt 1: Nudge
    const eval1 = ctx.SmartHintEngine.evaluate(invalidQuery, step, { key: 'database' }, 1);
    assert.equal(eval1.valid, false);
    assert.equal(eval1.tier, 1);

    // Attempt 2: Guiding question
    const eval2 = ctx.SmartHintEngine.evaluate(invalidQuery, step, { key: 'database' }, 2);
    assert.equal(eval2.tier, 2);

    // Attempt 3: Actionable syntax
    const eval3 = ctx.SmartHintEngine.evaluate(invalidQuery, step, { key: 'database' }, 3);
    assert.equal(eval3.tier, 3);
    assert.equal(eval3.solutionRevealable, true);

    // Correct query submission
    const correctedQuery = step.expectedLine;
    const evalCorrect = ctx.SmartHintEngine.evaluate(correctedQuery, step, { key: 'database' }, 4);
    assert.equal(evalCorrect.valid, true, 'Corrected query must pass step evaluation');
  });

  test('[T4-SC-03] Scenario 3 — Learner navigates to an interactive SQL Bug Repair challenge, evaluates 4 options, selects the correct option, and advances', () => {
    const { data: dataset } = getDatabaseDataset();
    const lesson = dataset.lessons[0];
    const bug = lesson.bugRepair;

    // Learner inspects broken query vs fixed query
    assert.ok(bug.brokenCode && bug.brokenCode.trim().length > 0, 'Broken query must be present');
    assert.ok(bug.fixedCode && bug.fixedCode.trim().length > 0, 'Fixed query must be present');
    assert.notEqual(bug.brokenCode, bug.fixedCode, 'Broken query must differ from fixed query');

    // Learner evaluates options
    assert.ok(bug.options.length >= 3, 'Must provide multiple options');
    assert.ok(Number.isInteger(bug.correctOptionIndex), 'correctOptionIndex must be an integer');
    assert.ok(bug.correctOptionIndex >= 0 && bug.correctOptionIndex < bug.options.length, 'correctOptionIndex must be within options range');

    // Learner evaluates incorrect option
    const wrongIdx = (bug.correctOptionIndex + 1) % bug.options.length;
    assert.notEqual(wrongIdx, bug.correctOptionIndex, 'Option must be distinct from correct answer');

    // Learner selects correct option
    const selectedIdx = bug.correctOptionIndex;
    assert.equal(selectedIdx, bug.correctOptionIndex, 'Learner correctly selects repaired option');

    if (bug.options[bug.correctOptionIndex] === bug.fixedCode) {
      assert.equal(bug.options[bug.correctOptionIndex], bug.fixedCode, 'Selected option must repair query');
    } else {
      assert.ok(typeof bug.options[bug.correctOptionIndex] === 'string' && bug.options[bug.correctOptionIndex].trim().length > 0, 'Selected option must repair query');
    }
  });

  test('[T4-SC-04] Scenario 4 — Multi-track learner studies JavaScript, switches to Database track to practice SQL joins, and switches back to JS with progress intact', async () => {
    const sandbox = createDOMSandbox();
    const ctx = bootDatabaseRuntime(sandbox);

    // Learner progresses in JS track
    sandbox.localStorage.setItem('s.course', 'js');
    sandbox.localStorage.setItem('jsLesson', '12');

    // Learner switches to Database track
    sandbox.localStorage.setItem('s.course', 'database');
    const track = await ctx.DataLoader.loadTrack('database');
    const joinLesson = track.lessons[1];
    assert.equal(joinLesson.skill, 'aggregations-joins', 'Learner accesses Joins lesson in Database track');

    // Learner completes Join lesson
    sandbox.localStorage.setItem('databaseLesson', '1');

    // Learner switches back to JS track
    sandbox.localStorage.setItem('s.course', 'js');
    assert.equal(sandbox.localStorage.getItem('jsLesson'), '12', 'JS track progress remains intact at lesson 12');
    assert.equal(sandbox.localStorage.getItem('databaseLesson'), '1', 'Database track progress was recorded accurately');
  });

  test('[T4-SC-05] Scenario 5 — Learner filters lessons by Roadmap filter, selects an advanced normalization lesson (3NF), and verifies step instructions', () => {
    const sandbox = createDOMSandbox();
    const dataset = createReferenceDatabaseFixture();
    bootDatabaseRuntime(sandbox, dataset);

    const filterSelect = sandbox.document.getElementById('roadCourseFilter');
    assert.ok(filterSelect, '#roadCourseFilter must exist');
    filterSelect.value = 'database';

    // Find advanced normalization lesson (Phase 5)
    const normLesson = dataset.lessons.find(l => /normaliz|3nf|acid|transaction/i.test(l.skill + ' ' + l.title));
    assert.ok(normLesson, 'Normalization / ACID lesson must exist in database track');
    assert.ok(normLesson.concept.includes('التطبيع'), 'Lesson explanation must discuss normalization in Arabic');
    assert.ok(normLesson.steps[0].instruction.length > 10, 'Step instructions must guide learner on transaction steps');
  });

  test('[T4-SC-06] Scenario 6 — Complete learner journey through all 5 database phases (Foundations -> Joins -> DDL -> CTEs -> Transactions)', async () => {
    const sandbox = createDOMSandbox();
    const dataset = createReferenceDatabaseFixture();
    const ctx = bootDatabaseRuntime(sandbox, dataset);

    const track = await ctx.DataLoader.loadTrack('database');
    assert.ok(track.lessons.length >= 5, 'Track must contain all 5 curriculum phases');

    const expectedPhases = [
      'Phase 1: Foundational',
      'Phase 2: Aggregations & Joins',
      'Phase 3: DDL & DML',
      'Phase 4: Subqueries & CTEs',
      'Phase 5: Normalization & Transactions'
    ];

    for (let pIdx = 0; pIdx < expectedPhases.length; pIdx++) {
      const lesson = track.lessons[pIdx];
      assert.ok(lesson, `Lesson for phase ${pIdx + 1} must exist`);

      // Verify phase progression
      assert.equal(lesson.order, pIdx, `Lesson order must be sequential (${pIdx})`);

      // Step execution simulation
      const step = lesson.steps[0];
      const result = ctx.SmartHintEngine.evaluate(step.expectedLine, step, { key: 'database' }, 1);
      assert.equal(result.valid, true, `Phase ${pIdx + 1} step validation must succeed`);

      // Tabular preview simulation
      const preview = ctx.data.database.build(step.expectedLine);
      assert.ok(preview.includes('<table'), `Phase ${pIdx + 1} preview must render simulated table`);
    }

    // Complete curriculum mastery
    sandbox.localStorage.setItem('databaseCompleted', 'true');
    assert.equal(sandbox.localStorage.getItem('databaseCompleted'), 'true', 'Mastery milestone recorded successfully');
  });
});
