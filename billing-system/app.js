var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/billing');

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB at 27017')
});

mongoose.connection.on('err', (err) => {
    if(err){
        console.log('Error in Database connection: '+err);
    }
});


const port = 3000;

app.use(cors());

app.use('/api', route);


app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Something is up!');
})


app.listen(port, () => {
    console.log('Server Started at port: '+port);
})