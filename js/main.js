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

  // After loading header and footer content, execute script for highlighting active links
  highlightActiveLinks();


  /* Toggle Light/Dark modes */
  const modeBtn = document.getElementById('theme-toggle')
  const htmlTag = document.documentElement // the <html> tag
  const darkIcon = document.getElementById('dark-icon')
  const lightIcon = document.getElementById('light-icon')

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


