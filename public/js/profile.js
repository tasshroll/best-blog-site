async function newBlogHandler() {
  //event.preventDefault();

  const newForm = document.querySelector('.new-project-form');
  const title = document.querySelector('#project-name').value.trim();
  const date_created = Date.now();
  const post = document.querySelector('#project-desc').value.trim();

  // Create new blog post with title, date_created, and post
  if (title && post) {
    console.log("Creating a new blog!");
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ title, date_created, post }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // list all the blogs including this new one at the bottom
      document.location.replace('/');
    } else {
      console.log(response.status);
      alert('Failed to create blog');
    }
  }

  newForm.style.display = 'block';
};


// Function to edit a blog
async function editBlog(blogId) {
  event.preventDefault();

  const blogElement = event.target.closest('.row');
  const blogTitle = blogElement.querySelector('.blog-title').textContent;
  const blogPost = blogElement.querySelector('.blog-post').textContent;

  // Use the blogId, blogTitle, and blogPost for editing the blog

  // Log the values to the console
  console.log("Blog ID:", blogId);
  console.log("Blog Title:", blogTitle);
  console.log("Blog Post:", blogPost);

  // Pre-fill the form with the current blog data
  const editForm = document.querySelector('.edit-project-form');
  const editTitleInput = document.querySelector('#edit-title');
  const editContentInput = document.querySelector('#edit-content');

  // Fill in the edit form with the blog data
  editTitleInput.value = blogTitle;
  editContentInput.value = blogPost;

  // Show the edit form
  editForm.style.display = 'block';
};

// Function to update blog in database
async function updateBlog(blogId) {
  event.preventDefault();


  const title = document.querySelector('#edit-title').value.trim();
  const date_created = Date.now();
  const post = document.querySelector('#edit-content').value.trim();

  // Create new blog post with title, date_created, and post
  if (title && post) {
    console.log("Updating a blog WITH ID, ", blogId);
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, date_created, post }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // list all the blogs including this new one at the bottom
      document.location.replace('/');
    } else {
      console.log(response.status);
      alert('Failed to update blog');
    }
  }
};



// Delete a blog given its ID
async function deleteBlog(blogId) {
  const response = await fetch(`/api/blogs/${blogId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert('Failed to delete blog');
  }
}


// Event handler for all the click events
// in profile.handlebars
function handleButtonClick(event) {
  console.log("button clicked");
  // call deleteBlog if the clicked element has the class 'deleteBlog'
  if (event.target.classList.contains('deleteBlog')) {
    const blogId = event.target.getAttribute('data-id');
    deleteBlog(blogId);
  }

  // call editBlog if the clicked element has the class 'editBlog'
  if (event.target.classList.contains('editBlog')) {
    const blogId = event.target.getAttribute('data-id');
    editBlog(blogId);
  }

  // call newBlog if the clicked element has the class 'newBlog'
  if (event.target.classList.contains('newBlog')) {
    newBlogHandler();
  }

  // call newBlog if the clicked element has the class 'create-Blog'
  if (event.target.classList.contains('create-blog')) {
    newBlogHandler();
  }

  // call newBlog if the clicked element has the class 'update-blog'
  if (event.target.classList.contains('update-blog')) {
    const blogId = event.target.getAttribute('data-id');
    console.log("Calling updateBlog with id of ", blogId);
    updateBlog(blogId);
  }
}

// Add event listener to a parent element that contains the edit & delete buttons
document.querySelector('.flex-column').addEventListener('click', handleButtonClick);
