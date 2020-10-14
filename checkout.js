//Xander Wells
/**
 * refreshes all the info that is displayed in the checkout section based on variables declared previously
 */
function updateCheckout() {
    document.getElementById("startTime").innerHTML = pickupDate;
    document.getElementById("endTime").innerHTML = dropoffDate;
    document.getElementById("pickup").innerHTML = pickupAddress;
    document.getElementById("dropoff").innerHTML = dropoffAddress;
    document.getElementById("totalPrice").innerHTML = "$" + total;

    //gets template and location for template to be cloned to
    var container = document.getElementById("reviewContentCar");
    container.innerHTML = "";
    var template = document.getElementById("checkoutListingTemplate");

    var checkoutButton = document.getElementById("checkoutButton");
    if (carsInCheckout.length == 0) {
        checkoutButton.style.display = "none"; //prevents submission if all cars are gone
    }
    else {
        checkoutButton.style.display = "inline";
        for (let i = 0; i < carsInCheckout.length; i++) {
            //create clone based on checkout cars
            var checkoutCar = carsInCheckout[i];
            var clone = template.content.cloneNode(true);

            //update image 
            var image = clone.querySelector(".checkout-listing-image");
            image.src = checkoutCar.imgSRC;

            //update name 
            var name = clone.querySelector(".checkout-listing-header");
            name.innerHTML = checkoutCar.name;

            //set car total payment
            var dayPayment = checkoutCar.price.toString();
            var totalPayment = (dayPayment * (hours / 24)).toFixed(2).toString();
            var totalDollar = clone.querySelector(".car-price-total-dollar");
            totalDollar.textContent = totalPayment.slice(0, -3);
            var totalCents = clone.querySelector(".car-price-total-cents");
            totalCents.textContent = totalPayment.slice(-2);

            //add functionality to button
            var button = clone.querySelector(".checkout-listing-remove");
            button.addEventListener("click", function () { removeFromCart(i) }, false);

            container.appendChild(clone); //add to container
        }
    }
}

/**
 * plays the remove from cart animation, removes the specified car from the checkout and readds it to the available cars
 */
function removeFromCart(n) {
    var checkoutCars = document.getElementsByClassName("checkout-listing");
    checkoutCars[n].classList.add("remove-from-cart"); //start animation
    setTimeout(() => { //wait for animation to finish
        availableCars.push(carsInCheckout[n]); //adds to available cars
        carsInCheckout.splice(n, 1); //removes from checkout
        //update stuff
        updateTotal();
        updateCheckout(); 
        navbarDetailsFields[2].innerHTML = getVehicle();
    }, 600);
}

/**
 * Prevents the form from refreshing the page upon form submit. Instead, it calls the submit function
 * https://stackoverflow.com/questions/19454310/stop-form-refreshing-page-on-submit
 */
$("#paymentForm").submit(function (e) {
    submit();
    e.preventDefault();
});

/**
 * Generates the text for the HTML email using elements from the document and then calls the email function
 */
function submit() {
    var message = `
    <p>Dear ${document.getElementById("firstName").value} ${document.getElementById("lastName").value},</p>
    <p>Thank you for your purchase! IMSA is now a bit less broke.</p>
    <p>Here's the info that we got from you:</p>
    <h4>TIMEFRAME:</h4>
    <p><b>Pickup Time: </b>${pickupDate}</p>
    <p><b>Dropoff Time: </b>${dropoffDate}</p>
    <h4>LOCATION:</h4>
    <p><b>Pickup Location: </b>${pickupAddress}</p>
    <p><b>Dropoff Location: </b>${dropoffAddress}</p>
    <h4>VEHICLES:</h4>
    `;
    for (let i = 0; i < carsInCheckout.length; i++) {
        message += "<p>" + carsInCheckout[i].name + "</p>";
    }
    message += `
    <h4>TOTAL PRICE: $${total}</h4>
    `;
    var emailAddress = document.getElementById("email").value;
    sendEmail(message, emailAddress);
}

/**
 * sends an email to a given user using the burner account imsarentacar@gmail.com
 * after sending the email it opens the final popup
 * https://pepipost.com/tutorials/how-to-send-emails-with-javascript/
 */
function sendEmail(message, emailAddress) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "imsarentacar@gmail.com",
        Password: "giveXanderA200PercentPlease",
        To: emailAddress,
        From: "imsarentacar@gmail.com",
        Subject: "Your IMSA Rent-A-Car Invoice",
        Body: message,
    })
        //callback function used to open the final popup
        .then(function (message) {
            closePopup('payment');
            openPopup('finalPopup');
        });
}

/**
 * resets the entire ording process with the exception of the cars that were checked out
 * called after the final popup is closed through whatever method
 */
function reload() {
    closePopup('finalPopup');
    setTab(0, false, true);
}