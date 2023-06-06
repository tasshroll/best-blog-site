const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a  NEW BLOG
// route : POST api/blogs/
// in profile.js, newBlogHandler
router.post('/', withAuth, async (req, res) => {

  // console.log("in api/blogs (blogRoutes) at post / Creating New Blog")
  try {
    console.log(req.body);
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update an EXISTING BLOG
// route : PUT api/blogs/ID
// in profile.js, updateBlog
router.put('/:id', async (req, res) => {

  try {
    const updateBlog = await Blog.update(
      req.body,
       {
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(updateBlog);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


// Create a  NEW COMMENT on a blog
// route : POST api/blogs/comment/:id
// in comment.js, newCommentHandler
router.post('/comment/:id', async (req, res) => {
  const user_id = req.session.user_id;
  const blog_id = req.params.id;

  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id,
      blog_id
    });

    res.status(200).json(commentData);

  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE a user blog
// route : DELETE api/blogs/:id
// in profile.js, delBlogHandler
router.delete('/:id', withAuth, async (req, res) => {

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