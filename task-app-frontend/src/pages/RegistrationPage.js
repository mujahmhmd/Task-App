import React, { useState } from 'react'
import { Form, Control, Row, Button, } from 'react-bootstrap'
import Footer from '../components/Footer'
import Header from '../components/Header'

import axios from 'axios'
import { useNavigate } from 'react-router'

const RegistrationPage = () => {
    const navigate = useNavigate();

   
   const [registerInput, setRegister] = useState({
    name:'',
    email:'',
    password:'',
    error_list:[]
   });

   const handleInput =(e) =>{
    e.persist();
    setRegister({...registerInput, [e.target.name]: e.target.value})
   }

   const registerSubmit = (e) =>{
    e.preventDefault();

    const data = {
        name: registerInput.name,
        email: registerInput.email,
        password: registerInput.password,

    }
    axios.get('/sanctum/csrf-cookie').then(response => {
    axios.post('api/register', data).then(res => {
        if (res.data.status === 200) {
            alert('Registration successfull')
            navigate('/');
            
        }else{
            setRegister({...registerInput, error_list: res.data.errors});
             navigate('/register');
        }

    });
});

}

   

    return (
        <div>
            <Header/>
        <div className='container'>
            <Row className='d-flex align-items-center justify-content-center pt-3 font-bold text-lg  text-indigo-600'> Registration Page
                <Row className='d-flex align-items-center justify-content-center pt-1'>
                    <Form className='bg-indigo-900 col-md-6 mx-auto col-lg-8 text-left' onSubmit={registerSubmit}>
                        <div className="mb-3">
                            <Form.Label className='text-white'>Name :</Form.Label>
                            <Form.Control
                                type="text"
                                name='name'
                                onChange={handleInput}
                                value={registerInput.name}
                                placeholder="type your name"></Form.Control>
                                <span className='text-red-500 text-sm'>{registerInput.error_list.name}</span>
                        </div>
                        <div className="mb-3">
                            <Form.Label className='text-white'>Email :</Form.Label>
                            <Form.Control 
                                type="text"
                                name='email'
                                onChange={handleInput}
                                value={registerInput.email}
                                placeholder="type your email address"></Form.Control>
                               <span className='text-red-500 text-sm' >{registerInput.error_list.email}</span>

                        </div>
                        <div className="mb-3">
                            <Form.Label className='text-white'>Password :</Form.Label>
                            <Form.Control
                                type="password"
                                name='password'
                                onChange={handleInput}
                                value={registerInput.password}
                                placeholder="type your password"></Form.Control>
                                <span className='text-red-500 text-sm'>{registerInput.error_list.password}</span>

                        </div>
                       
                        <div className="mb-3">
                            <Button className='btn-sm btn-light text-indigo-900 justify-content-center align-items-center d-flex' type='submit'>Register</Button>
                        </div>



                    </Form>
                </Row>
            </Row>
            <Footer/>
        </div>
        </div>
    )
}

export default RegistrationPage
