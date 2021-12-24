const express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer') // HERE

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any()) // HERE


const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/Group-8AGRP?retryWrites=true&w=majority")
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))


app.use('/', route);

app.listen(process.env.PORT || 3001, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3001))
});