// Fetch categories to create categories menu

fetch('http://127.0.0.1:8000/api/v1/categories/')
  .then(response => response.json())
  .then(data => {
    const categoriesList = document.getElementById('dropdown-categories-list')
    categoriesList.innerHTML =''
    // Using fragment to avoid reflows & repaints
    const fragment = document.createDocumentFragment();
    data.forEach(category => {  
      const categoryItem = document.createElement('li');

      const categoryLink = document.createElement('a')
      categoryLink.classList.add('btn', 'btn-link', 'category-link', 'custom-active-class')
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