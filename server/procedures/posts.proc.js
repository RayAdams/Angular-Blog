var db = require('../config/db');

exports.all = function() {
    return db.rows('GetPosts');
}
exports.read = function(id) {
    return db.row('GetPost', [id]);
}
exports.update = function(title, content, id, categoryid) {
    return db.empty('UpdatePost', [title, content, id, categoryid]);
}
exports.destroy = function(id) {
    return db.empty('DeletePost', [id]);
}
exports.create = function(userid, title, content, category) {
    return db.row('InsertPost', [userid, title, content, category])
}