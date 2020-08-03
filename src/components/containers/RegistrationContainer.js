import React, { useState } from 'react'
import config from '../../config'
import axios from 'axios'
import Registration from '../presentationals/Registration';


function RegistrationContainer() {
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
            <Registration
                onSubmit={onSubmit}
                onChange={onChange}
                credentials={credentials}
                loginError={loginError}
            />
        </>
    )
}

export default RegistrationContainer


