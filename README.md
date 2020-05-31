# Create tables in the database:
<pre><code>
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50),
    username  VARCHAR(50) ,
    surname VARCHAR(50)
);
CREATE TYPE pstatus AS ENUM('active', 'inactive', 'declined', 'completed');
CREATE TABLE projects(
    id SERIAL PRIMARY KEY,
    pname VARCHAR(50),
    body TEXT,
    stat pstatus,
    assginer INT
);
CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    pname VARCHAR(50),
    pdescription TEXT,
    score INT,
    stat pstatus,
    pid INT,
    assignee integer[],
    assginer INT
);
</code></pre>
# Testing
1.Launch the server at localhost:8081
<code>node express.js</code>
2.Use test.html to test the functionality
