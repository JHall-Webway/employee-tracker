INSERT INTO department (department_name)
VALUES
    ('sales'),
    ('marketing'),
    ('retail');

INSERT INTO role (title, salary, department_id)
VALUES
    ('salesperson', 30000, 1),
    ('sales-manager', 40000, 1),
    ('marketing-specialist', 50000, 2),
    ('marketing-manager', 100000, 2),
    ('retail-associate', 25000, 3),
    ('retail-manager', 30000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Jane', 'Simmons', 2, null),
    ('Bill', 'Simmons', 4, null),
    ('Joe', 'Johnson', 6, null),
    ('John', 'Doe', 1, 1),
    ('Jon', 'Doe', 1, 1),
    ('Johnny', 'Doe', 1, 1),
    ('James', 'Doe', 3, 2),
    ('Jennie', 'Doe', 3, 2),
    ('Jack', 'Doe', 3, 2),
    ('Jane', 'Doe', 5, 3),
    ('Jackson', 'Doe', 5, 3),
    ('Joseph', 'Doe', 5, 3);