USE employee_db;

SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, r.salary FROM employees e
INNER JOIN roles r ON r.id WHERE r.id = e.role_id;

SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.dept_name AS "Department", r.salary AS "Salary" FROM employees e
INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id;

SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.dept_name AS "Department", r.salary AS "Salary" FROM employees e
LEFT JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id;

SELECT e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.dept_name AS "Department" FROM employees e
INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE dept_name = 'Management';

SELECT CONCAT(e.first_name," " ,e.last_name) AS full_name, r.title, FROM employees e
INNER JOIN roles r ON r.id = e.role_id;


SELECT * FROM departments;
SELECT * FROM employees;
SELECT * FROM roles;

SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.dept_name AS "Department", r.salary FROM employees e 
INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE dept_name = 'Sales';
            