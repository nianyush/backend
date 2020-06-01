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
    assignee integer[],
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
    assigner INT
);
</code></pre>
# Testing
## 1.Launch the server at localhost:8081

<code>node express.js</code>

## 2.Example tests for different api:

### Get:
If all param is no
/API/users

<code>http://localhost:8081/API/users?username=aaa&surname=a</code>

Expected Result:

<code>{"length":3,"result":"[{\"id\":2,\"username\":\"aaa\",\"email\":\"123@123.com\",\"surname\":\"a\"},{\"id\":3,\"username\":\"aaa\",\"email\":null,\"surname\":\"a\"},{\"id\":4,\"username\":\"aaa\",\"email\":null,\"surname\":\"a\"}]"}</code>

/API/tasks

parameters:

ausername, asurname, aid should be name/surname of the assigner.

busername, bsurname, bid should be name/surname of the assignee. They should be in format of array like ["aaa","bbb"]

pname, pdescription, stat should be name/description/status of the task.

pid is id of the project.

/API/projects

parameters:

ausername, asurname, aid should be name/surname of the assigner.

busername, bsurname, bid should be name/surname of the assignee. They should be in format of array like ["aaa","bbb"]

pname, body, stat should be name/body/status of the project.