var copCont  = require('../controllers/copController');

module.exports = [
    {
        method : 'get', url : '/', callback : copCont.getAll
    },{
        method : 'get', url : '/:id', callback : copCont.getItem
    },{
        method : 'post', url : '/', callback : copCont.createItem
    },{
        method : 'put', url : '/:id', callback : copCont.updateItem
    },{
        method : 'delete', url : '/:id', callback : copCont.deleteItem
    }
];