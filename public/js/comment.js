const newCommentHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-content').value.trim();
  const date_created = Date.now();

  console.log("In COMMENT.js and blog comment  is ", content, " and date is ", date_created);

  if (content) {

    //const response = await fetch(`/api/blogs/comment/${id}`, {
    // POST a new COMMENT
    console.log("POSTING TO /api/blogs with id");
    // const response = await fetch(`/api/blogs/comment${id}`, {
    const response = await fetch(`/api/blogs/comment`, {

      method: 'POST',
      body: JSON.stringify({ content, date_created }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // list all the blogs
      //document.location.replace('/');
      console.log("POSTING NEW COMMENT SUCCESSFULL!");
    } else {
      console.log(response.status);
      alert('Failed to add comment');
    }
  }
};


document
  .querySelector('.comment-form')
  .addEventListener('submit', newCommentHandler);