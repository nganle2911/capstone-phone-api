// TODO: Check if input is empty
function checkEmpty(value, idErr) {
    if (value == null || value == "") {
        document.getElementById(idErr).style.display = "block";
        document.getElementById(idErr).innerText = "It must be filled!";
        return false;
    }
    document.getElementById(idErr).style.display = "none";
    return true;
}

// TODO: Check if brand is invalid 
function checkBrand(value, idErr) {
    if (value == "Apple" || value == "Samsung") {
        document.getElementById(idErr).style.display = "none";
        return true; 
    } 
    document.getElementById(idErr).style.display = "block";
    document.getElementById(idErr).innerText = "Please choose the correct brand!"; 
    return false; 
}

// TODO: Check if product existed 
function checkProductExist(value, productsList) {
    var position = productsList.findIndex((item) => {
        return item.id === value;
    });
    if (position != -1) {
        document.getElementById("tbIdPhone").style.display = "block";
        document.getElementById("tbIdPhone").innerText = "ID product already existed! Please enter another ID!";
        return false;
    }
    document.getElementById("tbIdPhone").style.display = "none";
    return true;
}