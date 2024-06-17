// Added to each page to load bootstrap js

const bootstrapJsOffline = './misc/bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js'
const bootstrapJsCDN = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
const bodyElement = document.querySelector('body')

const loadBootstrapJs = () =>{
  // chk internet connection. 
  // if available, load CDN. 
  // NOTE: add integrity and crossorigin attribs
  const integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" 
  const crossorigin="anonymous"
  

  // Else, if no internet, load offline bootstrap from sessionStorage if available
  if(!localStorage.getItem('bootstrapJsLink')){
    localStorage.setItem('bootstrapJsLink', bootstrapJsOffline)
  }
  const bootstrapJsLink = localStorage.getItem('bootstrapJsLink')

  // add to body
  const bootstrapScript = document.createElement('script')
  bootstrapScript.setAttribute('src', bootstrapJsLink) // add integrity/crossorigin to it if using CDN

  return bootstrapScript
}

bodyElement.appendChild(loadBootstrapJs())