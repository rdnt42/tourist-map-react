import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/navigation.scss'

function Navigation() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/map">Tourist Map</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/login">Login/Logout</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form> */}
            </Navbar>
        </>
    )
}

export default Navigation
