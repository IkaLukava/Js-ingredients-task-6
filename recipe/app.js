
//მასივები
const categories = {
  "healthy": [
    {name:"Caesar Salad", photo:""},
    {name:"Simple Salad", photo:""}, 
    {name:"Vegetables",photo:""},
    {name:"soup", photo:""},
    {name:"bean", photo:""}
  ],

  "sweets": [
    {name:"Chocolate Cake", photo:""},
    {name:"Ice Cream", photo:""},
    {name:"Candies", photo:""},
    {name:"snikers", photo:""},
    {name:"bount", photo:""}
  ],

  "fast food": [
    {name:"Hamburger", photo:""},
    {name:"Fries", photo:""},
    {name:"Shawarma",photo:""},
    {name:"hot-dog", photo:""}
  ],

  "drinks":[
    {name:"kokakola", photo:""},
    {name:"fanta", photo:""},
    {name:"sprite", photo:""},
    {name:"RcCola", photo:""},
    {name:"tropic", photo:""}
  ],

  "mamapapuri":[
    {name:"xinkali",photo:""},
    {name:"mwvadi", photo:""},
    {name:"chaxoxbili", photo:""},
    {name:"xashi", photo:""},
    {name:"xachapuri", photo:""}
  ]

};



function openCategory() {
  const categoryInput = document.getElementById("categoryInput").value.toLowerCase().trim();

  if (categories.hasOwnProperty(categoryInput)) {
    displayCategoryDetails(categoryInput);
  } else {
    alert("Please choose from the given categories!");
  }
}

function displayCategoryDetails(category) {
  const recipeDetailsContent = document.getElementById("recipeDetailsContent");
  recipeDetailsContent.innerHTML = "";

  const foods = categories[category];

  // Retrieve saved checkbox state from localStorage
  const categoryOfFoods = JSON.parse(localStorage.getItem(category)) || {};

  foods.forEach(food => {
    const saveCheckbox = document.createElement("input");
    saveCheckbox.type = "checkbox";
    saveCheckbox.id = `${category}-${food.name}-${food.photo}`;
    saveCheckbox.checked = categoryOfFoods[food.name] || false;

    const foodLabel = document.createElement("label");
    foodLabel.htmlFor = `${category}-${food.name}`;
    foodLabel.textContent = food.name;

    const foodDiv = document.createElement("div");
    foodDiv.appendChild(saveCheckbox);
    foodDiv.appendChild(foodLabel);

    recipeDetailsContent.appendChild(foodDiv);
  });

  const recipeDetails = document.querySelector(".recipe-details");
  recipeDetails.style.display = "block";
}

function closeDetails() {
  const recipeDetails = document.querySelector(".recipe-details");
  recipeDetails.style.display = "none";
}



document.addEventListener("change", function (event) {
  const target = event.target;
  if (target.type === "checkbox") {
    const [category, foodName] = target.id.split("-");
    const categoryOfFoods = JSON.parse(localStorage.getItem(category)) || {};
    categoryOfFoods[foodName] = target.checked;

    localStorage.setItem(category, JSON.stringify(categoryOfFoods));

    if (target.checked) {
      const selectedFood = categories[category].find(food => food.name === foodName);
      if (selectedFood) {
        window.location.href = `../favorites/index.html?photo=${selectedFood.photo}`;
      }
    }
  }
});

