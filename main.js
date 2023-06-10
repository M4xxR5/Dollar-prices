const dateTime = document.querySelector('#date-time');
const oficialBuy = document.querySelector('#oficial-buy');
const oficialSell = document.querySelector('#oficial-sell');
const blueBuy = document.querySelector('#blue-buy');
const blueSell = document.querySelector('#blue-sell');

async function getJSON() {
    const res = await fetch('https://api.bluelytics.com.ar/v2/latest');
    const json = await res.json();

    return json;
}

(async function displayResults() {
    const dollar = await getJSON()

    dateTime.textContent = new Date(dollar.last_update);
    
    oficialBuy.textContent = dollar.oficial.value_buy;
    oficialSell.textContent = dollar.oficial.value_sell;
    
    blueBuy.textContent = dollar.blue.value_buy;
    blueSell.textContent = dollar.blue.value_sell;
})()