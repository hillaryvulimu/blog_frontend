# blog_frontend

![Project Logo](./images/logo.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Additional Information](#additional-information)
- [Contact](#contact)

## Introduction

**blog_frontend** is the front-end to blogapi. The blogapi is written in Django and Django Rest Framework, and its repository can be found at [blogapi](https://github.com/hillaryvulimu/blogapi). This project is built using plain HTML, Bootstrap, vanilla JavaScript, and custom CSS. It is well integrated with the backend to access both the `accounts` and `posts` apps.

## Features

- Common HTML elements like `header` and `footer` are placed in the `./common` directory and inserted into other pages using `main.js`.
- JavaScript files for specific functionalities are organized in the `./js` directory.
- Supports user authentication, post reactions, and profile updates.
- Dynamic fetching and displaying of posts and categories.

### JavaScript Functions

- **fetch_posts_list.js**: Fetches all posts, ordered from the latest one, and passes them to `posts.html`. Pagination is set to 12 posts per page to match the settings in the blogapi backend.
- **fetch_posts_details.js**: Uses the `nm` parameter from the URL as a slug to fetch the details of a single post and displays them on `post_detail.html`.
- **main.js**: Contains JavaScript code needed on all pages. It also loads the header and footer into each page.
- **index.js**: Displays the featured post on `index.html` and six cards of the six latest posts.
- **reactions.js**: Sends user reactions (like/dislike).
- **user-profile.js**: Updates the user's details (first name, last name, and profile picture). Username and email are displayed but not editable.
- **search.js**: Searches for posts by title or body on `posts.html`.
- **login.js**: Authenticates the user and redirects them to the last visited page saved in sessionStorage.
- **signup.js**: Registers new users.

### Common Scripts

- **endpoints.js**: Lists all backend endpoints for performing fetch requests.
- **fetch_categories.js**: Fetches current post categories from the backend and adds them to the Categories option in the top nav bar.
- **fetchPosts.js**: Fetches posts based on conditions (e.g., latest posts for `index.html`, all posts with pagination for `posts.html`, and search results).
- **load_bootstrap.js**: Fetches bootstrap.js from Bootstrap CDN (Bootstrap 5.3.3).
- **logout.js**: Contains the logout logic and is imported into `main.js` for use on all pages. Logging out redirects to `login.html`.
- **shared_styles.js**: Loads custom shared styles and also fetches bootstrap css from bootstrap CDN (Bootstrap 5.3.3).

## Installation

1. Fork or clone the repository from [blog_frontend](https://github.com/hillaryvulimu/blog_frontend).
2. Update the `endpoints.js` with the correct endpoints based on how the blogapi backend is set up.
 - It checks the base url, and if in development (local server), it uses the local (Django) backend. If in production, it uses the production backend (e.g. Render). These settings can be changed in the file.

## Usage

This front-end app is used alongside the blogapi, which sends/receives data using JSON with Django Rest Framework. Ensure you specify the correct endpoints in `endpoints.js` based on how the backend is deployed/hosted.

## Technologies Used

- HTML
- CSS
- Bootstrap (5.3.3)
- Vanilla JavaScript

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Additional Information

- The project is named Ace Game Zone to give it a feel of a production-ready blog post. You can change this in `about.html`.
- You can change the logo by replacing the `logo.png` file in the `./images` directory.
- The favicon (`favicon.ico`) represents Ace Game Zone and can be changed.
- The `./icons` directory contains some .svg files. The SVG code is directly implemented in `post_details.html` for like/dislike buttons and the `scroll to top` button available on every page, so it is safe to delete these files.

## Contact

For any questions or issues, please contact Hillary Vulimu at hillaryvulimu@gmail.com.

