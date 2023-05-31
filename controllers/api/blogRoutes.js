const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// post - Create a  NEW BLOG
router.post('/', withAuth, async (req, res) => {

  console.log("in api/blogs (blogRoutes) at post / Creating New Blog")
  try {
    console.log(req.body);
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(res.newBlog);

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});



// // post - Create a new comment on a BLOG
router.post('/comment/:id', async (req, res) => {
  const user_id = req.session.user_id;
  //const blogId = parseInt(req.params.id, 10);
  const blog_id = req.params.id;

  console.log ("blogId is ", blog_id);
  console.log(`Inside blogRoutes POST to api/blogs/comment/:id }) where id = `, blog_id);
  try {
    console.log(req.body);
    const commentData = await Comment.create({
      ...req.body,
      user_id,
      blog_id
    });

    console.log(commentData);
    res.status(200).json(commentData);

  } catch (err) {
    console.log("Error posting comment");
    res.status(500).json(err);
  }
});



//router.delete('/:id', withAuth, async (req, res) => {
router.delete('/:id', async (req, res) => {

  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;