// import models
import Like from "./Like.js";
import Post from "./Post.js";
import User from "./User.js";

// Users have many Posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Post belongs to User
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// Like belongs to Post
// Like belongs to User
Post.hasMany(Like, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Like.belongsTo(Post, {
  foreignKey: 'post_id',
});

User.hasMany(Like, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Like.belongsTo(User, {
  foreignKey: 'user_id',
});

export { User, Post, Like };