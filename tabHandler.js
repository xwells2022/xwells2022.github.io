//Xander Wells
/**
 * sets the html tabs and updates visuals to match. also contains a section that can be used to reset the visuals and contents of all but the car list
 */
function setTab(destinationTab, ignoreRestrictions = false, reset = false) {
    if (!navbarItem[destinationTab].classList.contains("navbar-enabled") && !ignoreRestrictions) { return }
    progressbar.style.display = "flex";
    var time = move();
    setTimeout(() => { //after the loading animation has played
        /**
         * do this for the origin tab
         * */
        if (destinationTab != currentTab) { //if statement so that the initial setup doesn't interfere
            //hide uppder arrow
            arrows[currentTab].classList.remove("navbar-arrow-up-active");
            //hide tab html
            tabs[currentTab].classList.remove("reservation-step-active");
            //add clicking ability
            navbarItem[currentTab].classList.add("navbar-enabled");
            if (currentTab != 3) { //don't want to change this for the checkout tab
                //set details to whatever is relevant to the page
                navbarDetailsFields[currentTab].innerHTML = getDetails(currentTab);
                //set details font to small blue font
                navbarDetailsFields[currentTab].classList.add("navbar-details-confirmed");
            }
            //add checkmark if destination tab is after the origin tab
            if (destinationTab > currentTab) { navbarNumLabels[currentTab].textContent = "✓" }
        }
        /**
         * do this for the destination tab
         * */
        //show upper arrow
        arrows[destinationTab].classList.add("navbar-arrow-up-active");
        //show tab html
        tabs[destinationTab].classList.add("reservation-step-active");
        //remove clicking ability
        navbarItem[destinationTab].classList.remove("navbar-enabled");
        //set details to "select"
        navbarDetailsFields[destinationTab].innerHTML = destinationTab == 3 ? "Finalize" : "Select";
        //set details font to regular font
        navbarDetailsFields[destinationTab].classList.remove("navbar-details-confirmed");
        //remove gray color
        navbarContent[destinationTab].classList.remove("navbar-gray");
        //update the listing for the vehicle tab
        if (destinationTab == 2) { updateSorting(); }
        //update the checkout info
        if (destinationTab == 3) { updateCheckout(); }

        currentTab = destinationTab;
        progressbar.style.display = "none";
        map.resize(); //update map size
        if (reset) {
            //resets navbar
            var numLabels = ["①", "②", "③", "④"];
            for (let i = 0; i < arrows.length; i++) {
                if (i != 0) {
                    navbarItem[i].classList.remove("navbar-enabled");
                    navbarContent[i].classList.add("navbar-gray");
                    navbarDetailsFields[i].innerHTML = "";
                }
                else {
                    navbarDetailsFields[i].innerHTML = "Select";
                }
                navbarNumLabels[i].textContent = numLabels[i];
                navbarDetailsFields[i].classList.remove("navbar-details-confirmed");
            }
            //resets timeframe 
            document.getElementById("promo").value = "";
            document.getElementById("age").value = "25+"
            //resets location
            document.getElementById("Pickup").innerHTML = "";
            document.getElementById("Dropoff").innerHTML = "";
            selection = "Pickup"; //where we want it to go
            pickupFilled = false;
            dropoffFilled = false;
            locationFirstTime = true;
            pickupCity = "No Selection Yet";
            dropoffCity = "No Selection Yet";
            setDestination(selection);
            document.querySelector(".location-header-next").style.display = "none";

            //reset vehicle section
            firstTimeVisitingCars = true;
            proceedButton.style.display = "none";

            //clear cart 
            carsInCheckout = [];
            document.getElementById("paymentForm").reset();
        }
    }, time);
}

/**
 * based on the given tab, calls the relevant function to get the details needed for the navbar
 */
function getDetails(tab) {
    var details;
    if (tab == 0) { details = getTimeFrame(); }
    else if (tab == 1) { details = getLocation(); }
    else if (tab == 2) { details = getVehicle(); }
    return details
}

/**
 * variables for the loading screen
 */
var played = 0;
var progressbar = document.getElementById("progressScreen");
var loadingScreenText = document.getElementById("loadingText");
var loadingScreenTexts = ["LOADING...", "SYNCHING DATA...", "FETCHING DATA...", "PROCESSING...", "GATHING INFO..."];

/**creates a fake loading screen that goes for a certain amount of time and returns the amount of time it takes which can be used in a set timeout function 
 * a modified version of this: https://www.w3schools.com/howto/howto_js_progressbar.asp
*/
function move() {
    loadingScreenText.textContent = loadingScreenTexts[Math.floor(Math.random() * loadingScreenTexts.length)];
    var time = 5;
    if (played == 0) {
        played = 1;
        var elem = document.getElementById("progressBar");
        var width = 1;
        var id = setInterval(frame, time);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                played = 0;

            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }
    return time * 100 + 550;
}

//gets navbar elements
var arrows = document.getElementsByClassName("navbar-arrow-up");
var tabs = document.getElementsByClassName("reservation-step");
var navbarDetailsFields = document.getElementsByClassName("navbar-item-content-details");
var navbarContent = document.getElementsByClassName("navbar-item-content");
var navbarItem = document.getElementsByClassName("navbar-item");
var navbarNumLabels = document.getElementsByClassName("navbar-num-label");

var currentTab = 0; //default tab
setTab(currentTab, true); //load default tab