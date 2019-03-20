const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// set up express app
const app = express();

// console.log(process.env)
//connect mongoose
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
// routes
const auth = require('./routes/auth');
const book = require('./routes/book');


const Book = require('./models/bookModel');

app.use(bodyParser.json())

app.use('/api', auth)
app.use('/api', book)

// create the welcome content
app.get('/', (req, res) => {
    res.send('Welcome to CCM Apis')
  })

const port = process.env.PORT || 8000;

//listen for requests
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

