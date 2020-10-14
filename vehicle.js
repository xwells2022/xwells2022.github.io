//Xander Wells
/**
 * returns the vehicle info in a formatted way to be used for the navbar
 */
function getVehicle() {
    var availableCarsPlural = availableCars.length == 1 ? " Car" : " Cars";
    var checkoutCarsPlural = carsInCheckout.length == 1 ? " Car" : " Cars";
    var checkoutNum = carsInCheckout.length == 0 ? "No" : carsInCheckout.length;
    var availableNum = availableCars.length == 0 ? "No" : availableCars.length;
    return "" + checkoutNum + checkoutCarsPlural + " Selected<br>" + availableNum + " More" + availableCarsPlural + " Available";
}

/**
 * moves a car from the available cars to the checkout, shows a button, and plays an impressive move to cart animation
 * https://stackoverflow.com/questions/1350581/how-to-get-an-elements-top-position-relative-to-the-browsers-viewport
 */
function moveToCart(n) {
    var cars = document.getElementsByClassName("car-listing");
    //need to calculate the offset of the car listing from the top of the screen because the position of each car element is different, especially since there is a scrollbar involved
    var top = cars[n].getBoundingClientRect().top - 271.75;
    root.style.setProperty("--transform-offset", -top + "px");
    cars[n].classList.add("move-to-cart");
    setTimeout(() => { //after animation is finished
        carsInCheckout.push(availableCars[n]);
        availableCars.splice(n, 1);
        proceedButton.style.display = "inline";
        if (firstTimeVisitingCars) { proceedButton.classList.add("button-pop"); firstTimeVisitingCars = false };

        //update stuff
        populate();
        setTimeout(() => { proceedButton.classList.remove("button-pop"); }, 500);
        updateTotal();
        console.log(availableCars.length);
    }, 800);
}

var total = 0;
/**
 * updates the total based on the cars in the checkout and updates the page header visuals to match
 */
function updateTotal() {
    total = 0;
    for (let i = 0; i < carsInCheckout.length; i++) {
        total += carsInCheckout[i].price * (hours / 24);
    }
    total = total.toFixed(2);
    var totalString = total.toString();
    var totalPaymentDollar = document.getElementById("totalPaymentDollar");
    var totalPaymentCents = document.getElementById("totalPaymentCents");
    totalPaymentDollar.innerHTML = totalString.slice(0, -3);
    totalPaymentCents.innerHTML = totalString.slice(-2);
}

/**
 * based on the array of Car objects, updates the available car section using the template
 */
function populate() {
    var carContainer = document.getElementById("carContainer");
    carContainer.innerHTML = "";
    var template = document.getElementById("carListingTemplate");

    var numCars = document.getElementById("carHeaderResults");
    numCars.innerHTML = availableCars.length;

    for (let i = 0; i < availableCars.length; i++) {
        var clone = template.content.cloneNode(true);
        var currentCar = availableCars[i];

        //set car image
        var image = clone.querySelector(".car-listing-image-src");
        image.src = currentCar.imgSRC;

        //set car type
        var type = clone.querySelector(".car-details-type");
        type.textContent = currentCar.type;

        //set car name
        var name = clone.querySelector(".car-details-name");
        name.textContent = currentCar.name;

        //set car transmission
        var transmission = clone.querySelector(".car-details-transmission");
        transmission.textContent = currentCar.transmission;

        //set car people
        var people = clone.querySelector(".car-details-people");
        people.textContent = currentCar.people;

        //set car bags
        var bags = clone.querySelector(".car-details-bags");
        bags.textContent = currentCar.bags;

        //set car payment per day
        var dayPayment = currentCar.price.toString();
        var dayDollar = clone.querySelector(".car-price-day-dollar");
        dayDollar.textContent = dayPayment.slice(0, -3);
        var dayCents = clone.querySelector(".car-price-day-cents");
        dayCents.textContent = dayPayment.slice(-2);;

        //set car total payment
        var totalPayment = (dayPayment * (hours / 24)).toFixed(2).toString();
        var totalDollar = clone.querySelector(".car-price-total-dollar");
        totalDollar.textContent = totalPayment.slice(0, -3);
        var totalCents = clone.querySelector(".car-price-total-cents");
        totalCents.textContent = totalPayment.slice(-2);

        //set animation on click
        var button = clone.querySelector(".car-select-button");
        button.addEventListener("click", function () { moveToCart(i) }, false);

        carContainer.appendChild(clone);
    }
}

/**
 * overrides the default sorting method of array.sort(), letting you sort an array of objects through various methods
 * is called multiple times for the sort function and essentially returns 1 is A is larger than B and -1 if vice versa
 * based on the key and the order, it knows when to return 1 and when to return -1
 * https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
 */
function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }
        const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        }
        else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

/**
 * updates the sorting method based on the value of the sorting dropdown select 
 */
function updateSorting() {
    var method = document.getElementById("sortingMethod").value.split(" ");
    availableCars.sort(compareValues(method[0], method[1]));
    populate();
}

//new Car (imgSRC, type, name, transmission, people, bags, price)
var availableCars = [
    new Car("car images/Nissan Versa.webp", "Compact Car", "Nissan Versa", "Automatic", 5, 2, 9.99),
    new Car("car images/Ford Fusion.webp", "Full Size Car", "Ford Fusion", "Automatic", 5, 4, 19.99),
    new Car("car images/Ford Edge.webp", "SUV", "Ford Edge", "Automatic", 5, 5, 29.99),
    new Car("car images/Dodge Grand Caravan.webp", "7 Passenger Minivan", "Dodge Grand Caravan", "Automatic", 7, 5, 39.99),
    new Car("car images/Ford F150.webp", "Pickup", "Ford F150", "Automatic", 4, 4, 49.99),
    new Car("car images/Cadillac XTS.webp", "Luxury Car", "Cadillac XTS", "Automatic", 5, 4, 59.99),
    new Car("car images/Chrysler 300.webp", "Premium Luxury Car", "Chrysler 300", "Automatic", 5, 5, 69.99),
    new Car("car images/Mercedes Benz S450.webp", "Elite Luxury Car", "Mercedes Benz S450", "Automatic", 5, 4, 79.99),
    new Car("car images/Porsche 911.webp", "Luxury Sport Car", "Porshe 911", "Automatic", 2, 2, 89.99),
    new Car("car images/Ford Transit Wagon.webp", "15 passenger Van", "Ford Transit Wagon", "Automatic", 15, 2, 99.99)
];

//default variables and element references
var firstTimeVisitingCars = true;
var carsInCheckout = [];
var proceedButton = document.querySelector(".car-header-next");
var total = 0;

var root = document.documentElement;