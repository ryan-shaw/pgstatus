
const StatusModel = require('./model');
const _ = require('lodash');
let app = {};

app.get = (req, res) => {
    StatusModel.findAll({})
    .then((data) => {
        res.json({
            status: 'up'
        });
        console.log(data);
    });
};

app.post = (req, res) => {
    const status = req.body.status;
    const flag = _.includes(['up', 'unstable', 'down'], status);
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if(flag){
        StatusModel.create({
            status: status,
            ip_address: ip
        }).then((data) => {
            res.status(201).send();
        });
    }else{
        res.status(400).send();
    }
};

module.exports = app;
