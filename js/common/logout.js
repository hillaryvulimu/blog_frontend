export default async function logout() {
  const token = localStorage.getItem('authToken');
  document.getElementById('logout-button').addEventListener('click', (e) => {
    e.preventDefault()
    // get last visited page
    const lastVisited = sessionStorage.getItem('lastVisitedPage') || './login.html'
    if (token) {
      fetch('http://127.0.0.1:8000/api/v1/dj-rest-auth/logout/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}` // token in local storage
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.detail === 'Successfully logged out.') {
        localStorage.removeItem('authToken');
        
        // go back to login page
        window.location.href = './login.html?msg=You\'ve logged out.';
      } else {
        alert('Logout failed. Check your connection and try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  } else {
    window.location.href = './login.html?msg=You are not logged in.';
  }
});
}