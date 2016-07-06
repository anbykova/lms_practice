function printHello(req, res, next) {
    throw err;
    next();
};

function printHello2(req, res, next) {
    console.log(req);
    res.send('helloworld2');
};
var controller = {
    printHello : printHello,
    printHello2 : printHello2
};

module.exports = controller;