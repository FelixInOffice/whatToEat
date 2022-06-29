/*

Load Restaurants Function

*/
function setDefault() {
    if (!localStorage.getItem("Restaurants")) {
        let restaurantArray = [{ "id": 0, "restaurant": "" }];
        localStorage.setItem("Restaurants", JSON.stringify(restaurantArray));
    }
}

let getRestaurantsArray = JSON.parse(localStorage.getItem("Restaurants"));

function textBoxElement(id, value) {
    let inputRestaurant;
    let divOfRestaurant = document.getElementById("divOfRestaurant");
    let divOfItemLine = document.createElement("div");
    let delButton = document.createElement("button");

    delButton.setAttribute("class", "btn btn-danger deleteButton");
    delButton.setAttribute("onclick", "del(this)");
    delButton.innerText = "X";

    if (id != 0) {
        inputRestaurant = document.createElement("input");

        divOfItemLine.setAttribute("class", "itemLine");
        inputRestaurant.setAttribute("type", "text");
        inputRestaurant.setAttribute("id", `place-${id}`);
        inputRestaurant.setAttribute("onInput", `autoSave(this)`);
        inputRestaurant.setAttribute("class", "form-control inputBox");

        if (value != "") {
            inputRestaurant.setAttribute("value", value);
        }

        divOfItemLine.appendChild(inputRestaurant);
        divOfItemLine.appendChild(delButton);
        divOfRestaurant.appendChild(divOfItemLine);
    } else {
        inputRestaurant = document.getElementById(`place-${id}`);
        inputRestaurant.value = value;
    }
}

function loadSavedRestaurants() {
    console.log(getRestaurantsArray.length);
    for (let i = 0; i < getRestaurantsArray.length; i++) {
        textBoxElement(i, getRestaurantsArray[i].restaurant);
    }
}

function changeIDtoNumber(elementID) {
    return elementID.replace(/[^\d.]/g, '');
}

function getRestaurantsLocalStorage(id) {
    return getRestaurantsArray[changeIDtoNumber(id)];
}

function getInputText(thisElement) {
    return thisElement.value;
}

function changeValue(element, text) {
    let newObj = getRestaurantsLocalStorage(element.id);
    newObj['restaurant'] = text;
    getRestaurantsArray[changeIDtoNumber(element.id)] = newObj;
    return getRestaurantsArray;

}

function autoSave(thisElement) {
    let getRestaurantsArray = changeValue(thisElement, getInputText(thisElement));
    localStorage.setItem("Restaurants", JSON.stringify(getRestaurantsArray));
}


/*

Button Function

*/
function add() {
    textBoxElement(getRestaurantsArray.length, "");
    console.log(getRestaurantsArray.length);
    let id = getRestaurantsArray[getRestaurantsArray.length - 1].id + 1;
    getRestaurantsArray.push({ "id": id, "restaurant": "" });
    localStorage.setItem("Restaurants", JSON.stringify(getRestaurantsArray));
}

function del(button) {
    let id = changeIDtoNumber(button.previousElementSibling.id);

    let index = getRestaurantsArray.indexOf(getRestaurantsArray[id]);

    if (index > -1) {
        getRestaurantsArray.splice(index, 1);
    }

    localStorage.setItem("Restaurants", JSON.stringify(getRestaurantsArray));

    if (getRestaurantsArray.length == 0) {
        localStorage.clear();
        setDefault();
    }

    button.previousElementSibling.remove();
    button.remove();
    location.reload();
}

function reset() {
    localStorage.clear();
    setDefault();
    location.reload();
}

function getResult() {
    for (let i = 0; i < document.querySelectorAll('input').length; i++) {
        if (document.querySelectorAll('input')[i].value == "") {
            return alert("請輸入所有餐廳");
        }
    }

    let randomNow = setInterval(function () {
        document.getElementById("result").innerHTML = getRestaurantsArray[Math.floor(Math.random() * getRestaurantsArray.length)].restaurant;
    }, 10);

    setTimeout(function () {
        clearInterval(randomNow);
    }, 1500)
}