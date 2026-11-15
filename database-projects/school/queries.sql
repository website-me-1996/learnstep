SET search_path = school;
-- علاقة الطالب بالمعلم تمر عبر التسجيل والفصل والإسناد، ولا نضيف student.teacher_id
SELECT s.full_name AS student, t.full_name AS teacher, sub.name AS subject
FROM students s JOIN enrollments e ON e.student_id = s.id
JOIN teaching_assignments a ON a.class_id = e.class_id AND a.academic_year_id = e.academic_year_id
JOIN teachers t ON t.id = a.teacher_id JOIN subjects sub ON sub.id = a.subject_id;

-- حضور عام دراسي مع حفظ التاريخ
SELECT y.name AS academic_year, s.full_name, COUNT(*) FILTER (WHERE a.status = 'absent') AS absences
FROM attendance a JOIN enrollments e ON e.id = a.enrollment_id
JOIN students s ON s.id = e.student_id JOIN academic_years y ON y.id = e.academic_year_id
GROUP BY y.name, s.full_name ORDER BY y.name, s.full_name;

-- متوسط الدرجات دون الكتابة فوق عام سابق
SELECT s.full_name, sub.name, AVG(g.score) AS average_score
FROM grades g JOIN enrollments e ON e.id = g.enrollment_id
JOIN students s ON s.id = e.student_id JOIN assessments ass ON ass.id = g.assessment_id
JOIN subjects sub ON sub.id = ass.subject_id
GROUP BY s.full_name, sub.name;
