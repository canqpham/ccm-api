const express = require('express');
const {auth} = require('../midleware/auth');
const router = express.Router();

const Book = require('../models/bookModel');

// create new user
router.post('/book', async (req, res) => {
    // var token = req.headers.accesstoken;
    // console.log(req.headers.accesstoken)
    var id = await auth(req.headers.accesstoken)
    // console.log(id)

    Book.create({...req.body, userId: id}).then(book => {
        res.send(book)
    });
})

module.exports = router;