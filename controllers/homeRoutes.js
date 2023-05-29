const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data and comment data
    const blogData = await Blog.findAll({
      include: [
        // {
        //   model: User,
        //   attributes: ['name'],
        // },
        {
            model: Comment,
            attributes: ['comment'],
          },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log (blogs);

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });
    console.log(project);
    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
console.log(req.session);
  try {
    console.log("In profile route");
    // Find the logged in user based on the session ID
    const blogData = await Blog.findAll( {
      where : {
      user_id: req.session.user_id
    }
    });
    // serialize the array of blogs
    const blogs = blogData.map ((el) => el.get({ plain: true }));
    console.log ("Blog data is ", blogs);
    res.render('profile', {
      ...blogs,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

module.exports = router;
