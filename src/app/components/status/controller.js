
const StatusModel = require('./model');
const sequelize = require('../../../models').sequelize;
const _ = require('lodash');
const moment = require('moment');
let app = {};

app.get = (req, res) => {
    // SELECT COUNT(*) as count, status FROM statuses WHERE createdAt > NOW() - INTERVAL 15 MINUTE GROUP BY status
    StatusModel.findAll({
        group: 'status',
        where: {
            createdAt: {
                $gt: moment().subtract(15, 'minutes')
            }
        },
        attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count'], 'status']
    })
    .then((data) => {
        // res.json(data);
        res.json({
            status: 'up'
        });
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
