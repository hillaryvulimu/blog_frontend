import logout from './common/logout.js'
import categories from './common/fetch_categories.js'

/* Function to add `active` class to active link */
function highlightActiveLinks() {
  // Get the current URL pathname
  const currentPath = window.location.pathname;

  // Get all nav links
  const navLinks = document.querySelectorAll('.nav-link');

  // Loop through each nav link
  navLinks.forEach(link => {
    // Get the link's href attribute
    const href = link.getAttribute('href');

    // Extract the file name from currentPath
    const currentFileName = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    // Extract the last part of the href attribute (file name)
    const hrefFileName = href.substring(href.lastIndexOf('/') + 1);

    // Check if the link's href matches the current file name
    if (hrefFileName === currentFileName) {
        // Add the 'active' class to the link
        link.classList.add('active');
        // add aria-content for web accessibility
        link.setAttribute('aria-current', 'page')
    }
  });
}


/* function to load common html content from ./common */
async function loadContent() {
  const headerResponse = await fetch('./common/header.html');
  const headerContent = await headerResponse.text();
  document.getElementById('header').innerHTML = headerContent;

  const footerResponse = await fetch('./common/footer.html');
  const footerContent = await footerResponse.text();
  document.getElementById('footer').innerHTML = footerContent;

  // After loading header and footer content, highlight active links, and load categories
  highlightActiveLinks();
  categories();

  /* Toggle Light/Dark modes */
  const modeBtn = document.getElementById('theme-toggle')
  const htmlTag = document.documentElement // the <html> tag
  const darkIcon = document.getElementById('dark-icon')
  const lightIcon = document.getElementById('light-icon')

  /* Add scroll to top */
  const scrollToTopBtn = document.getElementById('scroll-to-top')

  // Show/hide the button based on scroll position
  window.addEventListener('scroll', function() {
    // Adjust the threshold as needed (e.g., 200 pixels)
    if (window.scrollY > 200) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  })

  // hide login/signup pages if logged in, hide Logout, if not
  const token = localStorage.getItem('authToken'); 
  const signupLink  = document.getElementById('signup-link')
  const loginLink = document.getElementById('login-link')
  const logoutLink  = document.getElementById('logout-link')
  const profilePic = document.getElementById('profile-pic')

  if(token){
    logoutLink.classList.remove('d-none')
    profilePic.classList.remove('d-none')
  } else{
    signupLink.classList.remove('d-none')
    loginLink.classList.remove('d-none')
  }

  // Logout functionality
  logout()

  // Load the current theme from local storage if abailable
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
      htmlTag.setAttribute('data-bs-theme', savedTheme);

      if (savedTheme === 'light') {
        darkIcon.style.display = 'inline-block'
        lightIcon.style.display = 'none'
      }
      else {
        lightIcon.style.display = 'inline-block'
        darkIcon.style.display = 'none'
      }
  }
  else {
    // show darkIcon if no savedTheme, coz it'll be light by default
    darkIcon.style.display = 'inline-block'
  }

  modeBtn.addEventListener('click', () => {
    let currentTheme = htmlTag.getAttribute('data-bs-theme');
    let newTheme ='' 
    if (currentTheme === 'light' || currentTheme === null) {
      newTheme = 'dark';
      lightIcon.style.display = 'inline-block'
      darkIcon.style.display = 'none'
    }
    else {
      newTheme = 'light';
      darkIcon.style.display = 'inline-block'
      lightIcon.style.display = 'none'
    }

    htmlTag.setAttribute('data-bs-theme', newTheme);
    // Save the new theme in localStorage
    localStorage.setItem('theme', newTheme);
  });
}

loadContent();


// Save current location (except login) to storage to redir to after login
const currentPath = window.location.pathname;
const lastSegment = currentPath.substring(currentPath.lastIndexOf('/') + 1);

if (lastSegment !== 'login.html' && lastSegment !== 'signup.html') {
  sessionStorage.setItem('lastVisitedPage', window.location.href);
}
