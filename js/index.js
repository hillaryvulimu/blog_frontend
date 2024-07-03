import fetchPosts from './common/fetchPosts.js';

/* featured post function */
function createSlideshow(data) {
  // get featured post's elements
  const featuredPost = document.getElementById('featured-post')
  const featuredPostImg = document.getElementById('featured-post-img')
  const featuredPostLink = document.getElementById('featured-post-link')


  data.forEach((post, index) => {
    // feature only the first (latest) post
      if (index === 0) {
          featuredPostImg.src = post.post_pic
          featuredPostLink.href = './post_detail.html?nm=' + post.slug
          featuredPostLink.textContent = post.title
      }
  });
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
      // create featured post
      createSlideshow(data.results.slice(0, 1));


      // create 6 sample post cards
      const cardsFragment = createHomePostCards(data.results.slice(0, 6));
      homePostCardsContainer.appendChild(cardsFragment)
  } catch (error) {
      console.error('Error fetching or displaying posts:', error);
  }
});
