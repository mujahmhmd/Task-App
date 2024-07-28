import React from 'react'
import { Navbar, Container, NavDropdown, Form, NavLink, Button,Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios'



const DashboardHeader = () => {

const navigate = useNavigate();

const token = localStorage.getItem('auth_token');
const userdata = JSON.parse(localStorage.getItem('user_data'));
const axiosConfig = {
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
  },
};



const logoutSubmit =(e) =>{
e.preventDefault();
axios.post('logout',{},axiosConfig).then(res =>{
if (res.data.status === 200) {

    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
 
    navigate('/');
    

}
});
}



  var authButton ='';
 
    authButton = (
      <Link className='text-white no-underline' to='' type='button' onClick={logoutSubmit}> Logout</Link>
          )
  
  


  return (
    <Navbar expand="lg" className="bg-indigo-900 col-lg-12">
      <Container fluid>
        <Navbar.Brand className='text-white font-bold'>TASK APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className='bg-white' />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 text-white ms-auto"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as ={Link} to={"/dashboard"} className='text-white' >Dashboard</Nav.Link>
            <NavLink className='text-white'>Welcome {userdata.name}</NavLink>

          </Nav>
          <div className='px-3'>
            <Link className='text-white no-underline' to={`/user_profile/${userdata.id}`}>Profile </Link>||
           {authButton}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default DashboardHeader;