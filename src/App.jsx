import React from 'react'
import Widget from './components/Widget'
import dollarURLs from './dollarURLs.json'

function App() {
    const dollars = Object.keys(dollarURLs)
    const listWidgets = dollars.map((url, index) => 
            <Widget url={url} key={index}/>
        )

    return (
        <>
            <div className='title'>
                <h1>Cotización del dólar</h1>
            </div>
            <div className='container'>

            {listWidgets}
            </div>
        </>
    )
}

export default App