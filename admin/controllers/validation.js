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