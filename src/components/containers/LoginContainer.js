import React, { useState } from 'react'
import { login } from '../../auth/authProvider'
import config from '../../config'
import axios from 'axios'
import Login from '../presentationals/Login'

function LoginContainer() {
    const [credentials, setCredentials] = useState({
        name: '',
        password: ''
    });

    const onChange = ({ target: { name, value } }) => {
        setCredentials({ ...credentials, [name]: value })
    };


    function onSubmit(event) {
        if (event) {
            event.preventDefault();
        }

        console.log(JSON.stringify(credentials))
        axios({
            method: 'post',
            url: `http://${config.address}:${config.port}/login`,
            contentType: 'application/json',
            data: JSON.stringify(credentials)
        })
            .then(response => {
                console.log(response.data)
                login(response.data)
            })
            .catch(error => console.log(error));
    };


    return (
        <Login
            onSubmit={onSubmit}
            onChange={onChange}
            credentials={credentials}
        />
    )
}

export default LoginContainer


