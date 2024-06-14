/* fetch data and pass it to the file that used it */

export default async function fetchBlogs(options = {}) {
    const {
        endpoint = 'http://127.0.0.1:8000/api/v1/', // Default endpoint
        page = null,
        searchTerm = '',
        category = '',
        slug = ''
    } = options;

    // use default endpoint if the page's not specified.
    let url = page != null ? endpoint + `?page=${page}` : endpoint;
    if (slug) {
        url += `${slug}/`;
    } else if (searchTerm) {
        url += `?search=${encodeURIComponent(searchTerm)}`;
    } else if (category) {
        url += `?category=${encodeURIComponent(category)}`;
    }

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
