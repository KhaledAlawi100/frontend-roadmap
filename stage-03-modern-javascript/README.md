# Stage 3 — Modern JavaScript

## MovieFinder

A movie search application built with **Vanilla JavaScript (ES6+)**.

The purpose of this project is to practice modern JavaScript by building a realistic frontend application before moving to React.

---

## Technologies

* HTML5
* CSS3
* Modern JavaScript (ES6+)
* JavaScript Modules
* DOM API
* Promises
* async / await

---

## Project Goals

This project is designed to turn modern JavaScript knowledge into practical frontend experience.

Instead of studying JavaScript features in isolation, the application uses them inside a real project.

---

# Project Structure

```text
stage-03-modern-javascript/
│
├── index.html
├── README.md
│
├── assets/
│   ├── icons/
│   └── images/
│
├── css/
│   ├── components.css
│   └── main.css
│
└── js/
    │
    ├── main.js
    │
    ├── api/
    │   └── movieApi.js
    │
    ├── components/
    │   ├── loading.js
    │   ├── movieCard.js
    │   └── movieList.js
    │
    ├── services/
    │   └── movieService.js
    │
    ├── state/
    │   └── appState.js
    │
    └── utils/
        ├── dom.js
        ├── formatters.js
        └── validators.js
```

---

# Development Progress

## Sprint 1 — Application Foundation

### Completed

Built the initial MovieFinder application structure.

Implemented:

* Application HTML shell
* Header
* Search form
* Movie results section
* JavaScript module entry point
* DOM element selection
* Search form handling
* Application state
* Clear button
* Basic validation
* Loading and error state handling
* Mock movie API
* Movie card component
* Movie list component

### JavaScript concepts practiced

* `const`
* `let`
* Arrow functions
* Template literals
* Destructuring
* ES modules
* `async / await`
* Promises
* DOM manipulation
* Event listeners
* Application state

---

# Sprint 2 — Search + Filtering

### Goal

Allow users to search through the movie collection and display only movies matching the search term.

### Completed

Implemented movie filtering using `filter()`.

The application can search by:

* Movie title
* Movie genre

Search input is normalized before filtering by:

* Removing unnecessary whitespace
* Converting the search term to lowercase

Example:

```js
export function filterMovies(movies, searchTerm) {
  const normalizedSearchTerm = searchTerm.toLowerCase().trim();

  return movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(normalizedSearchTerm) ||
      movie.genre.toLowerCase().includes(normalizedSearchTerm)
  );
}
```

### Data Flow

```text
User enters search
        ↓
Search Form
        ↓
handleSearch()
        ↓
searchMovies()
        ↓
Movie Array
        ↓
filterMovies()
        ↓
Filtered Movie Array
        ↓
renderMovieList()
        ↓
Movie Cards
```

### JavaScript concepts practiced

* `filter()`
* `map()`
* Arrow functions
* Template literals
* String methods
* Event listeners
* Modules
* State management
* Separation of concerns

### Architecture

Filtering logic is kept inside:

```text
js/services/movieService.js
```

Rendering logic is kept inside:

```text
js/components/
```

API logic is kept inside:

```text
js/api/movieApi.js
```

Application orchestration remains inside:

```text
js/main.js
```

This separation keeps the application easier to maintain and prepares the structure for future React development.

---

# Current Features

* Search movies
* Filter by movie title
* Filter by genre
* Display movie cards
* Clear search
* Handle empty results
* Handle simulated API errors
* Display loading state
* Maintain application state

---

# Upcoming Sprints

## Sprint 3 — Sorting + Movie Statistics

Planned features:

* Sort by rating
* Sort by year
* Sort by title
* Calculate movie statistics
* Practice `sort()`
* Practice `reduce()`
* Practice `some()`
* Practice `every()`
* Practice `find()`

---

## Sprint 4 — Async JavaScript + Real API

Replace the mock movie API with the Spring Boot REST API.

Practice:

* `fetch()`
* Promises
* `async / await`
* HTTP requests
* JSON
* Error handling
* API service architecture

---

## Sprint 5 — State + Favorites

Implement:

* Add favorite
* Remove favorite
* Favorite movie list
* Search state
* Loading state
* Error state

Practice:

* Spread operator
* `some()`
* `find()`
* Closures
* State management

---

## Sprint 6 — Production Polish

Improve:

* Loading UI
* Error UI
* Empty states
* Accessibility
* Responsive design
* Form validation
* Code organization
* Reusable functions

---

# Learning Approach

This project follows a build-first approach.

For each feature:

```text
Requirement
    ↓
Explanation
    ↓
Production-style implementation
    ↓
Your task
    ↓
Code review
    ↓
Improvement
    ↓
Git commit
    ↓
Next feature
```

The goal is not simply to understand JavaScript syntax.

The goal is to become comfortable using JavaScript to build frontend applications.

---



# Final Goal

By the end of Stage 3, the application should demonstrate practical knowledge of:

* Modern JavaScript
* ES modules
* Objects and arrays
* Array methods
* DOM manipulation
* State management
* Async JavaScript
* Promises
* `async / await`
* Fetch API
* REST API communication
* Error handling
* Application architecture

The project will also serve as a bridge from **Vanilla JavaScript → React**.



## Screenshots

### Initial State

![MovieFinder initial state](../assets/screenshots/stage-03/sprint-02-initial.png)

### Search Results

Searching for `inter` filters the movie list.

![Search results](../assets/screenshots/stage-03/sprint-02-search-results.png)

### No Results

![No results](../assets/screenshots/stage-03/sprint-02-no-results.png)