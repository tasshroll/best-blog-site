const Blog = require('./Blog');
const Comment = require('./Comment');
const User = require('./User');

// Blog and Comment Association
Blog.hasMany(Comment, {
  foreignKey: 'comment_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Blog, {
  foreignKey: 'comment_id'
});


// User and Comment Association
User.hasMany(Comment, {
foreignKey: 'user_id'
});

Comment.belongsTo(User), {
foreignKey: 'user_id'}

module.exports = { Blog, Comment, User };
