const container = document.querySelector('.container');
const dollarURLs = {
    '/dolar/oficial' : { 
        name: 'Dólar Oficial',
        description: 'El dólar oficial es el dólar de referencia que establece el Banco Central y que se usa para el comercio exterior, el pago de deudas y de dividendos. También se llama “dólar blanco” y es el que menor precio tiene.'
    },
    '/dolar/informal' : { 
        name: 'Dólar Blue',
        description: 'El dólar blue es el dólar que se compra de manera ilegal o en el mercado negro argentino, fuera de casas de cambios y bancos. Es un eufemismo que se utiliza para referirse al dólar paralelo, dólar negro o dólar turista. Este concepto se empezó a utilizar en 2011, por las restricciones para la adquisición de moneda extranjera impuestas por el gobierno de Cristina Fernández de Kirchner. El dólar blue suele tener un tipo de cambio muy por encima del dólar oficial y no tiene límite de compra. Se usa en las transacciones económicas informales o ilícitas'
    },
    '/dolarnacion' : { 
        name: 'Dólar Banco Nación',
        description: 'El dólar Banco Nación es el dólar oficial que cotiza en el Banco Nación y sirve para calcular los dólares diferenciales que se aplican en distintas actividades económicas con impuestos'
    },
    '/dolarturista' : { 
        name: 'Dólar Turista',
        description: 'El dólar turista es el valor que a diario el sistema financiero argentino asigna al dólar estadounidense más el 30% por las compras o pagos de bienes y servicios que son realizados vía Internet o presencialmente por quienes utilizan medios de cancelación tales como tarjetas de crédito o tarjetas de débito, emitidas por bancos o entidades financieras de dicha república, bien sea que se encuentren en territorio argentino o de viaje en el exterior'
    },
    '/dolarrava/cl' : { 
        name: 'Dólar CCL',
        description: 'Se trata de una forma legal de comprar dólares por fuera de las restricciones que imperan sobre el mercado de divisas. La operación consiste en la compra y posterior venta de bonos y acciones que coticen tanto en el mercado argentino como en el exterior. Es por esto que, ante todo, se requiere disponer de una cuenta comitente que habilite a este tipo de operaciones y tener también una cuenta en el exterior, la cual debe estar declarada en AFIP.'
    },
    '/dolarrava/mep' : { 
        name: 'Dólar MEP',
        description: 'El Dólar MEP es el tipo de cambio que se obtiene mediante la operatoria de bonos de deuda argentinos. El dólar MEP es la compra de un bono en pesos para su posterior venta en dólares. Esta es una de las opciones más elegidas por los argentinos para dolarizarse2. El nombre “MEP” significa “Mercado Electrónico de Pagos” y se refiere a la plataforma electrónica donde se realizan las operaciones.'
    },
    '/dolardelujo' : { 
        name: 'Dólar de Lujo',
        description: 'El dólar de lujo es una cotización utilizada para la compra de bienes de lujo en el exterior. Esta cotización coincide con el dólar Qatar en su valor final. Es decir, para esta cotización también se adiciona el 25% de adelanto de Bienes Personales, el 45% a cuenta del impuesto a las Ganancias y el 30% del impuesto PAIS'
    },
    '/dolarahorro' : { 
        name: 'Dólar Ahorro',
        description: 'El dólar ahorro es una cotización diferencial que se aplica para la compra de moneda extranjera con fines de ahorro. El valor del dólar ahorro es el resultado de sumar el valor del dólar oficial más un recargo del 20%.'
    },
    '/dolarqatar' : { 
        name: 'Dólar Qatar',
        description: 'El dólar Qatar es un tipo de cambio que rige para las compras de pasajes y los gastos con tarjeta de crédito y débito en moneda extranjera que en su conjunto superen los USD 300 al mes. También se aplica para el pago de estadías en hoteles y la adquisición de bienes suntuarios. El valor del dólar Qatar es el resultado de sumar el valor del dólar oficial más un recargo del 30%'
    },
    '/dolarcoldplay' : { 
        name: 'Dólar Coldplay',
        description: 'El dólar Coldplay es un tipo de cambio que permite a los productores de espectáculos afrontar los compromisos en el exterior con una cotización diferenciada. Para conocer el valor, al dólar oficial hay que añadirle un recargo del 30%'
    },
    '/dolar/mayorista' : { 
        name: 'Dólar Mayorista',
        description: 'El dólar mayorista puede ser comprado por entidades financieras y empresas para operaciones de comercio exterior o el pago de deudas. El importe mínimo para operar en el mercado mayorista es de un millón de dólares.'
    },
    '/dolarfuturo' : { 
        name: 'Dólar Futuro',
        description: 'El dólar futuro es un contrato de futuros que se negocia en Argentina en el Mercado a Término de Rosario (Rofex) y en el Mercado Abierto Electrónico (MAE). En este contrato, dos contrapartes acuerdan un precio del dólar en una fecha futura.'
    }
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

    const widget = document.createElement('article');
    widget.classList.add('widget');

    const title = document.createElement('h3');
    title.textContent = dollarURLs[str].name;

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
    
    widget.addEventListener('click', function () {
        const bg = document.createElement('div');
        bg.classList.add('bg');
        const box = document.createElement('article');
        const title = document.createElement('h3');
        const body = document.createElement('p');
        
        box.classList.add('modalBox');
        box.style.display = 'block';
        
        title.textContent = dollarURLs[str].name;

        body.textContent = dollarURLs[str].description;
        
        box.append(title);
        box.append(body);
        bg.append(box);
        document.body.append(bg);

        bg.addEventListener('click', bg.remove);
    });
}

function displayResults(dollars) {
    for (let dollar in dollars) {
        createComponent(dollar);
    }
}

displayResults(dollarURLs);