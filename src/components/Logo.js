import React from 'react'
import './scss/logo.scss';

function Logo(props) {
    return (
        <a className="sign" href="/">
            <span className="sign__word">Cyberpank is near</span>
        </a>

        // <a className="link" target="_blank" href="https://markheggan.co.uk">Mark Heggan &rarr;</a>
    )
}

export default Logo
