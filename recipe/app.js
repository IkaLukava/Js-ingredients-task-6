const foods = ["პიცა", "ბურგერი", "სალათა", "შაურმა"];
const ingredients = {
    "პიცა": ["მაიონეზი", "კეჩუპი", "ყველი", "პეპერონი"],
    "ბურგერი": ["ბურგერის პური", "გოჭის ხორცი", "სოუზი", "პომიდორი", "ყველი","სალათის ფურცელი"],
    "სალათა": ["სალათის ფურცელი", "პომიდორი", "კიტრი", "ხახვი"],
    "შაურმა":["კიტრი", "პომიდორი", "ხორცი", "მაიონეზი", "კეჩუპი", "სალათის ფურცელი"]
};
const photos = {
    "პიცა": "../images/pic",
    "ბურგერი": "../images/burger.jpeg",
    "სალათა": "../images/salata.jpg",
    "შაურმა":"../images/shaurma",
};

const moveToFavoritePage = (foodName) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const storedCheckboxState = JSON.parse(localStorage.getItem("checkboxState")) || {};

    const isFavorite = storedFavorites.includes(foodName);

    if (isFavorite) {
        const index = storedFavorites.indexOf(foodName);
        storedFavorites.splice(index, 1);
        delete storedCheckboxState[foodName];
    } else {
        storedFavorites.push(foodName);
        storedCheckboxState[foodName] = true;
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
    localStorage.setItem("checkboxState", JSON.stringify(storedCheckboxState));
}

const displayIngredients = () => {
    const inputElement = document.getElementById("foodInput");
    const resultElement = document.getElementById("result");
    const selectedItemsContainer = document.getElementById("selectedItemsContainer");

    const foodPrefix = inputElement.value.trim().toLowerCase();
     
    const matchingFoods = foods.filter(food => food.toLowerCase().startsWith(foodPrefix));

    if (matchingFoods.length > 0) {
        // Loop through all matching foods
        for (const foodName of matchingFoods) {
            if (!isSelected(foodName)) {
            const foodIngredients = ingredients[foodName];
            const foodPhoto = photos[foodName];

            const divContent = `
                <div id="recept">
                    <h2>${foodName}</h2>
                    <img src="${foodPhoto}" width="200">
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
            markAsSelected(foodName);

            // Add event listener to the checkbox within this block
            const checkbox = document.querySelector(`.heart[data-food-name="${foodName}"]`);
            checkbox.addEventListener('change', function () {
                const storedCheckboxState = JSON.parse(localStorage.getItem("checkboxState")) || {};
                storedCheckboxState[foodName] = this.checked; // Use `this.checked` to get the checkbox state
                localStorage.setItem("checkboxState", JSON.stringify(storedCheckboxState));
            });

            
            // registerCheckboxListener(foodName);

        } else {
            resultElement.innerHTML = "<p class='none'>თქვენ ეს არჩევანი უკვე მიღებული გაქვთ</p>";
        }
    }
            inputElement.value = '';
            resultElement.style.display = 'none';

    } else {
        resultElement.innerHTML = "<p class='none'>ასეთი საკვები შეკვება ჩვენთან შეუძლებელია</p>";
    }
};


const isSelected = (foodName) => {
    const storedCheckboxState = JSON.parse(localStorage.getItem("checkboxState")) || {};
    return storedCheckboxState[foodName] === true;
}

const markAsSelected = (foodName) => {
    const storedCheckboxState = JSON.parse(localStorage.getItem("checkboxState")) || {};
    storedCheckboxState[foodName] = true;
    localStorage.setItem("checkboxState", JSON.stringify(storedCheckboxState));
}