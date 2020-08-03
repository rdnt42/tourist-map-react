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

    const [loginError, setLoginError] = useState({
        state: '',
        message: ''
    })
    // const [passwordError, setPasswordError] = useState({
    //     state: '',
    //     message: ''
    // })

    function parseResponse(data) {
        switch (data.state) {
            case "USER_ALREADY_EXIST":
                setLoginError({
                    error: "error",
                    message: "Пользователь с таким именем уже существует"
                })

                setCredentials({ ...credentials, name: '' })

                break;

            default:
                //setError("")
                break;

        }
    }

    const onChange = ({ target: { name, value } }) => {
        if (loginError.error) {
            setCredentials({
                name: '',
                password: ''
            })
            console.log("err")
            setLoginError({
                error: '',
                message: ''
            })
            console.log("err", loginError)
            console.log("credentials", credentials)
        }
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
                <input className={loginError.error}
                    name="name"
                    type="text"
                    placeholder={loginError.message || "Enter your name"}
                    value={credentials.name}
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
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Registration


