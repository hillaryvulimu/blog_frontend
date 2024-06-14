import fetchPosts from './common/fetchPosts.js';

/* slideshow function */
function createSlideshow(data) {
  const fragment = document.createDocumentFragment();

  // Create carousel indicators
  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.classList.add('carousel-indicators');

  data.forEach((post, index) => {
      const indicatorButton = document.createElement('button');
      indicatorButton.setAttribute('type', 'button');
      indicatorButton.setAttribute('data-bs-target', '#latest-posts-slideshow');
      indicatorButton.setAttribute('data-bs-slide-to', `${index}`);
      indicatorButton.setAttribute('aria-label', `Slide ${index + 1}`);
      if (index === 0) {
          indicatorButton.classList.add('active');
          indicatorButton.setAttribute('aria-current', 'true');
      }
      indicatorsContainer.appendChild(indicatorButton);
  });

  // Create carousel inner
  const innerContainer = document.createElement('div');
  innerContainer.classList.add('carousel-inner');

  data.forEach((post, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (index === 0) {
          carouselItem.classList.add('active');
      }

      const imgElement = document.createElement('img');
      imgElement.src = post.post_pic; 
      imgElement.classList.add('d-block', 'w-100');
      imgElement.alt = post.title;

      const captionContainer = document.createElement('div');
      captionContainer.classList.add('carousel-caption', 'd-none', 'd-sm-block');

      const titleElement = document.createElement('h5');
      const titleLink = document.createElement('a');
      titleLink.classList.add('carousel-link-item')
      titleLink.href = `./post_detail.html?nm=${post.slug}`;
      titleLink.textContent = post.title;
      

      const contentElement = document.createElement('p');
      contentElement.textContent = post.body.substring(0, 40) + '...';
      
      // append accordingly 
      titleElement.appendChild(titleLink);

      captionContainer.appendChild(titleElement);
      captionContainer.appendChild(contentElement);

      carouselItem.appendChild(imgElement);
      carouselItem.appendChild(captionContainer);

      innerContainer.appendChild(carouselItem);
  });

  fragment.appendChild(indicatorsContainer);
  fragment.appendChild(innerContainer);

  return fragment;
}


/* function to create posts cards for home page */
function createHomePostCards(data){
  //create fragment
  const fragment = document.createDocumentFragment();
  // TODO: loop through the data
  data.forEach(post => {
    // create the card items
    const cardContainer = document.createElement('div') 
    cardContainer.classList.add('row', 'mb-4')

    // img container
    const imgContainer = document.createElement('div')
    imgContainer.classList.add('col-lg-4', 'col-md-4')

    cardContainer.appendChild(imgContainer)

    const imgItem = document.createElement('img')
    imgItem.classList.add('img-fluid', 'smaller-image')
    imgItem.setAttribute('src', post.post_pic)
    imgItem.setAttribute('alt', post.title)

    imgContainer.appendChild(imgItem)


    // content container
    const contentContainer = document.createElement('div')
    contentContainer.classList.add('col-lg-8', 'c0l-md-8')

    cardContainer.appendChild(contentContainer)


    const contentCard = document.createElement('div')
    contentCard.classList.add('card')

    contentContainer.appendChild(contentCard)

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    contentCard.appendChild(cardBody)


    const postTitle = document.createElement('h5')
    postTitle.classList.add('card-title')
    postTitle.textContent = post.title

    cardBody.appendChild(postTitle)


    const postSummary = document.createElement('p')
    postSummary.classList.add('card-text')
    let text = post.body
    postSummary.textContent = text.length > 140 ? text.slice(0, 140) + '...' : text

    cardBody.appendChild(postSummary)


    const postLink = document.createElement('a')
    postLink.setAttribute('href', './post_detail.html?nm=' +post.slug)
    postLink.classList.add('btn', 'btn-link')
    postLink.textContent = 'Read more >'
    postLink.style.paddingLeft = 0

    cardBody.appendChild(postLink)
    

    // append each card to fragment
    fragment.appendChild(cardContainer);
  });

  // return fragment to be attached to #latest-posts
  return fragment
}


document.addEventListener('DOMContentLoaded', async () => {
  const slideshowContainer = document.getElementById('latest-posts-slideshow'); 
  const homePostCardsContainer = document.getElementById('latest-posts')

  try {
      const data = await fetchPosts({ page: 1});
      // create slide show with 4 posts
      const slideshowFragment = createSlideshow(data.results.slice(0, 4));
      
      slideshowContainer.appendChild(slideshowFragment);

      // create 6 sample post cards
      const cardsFragment = createHomePostCards(data.results.slice(0, 6));
      homePostCardsContainer.appendChild(cardsFragment)
  } catch (error) {
      console.error('Error fetching or displaying posts:', error);
  }
});
