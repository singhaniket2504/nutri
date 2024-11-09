// Function to save food search data to localStorage
function saveSearchHistory(foodItem) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    
    // Check if the food item already exists in history
    if (!searchHistory.some(item => item.name === foodItem.name)) {
        searchHistory.push(foodItem); // Add new search to history
    }

    // Save the updated history back to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Function to retrieve and display saved search history from localStorage
function loadSearchHistory() {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const historyContainer = document.getElementById('search-history');

    historyContainer.innerHTML = ''; // Clear the container before adding items

    searchHistory.forEach(food => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('food-result');
        foodDiv.innerHTML = `
            <h4>${food.name}</h4>
            <p><strong>Protein:</strong> ${food.protein}g</p>
            <p><strong>Carbs:</strong> ${food.carbs}g</p>
            <p><strong>Fat:</strong> ${food.fat}g</p>
        `;
        historyContainer.appendChild(foodDiv);
    });
}

// Function to simulate food search (can be replaced with API call)
function searchFood() {
    const query = document.getElementById('food-search').value.trim().toLowerCase();
    const searchResults = document.getElementById('search-results');

    // Clear previous results
    searchResults.innerHTML = '';

    // Only show results if there is a search query with at least 3 characters
    if (query.length > 2) {
        const results = [
            { name: 'Apple', protein: 0.5, carbs: 25, fat: 0.3 },
            { name: 'Banana', protein: 1.3, carbs: 27, fat: 0.4 },
            { name: 'Chicken Breast', protein: 31, carbs: 0, fat: 3.6 },
            { name: 'Rice', protein: 4.3, carbs: 45, fat: 0.4 },
            { name: 'Broccoli', protein: 3.7, carbs: 6.6, fat: 0.4 },
            { name: 'Eggs', protein: 6.3, carbs: 0.6, fat: 5.0 }
        ];

        const filteredResults = results.filter(food => food.name.toLowerCase().includes(query));

        if (filteredResults.length === 0) {
            searchResults.innerHTML = '<p>No results found.</p>';
        }

        filteredResults.forEach(food => {
            const foodDiv = document.createElement('div');
            foodDiv.classList.add('food-result');
            foodDiv.innerHTML = `
                <h4>${food.name}</h4>
                <p><strong>Protein:</strong> ${food.protein}g</p>
                <p><strong>Carbs:</strong> ${food.carbs}g</p>
                <p><strong>Fat:</strong> ${food.fat}g</p>
            `;
            searchResults.appendChild(foodDiv);

            // Save each search item to localStorage
            saveSearchHistory(food);
        });
    }
}

// Function to log meal and display breakdown
document.getElementById('meal-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const mealName = document.getElementById('meal-name').value.trim();
    const mealProtein = parseFloat(document.getElementById('meal-protein').value.trim());
    const mealCarbs = parseFloat(document.getElementById('meal-carbs').value.trim());
    const mealFat = parseFloat(document.getElementById('meal-fat').value.trim());

    if (mealName && !isNaN(mealProtein) && !isNaN(mealCarbs) && !isNaN(mealFat)) {
        // Calculate total calories
        const totalCalories = calculateCalories(mealProtein, mealCarbs, mealFat);

        // Display the meal breakdown
        const mealBreakdown = document.getElementById('meal-breakdown');
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('meal-log-entry');

        mealDiv.innerHTML = `
            <h4>${mealName}</h4>
            <p><strong>Protein:</strong> ${mealProtein}g</p>
            <p><strong>Carbs:</strong> ${mealCarbs}g</p>
            <p><strong>Fat:</strong> ${mealFat}g</p>
            <p><strong>Total Calories:</strong> ${totalCalories} kcal</p>
        `;

        mealBreakdown.appendChild(mealDiv);

        // Optionally, you can clear the form after logging the meal
        document.getElementById('meal-form').reset();
    } else {
        alert("Please fill in all fields correctly.");
    }
});

// Function to calculate total calories from macronutrients (Protein = 4 kcal/g, Carbs = 4 kcal/g, Fat = 9 kcal/g)
function calculateCalories(protein, carbs, fat) {
    const caloriesFromProtein = protein * 4;
    const caloriesFromCarbs = carbs * 4;
    const caloriesFromFat = fat * 9;
    return (caloriesFromProtein + caloriesFromCarbs + caloriesFromFat).toFixed(2);
}

// Load search history when the page loads
window.onload = function() {
    loadSearchHistory();
};
