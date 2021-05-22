/*------------Calculator-----------------------*/
//Allowable Increase Percentage (AIP), 0.5%, updated March 2021 using January 2021 figure from USBoLS.
const AIP = 0.005

const rentInput = document.querySelector('#baseRentInput');
  rentInput.addEventListener('keyup', enterKey);
  rentInput.onfocus = () => rentInput.value = null;


const calculateButton = document.querySelector('#calculateButton');
  calculateButton.addEventListener('click', calculateAIP);


const increaseOutput = document.querySelector('#increaseOutput');
const newTotalOutput = document.querySelector('#newTotal');
const maxIncrease = document.querySelector('#maxIncAmt');
const rentAmt = document.querySelector('#rentAmt');
const tenPercent = document.querySelector('#tenPercent');
let rentAndAIP = 0;

//elements in landlord add'l amounts section
const landAddAmtOutput = document.querySelector('#landAddAmtsTotal');
  const taxRateInput = document.querySelector('#taxRateInput');
  const bankedRentInput = document.querySelector('#bankedRentInput');
  const boardAprInput = document.querySelector('#boardAprInput');


//function to reveal the calculator output div
const showOutputDiv = ()=> {
  const outputDiv = document.querySelector('#outputDiv');
  const userSelection = document.getElementById("userSelection").value;
  outputDiv.style.display = "inline";

      if (userSelection === "tenant"){
        document.querySelector('#tenP1').style.display = "inline";
        document.querySelector('#tenAddAmts').style.display = "inline";
      } else if (userSelection === "landlord"){
        document.querySelector('#landP1').style.display = "inline";
        document.querySelector('#landAddAmts').style.display = "inline";
      }
}


//function for calulation
function calculateAIP(){
    const baseRent = Number(rentInput.value);
    const increaseAmount = (baseRent * AIP) 
    const newTotal = baseRent + increaseAmount;
    const maxNewRent = baseRent * 1.10;

    showOutputDiv()
    increaseOutput.innerHTML = ` $${increaseAmount.toFixed(2)}`;
    newTotalOutput.innerHTML = ` $${newTotal.toFixed(2)}`;
    maxIncrease.innerHTML = `$${maxNewRent.toFixed(2)}`;
    rentAmt.innerHTML = `$${baseRent}`;
    tenPercent.innerHTML = `$${baseRent * 0.1}`;
    rentAndAIP = newTotal.toFixed(2);
}


//function to add amounts in landlord calulator section
function addToTotal(){
      const taxAdst = Number(taxRateInput.value);
      const bankedRent = Number(bankedRentInput.value);
      const aprImprove = Number(boardAprInput.value);
      const addlAmtTotal = Number(rentAndAIP) + taxAdst + bankedRent + aprImprove;
      landAddAmtOutput.innerHTML = ` $${addlAmtTotal.toFixed(2)}`;
}



// submit input using Enter key
function enterKey(event) {
    if (event.keyCode === 13) {
        calculateAIP()
      }
}


// reset all fields in wizard
function startOver() {
  document.getElementById("userSelection").selectedIndex = 0;
  outputDiv.style.display = "none"
  document.querySelector('#tenP1').style.display = null;
  document.querySelector('#tenAddAmts').style.display = null;
  document.querySelector('#landP1').style.display = null;
  document.querySelector('#landAddAmts').style.display = null;
  rentInput.value = null;
  rentAmt.innerHTML = null;
  increaseOutput.innerHTML = null;
  newTotalOutput.innerHTML = null;
  landAddAmtOutput.innerHTML = null;
  taxRateInput.value = null;
  bankedRentInput.value = null;
  boardAprInput.value = null;
  maxIncrease.innerHTML = null;
}


/*------------Form Wizard-----------------------*/
let currentTab = 0;
showTab(currentTab);

function showTab(n) {
  // display the specified tab of the form
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
  const userSelection = document.getElementById("userSelection").value;
  let tenantElig = document.getElementById("tenantElig");
  let landlordElig = document.getElementById("landlordElig");

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

// const ttADwellT = document.getElementById('ttADwell-t');
//   tippy('#aDwellTipBtn-t', {
//     content: ttADwellT.innerHTML,
//     allowHTML: true,
//     interactive: true,
//   });
  
// const ttADwellL = document.getElementById('ttADwell-l');
//   tippy('#aDwellTipBtn-l', {
//     content: ttADwellL.innerHTML,
//     allowHTML: true,
//     interactive: true,
//   });

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

  const ttMaxIncrease = document.getElementById('ttMaxIncrease');
  tippy('#maxIncBtn', {
    content: ttMaxIncrease.innerHTML,
    allowHTML: true,
    interactive: true,
  });