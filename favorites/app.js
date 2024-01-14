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

            const checkbox = document.getElementById("heart");
            if (checkbox) {
                checkbox.checked = isDivHidden(selectedFood);

                checkbox.addEventListener('change', function () {
                    const storedCheckboxState = JSON.parse(localStorage.getItem("checkboxState")) || {};
                    storedCheckboxState[selectedFood] = this.checked;
                    localStorage.setItem("checkboxState", JSON.stringify(storedCheckboxState));

                    if (this.checked) {
                        showDiv(selectedFood);
                    } else {
                        hideDiv(selectedFood);
                    }
                });
            }
        }
    }
};

function isDivHidden(foodName) {
    const storedCheckboxState = JSON.parse(localStorage.getItem("checkboxState")) || {};
    return storedCheckboxState[foodName] || false;
}

function hideDiv(foodName) {
    const divToHide = document.getElementById("destinationDiv");
    if (divToHide) {
        divToHide.style.display = 'none';
    }
}

function showDiv(foodName) {
    const divToShow = document.getElementById("destinationDiv");
    if (divToShow) {
        divToShow.style.display = 'block';
    }

    // Update local storage with div content and selected food
    const divContent = divToShow.innerHTML;
    localStorage.setItem("divContent", divContent);
    localStorage.setItem("selectedFood", foodName);
}

function getQueryStringParams() {
    const queryString = window.location.search.substring(1);
    const params = {};

    queryString.split('&').forEach(param => {
        const [key, value] = param.split("=");
        params[key] = decodeURIComponent(value);
    });

    // Store the parameters in local storage
    localStorage.setItem("queryStringParams", JSON.stringify(params));

    return params;
}
