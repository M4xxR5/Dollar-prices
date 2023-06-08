const dateTime = document.querySelector('#date-time');
const oficialBuy = document.querySelector('#oficial-buy');
const oficialSell = document.querySelector('#oficial-sell');
const blueBuy = document.querySelector('#blue-buy');
const blueSell = document.querySelector('#blue-sell');

(async () => {
    const res = await fetch('https://api.bluelytics.com.ar/v2/latest');
    const json = await res.json();
    
    dateTime.textContent = new Date(json.last_update);

    oficialBuy.textContent = json.oficial.value_buy;
    oficialSell.textContent = json.oficial.value_sell;
    
    blueBuy.textContent = json.blue.value_buy;
    blueSell.textContent = json.blue.value_sell;
})()