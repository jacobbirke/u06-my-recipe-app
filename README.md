# Recipe App

A full-stack web application for browsing, filtering, and managing recipes, built using Angular for the frontend and a Laravel-based RESTful API for the backend. The app enables users to register, log in, and search for recipes from an external API, while offering options to filter recipes based on meal type, allergens, and dietary restrictions. Users can also manage their personal recipe lists.

## Features

### General
- Responsive design optimized for both desktop and mobile devices.
- Integration with an external recipe API (Spoonacular) to fetch and display recipe data.

### User Authentication
- **User Registration**: Users can create an account.
- **Log In / Log Out**: Users can log in to access personalized features and securely log out.
- **Authentication**: Utilizes Laravel Sanctum for handling authentication and authorization.

### Recipe Browsing and Filtering
- **Recipe Suggestions**: Users can view a list of suggested recipes fetched from the external API.
- **Filtering Options**:
  - **Meal Type**: Filter recipes by meal type, such as appetizer, main course, or dessert.
  - **Diet and Allergens**: Filter recipes based on dietary preferences or restrictions, such as gluten-free, egg-free, or peanut-free.

### Detailed Recipe View
- Clicking on a recipe displays more detailed information about the ingredients, preparation steps, and nutritional details on a separate route.

## Technologies Used
- **Frontend**: Angular (for building the user interface and handling API requests)
- **Backend**: Laravel (RESTful API with Sanctum for authentication)
- **Database**: MySQL or another relational database to store user and list data
- **External API**: Spoonacular for fetching recipe data

## Installation & Setup

### Prerequisites
- **Node.js** and **npm** (for running the Angular app)
- **Composer** (for managing Laravel dependencies)
- **PHP** and a web server
- **MySQL**

### Frontend Setup (Angular)
1. Clone the repository:
  ```
  git clone https://github.com/jacobbirke/u06-my-recipe-app.git

2. Navigate to the frontend directory:
```
  cd recipe-app
3. Install dependencies:
```
  npm install
4. Start the Angular development server:
```
  ng serve
5. The app should be running on http://localhost:4200.

### Backend Setup (Laravel)
1. Navigate to the backend directory:
```
cd backend
2. Install dependencies using Composer:
```
composer install
3. Configure the .env file with your database and API credentials.
4. Run database migrations:
```
php artisan migrate
5. Start the Laravel server:
```
php artisan serve
6. The API should be running on http://localhost:8000.

## API Integration

This application uses the Spoonacular API to fetch recipe suggestions and details. Below is a breakdown of how the API calls are made in the Angular service.

#### SpoonacularService

The `SpoonacularService` is an Angular service that handles all API interactions with the Spoonacular API. It is responsible for fetching recipe suggestions based on user-selected filters and fetching detailed information about a specific recipe.

### API Call Details

#### `getRecipeSuggestions(filterOptions: any): Observable<any>`

- **Purpose**: Fetches a list of recipe suggestions based on user-selected filters.
- **Parameters**:
  - `filterOptions`: An object containing filter criteria for meal type and allergen preferences.
- **Example Filters**:
  - **Meal types**: Appetizer, Main Course, Dessert
  - **Allergens**: Gluten, Egg, Peanut
- **API Endpoint**: `https://api.spoonacular.com/recipes/complexSearch`
- **Query Parameters**:
  - `apiKey`: Your Spoonacular API key.
  - `type`: Comma-separated meal types (e.g., `appetizer,main course`).
  - `intolerances`: Comma-separated list of allergens (e.g., `gluten,egg`).
  - `sort`: The sorting option (e.g., `random`).

### Example API Request:
```
this.spoonacularService.getRecipeSuggestions({
  appetizer: true,
  mainCourse: false,
  dessert: true,
  gluten: true,
  egg: false,
  peanut: true
}).subscribe(response => {
  console.log(response);
});
```

#### `getRecipeDetails(recipeId: number): Observable<any>`

- **Purpose**: Fetches detailed information about a recipe using its ID.
- **Parameters**:
  - `recipeId`: The unique ID of the recipe.
- **API Endpoint**: `https://api.spoonacular.com/recipes/{recipeId}/information`
- **Query Parameters**:
  - `apiKey`: Your Spoonacular API key.

**Example API Request**:
```javascript
// Example API call to get recipe details
this.spoonacularService.getRecipeDetails(12345).subscribe(response => {
  console.log(response);
});
```

### Note on API Key Security
- Make sure to keep your API key secure. Avoid exposing it in public repositories.
- Consider using environment variables or a secure configuration method when deploying your application.

### Instructions for Using the Service
1. **Import `SpoonacularService`** into your Angular components or other services where you need to make API calls.
2. **Inject the service** in the constructor and use the provided methods to fetch recipe data.
3. **Handle the API responses** appropriately, and display the recipe information in your frontend components.
