import React from 'react'
import './scss/neon-button.scss';

function NeonButton(props) {
    return (
        <a className="neon-button" href={props.url}>
            <span className="button__line button__line--top"></span>
            <span className="button__line button__line--right"></span>
            <span className="button__line button__line--bottom"></span>
            <span className="button__line button__line--left"></span>
            {props.text}
        </a>
    )
}

export default NeonButton
