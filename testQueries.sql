USE employee_db;

SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, r.salary FROM employees e
INNER JOIN roles r ON r.id WHERE r.id = e.role_id;

SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.dept_name AS "Department", r.salary AS "Salary" FROM employees e
INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id;

SELECT * FROM departments;
SELECT * FROM employees;
SELECT * FROM roles;