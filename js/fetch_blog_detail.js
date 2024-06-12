document.addEventListener('DOMContentLoaded', () => {
  // Get the slug from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  
  // Fetch blog post details using the slug
  fetch(`http://127.0.0.1:8000/api/v1/${slug}`)
  .then(response => response.json())
  .then(post => {
    const postDetails = document.getElementById('post-details');
    postDetails.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">${post.title}</h1>
        <p class="card-text">Author: ${post.author.first_name} ${post.author.last_name}</p>
        <p class="card-text">Published: ${formatDateTime(post.created_at)}</p>
        <img src="${post.post_pic}" class="img-fluid mb-4" style="max-height: 400px;" alt="${post.title}">
        <div class="card-text">${post.body}</div>
      </div>
     </div>
    `;
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
});

function formatDateTime(dateTimeString) {
  const postDate = new Date(dateTimeString);
  return postDate.toLocaleString(); // Adjust formatting as needed
}