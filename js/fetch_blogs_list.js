import fetchBlogs from './common/fetchBlogs.js';

document.addEventListener('DOMContentLoaded', async () => {
const postsContainer = document.getElementById('posts-container');

  try {
      const data = await fetchBlogs({ endpoint: 'http://127.0.0.1:8000/api/v1/' });
      // Using fragment to avoid reflows & repaints
      const fragment = document.createDocumentFragment();
      data.forEach(post => {
          const postElement = createPostCard(post);
          fragment.appendChild(postElement);
      });
      postsContainer.appendChild(fragment);
  } catch (error) {
      console.error('Error fetching or displaying posts:', error);
  }
});

  
// Helper function to format date created
function formatDateTime(dateTimeString) {
  const postDate = new Date(dateTimeString);
  const currentDate = new Date();
  const timeDifference = currentDate - postDate;

  // Calc time difference in seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
      // If the post is older than 24 hours, return the date
      return postDate.toLocaleDateString();
  } else if (hours >= 1) {
      // If the post is older than 1 hour but less than 24 hours, return hours ago
      return `${hours} hours ago`;
  } else if (minutes >= 1) {
      // If the post is older than 1 minute but less than 1 hour, return minutes ago
      return `${minutes} minutes ago`;
  } else {
      // If the post is less than 1 minute old, return seconds ago
      return `${seconds} seconds ago`;
  }
}

// Helper func to dynamically create posts cards 
function createPostCard(post) {
  const postElement = document.createElement('div');
  postElement.classList.add('col-md-4', 'mb-4');

  postElement.innerHTML = `
    <a href="./blog_detail.html?nm=${post.slug}" class="text-decoration-none text-dark">
      <div class="card h-100">
        <img src="${post.post_pic}" class="card-img-top img-fluid" alt="${post.title}">
        <div class="card-body">
          <p class="post-info">
            <span class="post-category">${post.category} &#183;</span>
            <span class="date-created">${formatDateTime(post.created_at)}</span>
          </p>
          <h5 class="card-title">${post.title}</h5>
          <p class="author">By ${post.author.first_name}</p>
        </div>
      </div>
    </a>
  `;

  return postElement;
}
