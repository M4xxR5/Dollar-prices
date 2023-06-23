import React, { useState, useEffect } from "react"
import dollarURLs from "../dollarURLs.json"
import variationsJSON from "../variation.json"
import Value from "./Value"
import Modal from "./Modal"

export function Widget({url}) {
    const name = dollarURLs[url].name
    const variation = variationsJSON

    const [showModal, setShowModal] = useState(false)
    const handleClick = () => {
        setShowModal(true)
    }
    
    const [ data, setData ] = useState({})
    const [ icon, setIcon ] = useState('')
    const [ color, setColor ] = useState('')
    
    useEffect(() => {
        fetch(`https://mercados.ambito.com/${url}/variacion`)
        .then(res => res.json())
        .then(json => {
            setData(json)
            const key = json['class-variacion'];
            const result = variation[key];
            setIcon(result.icon)
            setColor(result.color)
        })
    },[])
    
    return (
        <>
        
        <div className="widget" onClick={handleClick}>
            <h3 className="widget__title">{name}</h3>
            {data.valor ? (
                <Value className="widget__value" data={data.valor} label='Referencia'/>
                ) : (
                    <div className="widget__values">
                    <Value className="widget__value" data={data.compra} label='Compra'/>
                    <Value className="widget__value" data={data.venta} label='Venta'/>
                </div>
            )}
            <div className="widget__variation" style={{ color: `${color}` }}>
                {icon} {data.variacion}
            </div>
            <span className="widget__date">
                {data.fecha}
            </span>
        </div>
            {showModal && (<Modal onClose={() => setShowModal(false)} title={dollarURLs[url].name} description={dollarURLs[url].description} />)}
        </>
    )
}

export default Widget