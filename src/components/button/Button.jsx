import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

const Button = (props) => {
    return (
        <button onClick={props.onClick ? props.onClick : null} className={`btn ${props.className}`}
        >{props.children}</button>
    )
}


export const OutlineButton = (props) => {
    return (
        <Button className={`btn-outline ${props.className}`}
            onClick={props.onClick ? props.onClick : null}
        >{props.children}</Button>
    )
}


Button.prototype = {
    onClick: PropTypes.func
}

export default Button