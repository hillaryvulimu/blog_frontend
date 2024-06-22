// Fetch categories to create categories menu
// executed in main.js

import { posts_base_endpoint } from "./endpoints.js";
export default function categories() {
  fetch(`${posts_base_endpoint}categories/`)
    .then(response => response.json())
    .then(data => {
      const categoriesList = document.getElementById('dropdown-categories-list')
      categoriesList.innerHTML =''

      // Using fragment to avoid reflows & repaints
      const fragment = document.createDocumentFragment();
      data.forEach(category => {  
        const categoryItem = document.createElement('li');

        const categoryLink = document.createElement('a')
        categoryLink.classList.add('btn', 'btn-link', 'category-link');

        // set active if current category
        const urlParams = new URLSearchParams(window.location.search);
        let category_from_url = urlParams.get('category')
        if(category.category === category_from_url) {
          categoryLink.style.textDecoration = 'underline'
          categoryLink.classList.add('active');
        }
        categoryLink.setAttribute('href', `./posts.html?category=${category.category}`)
        categoryLink.textContent = category.category;

        categoryItem.appendChild(categoryLink)
        fragment.appendChild(categoryItem);
      });

      categoriesList.appendChild(fragment)
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });

}