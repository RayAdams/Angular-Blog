var db = require('../config/db');

exports.readByEmail = function(email) {
    return db.row('GetUserByEmail', [email]);
}

exports.read = function(id) {
    return db.row('GetUser', [id]);
}

exports.all = function() {
    return db.rows('GetUsers');
}

exports.create = function(email, password, firstName, lastName) {
    return db.row('InsertUser', [email, password, firstName, lastName]);
}