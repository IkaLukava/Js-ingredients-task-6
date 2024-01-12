window.onload = function () {
    const params = getQueryStringParams();
    
    const divContent = params['divContent'];
    const selectedFood = params['selectedFood'];

    if (divContent && selectedFood) {
        const destinationDiv = document.getElementById("destinationDiv");
        if (destinationDiv) {
            destinationDiv.innerHTML = divContent;

            const pageTitle = document.getElementById("pageTitle");
            if (pageTitle) {
                pageTitle.innerText = `${selectedFood} Recipe`;
            }

            localStorage.setItem("divContent", divContent);
            localStorage.setItem("selectedFood", selectedFood);
        }
    } else {

        const storedDivContent = localStorage.getItem("divContent");
        const storedSelectedFood = localStorage.getItem("selectedFood");

        if (storedDivContent && storedSelectedFood) {
            const destinationDiv = document.getElementById("destinationDiv");
            if (destinationDiv) {
                destinationDiv.innerHTML = storedDivContent;


                const pageTitle = document.getElementById("pageTitle");
                if (pageTitle) {
                    pageTitle.innerText = `${storedSelectedFood} Recipe`;
                }
            }
        }
    }
};

function getQueryStringParams() {
    const queryString = window.location.search.substring(1);
    const params = {};

    queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
    });

    return params;
}

function deleteFavorite() {
    const selectedFood = localStorage.getItem("selectedFood");
    const storedCheckboxState = JSON.parse(localStorage.getItem("checkboxState")) || {};

    const destinationDiv = document.getElementById("destinationDiv");
    if (destinationDiv) {
        destinationDiv.innerHTML = "";
    }

    delete storedCheckboxState[selectedFood];
    localStorage.setItem("checkboxState", JSON.stringify(storedCheckboxState));

    localStorage.removeItem("selectedFood");
    localStorage.removeItem("divContent");

    const pageTitle = document.getElementById("pageTitle");
    if (pageTitle) {
        pageTitle.innerText = "Favorite Recipe";
    }
    
    window.location.href = '../favorites/index.html';
}