// export different endpoints to places required

// Use either the deployment endpoint ( e.g. on Render), or the development endpoint,
// depending on the current environment, either development (local), or production
let BACKEND_ENDPOINT;
const baseUrl = window.location.origin

if (1==2){
  BACKEND_ENDPOINT = 'http://127.0.0.1:8000';
}
else {
  BACKEND_ENDPOINT = 'https://blogapi-qr1p.onrender.com';
}


export const posts_base_endpoint = `${BACKEND_ENDPOINT}/api/v1/`;
export const auth_endpoint = `${BACKEND_ENDPOINT}/api/v1/dj-rest-auth/`;
export const user_profile_endpoint = `${BACKEND_ENDPOINT}/api/user/profile/`;

