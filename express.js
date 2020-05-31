const express = require('express');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const config = require('./config');

var app = express();
//define database object and models 
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING(50),
    email: Sequelize.STRING(50),
    surname: Sequelize.STRING(50),
}, {
    timestamps: false
});
var tasks = sequelize.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pname: Sequelize.STRING(50),
    pdescription: Sequelize.STRING(50),
    score: Sequelize.INTEGER,
    stat: ['active', 'inactive', 'declined', 'completed'],
    pid: Sequelize.INTEGER,
    assignee: Sequelize.ARRAY(Sequelize.INTEGER),
    assigner: Sequelize.INTEGER
}, {
    timestamps: false
});
//define apis
const ne = {
    [Op.ne]: null
};
app.get('/API/users', function (req, res) {
    (async () => {
        var ret = await users.findAll({
            where: {
                username: req.query.username !== undefined ? req.query.username : ne,  // check if it is defined
                surname: req.query.surname !== undefined ? req.query.surname : ne
            }
        });
        ret = { "length": ret.length, "result": JSON.stringify(ret) }; //add pagnination
        res.end(JSON.stringify(ret));
    })();
});
app.get('/API/tasks', function (req, res) {
    (async () => {
        var assigner = await users.findAll({
            where: {
                username: req.query.ausername !== undefined ? req.query.ausername : ne,
                surname: req.query.asurname !== undefined ? req.query.asurname : ne,
                id: req.query.aid !== undefined ? req.query.aid : ne,
            }
        });
        assigner = JSON.parse(JSON.stringify(assigner));
        var assignerId = [];
        for (t in assigner) {
            assignerId.push(assigner[t].id);
        }
        var assignee = await users.findAll({
            where: {
                username: req.query.busername !== undefined ? JSON.parse(req.query.busername) : ne,
                surname: req.query.bsurname !== undefined ? JSON.parse(req.query.bsurname) : ne,
                id: req.query.bid !== undefined ? req.query.bid : ne,
            }
        });
        assignee = JSON.parse(JSON.stringify(assignee));
        var assigneeId = [];
        for (t in assignee) {
            assigneeId.push(assignee[t].id);
        }
        var ret = await tasks.findAll({
            where: {
                pname: req.query.pname !== undefined ? req.query.pname : ne,
                pdescription: req.query.pdescription !== undefined ? req.query.pdescription : ne,
                score: req.query.score !== undefined ? req.query.score : ne,
                stat: req.query.stat !== undefined ? req.query.stat : ne,
                assignee: assignee !== [] ? {[Op.contains] : assigneeId} : ne,
                assigner: assigner !== [] ? assignerId : ne,
            }
        });
        ret = { "length": ret.length, "result": JSON.stringify(ret) };
        res.end(JSON.stringify(ret));
    })();
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

})
