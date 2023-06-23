import React from "react"

function Value({data, label}) {
    return (
        <div className="value">
            <span className="value__data">{data}</span>
            <span className="value__label">{label}</span>
        </div>
    )
}

export default Value