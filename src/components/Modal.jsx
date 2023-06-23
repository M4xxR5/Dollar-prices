import React from "react"

function Modal({title, description, onClose}) {
    
    return (
        <div className="modal__background" onClick={onClose}>
            <div className="modal">
                <h3 className="modal__title">{title}</h3>
                <p className="modal__description">{description}</p>
                <p className="modal__close-text">Toque en cualquier lado para cerrar</p>
            </div>
        </div>
    )
}

export default Modal