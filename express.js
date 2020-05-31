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
        ret = JSON.stringify(ret);
        ret = { "length": ret.length, "result": ret }; //add pagnination
        res.end(JSON.stringify(ret));
    })();
});
app.get('/API/tasks', function (req, res) {
    (async () => {
        var ret = await users.findAll({
            where: {
                pname: req.query.pname !== undefined ? req.query.pname : ne,
                pdescription: req.query.pdescription !== undefined ? req.query.pdescription : ne,
                pdescription: req.query.pdescription !== undefined ? req.query.pdescription : ne,
                
            }
        });
        ret = JSON.stringify(ret);
        ret = { "length": ret.length, "result": ret };
        res.end(JSON.stringify(ret));
    })();
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

})
