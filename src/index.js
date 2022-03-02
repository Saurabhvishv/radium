const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/saurabh_front?retryWrites=true&w=majority", { useNewUrlParser: true ,useUnifiedTopology:true})
.then(()=> console.log('mongooserunning on 27017'))
.catch(err => console.log(err))
app.use('/', route);

// app.get('/app',(req,res) {
// 	res.send({
// 		data:
// 	});
//   });

app.listen(process.env.PORT || 6000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 6000))
});