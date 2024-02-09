let isContainerPopulated = false;

const foods = [
  "პიცა",
  "ბურგერი",
  "სალათა",
  "შაურმა",
  "მწვადი",
  "ქაბაბი",
  "ლობიო",
  "ხინკალი",
];

const ingredients = {
  პიცა: ["მაიონეზი", "კეჩუპი", "ყველი", "პეპერონი", "ცხარე წიწაკა"],
  ბურგერი: [
    "ბურგერის პური",
    "გოჭის ხორცი",
    "სოუზი",
    "პომიდორი",
    "ყველი",
    "სალათის ფურცელი",
  ],
  სალათა: ["სალათის ფურცელი", "პომიდორი", "კიტრი", "ხახვი", "წიწაკა"],
  შაურმა: [
    "კიტრი",
    "პომიდორი",
    "ხორცი",
    "მაიონეზი",
    "კეჩუპი",
    "სალათის ფურცელი",
  ],
  მწვადი: ["ღორის ხორცი", "ბროწეული", "ხახვი", "თავისი ნელ-ცხარე სუნელებითურთ"],
  ქაბაბი: [
    "ღორისა და საქონლის რბილი ხორცი",
    "ხახვი",
    "ნიორი",
    "კოწახური",
    "ქინძის მარცვლები",
    "ძირას თესლი",
    "მარილი და პილპილი",
  ],
  ლობიო: [
    "ლობიო",
    "ხახვი",
    "ნიორი",
    "დაფნის ფოთოლი",
    "მარილი,ძმარი",
    "პრასი",
    "ოხრახუში,ქინძი",
  ],
  ხინკალი: [
    "საქონლის,ღორის ან ცხვრის ხორცი",
    "კვლიავი",
    "ქონდარი",
    "ნიორი",
    "ხახვი",
    "ძირა",
  ],
};

const photos = {
  პიცა: "../images/პიცუ",
  ბურგერი: "../images/burger.jpeg",
  სალათა: "../images/salata.jpg",
  შაურმა: "../images/შაურმა",
  მწვადი: "../images/მწვადი",
  ქაბაბი: "../images/ქაბაბი1",
  ლობიო: "../images/ლობიო1",
  ხინკალი: "../images/ხინკალი",
};

const saveInLocalStorage = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

const getFromLocalStorage = (name) =>
  JSON.parse(localStorage.getItem(name)) || [];

const moveToFavoritePage = (foodName) => {
  const storedFavorites = getFromLocalStorage("favorites");

  const isFavorite = storedFavorites.includes(foodName);
  const icon = document.querySelector(`.heart[data-food-name="${foodName}"]`);

  if (isFavorite) {
    const index = storedFavorites.indexOf(foodName);
    storedFavorites.splice(index, 1);
    icon.classList.remove("red", "fas");
    icon.classList.add("far");

    const selectedItems = getFromLocalStorage("selectedItems");
    const updatedItems = selectedItems.filter((item) => item.name !== foodName);

    saveInLocalStorage("selectedItems", updatedItems);
  } else {
    storedFavorites.push(foodName);
    icon.classList.add("red", "fas");
    icon.classList.remove("far");

    const selectedItems = getFromLocalStorage("selectedItems");
    selectedItems.push({
      name: foodName,
      ingredients: ingredients[foodName],
      photo: photos[foodName],
    });

    saveInLocalStorage("selectedItems", selectedItems);
  }

  saveInLocalStorage("favorites", storedFavorites);
};

const checkIsFavorited = (foodName) => {
  const selecteddiv = getFromLocalStorage("selectedItems");
  return selecteddiv.some(item => item.name === foodName);
};


const displayAllIngredients = () => {
  const selectedItemsContainer = document.getElementById(
    "selectedItemsContainer"
  );
  selectedItemsContainer.innerHTML = "";

  for (const foodName of foods) {
    const foodIngredients = ingredients[foodName];
    const foodPhoto = photos[foodName];

          
    const isFavorited = checkIsFavorited(foodName);

    const iconClass = isFavorited ? 'fas red' : 'far';

    const divContent = `
            <div id="recept">
                <h2 class="nickname">${foodName}</h2>
                <img src="${foodPhoto}" class="img" >
                <ul>
                    ${foodIngredients
                      .map((ingredient) => `<li>${ingredient}</li>`)
                      .join("")}
                </ul> 
                <div class="icon-container">
                    <i class="heart ${iconClass} fa-heart" data-food-name="${foodName}" onclick="moveToFavoritePage('${foodName}')"></i>
                </div>
            </div>
        `;

    selectedItemsContainer.innerHTML += divContent;
  }
};

displayAllIngredients();

const filterIngredients = () => {
  const inputElement = document.getElementById("foodInput");
  const selectedItemsContainer = document.getElementById(
    "selectedItemsContainer"
  );

  const foodSubstring = inputElement.value.trim().toLowerCase();

  selectedItemsContainer.innerHTML = "";

  if (!foodSubstring) {
    displayAllIngredients();
    return;
  }

  const matchingFoods = foods.filter((food) =>
    food.toLowerCase().startsWith(foodSubstring)
  );

  if (matchingFoods.length > 0) {
    matchingFoods.forEach((foodName) => {
      const foodIngredients = ingredients[foodName];
      const foodPhoto = photos[foodName];

      const divContent = `
                <div id="recept">
                    <h2 class="nickname">${foodName}</h2>
                    <img src="${foodPhoto}" class="img">
                    <ul class="solo">
                        ${foodIngredients
                          .map((ingredient) => `<li>${ingredient}</li>`)
                          .join("")}
                    </ul> 
                    <div class="icon-container">
                        <i class="heart far fa-heart" data-food-name="${foodName}" onclick="moveToFavoritePage('${foodName}')"></i>
                    </div>
                </div>
            `;

      selectedItemsContainer.innerHTML += divContent;
    });
  } else {
    selectedItemsContainer.innerHTML =
      '<p class="none">ჩვენთან ამ საკვებს ვერ შეიძენთ! </p>';
  }
};

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", filterIngredients);
