const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
//const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data and comment data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
            model: Comment,
            attributes: ['comment'],
          },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log (blogs);
    res.status(200).json(blogs);

    // Pass serialized data and session flag into template
    // res.render('homepage', { 
    //   blogs, 
    //   logged_in: req.session.logged_in 
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});