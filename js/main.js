/*------------Calculator-----------------------*/
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

// submit input using Enter key
function enterKey(event) {
    if (event.keyCode === 13) {
        calculateAIP()
      }
}

/*------------Form Wizard-----------------------*/
let currentTab = 0;
showTab(currentTab);

function showTab(n) {
  // display the specified tab of the form
  let userType = document.getElementById("userSelection").value
  let x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n != 0) {
    document.getElementById("nextBtn").style.display = "none"
  } else {
    document.getElementById("nextBtn").style.display = "inline"
  }
  // run step indicator
  stepIndicator(n)
}

//---function for tab navigation---
function navTab(n) {
  let x = document.getElementsByClassName("tab");
  // hide current tab:
  x[currentTab].style.display = "none";
  // increase or decrease nav tabs:
  currentTab = currentTab + n;
  // end of form, start over:
  if (currentTab >= x.length) {
    currentTab = 0
  }
  showTab(currentTab);
}

function stepIndicator(n) {
  let i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //---marks current step---
  x[n].className += " active";
}

//---inner div view depending on button selection---
function coverage() {
  let userSelection = document.getElementById("userSelection").value;
  let tenantElig = document.getElementById("tenantElig");
  let landlordElig = document.getElementById("landlordElig");
  document.getElementById("displayUser").innerHTML = userSelection.toUpperCase()

  userSelection === "tenant" ? tenantElig.style.display = "inline" : tenantElig.style.display = "none";
  userSelection === "landlord" ? landlordElig.style.display = "inline" : landlordElig.style.display = "none";
}

function notElig() {
  navTab(1)
  document.getElementById("notElig").style.display = "inline";
  document.getElementById("viewCalc").style.display = "none";
}

function showCalculator() {
  navTab(1)
  document.getElementById("viewCalc").style.display = "inline";
  document.getElementById("notElig").style.display = "none";
}

/* -----------tool tips-------------- */
const ttAIP = document.getElementById('ttAIP');
  tippy('#aipTipBtn', {
    content: ttAIP.innerHTML,
    allowHTML: true,
    interactive: true,
  });

tippy('#ttBaseRent', {
  content: 'Monthly rent ("Base Rent") is the amount of monthly rent charged as of June 2020.',
});

tippy('#ttIncrAmt', {
  content: 'This is your monthly rent amount multiplied by the current AIP.',
});

const ttNewRent = document.getElementById('ttNewRent');
  tippy('#newRentBtn', {
    content: ttNewRent.innerHTML,
    allowHTML: true,
    interactive: true,
  });