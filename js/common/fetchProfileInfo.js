import { user_profile_endpoint } from "./endpoints.js";

export default async function currentProfileInfo(method, theBody = null) {
  const token = localStorage.getItem('authToken');
  const updateForm = document.getElementById('profile-form')
  try {
    let bodyData = null;

    if (method.toLowerCase().trim() !== 'get' && theBody) {
      
      bodyData = new FormData();

      // Copy existing entries from theBody FormData instance
      if (theBody instanceof FormData) {
        for (const [key, value] of theBody.entries()) {
          if (key === 'profile_pic' && value.name === '') {
            // Skip adding empty profile_pic to bodyData
            continue; 
          }
          bodyData.append(key, value);
        }
      } else {
        // If theBody is not FormData, log error
        console.error('Unexpected theBody type:', typeof theBody);
      }

      // Ensure the profile_pic field is correctly handled
      const profilePicFile = updateForm.querySelector('#profile_pic').files[0];
      if (profilePicFile) {
        bodyData.set('profile_pic', profilePicFile); // Replace or add profile_pic
      }    
    }
    
    // send edited data
    const response = await fetch(user_profile_endpoint, {
      method: method.trim(),
      headers: {
        'Authorization': `Token ${token}`
      },
      body: bodyData ? bodyData : null
    });

    if (!response.ok) {
      throw new Error('Network response not ok ' + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Fetch error:', error);
  }
}
