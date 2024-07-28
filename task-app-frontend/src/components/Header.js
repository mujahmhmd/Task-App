import React from 'react'
import { Navbar, Container, NavDropdown, Form, Nav, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';



const Header = () => {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-indigo-900 col-lg-12">
      <Container fluid>
        <Navbar.Brand className='text-white font-bold'>TASK APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className='bg-white' />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 text-white"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as= {Link} to={"/"} className='text-white ' >Home</Nav.Link>
            <Nav.Link as = {Link} to={"/register"} className=' text-white '>Register</Nav.Link>

          </Nav>

          <Button className="btn-sm btn-light text-blue-900" onClick={() =>{navigate('/loginpage')}}>Login</Button>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;