const input = document.getElementById('value');
const output = document.getElementById('output');
const submitBtn = document.getElementById('submit');
const checkUSD = document.getElementsByClassName('USD');
const checkEUR = document.getElementsByClassName('EUR');
const checkGPB = document.getElementsByClassName('GBP');
const checkPLN = document.getElementsByClassName('PLN');

const url = 'https://openexchangerates.org/api/latest.json?app_id=931276ae810f49fba0bf6f8f6bf2b1c5';

let eur;
let pln;
let usd;
let gbp;
let rates;

fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
        /*API returns rates based on USD (USD = 1)*/
        rates = data.rates;

        gbp = rates.GBP;
        usd = rates.USD;
        pln = rates.PLN;
        eur = rates.EUR;

        for(let i=0; i<2; i++){
            checkUSD[i].value = usd;
            checkEUR[i].value = eur;
            checkGPB[i].value = gbp;
            checkPLN[i].value = pln;
        }
    }).catch(function (err) {
    console.log(err.message);
});

class Exchange {
    constructor(inputValue, inputCurrencyValue, outputCurrencyValue) {
        this.input = inputValue;
        this.inputCurrency = inputCurrencyValue;
        this.outputCurrency = outputCurrencyValue;
    }

    countOutput()  {
        //formula for currency conversion
        return (this.input * this.outputCurrency)/this.inputCurrency;
    }
}

const showOutput  = () => {
    document.getElementsByClassName('outputBox')[0].style.display = 'flex';
};

const hideOutput = () => {
    document.getElementsByClassName('outputBox')[0].style.display = 'none';
};

submitBtn.addEventListener('click', function (e) {
    e.preventDefault();

    let exchangeRequest = new Exchange(Number(input.value), Number(document.querySelector('input[name="inputCurrency"]:checked').value), Number(document.querySelector('input[name="outputCurrency"]:checked').value));
    let result = (exchangeRequest.countOutput()).toFixed(4);

    output.innerHTML = String(result);
    output.innerHTML += ' ' + String(document.querySelector('input[name="outputCurrency"]:checked').className);
    showOutput();
});

document.getElementById('closeBtn').addEventListener('click', function (e) {
    e.preventDefault();
    hideOutput();
});
