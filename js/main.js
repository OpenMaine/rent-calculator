//Allowable Increase Percentage (AIP), 0.5%, updated March 2021 using January 2021 figure from USBoLS.
const AIP = 0.005

document.querySelector('button').addEventListener('click', calculateAIP);
document.querySelector('input').addEventListener('keyup', enterKey); 


function calculateAIP(){
    const baseRent = Number(document.querySelector('#base-rent-input').value)
    const increaseAmount = baseRent * AIP;
    const newTotal = baseRent + increaseAmount;

    document.querySelector('#increaseOutput').innerHTML = `$${increaseAmount.toFixed(2)}`;
    document.querySelector('#newTotal').innerHTML = `$${newTotal.toFixed(2)}`;
}

// Submit input using Enter key
function enterKey(event) {
    if (event.keyCode === 13) {
        calculateAIP()
      }
}
