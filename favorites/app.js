const displaySelectedItems = () => {
    const selectedItemsContainer = document.getElementById("selectedItemsContainer");

    const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

    selectedItems.forEach(item => {
        const div = document.createElement("div");
        div.id = "recept";

        div.innerHTML = `
            <h2>${item.name}</h2>
            <img src="${item.photo}" class="img" width="200">
            <ul>${item.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
            <div class="checkbox-container">
                <input type="checkbox" class="heart" id="heart"-${item.name}" data-food-name="${item.name}" onchange="handleCheckboxChange('${item.name}')"/>
                <label for="heart"-${item.name}">❤</label>
            </div>
        `;

        selectedItemsContainer.appendChild(div);
    });
}

const handleCheckboxChange = (itemName) => {
    const selectedItemsContainer = document.getElementById("selectedItemsContainer");

    // Remove the item from the screen
    const itemDiv = document.getElementById("recept");
    if (itemDiv) {
        selectedItemsContainer.removeChild(itemDiv);
    }

    // Remove the item from local storage
    const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    const updatedItems = selectedItems.filter(item => item.name !== itemName);
    localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
}

window.addEventListener('load', () => {
    displaySelectedItems();
});