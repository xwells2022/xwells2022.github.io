//Xander Wells
/**
 * used to gather details for updating the navbar
 */
function getLocation() {
    var startLocation = "Pickup: " + pickupCity;
    var endLocation = "Dropoff: " + dropoffCity;
    return startLocation + "<br>" + endLocation;
}

/**
 * some default variables
 */
var selection = "Pickup"; //where we want it to go
var pickupFilled = false;
var dropoffFilled = false;
var locationFirstTime = true;
var pickupCity = "No Selection Yet", dropoffCity = "No Selection Yet";
var pickupAddress, dropoffAddress;

/**
 * if both sections have been filled, it reveals the button
 * if only one section is filled, it will direct the focus to the section that has not been filled, 
 * allowing the user to simply click two buttons and not have to worry about the flow of stuff
 */
function selectButtonHandler(buttonInfo) {
    populateDestination(buttonInfo.format, buttonInfo.city, buttonInfo.address);
    if (pickupFilled && dropoffFilled) {
        if (locationFirstTime) { //only shows the button (and creates the animation) once. 
            var locationProceedButton = document.querySelector(".location-header-next");
            locationProceedButton.style.display = "inline";
            locationProceedButton.classList.add("button-pop"); 
            setTimeout(() => {
                locationProceedButton.classList.remove("button-pop");
            },500);
            locationFirstTime = false;
        }
    }
    else {
        if (pickupFilled) {
            setDestination("Dropoff");
        }
        else if (dropoffFilled) {
            setDestination("Pickup");
        }
    }
}

/**
 * takes the given info and updates it to the relevant section (based on which destination is desired)
 */
function populateDestination(info, city, address) {
    document.getElementById(selection).innerHTML = info;
    address += ", " + city;
    if (selection == "Pickup") {
        pickupFilled = true;
        pickupCity = city;
        pickupAddress = address;
    }
    if (selection == "Dropoff") {
        dropoffFilled = true;
        dropoffCity = city;
        dropoffAddress = address
    }
}

/**
 * sets desired destination and updates visuals to match
 */
function setDestination(target) {
    selection = target;
    var boxShadow = document.querySelector(".location-active");
    if (boxShadow != null) {boxShadow.classList.remove("location-active");}
    document.getElementById(target + "Container").classList.add("location-active");
    var displaySpan = document.getElementById("headingDestination");
    if (displaySpan.innerHTML != target) {
        displaySpan.innerHTML = target;
        displaySpan.classList.add("show-destination");
        setTimeout(() => {
            displaySpan.classList.remove("show-destination");
        },500);
    }   
}
