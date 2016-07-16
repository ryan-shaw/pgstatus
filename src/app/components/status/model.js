const sequelize = require('../../../models').sequelize;
const Sequelize = require('../../../models').Sequelize;

var Status = sequelize.define('status', {
    ip_address: {
        type: Sequelize.STRING,
        field: 'ip_address', // Will result in an attribute that is firstName when user facing but first_name in the database
        validate: {
            isIP: true
        }
    },
    status: {
        type: Sequelize.ENUM('up', 'unstable', 'down')
    },
    sid: {
        type: Sequelize.STRING
    }
});

Status.sync();

module.exports = Status;
