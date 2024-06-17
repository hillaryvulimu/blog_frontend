const token = localStorage.getItem('authToken');
const lastVisitedPage = sessionStorage.getItem('lastVisitedPage') || './posts.html';

// if logged in, redirect to last page visited
if(token){
  window.location.href = lastVisitedPage
}

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const formErrors = document.getElementById('form-errors');
  const usernameErrors = document.getElementById('username-error');
  const passwordErrors = document.querySelector('#password-error');
  
  fetch('http://127.0.0.1:8000/api/v1/dj-rest-auth/login/', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    if (data.key) {
      localStorage.setItem('authToken', data.key);
      // redirect to last visited page, as saved in sessionstorage. chk main.js
      window.location.href = lastVisitedPage;

    } else {  
      
      // display the various error messages, and remove d-none from the elements
      formErrors.classList.remove('d-none');
      formErrors.textContent = data.non_field_errors || '';

      usernameErrors.classList.remove('d-none');
      usernameErrors.textContent = data.username || '';

      passwordErrors.classList.remove('d-none');
      passwordErrors.textContent = data.password || ''; 
    }
  })
  .catch(error => {
    console.error('Error:', error);
    formErrors.textContent = 'An error occurred. Please try again.';
  });
});

// show any msg from other pages
const urlParams = new URLSearchParams(window.location.search)
const messageDiv = document.getElementById('message-div')
const message = urlParams.get('msg')
if(message){
  messageDiv.classList.remove('d-none')
  messageDiv.textContent = message
}
