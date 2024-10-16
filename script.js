// Your API credentials  and change it with your app_id & app_key
const app_id = '63eb601b';
const app_key = '1d180b748b2ccbe2a189bb796f287e89';

// Function to fetch and display recipes
function searchRecipes() {
    const query = document.getElementById('searchQuery').value;
    const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Check if you get the correct response
            displayRecipes(data.hits);  // If data is retrieved, display recipes
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            alert('Error fetching recipes. Please try again later.');
        });
}

// Function to display recipes on the page
function displayRecipes(recipes) {
    const container = document.getElementById('recipes-container');
    container.innerHTML = '';

    recipes.forEach(hit => {
        const recipe = hit.recipe;
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe-card');

        recipeElement.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}">
            <h3>${recipe.label}</h3>
            <p>Calories: ${Math.round(recipe.calories)}</p>
            <p>Cuisine: ${recipe.cuisineType ? recipe.cuisineType.join(', ') : 'Not Specified'}</p>
            <a href="${recipe.url}" target="_blank">View Recipe</a>
        `;

        container.appendChild(recipeElement);
    });
}
