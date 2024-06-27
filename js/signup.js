import { auth_endpoint } from "./common/endpoints.js";
const token = localStorage.getItem('authToken');
const lastVisitedPage = sessionStorage.getItem('lastVisitedPage') || './posts.html';

// if logged in, redirect to last page visited
if(token){
  window.location.href = lastVisitedPage
}


/* toggle password visibility */
function togglePasswordVisibility(inputField, eyeButton) {
  // Switch input type between text and password
  const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
  inputField.setAttribute('type', type);

  // Toggle eye icon
  const openEyeSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
      <title>ionicons-v5-i</title>
      <path d="M255.66,112c-77.94,0-157.89,45.11-220.83,135.33a16,16,0,0,0-.27,17.77C82.92,340.8,161.8,400,255.66,400,348.5,400,429,340.62,477.45,264.75a16.14,16.14,0,0,0,0-17.47C428.89,172.28,347.8,112,255.66,112Z" style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
      <circle cx="256" cy="256" r="80" style="fill:none;stroke:currentColor;stroke-miterlimit:10;stroke-width:32px"/>
    </svg>
  `;

  const closedEyeSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  // Set SVG content
  eyeButton.innerHTML = type === 'password' ? openEyeSVG : closedEyeSVG;
}

// Event listeners for eye buttons
document.getElementById('togglePassword1').addEventListener('click', function() {
  const password1Input = document.getElementById('password1');
  const eyeButton = this;
  togglePasswordVisibility(password1Input, eyeButton);
});

document.getElementById('togglePassword2').addEventListener('click', function() {
  const password2Input = document.getElementById('password2');
  const eyeButton = this;
  togglePasswordVisibility(password2Input, eyeButton);
});



/* check that passwords match */
const submitBtn = document.getElementById('submit-button')
const pw1 = document.getElementById('password1')
const pw2 = document.getElementById('password2')
const confirmPasswordErrors = document.getElementById('password2_error');

// function to check
function pwMatch(thisField){
  if(thisField.value && pw2.value != pw1.value) {
    submitBtn.classList.add('disabled')
    confirmPasswordErrors.classList.remove('d-none');
    confirmPasswordErrors.textContent = 'Passwords do not match.';
  }
  else {
    submitBtn.classList.remove('disabled')
    confirmPasswordErrors.classList.add('d-none')
  }
}

pw1.addEventListener('input', function () {
  pwMatch(this)
})

pw2.addEventListener('input', function () {
  pwMatch(this)
})


/* submit data */
document.getElementById('signup-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const formErrors = document.getElementById('form-errors');
  const usernameErrors = document.getElementById('username_error');
  const emailErrors = document.getElementById('email_error');
  const password1Errors = document.getElementById('password1_error');
  const password2Errors = document.getElementById('password2_error');

  // Clear previous errors
  usernameErrors.classList.add('d-none');
  usernameErrors.textContent = '';

  emailErrors.classList.add('d-none');
  emailErrors.textContent = '';

  password1Errors.classList.add('d-none');
  password1Errors.textContent = '';

  password2Errors.classList.add('d-none');
  password2Errors.textContent = '';

  try {
    const response = await fetch(`${auth_endpoint}registration/`, {
      method: 'POST',
      body: formData,
    });

    let data;
    try {
      data = await response.json();
    } catch (error) {
      // handle empty response
      if (response.status === 204) {
        data = {};
      } else {
        throw new Error('Invalid JSON response');
      }
    }

    if (response.ok) {
      const signupContainer = document.getElementById('signup-form-container');
      signupContainer.textContent = '';
      const accountCreatedMessage = document.createElement('p');
      accountCreatedMessage.classList.add('alert', 'alert-success');
      accountCreatedMessage.textContent = 'Account created successfully. A confirmation link was sent to your email. Please login to your email and click on the link to confirm your email address. Check the spam folder if the email is not in your inbox.';
      signupContainer.appendChild(accountCreatedMessage);
    } else {
      // Show errors
      formErrors.classList.remove('d-none');
      formErrors.textContent = data.non_field_errors || '';

      if (data.username) {
        usernameErrors.classList.remove('d-none');
        usernameErrors.textContent = data.username;
      }

      if (data.email) {
        emailErrors.classList.remove('d-none');
        emailErrors.textContent = data.email;
      }

      if (data.password1) {
        password1Errors.classList.remove('d-none');
        password1Errors.textContent = data.password1.join('\n');
      }

      if (data.password2) {
        password2Errors.classList.remove('d-none');
        password2Errors.textContent = data.password2.join('\n');
      }
    }
  } catch (error) {
    console.error('Error:', error);
    formErrors.classList.remove('d-none');
    formErrors.textContent = 'An error occurred. Please try again.';
  }
});



