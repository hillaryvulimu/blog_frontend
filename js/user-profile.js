import { user_profile_endpoint } from "./common/endpoints.js";
import currentProfileInfo from "./common/fetchProfileInfo.js";

const updateForm = document.getElementById('profile-form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const firstName = document.getElementById('first_name')
const lastName = document.getElementById('last_name')
const profilePic = document.getElementById('profile_pic')
const submit = document.getElementById('submit')
const formErrors = document.getElementById('profile-form-errors')

const csrfToken = localStorage.getItem('')
const token = localStorage.getItem('authToken');


// Redirect to login if not authenticated 
if(!token){
  window.location.href = './login.html?msg=You must login before you can access this page.'
}

document.addEventListener('DOMContentLoaded', async () => {
  // get current user's profile info
  const data = await currentProfileInfo('GET') 
  
  // assign various values
  username.value = data.username
  email.value = data.email
  firstName.value = data.first_name
  lastName.value = data.last_name


  // Function to check if the form has changed
  const hasFormChanged = (form) => {
    const initialFormState = new FormData(updateForm); 
    const currentFormState = new FormData(form);
    for (const [key, value] of initialFormState.entries()) {
      if (currentFormState.get(key) !== value) {
        return true;
      }
    }

    // Check file input separately
    const currentProfilePic = document.getElementById('profile_pic');
    const currentProfilePicFile = currentProfilePic.files[0];
    const initialProfilePicFile = initialFormState.get('profile_pic');

    // Compare file objects or filenames for changes
    if (currentProfilePicFile && currentProfilePicFile.name !== initialProfilePicFile) {
      return true;
    }

    return false;
  };

  // Listen for changes in the form, and set the btn's status
  updateForm.addEventListener('input', () => {
    submit.disabled = !hasFormChanged(updateForm);
  });

  updateForm.addEventListener('change', () => {
    submit.disabled = !hasFormChanged(updateForm);
  });


  // Activate Edit fields if Edit btn is clicked
  submit.addEventListener('click', async function (e) {
    e.preventDefault()
    if(this.type === 'button'){
      // make fields editable
      firstName.removeAttribute('disabled')
      lastName.removeAttribute('disabled')
      profilePic.removeAttribute('disabled')
  
      // change btn class and turn to submit btn, but disable it
      this.classList.remove('btn-outline-primary')
      this.classList.add('btn-primary')
      this.setAttribute('type', 'submit')
      this.textContent = 'Update'
      this.disabled = true

      // Focus on the first name input field
      firstName.focus();
    }

    else if(this.type === 'submit') {
      // Check that the names are provided
      if(!firstName.value || !lastName.value){
        formErrors.classList.remove('d-none')
        formErrors.textContent = 'Please enter your first and last name.'
        return
      }

      // Remove error messages, and submit data
      formErrors.classList.add('d-none')
      formErrors.textContent = ''
      const formData = new FormData(updateForm) 
      const data = await currentProfileInfo('PUT', formData)
      // on success, update current details
      if(data){
        const data = await currentProfileInfo('GET') 
  
        // assign various values
        firstName.value = data.first_name
        lastName.value = data.last_name
        const profilePicImg = document.getElementById('profile-pic-img')
        profilePicImg.setAttribute('src', data.profile_pic ? data.profile_pic : './images/profile-pic.png')

        // display success message
        formErrors.classList.remove('alert-danger', 'd-none')
        formErrors.classList.add('alert-success')
        formErrors.textContent = 'Profile details updated. If the changes haven\'t been updated automatically, refresh the page to update.'

        // disable update btn again 
        submit.disabled = true;
      }
      else {
        formErrors.textContent = 'Profile update failed: Empty response';
      }
    }
  })

})


