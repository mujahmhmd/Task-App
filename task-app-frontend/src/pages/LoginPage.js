import React from 'react'
import { useState } from 'react'
import { Form, Control, Row, Button, Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useNavigate } from 'react-router'
import axios from '../api/axios'

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list:[],
        error :[]
    });

    const handleInput = (e) =>{
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value});
    }
    
    const loginSubmit = (e) =>{
        e.preventDefault();

        const data = {
            email : loginInput.email,
            password : loginInput.password
        }
        // axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('login',data).then(res=>{
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('user_data',JSON.stringify(res.data.user))
                    navigate('/dashboard');
                    
                }else if(res.data.status === 400){
                    setLogin({...loginInput, error: res.data.message});
                    navigate('/loginpage');

                }
                else{
                    setLogin({...loginInput, error_list: res.data.errors});
                     navigate('/loginpage');
                }
        });
    // });
    }

    return (
        <div >
           
            <Header />
            <div className='container' >
                <Row className='d-flex align-items-center justify-content-center pt-5 font-bold text-lg text-indigo-600'> <div>Login Page</div>
                    <Row className=' align-items-center justify-content-center pt-2 col-lg-8'>
                        <Form className='bg-indigo-900 col-md-6 mx-auto col-lg-8 text-left' onSubmit={loginSubmit}>
                            <div className="mb-3">
                                <Form.Label className='text-white'>Email :</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name='email'
                                    onChange={handleInput}
                                    value={loginInput.email}
                                    placeholder="type your email address"></Form.Control>
                                    <span className='text-red-500 text-sm'>{loginInput.error_list.email}</span>
                            </div>
                            <div className="mb-3">
                                <Form.Label className='text-white'>Password :</Form.Label>
                                <Form.Control 
                                    type="password"
                                    name='password'
                                    onChange={handleInput}
                                    value={loginInput.password}
                                    placeholder="type your password"></Form.Control>
                                    <span className='text-red-500 text-sm'>{loginInput.error_list.password}</span>
                            </div>

                            <div className="mb-3">
                                <Button className='btn-sm btn-light text-indigo-900 font-extrabold  justify-content-center align-items-center d-flex'  type='submit'>Login</      Button>        <span className='text-red-500 text-sm'>{loginInput.error}</span>    
                            </div>

                         


                        </Form>
                    </Row>
                </Row>
                <Footer />
            </div>
           
        </div>
        
    )
}

export default LoginPage
