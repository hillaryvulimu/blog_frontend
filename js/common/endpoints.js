// export different endpoints to places required
// always end with /

// Use either the packend endpoint in the environment vars (set, e.g. on Versel), or the development endpoint
const BACKEND_ENDPOINT = process.env.BACKEND_ENDPOINT || 'http://127.0.0.1:8000';

export const posts_base_endpoint = `${BACKEND_ENDPOINT}/api/v1/`;
export const auth_endpoint = `${BACKEND_ENDPOINT}/api/v1/dj-rest-auth/`;
export const user_profile_endpoint = `${BACKEND_ENDPOINT}/api/user/profile/`;

 