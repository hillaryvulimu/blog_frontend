import fetchPosts from './common/fetchPosts.js'
import { posts_base_endpoint } from './common/endpoints.js';

const searchInput = document.getElementById('search-input');
const searchResultsContainer = document.getElementById('search-results');

searchInput.addEventListener('keyup', async (e) => {
  e.preventDefault(); // Prevent submission
  
  const searchTerm = searchInput.value.trim();
  
  if (searchTerm) {
    try {
      const data = await fetchPosts({
        endpoint: `${posts_base_endpoint}search/`,
        searchTerm: searchTerm
      });
      
      // Clear previous search results
      searchResultsContainer.innerHTML = '';
      
      // Handle empty results
      if (!data || data.length === 0) {
        searchResultsContainer.innerHTML = `
          <ul class="list-group">
            <li class="list-group-item">No Results</li>
          </ul>
        `;
        return;
      }
      
      // Create Results <ul> with Bootstrap classes
      const resultList = document.createElement('ul');
      resultList.classList.add('list-group');
      
      // Iterate over the posts if data is an array
      const fragment = document.createDocumentFragment();
      data.forEach(post => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        
        // Create link to post detail page (adjust href as needed)
        const postLink = document.createElement('a');
        postLink.href = `./post_detail.html?nm=${post.slug}`; // Example href, adjust as needed
        postLink.classList.add('fw-bold', 'text-decoration-none');
        postLink.textContent = post.title;
        
        // Create small element for trimmed text
        const trimmedText = document.createElement('small');
        trimmedText.classList.add('text-muted');
        trimmedText.textContent = trimTextWithHighlight(post.body, searchTerm);
        
        // Append elements to list item
        listItem.appendChild(postLink);
        listItem.appendChild(document.createElement('br')); // Line break
        listItem.appendChild(trimmedText);
        
        // Append list item to fragment
        fragment.appendChild(listItem);
      });

      // append fragment to the results list
      resultList.append(fragment)
      
      // Append result list to container
      searchResultsContainer.appendChild(resultList);
      
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Handle error (e.g., display an error message)
    }
  } else {
    // Handle empty search term (optional)
    searchResultsContainer.innerHTML = ''
  }
});

// Function to trim text and highlight search term
function trimTextWithHighlight(text, searchTerm) {
  const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
  if (index === -1) {
    return text.length > 30 ? text.slice(0, 30) + '...' : text;
  } else {
    const start = Math.max(index - 15, 0);
    const end = Math.min(index + searchTerm.length + 15, text.length);
    const trimmed = (start > 0 ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '');
    return trimmed;
  }
}
