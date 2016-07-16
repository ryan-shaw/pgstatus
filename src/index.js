if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
    console.log('Starting in development mode...');
}

const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');


const app = express();

app.use(favicon(__dirname + '/app/public/favicon.ico'));
app.use(express.static('app/public/'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
require('./app/routes')(app)

app.listen(8000, () => {
    console.log('Web server started');
});
