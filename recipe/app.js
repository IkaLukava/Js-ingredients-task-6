let isContainerPopulated = false; 

const foods = ["პიცა", "ბურგერი", "სალათა", "შაურმა"];
const ingredients = {
    "პიცა": ["მაიონეზი", "კეჩუპი", "ყველი", "პეპერონი", "ცხარე წიწაკა"],
    "ბურგერი": ["ბურგერის პური", "გოჭის ხორცი", "სოუზი", "პომიდორი", "ყველი","სალათის ფურცელი"],
    "სალათა": ["სალათის ფურცელი", "პომიდორი", "კიტრი", "ხახვი", "წიწაკა"],
    "შაურმა":["კიტრი", "პომიდორი", "ხორცი", "მაიონეზი", "კეჩუპი", "სალათის ფურცელი"]
};
const photos = {
    "პიცა": "../images/პიცუ",
    "ბურგერი": "../images/burger.jpeg",
    "სალათა": "../images/salata.jpg",
    "შაურმა":"../images/შაურმა",
};


const moveToFavoritePage = (foodName) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const isFavorite = storedFavorites.includes(foodName);

    if (isFavorite) {
        const index = storedFavorites.indexOf(foodName);
        storedFavorites.splice(index, 1);
    } else {
        storedFavorites.push(foodName);
    }

    const checkbox = document.querySelector(`.heart[data-food-name="${foodName}"]`);

    if (isFavorite) {
        checkbox.style.color = '';
    } else {
        checkbox.style.color = 'red';
    }

    const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    selectedItems.push({ name: foodName, ingredients: ingredients[foodName], photo: photos[foodName] });
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
}

const displayAllIngredients = () => {
    const selectedItemsContainer = document.getElementById("selectedItemsContainer");

    // Check if the input has a value
    const inputElement = document.getElementById("foodInput");
    if (!inputElement.value.trim()) {
        selectedItemsContainer.innerHTML = '';
        return;
    }

    selectedItemsContainer.innerHTML = '';

    for (const foodName of foods) {
        const foodIngredients = ingredients[foodName];
        const foodPhoto = photos[foodName];

        const divContent = `
            <div id="recept">
                <h2 class="nickname">${foodName}</h2>
                <img src="${foodPhoto}" class="img" >
                <ul>
                    ${foodIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul> 
                <div class="checkbox-container">
                    <input type="checkbox" class="heart" id="heart-${foodName}" data-food-name="${foodName}" onchange="moveToFavoritePage('${foodName}')"/>
                    <label class="heart1" for="heart-${foodName}">❤</label>
                </div>
            </div>
        `;

        selectedItemsContainer.innerHTML += divContent;
    }
};

const searchIngredients = () => {
    // Call the displayAllIngredients function when the search button is clicked
    displayAllIngredients();
};


const filterIngredients = () => {
    const inputElement = document.getElementById("foodInput");
    const selectedItemsContainer = document.getElementById("selectedItemsContainer");

    const foodSubstring = inputElement.value.trim().toLowerCase();
    const matchingFoods = foods.filter(food => food.toLowerCase().includes(foodSubstring));

    // Check if the input is empty or no matching foods
    if (!foodSubstring || matchingFoods.length === 0) {
        return;
    }

    for (const foodName of matchingFoods) {
        const foodIngredients = ingredients[foodName];
        const foodPhoto = photos[foodName];

        const divContent = `
            <div id="recept">
                <h2 class="nickname">${foodName}</h2>
                <img src="${foodPhoto}" class="img" >
                <ul>
                    ${foodIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul> 
                <div class="checkbox-container">
                    <input type="checkbox" class="heart" id="heart-${foodName}" data-food-name="${foodName}" onchange="moveToFavoritePage('${foodName}')"/>
                    <label class="heart1" for="heart-${foodName}">❤</label>
                </div>
            </div>
        `;

        selectedItemsContainer.innerHTML += divContent;
    }
};

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener('click', filterIngredients);

// Remove the input event listener for real-time updates
// const inputElement = document.getElementById("foodInput");
// inputElement.addEventListener('input', filterIngredients);

// Initialize the display when the page loads
displayAllIngredients();