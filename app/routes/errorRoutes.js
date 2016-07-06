function exception(err, req, res, next) {
    res.send('It\'s error!');
};

function notFound(req, res) {
    res.status(404).send('Sorry cant find that!');
};

error = {
    exception : exception,
    notFound  : notFound
};

module.exports = error;