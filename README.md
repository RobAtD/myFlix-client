# myFlix React App

## Objective
Using React, build the client-side for an app called myFlix based on its existing server-side code (REST API and database).

## Key Features
MainView 
- Returns ALL movies to the user (each movie item with an image, title, and description)
- Filtering the list of movies with a “search” feature
- Ability to select a movie for more details
- Ability to add a movie to favorites or remove it from favorites 
- Ability to log out 
- Ability to navigate to Profile view 

MovieView 
- Returns data (description, genre, director, image) about a single movie to the user 
- Allows users to add a movie to their list of favorites 

LoginView 
- Allows users to log in with a username and password 

SignupView 
- Allows new users to register (username, password, email, date of birth) 

ProfileView 
- Displays user registration details 
- Allows users to update their info (username, password, email, date of birth) 
- Displays favorite movies 
- Allows users to remove a movie from their list of favorites 
- Allows existing users to deregister

## API integration

- GET /movies: Retrieves all movies.
- POST /users/register: Registers a new user.
- POST /login: Authenticates a user.
- PUT /users/:Username: Updates user profile data.
- DELETE /users/:Username: Deregisters the user account.

## Dependencies
- React: For building the user interface.
- React Router: For handling in-app routing.
- Redux: For state management
- React Bootstrap: For styling and responsive UI components.