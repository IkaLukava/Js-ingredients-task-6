let ingredients = [];

const getIngredientsFromLocalstorage = () => {
    const items = JSON.parse(localStorage.getItem("ingredients"));

    if(items){
        ingredients = [...items];
    }
}

getIngredientsFromLocalstorage();

const container = document.getElementById("container3");
const tittleInput = document.getElementById("title");
const textInput = document.getElementById("text");
const text2Input = document.getElementById("text2");

let deleteItem = (title)=>{
    let index = ingredients;
    if(index !== -1){
        ingredients.splice(index,1)
        addItemToLocalStorage();
        container.innerHTML="";
        renderItems();
    }
}


let getCard = (title) => {
    let dom = `
        <div class="card m-2" style="width: 12rem; height: 170px;border-radius:10p">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <label for="heart" class="heart" onclick="changeColor(this)">❤</label>
                <button class="btn btn-danger" onclick="deleteItem('${title}')">Delete</button>
            </div>
        </div>`;

    let newCard = document.createElement("div");
    newCard.innerHTML = dom;

    return newCard;
};


function changeColor(element) {
    element.style.color = "red";
}




let addItem = (title) =>{
    let card = getCard(title);

    container.appendChild(card)
}

let renderItems = () => {
    ingredients.forEach((item) => {
        addItem(item.title);
    });
};

renderItems();

let addCardValues = () =>{
    let tittle =tittleInput.value;

    if(tittle != '' ){
        addItem(tittle);
        let item = {
            tittle,
        };
        ingredients.push(item);

        addItemToLocalStorage(item);
    }else{
        alert("გთხოვთ სწორად მიიღოთ არჩევანი!");
    }
}

// text input



const addItemToLocalStorage = (item) =>{
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
}