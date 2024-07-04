// Added to each page to load bootstrap js
const bootstrapJsCDN = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
const bodyElement = document.querySelector('body')

// set bootstrap js integrity constants
const jsIntegrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" 
const jsCrossorigin="anonymous"


const loadBootstrapJs = () =>{
  // check for cached bootstrap
  const cachedJs = localStorage.getItem('bootstrapJsLink');

  // load cached js if available, else load cdn
  const bootstrapJsLink = cachedJs ? cachedJs : bootstrapJsCDN;

  // create script tag 
  const bootstrapScript = document.createElement('script')
  bootstrapScript.src = bootstrapJsLink 

  // add crossorigin and integrity when using CDN
  if(!cachedJs){
    bootstrapScript.integrity = jsIntegrity;
    bootstrapScript.crossOrigin = jsCrossorigin;
  }

  return bootstrapScript
}

bodyElement.appendChild(loadBootstrapJs())