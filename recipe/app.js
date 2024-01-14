const foods = ["პიცა", "ბურგერი", "სალათა", "შაურმა"];
const ingredients = {
    "პიცა": ["მაიონეზი", "კეჩუპი", "ყველი", "პეპერონი"],
    "ბურგერი": ["ბურგერის პური", "გოჭის ხორცი", "სოუზი", "პომიდორი", "ყველი","სალათის ფურცელი"],
    "სალათა": ["სალათის ფურცელი", "პომიდორი", "კიტრი", "ხახვი"],
    "შაურმა":["კიტრი", "პომიდორი", "ხორცი", "მაიონეზი", "კეჩუპი", "სალათის ფურცელი"]
};
const photos = {
    "პიცა": "../images/pizza",
    "ბურგერი": "../images/burger.jpeg",
    "სალათა": "../images/salata.jpg",
    "შაურმა":"../images/shaurma",
};


    function displaySuggestions() {
        const inputElement = document.getElementById("foodInput");
        const resultElement = document.getElementById("result");
        const foodPrefix = inputElement.value.trim().toLowerCase();

        if (foodPrefix.length === 0) {
            resultElement.style.display = 'none';
        return;
        }

        const matchingFoods = foods.filter(food => food.toLowerCase().startsWith(foodPrefix));

        if (matchingFoods.length > 0) {
            const suggestions = matchingFoods.map(food => `
                <div class="suggestion" onclick="displayIngredients('${food}')">${food}</div>
            `).join('');

            resultElement.innerHTML = suggestions;
            resultElement.style.display = 'block';
        } else {
            resultElement.innerHTML = "<p>ვერ მოიძებნა...</p>";
            resultElement.style.display = 'block';
        }
    }



    function displayIngredients() {
        const inputElement = document.getElementById("foodInput");
        const resultElement = document.getElementById("result");
        const selectedItemsContainer = document.getElementById("selectedItemsContainer"); // Add this line
    
        const foodPrefix = inputElement.value.trim().toLowerCase();
    
        const matchingFoods = foods.filter(food => food.toLowerCase().startsWith(foodPrefix));
    
        if (matchingFoods.length > 0) {
    
            const foodName = matchingFoods[0];
            const foodIngredients = ingredients[foodName];
            const foodPhoto = photos[foodName];
    
            // Retrieve checkbox state from localStorage
            const storedCheckboxState = JSON.parse(localStorage.getItem("checkboxState")) || {};
            const checkboxState = storedCheckboxState[foodName] || false;
    
            const divContent = `
                <div id="recept">
                    <h2>${foodName}</h2>
                    <img src="${foodPhoto}" width="200">
                    <ul>
                        ${foodIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul> 
                    <input id="heart" type="checkbox" ${checkboxState ? 'checked' : ''} onchange="moveToAnotherPage(this)" />
                    <label for="heart">❤</label>
                </div>
            `;

        selectedItemsContainer.innerHTML += divContent;
        // resultElement.innerHTML += divContent;
        resultElement.style.display = 'none';

        localStorage.setItem("selectedFood", foodName);
    } else {
        resultElement.innerHTML = "<p class='none'>მოცემულ საკვებს ჯერჯერობით ვერ შემოგთავაზებთ.</p>";
    }
}



function moveToAnotherPage(checkbox) {
    const selectedFood = localStorage.getItem("selectedFood");

    const storedCheckboxState = JSON.parse(localStorage.getItem("checkboxState")) || {};
    storedCheckboxState[selectedFood] = checkbox.checked;
    localStorage.setItem("checkboxState", JSON.stringify(storedCheckboxState));

    if (checkbox.checked) {
        const divContent = document.getElementById("recept").outerHTML;

        if (window.location.pathname.includes("favorites")) {
            // Remove div from the screen on the favorite page
            const receptDiv = document.getElementById("recept");
            if (receptDiv) {
                receptDiv.remove();
            }

            // Remove div from local storage on the favorite page
            const storedDivContent = localStorage.getItem("divContent");
            if (storedDivContent) {
                localStorage.removeItem("divContent");
            }
        }

        // Redirect to the second page
        const secondPage = '../favorites/index.html';
        window.location.href = `${secondPage}?divContent=${encodeURIComponent(divContent)}&selectedFood=${encodeURIComponent(selectedFood)}`;
    }
}
