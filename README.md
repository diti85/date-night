# Date Night
A personalized date night app I made for my girlfriend as a side project that solves the ”what to eat” dilemma with
a fun and user-friendly way that allows my partner and I to effortlessly catalog places and restaurants we visit.

This app has been built with a MERN stack utilizing React for the frontend and Express for the backend.

## Local run instructions
Clone the repo and cd into it.

1. Run the following commands in the root directory

``` npm ci ```
``` npm run dev```

This will startup the react project which runs the frontend.

1. Open another temrinal and cd into the backend by running ```cd backend```
1. Run the following commands in the backend directory:

``` npm ci ```
``` node index ```

# API Documentation

## Get Places
- URL: `/api/places`
- Method: GET
- Description: Retrieves all places from the database.
- Response:
  - Status Code: 200 (OK)
  - Body: Array of place objects

## Create Place
- URL: `/api/places`
- Method: POST
- Description: Creates a new place in the database.
- Request Body:
  - name (string): The name of the place
  - location (string): The location of the place
  - firstTime (boolean): Indicates if it's the first time visiting the place
  - selectedCategories (array): Array of selected categories for the place
  - rating (number): The rating of the place
  - reviews (array): Array of reviews for the place
- Response:
  - Status Code: 200 (OK)
  - Body: The created place object

## Delete Place
- URL: `/api/places/:id`
- Method: DELETE
- Description: Deletes a place from the database.
- Parameters:
  - id (string): The ID of the place to delete
- Response:
  - Status Code: 200 (OK)
  - Body: The deleted place object

## Update Place
- URL: `/api/places/:id`
- Method: PUT
- Description: Updates a place in the database.
- Parameters:
  - id (string): The ID of the place to update
- Request Body:
  - name (string, optional): The updated name of the place
  - location (string, optional): The updated location of the place
  - firstTime (boolean, optional): Indicates if it's the first time visiting the place
  - selectedCategories (array, optional): Updated array of selected categories for the place
  - rating (number, optional): The updated rating of the place
  - reviews (array, optional): Updated array of reviews for the place
- Response:
  - Status Code: 200 (OK)
  - Body: The updated place object

## Add Category
- URL: `/api/categories/add`
- Method: POST
- Description: Adds a new category to the database.
- Request Body:
  - name (string): The name of the category
- Response:
  - Status Code: 201 (Created)
  - Body: The result of the insertion

## Get Categories
- URL: `/api/categories`
- Method: GET
- Description: Retrieves all categories from the database.
- Response:
  - Status Code: 200 (OK)
  - Body: Array of category objects

## Delete Category
- URL: `/api/categories/:id`
- Method: DELETE
- Description: Deletes a category from the database.
- Parameters:
  - id (string): The ID of the category to delete
- Response:
  - Status Code: 200 (OK)
  - Body: The result of the deletion

## Update Category
- URL: `/api/categories/:id`
- Method: PUT
- Description: Updates a category in the database.
- Parameters:
  - id (string): The ID of the category to update
- Request Body:
  - name (string): The updated name of the category
- Response:
  - Status Code: 200 (OK)
  - Body: The result of the update

