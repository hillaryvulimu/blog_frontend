const headElement = document.querySelector('head');
const mainStyles = './css/main_styles.css';
const bootstrapCssCdn = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';

// set integrity and crossorigin for CDN
const cssIntegrity = "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH";
const cssCrossorigin = "anonymous";

const loadStyles = () => {
  // load cached css bootstrap css if available
  const cachedCss = localStorage.getItem('cachedCss');
  const bootstrapCssUrl = cachedCss ? cachedCss : bootstrapCssCdn;

  const fragment = document.createDocumentFragment();

  // main styles link
  const mainStylesLink = document.createElement('link');
  mainStylesLink.rel = 'stylesheet';
  mainStylesLink.href = mainStyles;

  // bootstrap styles link
  const bootstrapCssLink = document.createElement('link');
  bootstrapCssLink.rel = 'stylesheet';
  bootstrapCssLink.href = bootstrapCssUrl;

  // Add integrity and crossorigin for CDN when being used
  if (!cachedCss) {
    bootstrapCssLink.integrity = cssIntegrity;
    bootstrapCssLink.crossOrigin = cssCrossorigin;
  }

  fragment.appendChild(mainStylesLink);
  fragment.appendChild(bootstrapCssLink);

  return fragment
};

headElement.appendChild(loadStyles());
