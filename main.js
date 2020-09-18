



function multiplicationTable() {
    var rowMax = parseInt(createPromptAndValidate("How many rows do you want?","5","int minV:0| maxV:20|", "Must be an integer >= 1 and <= 20"));
    var colMax = parseInt(createPromptAndValidate("How many columns do you want?","10","int minV:0| maxV:20|", "Must be an integer >= 1 and <= 20"));
    var startNum = parseInt(createPromptAndValidate("What do you want the starting number to be?","10","int minV:-100| maxV:100|", "Must be an integer >= -100 and <= 100"));
    var rowIncrement = parseInt(createPromptAndValidate("How much should the number increment per row?","5","int minV:-100| maxV:100|", "Must be an integer >= -100 and <= 100"));
    var colIncrement = parseInt(createPromptAndValidate("How much should the number increment per column?","10","int minV:-100| maxV:100|", "Must be an integer >= -100 and <= 100"));

    var resultBox = document.getElementById("resultBox");
    resultBox.innerHTML = "";

    var table = document.createElement("table");
    table.classList.add("table");
    table.classList.add("table-bordered");

    for(let i = 0; i < rowMax; i++) {
        var row = document.createElement("tr");

        for(let j = 0; j < colMax; j++) {
            var colNum = startNum + j * colIncrement;
            var rowNum = startNum + i * rowIncrement;
            var cellVal;            
            var cell = document.createElement("td");
            if (j == 0) {
                cellVal = rowNum;
                cell.classList.add("table-secondary");
            } 
            else if (i == 0) {
                cellVal = colNum;
                cell.classList.add("table-secondary");
            }
            else {
                cellVal = colNum*rowNum;
            }
            
            cell.innerHTML = cellVal;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    resultBox.appendChild(table);
}

var randNums = [];
var operations = [" + "," - ", " * ", " / ", " to "]
var descriptions = ["","","","","Find the definite integral of x^2 from "]
function quiz(){
    randNums = [];
	var lower = parseInt(createPromptAndValidate("Enter a lower bound for the random numbers","2", "int minV:0|", "Your answer must be >= 0"));
	var higher = parseInt(createPromptAndValidate("Enter a higher bound for the random numbers","8", "int minV:" + lower + "|", "Your answer must be >= " + lower));
    
    var numQuestions = 5;

    document.getElementById("score").innerHTML = "";
    
    //create rand nums
    for(let i = 0; i<numQuestions*2; i++){
        randNums.push(Math.floor(Math.random() * (higher - lower + 1)) + lower);
    }

    //update question values
    for(let i = 0; i<numQuestions; i++) {
        var id = "question" + (i+1);
        document.getElementById(id).innerHTML = descriptions[i] + randNums[i*2] + operations[i] + randNums[i*2+1] + ": ";
        var ansid = "answer" + (i+1);
        document.getElementById(ansid).value = "";
    }
}

function check(){
	var correct = 0;
	if((randNums[0] + randNums[1]) == parseInt(document.getElementById("answer1").value)){ correct++;}
	if((randNums[2]-randNums[3]) == parseInt(document.getElementById("answer2").value)){ correct++;}
	if((randNums[4]*randNums[5]) == parseInt(document.getElementById("answer3").value)){ correct++;}
    if(Math.round((randNums[6]/randNums[7])*100)/100 == parseFloat(document.getElementById("answer4").value)){ correct++;}
	if((Math.pow(randNums[9],3)/3 - Math.pow(randNums[8],3)/3).toFixed(2) == parseFloat(document.getElementById("answer5").value)) {correct++;}
	
	var score = correct/5;

	document.getElementById("score").innerHTML = "You scored: " + parseInt(score*100) + "%";
    //document.getElementById("score").innerHTML = (Math.pow(randNums[9],3)/3 - Math.pow(randNums[8],3)/3).toFixed(2);
}

//creates a prompt and performs input validation based on given requirements
//you can add as many or as few requirements as you want
function createPromptAndValidate(promptText, promptDefault, requirements, promptErrorMsg) {
    var valid = false; //false at first so that the while loop is triggered
    while (!valid) {
        valid = true; //now that the while loop is triggered, set to true. if none of the detectors are tripped, valid will remain true and the loop will stop
        output = prompt(promptText, promptDefault);
        if (output == null) {setResult(""); throw new Error();} //stops all functions if cancel is pressed

        if (requirements.includes("int") && valid) { //int requirement
            if (!isInt(output)) { //invalid if it isn't an int
                valid = false;
                promptText = promptErrorMsg;
            }
        }

        //&& valid is included so that if the previous detector is triggered we won't bother running any other detectors
        if (requirements.includes("minV") && valid) { //minimum value requirement
            var minValue = requirements.substring(requirements.indexOf("minV")+5,requirements.indexOf("|",requirements.indexOf("minV"))); //finds the minimum value
            if (parseInt(output) < minValue) { //invalid if result is less than min
                valid = false;
                promptText = promptErrorMsg;
            }
        }
        if (requirements.includes("maxV") && valid) { //maximum value requirement
            var maxValue = requirements.substring(requirements.indexOf("maxV")+5,requirements.indexOf("|",requirements.indexOf("maxV"))); //finds the maximum value
            if (parseInt(output) > maxValue) { //invalid if result is greater than max
                valid = false;
                promptText = promptErrorMsg;
            }
        }
        if (requirements.includes("minL")) { //minimum length requirement
            var minLength = requirements.substring(requirements.indexOf("minL")+5,requirements.indexOf("|",requirements.indexOf("minL"))); //finds the minimum length
            if (output.length < parseInt(minLength)) { //invalid if result is shorter than min
                valid = false;
                promptText = promptErrorMsg;
            }
        }
        if (requirements.includes("maxL")) { //maximum length requirement
            var maxLength = requirements.substring(requirements.indexOf("maxL")+5,requirements.indexOf("|",requirements.indexOf("maxL"))); //finds the maximum length
            if (output.length > parseInt(maxLength)) { //invalid if result is longer than max
                valid = false;
                promptText = promptErrorMsg;
            }
        }   
    } 
    return output
}

/*https://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript/14636638 */
function isInt(value) {  //checks if value is an integer
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10)) &&
           !value.includes(".");
  }