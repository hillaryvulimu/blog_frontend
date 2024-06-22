document.addEventListener('DOMContentLoaded', async () => {
  const likeBtn = document.getElementById('like-btn');
  const dislikeBtn = document.getElementById('dislike-btn');
  const likeBtnSvg = document.getElementById('like-btn-svg');
  const dislikeBtnSvg = document.getElementById('dislike-btn-svg');
  const reactionErrors = document.getElementById('reaction-erros');
  const likesCountElement = document.getElementById('likes-count');
  const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
  
  // Get postslug from post's data-post-slug attrib
  const urlParams = new URLSearchParams(window.location.search);
  const postslug = urlParams.get('nm');
  
  // Get user ID from backend using user token
  const token = localStorage.getItem('authToken') ? localStorage.getItem('authToken'): '';

// Function to update total likes count
async function updateLikesCount() {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/${postslug}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Show number of likes if > 0
    likesCountElement.textContent = data.total_likes > 0 ? data.total_likes : '';

  } catch (error) {
    console.error('Error updating likes count:', error);
    reactionErrors.classList.remove('d-none');
    reactionErrors.textContent = 'Error updating likes count';
  }
}


// Function to fetch current user's reaction
async function fetchCurrentReaction() {
  try {
    if (!token) {
      return
    }  
    const response = await fetch(`http://127.0.0.1:8000/api/v1/${postslug}/reactions/user/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      }
    });
  
    if (!response.ok) {
      return;
    }
    
    const data = await response.json();
    
    // Update UI based on fetched data
    if (data.reaction === 'Like') {
      likeBtnSvg.setAttribute('fill', 'currentColor');
      likeBtn.classList.add('active');
      likeBtn.value = 'Like';
    } else if (data.reaction === 'Dislike') {
      dislikeBtnSvg.setAttribute('fill', 'currentColor');
      dislikeBtn.classList.add('active');
      dislikeBtn.value = 'Dislike';
    } else {
      likeBtn.value = 'None';
      dislikeBtn.value = 'None';
    }

  } catch (error) {
    console.error('Error fetching current reaction:', error);
  }
}

// Function to send reaction
async function sendReaction(reaction) {
  try {
    if (!token) {
      return
    }
    // Fetch current user's reaction for the post
    const response = await fetch(`http://127.0.0.1:8000/api/v1/${postslug}/reactions/user/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching current reaction');
    }

    const currentReaction = await response.json();

    // Determine whether to use POST or PATCH endpoint
    let url = `http://127.0.0.1:8000/api/v1/${postslug}/reactions/user/create/`;
    let method = 'POST'; // Default to POST if no reaction exists

    if (currentReaction.reaction) {
      // User has already reacted, switch to PATCH, because data sent is JSON
      url = `http://127.0.0.1:8000/api/v1/${postslug}/reactions/user/`;
      method = 'PATCH';
    }

    // Construct the appropriate request based on method and URL
    const sendReactionResponse = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({ reaction: reaction })
    });

    if (!sendReactionResponse.ok) {
      throw new Error('Error sending reaction. Response not ok.');
    }

    // Update UI or perform any necessary actions after successful reaction
    await updateLikesCount();

  } catch (error) {
    reactionErrors.classList.remove('d-none');
    reactionErrors.textContent = 'Error sending reaction';
    console.error('Error sending reaction:', error);
  }
}


await updateLikesCount();
await fetchCurrentReaction();


// Function to send reactions and modify rection buttons
async function reactionBtnsActions(thisBtn, otherBtn, value){
  const thisBtnSvgElement = thisBtn.querySelector('svg');
  const otherBtnSvgElement = otherBtn.querySelector('svg');
  
  if (thisBtn.value === 'None' || !thisBtn.value) {    
    // make this btn active
    thisBtn.classList.add('active');
    thisBtn.value = value;
    thisBtnSvgElement.setAttribute('fill', 'currentColor');

    // make other btn inactive
    otherBtn.classList.remove('active');
    otherBtn.value = 'None'
    otherBtnSvgElement.setAttribute('fill', 'none');

    // send value
    await sendReaction(value);
  } else {
    // make this btn inactive
    thisBtn.classList.remove('active');
    thisBtn.value = 'None';
    thisBtnSvgElement.setAttribute('fill', 'none');
    
    // send value
    await sendReaction('None');
  }
}

// Like button click event
likeBtn.addEventListener('click', async function(e) {
  e.preventDefault();

  // Show 'You're not logged in' modal if user reacts b4 logging in
  if (!token) {
    loginModal.show();
    return;
  } 

  await reactionBtnsActions(this, dislikeBtn, 'Like')
});


// Dislike button click event
dislikeBtn.addEventListener('click', async function(e) {
  e.preventDefault();
  // Show 'You're not logged in' modal if user reacts b4 logging in
  if (!token) {
    loginModal.show();
    return;
  }

  await reactionBtnsActions(this, likeBtn, 'Dislike')
});

});


