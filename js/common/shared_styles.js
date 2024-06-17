// Added to <head> of each page

const headElement = document.querySelector('head')
const mainStyles = './css/main_styles.css'
const bootstrapCssCdn = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
const bootstrapCssOffline = './misc/bootstrap-5.3.3-dist/css/bootstrap.min.css'

// add integrity and crossorigin to CDN
const integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" 
const crossorigin="anonymous"

const loadStyles = () => {
  // Load bootstrap localStorage cache if available
  // Not done for main styles coz might be changed at any time
  const cachedCss = localStorage.getItem('cachedCss') || bootstrapCssOffline
  if (!localStorage.getItem('cachedCss')){
    localStorage.setItem('cachedCss', bootstrapCssOffline)
  }
  
  const fragment = document.createDocumentFragment()

  // main styles link
  const mainStylesLink = document.createElement('link')
  mainStylesLink.setAttribute('rel', 'stylesheet')
  mainStylesLink.setAttribute('href', mainStyles)

  // bootstrap styles link
  const bootstrapCssLink = document.createElement('link')
  bootstrapCssLink.setAttribute('rel', 'stylesheet')
  // check connection/cache for CDN bootstrap
  //add offline one if none available
  bootstrapCssLink.setAttribute('href', cachedCss)

  fragment.appendChild(mainStylesLink)
  fragment.appendChild(bootstrapCssLink)

  return fragment
}

headElement.appendChild(loadStyles())