import fetchPosts from './common/fetchPosts.js';

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
    <a href="./post_detail.html?nm=${post.slug}" class="text-decoration-none text-dark">
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
  const postsUrl = './posts.html'
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
  prevLink.href = `${postsUrl}?page=${page-1}`;
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
    pageLink.href = `${postsUrl}?page=${i}`;
    pageLink.textContent = i;

    pageItem.appendChild(pageLink);
    paginationList.appendChild(pageItem);
  }

  // Next button
  const nextItem = document.createElement('li');
  nextItem.classList.add('page-item');
  //disable btn on last page, or on  pages that have few items making
  // Math func result in NaN, e.g. category with <12 items
  if (page === totalPages || !totalPages) {
    nextItem.classList.add('disabled');
  }
  const nextLink = document.createElement('a');
  nextLink.classList.add('page-link');
  nextLink.href = `${postsUrl}?page=${page+1}`;
  nextLink.textContent = 'Next';
  
  nextItem.appendChild(nextLink);
  paginationList.appendChild(nextItem);

  paginationElement.appendChild(paginationList);
  paginationContainer.appendChild(paginationElement);
}
  


// fetch posts, and update DOM
document.addEventListener('DOMContentLoaded', async () => {
  const postsContainer = document.getElementById('posts-container');
  
    try {
      // get page number from url
      const urlParams = new URLSearchParams(window.location.search);
      let category = urlParams.get('category')
      let pageNum = urlParams.get('page');
      pageNum = pageNum ? parseInt(pageNum, 10) : 1; // coz page num is passed as string

      // fetch data based on available options 
      const listTitle = document.getElementById('lists-title') // show category, search term, etc     
      let options = {}
      if(pageNum){
        options.page = pageNum
      }
      if (category){
        options.category = category
        listTitle.textContent = category
      }

      const data = await fetchPosts(options);

      // use the data to generate content
      if(category){
        document.title = category + ' Category'
        postsContainer.appendChild(loopThruData(data)); 

        // add active class to item on categories menu
        const anchorTags = document.querySelectorAll('.category-link');
    
        anchorTags.forEach(anchorTag => {
          // Check if the text content of the anchor tag matches the category
          if (anchorTag.textContent === category) {
            // Add the custom-active-class to the parent list item
            anchorTag.classList.add('active');
            anchorTag.style.textDecoration = 'underline'
          }
        });
      }
      else {
        postsContainer.appendChild(loopThruData(data.results)); 
      }

      // update pagination accordingly, getting page number from url
      updatePaginationControls(pageNum, Math.ceil(data.count / 12));

    } catch (error) {
        console.error('Error fetching or displaying posts:', error);
    }
  });


  // function to loop thru data
  function loopThruData(data){
     // Using fragment to avoid reflows & repaints
    const fragment = document.createDocumentFragment();
      data.forEach(post => {
          const postElement = createPostCard(post);
          fragment.appendChild(postElement);
      });
      
      return fragment
  }
  