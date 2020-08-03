import React from 'react'

function Registration(props) {
    return (
        <>
            <h1>Registration page</h1>
            <form onSubmit={props.onSubmit}>
                <label htmlFor="name">Email</label>
                <input className={props.loginError.error}
                    name="name"
                    type="text"
                    placeholder={props.loginError.message || "Enter your name"}
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
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Registration


