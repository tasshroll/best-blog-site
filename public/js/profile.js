const newBlogHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#project-name').value.trim();
  const date_created = Date.now();
  const post = document.querySelector('#project-desc').value.trim();
  console.log ("In profile.js and blog title  is ", title)
  console.log ("In profile.js and blog post content is ", post)
 
  // Create new blog post with title, date_created, and post
  if (title && post) {
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
};

const delBlogHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete blog');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newBlogHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delBlogHandler);
