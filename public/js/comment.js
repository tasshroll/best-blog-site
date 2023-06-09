const newCommentHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-content').value.trim();
  const date_created = Date.now();

  if (content) {

    // POST the new COMMENT
    const id = window.location.pathname.split("/").pop();
    const response = await fetch(`/api/blogs/comment/${id}`, {
      method: 'POST',
      body: JSON.stringify({ content, date_created }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // list all the blogs
      location.reload();
    } else {
      console.log(response.status);
      alert('Failed to add comment');
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', newCommentHandler);