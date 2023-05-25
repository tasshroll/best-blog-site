const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData);
  // const users = await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });


  const blog = await Blog.bulkCreate(blogData);


  //   for (const project of projectData) {
  //     await Project.create({
  //       ...project,
  //       user_id: users[Math.floor(Math.random() * users.length)].id,
  //     });
  //   }

  process.exit(0);
};

seedDatabase();