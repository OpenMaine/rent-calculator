//Allowable Increase Percentage (AIP), 0.5%, updated March 2021 using January 2021 figure from USBoLS.
const AIP = 0.005

document.querySelector('#calculateButton').addEventListener('click', calculateAIP);
document.querySelector('input').addEventListener('keyup', enterKey); 


function calculateAIP(){
    const baseRent = Number(document.querySelector('#base-rent-input').value)
    const increaseAmount = baseRent * AIP;
    const newTotal = baseRent + increaseAmount;

    document.querySelector('#increaseOutput').innerHTML = ` $${increaseAmount.toFixed(2)}`;
    document.querySelector('#newTotal').innerHTML = ` $${newTotal.toFixed(2)}`;
}

// Submit input using Enter key
function enterKey(event) {
    if (event.keyCode === 13) {
        calculateAIP()
      }
}



//------------Form Wizard------------------------------------
let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab



function showTab(n) {
  // This function will display the specified tab of the form ...
  let userType = document.getElementById("userSelect").value
  let x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n != 0) {
    document.getElementById("nextBtn").style.display = "none"
  } else {
    document.getElementById("nextBtn").style.display = "inline"
  }
  if (n == 1){
    document.getElementById("displayUser").innerText = userType;
    
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function notElig() {
  nextPrev(1)
  document.getElementById("notElig").style.display = "inline";
  document.getElementById("calculator").style.display = "none";
}

function showCalculator() {
  nextPrev(1)
  document.getElementById("calculator").style.display = "inline";
  document.getElementById("notElig").style.display = "none";
}


function nextPrev(n) {
  // This function will figure out which tab to display
  let x = document.getElementsByClassName("tab");
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    currentTab = 0
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}


function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}



