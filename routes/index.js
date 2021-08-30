const express = require('express');
const Response = require('../models/ResponseModel');
const router = express.Router();

router.get('/response', async (req, res, next) => {
    var results = await Response.find({})
    .catch(error => console.log(error));;
    return res.status(200).send(results)
});

module.exports = router;