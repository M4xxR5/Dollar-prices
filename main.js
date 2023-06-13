const container = document.querySelector('.container');
const dollarTypes = {
    '/dolar/oficial' : 'Dólar Oficial',
'/dolar/informal' : 'Dólar Blue',
'/dolarnacion' : 'Dólar Banco Nación',
'/dolarturista' : 'Dólar Turista',
'/dolarrava/cl' : ' Dólar CCL',
'/dolarrava/mep' : 'Dólar MEP',
'/dolardelujo' : 'Dólar de Lujo',
'/dolarahorro' : 'Dólar Ahorro',
'/dolarqatar' : 'Dólar Qatar',
'/dolarcoldplay' : 'Dólar ColdPlay',
'/dolar/mayorista' : 'Dólar Mayorista',
'/dolarfuturo' : 'Dólar Futuro'
};
const icons = {
    equal: {
        icon: '=',
        color: 'lightblue'
    },
    up: {
        icon: '⯅',
        color: 'green'
    },
    down: {
        icon: '⯆',
        color: 'red'
    }
}

async function getJSON(str) {
    const res = await fetch(`https://mercados.ambito.com/${str}/variacion`);
    const json = await res.json();
    console.log(str, json);
    return json;
}

async function createComponent(str)  {
    const dolar = await getJSON(str);

    const widget = document.createElement('div');
    widget.classList.add('widget');

    const title = document.createElement('h3');
    title.textContent = dollarTypes[str];

    const widgetBody = document.createElement('div');

    const valuesWrapper = document.createElement('div');
    
    if (dolar.hasOwnProperty('valor')) {
        valuesWrapper.classList.add('referencewrapper');

        const referenceValue = document.createElement('span');
        referenceValue.textContent = dolar.valor;
        const referenceText = document.createElement('span');
        referenceText.textContent = 'Referencia';
        referenceText.classList.add('referenceValue');
        
        valuesWrapper.append(referenceValue);
        valuesWrapper.append(referenceText);
    } else {
        valuesWrapper.classList.add('buysellwrapper');
        
        const buyWrapper = document.createElement('div');

        const buyValue = document.createElement('span');
        buyValue.textContent = dolar.compra;
        const buyText = document.createElement('span');
        buyText.textContent = 'Compra';

        const sellWrapper = document.createElement('div')

        const sellValue = document.createElement('span');
        sellValue.textContent = dolar.venta;
        const sellText = document.createElement('span');
        sellText.textContent = 'Venta';
        
        buyWrapper.append(buyValue);
        buyWrapper.append(buyText);
        valuesWrapper.append(buyWrapper);
        
        sellWrapper.append(sellValue);
        sellWrapper.append(sellText);
        valuesWrapper.append(sellWrapper);
    }

    const variation = document.createElement('div');

    const variationValue = document.createElement('span');
    variationValue.textContent = `${icons[dolar['class-variacion']].icon} ${dolar.variacion}` ;
    variation.classList.add('variation');
    variationValue.style.color = icons[dolar['class-variacion']].color;

    variation.append(variationValue);

    const date = document.createElement('span');
    date.textContent = dolar.fecha;
    date.classList.add('date');
    
    widgetBody.append(valuesWrapper);
    widgetBody.append(variation);
    widgetBody.append(date);
    widget.append(title);
    widget.append(widgetBody);
    container.append(widget);
}

function displayResults(dollars) {
    for (let dollar in dollars) {
        createComponent(dollar);
    }
}

displayResults(dollarTypes);