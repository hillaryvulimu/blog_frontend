/* fetch data and pass it to the file that used it */

import { posts_base_endpoint } from "./endpoints.js";
export default async function fetchPosts(options = {}) {
    const {
        endpoint = posts_base_endpoint, // Default endpoint
        page = null,
        searchTerm = '',
        category = '',
        slug = ''
    } = options;

    // use default endpoint if endpoint not specified.
    let url = endpoint;
    if (slug) {
        url += `${slug}/`;
    } else if (searchTerm) {
        url += `?q=${encodeURIComponent(searchTerm)}`;
    } else if (category) {
        url += `categories/${encodeURIComponent(category)}`;
    }

    // add page number if specified
    url += page > 1 ? '' + `?page=${page}` : '';
    
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        
        // return the fetched data
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}
