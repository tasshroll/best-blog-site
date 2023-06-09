const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { Sequelize } = require('sequelize');

//////////////////////////////////
// GET ALL BLOGS IN DATABASE
// 127.0.0.1:3001 from browser
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
          attributes: ['content'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//////////////////////////////////
// GET A SINGLE BLOG BY ID
// 127.0.0.1:3001/# from homepage.handlebars when user selects from the list of blogs
router.get('/blog/:id', withAuth, async (req, res) => {

  // If the user is not logged in, redirect them to login
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['user_id', 'content', 'date_created', 'blog_id'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//////////////////////////////////
// GET USER PROFILE
// withAuth middleware prevents access to route by confirming user session exists
// 127.0.0.1:3001/profile 
// from login.js and main.handlebars (dashboard)
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const user_id = req.session.user_id;

    const blogData = await Blog.findAll({
      where: {
        user_id
      },
      include: [
        { model: User },
        { model: Comment, }
      ],
    });
    // serialize the array of blogs
    const blogs = blogData.map((el) => el.get({ plain: true }));
    // Extract the user's name from the first blog (it's the same for the remaining blogs)
    const userName = blogs.length > 0 ? blogs[0].user.name : '';

    //console.log(`Blogs written by ${userName} user are ${blogs}`);
    res.render('profile', {
      blogs,
      userName: userName,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// route: api/login
// from main.handlebars (dashboard)
// redirects to homepage and to login.js -> api/users/login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }
  res.render('login');
});

module.exports = router;
