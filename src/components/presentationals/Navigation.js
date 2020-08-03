import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/navigation.scss'
import Logo from './Logo';

function Navigation(props) {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto" activeKey={props.location}>
                    <Nav.Link eventKey="/map" href="/map">Tourist Map</Nav.Link>
                    <Nav.Link eventKey="/login" href="/login">Login/Logout</Nav.Link>
                    <Nav.Link eventKey="/register" href="/register">Register</Nav.Link>
                </Nav>
                <Logo />

            </Navbar>
        </>
    )
}

export default Navigation
