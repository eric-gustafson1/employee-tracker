USE employee_db;

SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, r.salary FROM employees e
 JOIN roles r ON r.id;

SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department", r.salary AS "Salary" FROM employees e
INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id;

-- All Employees query
SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department", r.salary AS "Salary" FROM employees e
LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN departments d ON d.id = r.department_id;

-- Empoyees by department query
SELECT e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department" FROM employees e
INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE department_name = 'Management';

SELECT CONCAT(e.first_name," " ,e.last_name) AS full_name, r.title, e.manager_id FROM employees e
INNER JOIN roles r ON r.id = e.role_id WHERE e.manager_id = 1;


SELECT * FROM departments;
SELECT * FROM employees;
SELECT * FROM roles;

SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department", r.salary 
FROM employees e 
INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id 
WHERE department_name = 'Sales';
            