const express = require('express');
const crypto = require('crypto');
const config = require('../configs/config.json');
const router = express.Router();
const {sign} = require('../utils/jwt');
const User = require('../models/user');

const {RequestResponse} = require('../utils/common');
// create new user
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const hac = crypto.createHmac('sha1', '').update(password).digest('hex')
    let expireTime = config.TOKEN_EXPIRE_TIME + (new Date()).getTime()
    if (req.body.rememberMe) {
        expireTime = config.TOKEN_EXPIRE_TIME_REMEMBER + (new Date()).getTime();
    }
    const tokenAccess = await sign({email});
    User.findOne({email: email}).then(user => {
        if(user.password === hac) {
            res.send(new RequestResponse({
                statusCode: 200,
                data: {
                    tokenAccess,
                    expireTime: expireTime
                }
            }))
        }
    })
    // User.create(req.body).then(user => {
    //     res.send(user)
    // });
})

router.post('/register', (req, res) => {
    User.create(req.body).then(user => {
        res.send(user)
    });
})

module.exports = router;