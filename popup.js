//Xander Wells
var popup;

/**
 * opens the given popup
 */
function openPopup(name) {
    popup = document.getElementById(name);
    popup.style.display = "block";
}

/**
 * closes the given popup
 */
function closePopup(name) {
    popup = document.getElementById(name);
    popup.style.display = "none";
}

/**
 * listens for window clicks and if they are outside of the popup boundary then it closes the popup
 */
window.onclick = function(event) {
    if (event.target == popup) {
        if (popup.id == 'finalPopup') {reload();} //for the reload popup we want to call the reload function instead of hiding the popup directly
        else {popup.style.display = "none";}
    }
}
