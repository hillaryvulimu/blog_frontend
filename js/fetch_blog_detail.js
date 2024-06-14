import fetchBlogs from './common/fetchBlogs.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Get the slug from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('nm');

  try {
    const data = await fetchBlogs({ endpoint: 'http://127.0.0.1:8000/api/v1/' + slug });
    
    createPostDetails(data);

  } catch (error) {
      console.error('Error fetching or displaying posts:', error);
  }


  // helper function to create the post details
  function createPostDetails(post){
    const postDetails = document.getElementById('post-details');
    postDetails.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">${post.title}</h1>
        <p class="card-text">Author: ${post.author.first_name} ${post.author.last_name}</p>
        <p class="card-text">${formatDateTime(post.created_at)}</p>
        <img src="${post.post_pic}" class="img-fluid mb-4" style="max-height: 400px;" alt="${post.title}">
        <div class="card-text">${post.body}</div>
      </div>
     </div>
    `;
  }
});

function formatDateTime(dateTimeString) {
  const postDate = new Date(dateTimeString);
  return postDate.toLocaleString(); // Adjust formatting as needed
}