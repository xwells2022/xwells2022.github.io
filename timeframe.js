//Xander Wells 
/**
 * lets you input a date range
 * https://www.daterangepicker.com/
 */
$(function () {
    $('input[name="datetimes"]').daterangepicker({
        timePicker: true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(48, 'hour'),
        locale: {
            format: 'MM/DD hh:mm A'
        }
    }, function (start, end, label) {
        //https://stackoverflow.com/questions/25150570/get-hours-difference-between-two-dates-in-moment-js
        var duration = moment.duration(end.diff(start));
        hours = duration.asHours();
        updateTotal();
    });
});

//default variables for timeframe
var hours = 48;
var pickupDate;
var dropoffDate;

/**
 * returns info to be used to update the navbar and also updates the date variables
 */
function getTimeFrame() {
    var hoursRaw = document.getElementById("datetimes").value;
    pickupDate = hoursRaw.split("-")[0];
    dropoffDate = hoursRaw.split("-")[1];
    updateTotal();
    return hoursRaw.replace("-", "<br>");
}
