import React from 'react'
import './css/login-form.css'

function Login(props) {
    return (
        <>
            <h1>Login page</h1>
            <form onSubmit={props.onSubmit}>
                <label htmlFor="name">Email</label>
                <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={props.credentials.name}
                    onChange={props.onChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={props.credentials.password}
                    onChange={props.onChange}
                />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login


