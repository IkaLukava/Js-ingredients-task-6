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
            <div class="icon-container">
                <i class="heart fas fa-heart" data-food-name="${item.name}" onclick="handleCheckboxChange('${item.name}')"></i>
            </div>
        `;

        selectedItemsContainer.appendChild(div);
    });
};

const handleCheckboxChange = (itemName) => {
    const selectedItemsContainer = document.getElementById("selectedItemsContainer");

    const itemDiv = document.getElementById("recept");
    if (itemDiv) {
        selectedItemsContainer.removeChild(itemDiv);
    }

    const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    const updatedItems = selectedItems.filter(item => item.name !== itemName);
    localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
};

window.addEventListener('load', () => {
    displaySelectedItems();
});