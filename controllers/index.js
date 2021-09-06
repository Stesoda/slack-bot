const Response = require('../models/ResponseModel');

const ResponseController = async (req, res, next) => {
    var results = await Response.find({})
    .catch(error => console.log(error));;
    return res.status(200).send(results)
};

module.exports = ResponseController;