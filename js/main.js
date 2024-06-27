import logout from './common/logout.js'
import categories from './common/fetch_categories.js'
import currentProfileInfo from './common/fetchProfileInfo.js'

/* Function to add `active` class to active link */
function highlightActiveLinks() {
  // Get the current URL pathname
  const currentPath = window.location.pathname;

  // Get all nav links
  const navLinks = document.querySelectorAll('.nav-link');

  // Loop through each nav link
  navLinks.forEach(link => {
    // skip drop-downs
    if(link.classList.contains('dropdown')){
      return;
    }
    
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
  const profilePicToggle = document.getElementById('profile-toggle')
  const profilePicImg = document.getElementById('profile-pic-img')
  const profilePicLink = document.getElementById('profile-pic-link')
  const welcomeUser = document.getElementById('welcome-user')

  if(token){
    // get user info
    const data = await currentProfileInfo('GET')

    // enable options for logged in user
    profilePicToggle.classList.remove('d-none')

    // get google's initials based on first name if no profile pic uploaded, 
    //default to '?' if no 1st name
    welcomeUser.textContent = `Hi, ${data.first_name}`
    const firstName = data.first_name
    const initials = firstName ? firstName.charAt(0).toUpperCase() : '?';
    const imgUrl = `https://ui-avatars.com/api/?name=${initials}&background=random&size=30&rounded=true&fontSize=0.7`;

    profilePicImg.setAttribute('src', data.profile_pic ? data.profile_pic : imgUrl)
  } else{
    signupLink.classList.remove('d-none')
    loginLink.classList.remove('d-none')
  }

  // Logout functionality
  logout()

  // Load the current theme from local storage if available
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
