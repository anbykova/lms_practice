var copCont  = require('../controllers/copController');

module.exports = [
    {method : 'get',url : '/', callback : copCont.printHello},
    {method : 'get', url : '/hello', callback : copCont.printHello2}
];