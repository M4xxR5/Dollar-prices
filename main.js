const dateTime = document.querySelector('#date-time');
const oficial = document.querySelector('.oficial');
const blue = document.querySelector('.blue');

async function getJSON(str) {
    const res = await fetch(`https://mercados.ambito.com/${str}/variacion`);
    const json = await res.json();

    return json;
}

async function displayResults(str, node)  {
    const dolar = await getJSON(str);

    node.children[0].textContent = dolar.compra;
    node.children[1].textContent = dolar.venta;
}

displayResults('/dolar/oficial', oficial);
displayResults('/dolar/informal', blue);