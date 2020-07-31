import React, { useState } from 'react'
import { login } from '../auth/authProvider'
import config from '../config'
import axios from 'axios'
import './css/login-form.css'

function Registration() {
    const [credentials, setCredentials] = useState({
        name: '',
        password: ''
    });

    const [error, setError] = useState('')

    function parseResponse(data) {
        switch (data.state) {
            case "USER_ALREADY_EXIST":
                setError("Пользователь с таким именем уже существует")
                break;

            default:
                setError("")
                break;

        }
    }

    const onChange = ({ target: { name, value } }) => {
        if (error) setError('')
        setCredentials({ ...credentials, [name]: value })
    };


    function onSubmit(event) {
        if (event) {
            event.preventDefault();
        }

        console.log(JSON.stringify(credentials))
        axios({
            method: 'post',
            url: `http://${config.address}:${config.port}/register`,
            contentType: 'application/json',
            data: JSON.stringify(credentials)
        })
            .then(response => {
                console.log(response.data)
                parseResponse(response.data)
                //login(response.data)
            })
            .catch(error => console.log(error));

        // fetch(`http://${config.address}:${config.port}/login`, {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(credentials)
        // })
        //     .then(r => r.json())
        //     .then(token => login(token))
    };


    return (
        <>
            <h1>Registration page</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Email</label>
                <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={error || credentials.name}
                    onChange={onChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={onChange}
                />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Registration


