
const StatusModel = require('./model');
const sequelize = require('../../../models').sequelize;
const _ = require('lodash');
const moment = require('moment');
let app = {};

const getVal = (arr, status) => {
    let state = _.find(arr, {status: status});
    if(state){
        return state.dataValues.count;
    }else{
        return 0;
    }
}

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
        let state = 'up';
        let up = getVal(data, 'up');
        let down = getVal(data, 'down');
        let unstable = getVal(data, 'unstable');
        let total = up + down + unstable;
        console.log(`Up: ${up}`);
        console.log(`Down: ${down}`);
        console.log(`Unstable: ${unstable}`);
        if(data.length > 0){
            if(down > total / 2){
                state = 'down';
            }else if((down + unstable) > total / 2){
                state = 'unstable'
            }
        }
        res.json({
            status: state
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
