const userDao = require('../dao/userDao')
const messages = require('../constants/constants')
exports.SuccessfulPostData = function (request, response, data) {
    response.writeHead(200, { 'Content-type': 'application/json' });
    if (data) {
        //response.end(JSON.stringify(Object.values(msg.rows[0])[0]));
        //console.log(data)
        var output = {
            "code":200,
            "message":messages.REST_MESSAGES.EVERYTHING_LOOKS_GOOD,
            "data":data
        }
        response.end(JSON.stringify(output));
    }
    else {
        response.end();
    }
}
exports.Error500 = function (request, response, err) {
    response.writeHead(500, 'Internal server error!', { 'Content-type': 'application/json' });
    response.write(JSON.stringify({ error: `Internal server error: ${err}` }));
    response.end();
}

exports.Error400 = function (request, response, err) {
    response.writeHead(404, 'Bad request!', { 'Content-type': 'application/json' });
    response.write(JSON.stringify({ error: `Bad request: ${err}` }));
    response.end();
}

function createTable()
{
    userDao.createUserTable()
}

module.exports.createTable = createTable