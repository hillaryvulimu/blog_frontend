document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('posts-container');

  fetch('http://127.0.0.1:8000/api/v1/')
    .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
    // using fragment to avoid reflows & repaints
      const fragment = document.createDocumentFragment();
      data.forEach(post => {
          const postElement = createPostCard(post);
          fragment.appendChild(postElement);
      });
      postsContainer.appendChild(fragment);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
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
      <a href="${post.slug}" class="text-decoration-none text-dark">
        <div class="card h-100">
          <img src="${post.post_pic}" class="card-img-top img-fluid" alt="${post.title}">
          <div class="card-body">
            <p class="post-info">
              <span class="post-category">Category &#183;</span>
              <span class="date-created">${formatDateTime(post.created_at)}</span>
            </p>
            <h5 class="card-title">${post.title}</h5>
            <p class="author">${post.author.first_name}</p>
          </div>
        </div>
      </a>
    `;

    return postElement;
}
