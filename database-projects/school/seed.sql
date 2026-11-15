SET search_path = school;
INSERT INTO academic_years (name, starts_on, ends_on) VALUES ('2025-2026', '2025-09-01', '2026-06-30') ON CONFLICT DO NOTHING;
INSERT INTO students (student_no, full_name, birth_date) VALUES ('ST-001', 'طالب تجريبي', '2014-03-10') ON CONFLICT DO NOTHING;
INSERT INTO guardians (full_name, phone) VALUES ('ولي تجريبي', '01222222222') ON CONFLICT DO NOTHING;
INSERT INTO teachers (full_name, employee_no) VALUES ('معلم تجريبي', 'T-001') ON CONFLICT DO NOTHING;
INSERT INTO subjects (name) VALUES ('الرياضيات'), ('العلوم') ON CONFLICT DO NOTHING;
INSERT INTO classes (name, grade_level) VALUES ('الصف الرابع أ', 4) ON CONFLICT DO NOTHING;
INSERT INTO student_guardians (student_id, guardian_id, relation)
SELECT s.id, g.id, 'ولي أمر' FROM students s CROSS JOIN guardians g WHERE s.student_no = 'ST-001' AND g.phone = '01222222222'
ON CONFLICT DO NOTHING;
INSERT INTO enrollments (student_id, class_id, academic_year_id)
SELECT s.id, c.id, y.id FROM students s CROSS JOIN classes c CROSS JOIN academic_years y WHERE s.student_no = 'ST-001' AND c.name = 'الصف الرابع أ' AND y.name = '2025-2026'
ON CONFLICT DO NOTHING;
