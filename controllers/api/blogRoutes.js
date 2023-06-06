const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a  NEW BLOG
// route : POST api/blogs/
// in profile.js, newBlogHandler
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

// Update an EXISTING BLOG
// route : PUT api/blogs/ID
// in profile.js, updateBlog
router.put('/:id', async (req, res) => {

  console.log(req.body)
  try {
    console.log(req.body);
    const updateBlog = await Blog.update(
      req.body,
       {
      where: {
        id: req.params.id
      }
    });
    console.log(res.updateBlog);

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
  //const blogId = parseInt(req.params.id, 10);
  const blog_id = req.params.id;

  console.log("blogId is ", blog_id);
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