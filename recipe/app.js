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

function displayIngredients() {
    const inputElement = document.getElementById("foodInput");
    const resultElement = document.getElementById("result");
    const foodName = inputElement.value.trim();

    if (foods.includes(foodName)) {
        const foodIngredients = ingredients[foodName];
        const foodPhoto = photos[foodName];

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

        resultElement.innerHTML = divContent;

        localStorage.setItem("selectedFood", foodName);
    } else {
        resultElement.innerHTML = "<p class='none'>მოცემულ საკვებს ჯერჯერობით ვერ შემოგთავაზებთ.</p>";
    }
}

function moveToAnotherPage(checkbox) {
    const selectedFood = localStorage.getItem("selectedFood");

    // Update checkbox state in localStorage
    const storedCheckboxState = JSON.parse(localStorage.getItem("checkboxState")) || {};
    storedCheckboxState[selectedFood] = checkbox.checked;
    localStorage.setItem("checkboxState", JSON.stringify(storedCheckboxState));

    if (checkbox.checked) {
        const divContent = document.getElementById("recept").outerHTML;

        // Specify the URL of the destination page
        const secondPage = '../favorites/index.html';

        const newPage = window.open(secondPage);
        newPage.document.write(`
            <html>
                <head><title>${selectedFood} Recipe</title></head>
                <body>${divContent}</body>
            </html>
        `);
    }
}


window.onload = function () {
    const selectedFood = localStorage.getItem("selectedFood");
    if (selectedFood && foods.includes(selectedFood)) {
        document.getElementById("foodInput").value = selectedFood;
        displayIngredients();
    }
};
