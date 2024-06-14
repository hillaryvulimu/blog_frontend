import fetchBlogs from './common/fetchBlogs.js';

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


// function to update pagination
function updatePaginationControls(page, totalPages) {
  const blogsUrl = './blogs.html'
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = '';

  const paginationElement = document.createElement('nav');
  paginationElement.setAttribute('aria-label', 'Page navigation');
  const paginationList = document.createElement('ul');
  paginationList.classList.add('pagination');

  // Previous button
  const prevItem = document.createElement('li');
  prevItem.classList.add('page-item');
  if (page === 1) {
    prevItem.classList.add('disabled');
  }
  const prevLink = document.createElement('a');
  prevLink.classList.add('page-link');
  prevLink.href = `${blogsUrl}?page=${page-1}`;
  prevLink.textContent = 'Previous';
  
  prevItem.appendChild(prevLink);
  paginationList.appendChild(prevItem);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement('li');
    pageItem.classList.add('page-item');
    if (i === page) {
      pageItem.classList.add('active');
    }
    const pageLink = document.createElement('a');
    pageLink.classList.add('page-link');
    pageLink.href = `${blogsUrl}?page=${i}`;
    pageLink.textContent = i;

    pageItem.appendChild(pageLink);
    paginationList.appendChild(pageItem);
  }

  // Next button
  const nextItem = document.createElement('li');
  nextItem.classList.add('page-item');
  if (page === totalPages) {
    nextItem.classList.add('disabled');
  }
  const nextLink = document.createElement('a');
  nextLink.classList.add('page-link');
  nextLink.href = `${blogsUrl}?page=${page+1}`;
  nextLink.textContent = 'Next';
  
  nextItem.appendChild(nextLink);
  paginationList.appendChild(nextItem);

  paginationElement.appendChild(paginationList);
  paginationContainer.appendChild(paginationElement);
}
  


// fetch blogs, and update DOM
document.addEventListener('DOMContentLoaded', async () => {
  const postsContainer = document.getElementById('posts-container');
  
    try {
      // get page number from url
      const urlParams = new URLSearchParams(window.location.search);
      let pageNum = urlParams.get('page');
      pageNum = pageNum ? parseInt(pageNum, 10) : 1; // coz page num is passed as string

      // fetch data for each page
      const data = await fetchBlogs({ page: pageNum });
      // Using fragment to avoid reflows & repaints
      const fragment = document.createDocumentFragment();
      data.results.forEach(post => {
          const postElement = createPostCard(post);
          fragment.appendChild(postElement);
      });
      postsContainer.appendChild(fragment);

      // update pagination accordingly, getting page number from url
      updatePaginationControls(pageNum, Math.ceil(data.count / 12));

    } catch (error) {
        console.error('Error fetching or displaying posts:', error);
    }
  });