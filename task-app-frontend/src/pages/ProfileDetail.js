import React, { useEffect, useState } from 'react'
import { Form, Control, Row, Button, Table } from 'react-bootstrap'
import DashboardHeader from '../components/DashboardHeader'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router'
import axios from 'axios'


const ProfileDetail = () => {
    const userdata = JSON.parse(localStorage.getItem('user_data'));
    const navigate = useNavigate();

    const token = localStorage.getItem('auth_token');
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },

    };


    const [nameInput, setName] = useState({
        name: userdata.name,
        email: userdata.email,
        old_password: '',
        password: '',
        error_list:[],
        error:[]
    })

    const handleInput = (e) => {
        e.persist();
        setName({ ...nameInput, [e.target.name]: e.target.value })
    }

 

    const formSubmit=(e) =>{
        e.preventDefault();

        const data ={
            name:nameInput.name,
            email:nameInput.email,
            old_password:nameInput.old_password,
            password:nameInput.password
        }
    
            axios.post(`api/update-profile/${userdata.id}`,data,axiosConfig).then(res => {
                if (res.data.status === 200) {
                    alert('Profile Successfully Updated')
                    navigate('/dashboard')
    
                    // window.location.reload()
                }else if (res.data.status === 400) {
                    setName({...nameInput, error:res.data.message})
                    navigate('/user_profile/:id')
                    console.log(res.data.message)
                }else{
                   
                    setName({...nameInput, error_list:res.data.errors})
                    navigate('/user_profile/:id')
                    
                }
               
            })
        }
    
    

   

    return (
        <div>
            <DashboardHeader />
            <div className='container'>
                <div className='pt-2'>
                    <Table className=' bg-indigo-900 text-center text-white'>
                        <tr className=''><b>Your Name : </b>{userdata.name}</tr>
                        <tr className=''><b>Your Email  : </b> {userdata.email}</tr>
                    </Table>
                </div>
                <Row className='d-flex align-items-center justify-content-center font-bold text-lg text-indigo-600'> Update Your Details
                    <Row className='d-flex align-items-center justify-content-center pt-1'>
                        <Form className='bg-indigo-900 col-md-6 mx-auto col-lg-8 text-left' onSubmit={formSubmit}>
                            <div className="mb-3">
                                <Form.Label className='text-white'>Name :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='name'
                                    onChange={handleInput}
                                    value={nameInput.name}
                                    placeholder="type your name"></Form.Control>
                                     <span className='text-red-500 text-sm'>{nameInput.error_list.name}</span>

                            </div>
                            <div className="mb-3">
                                <Form.Label className='text-white'>Email :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='email'
                                    onChange={handleInput}
                                    value={nameInput.email}
                                    placeholder="type your email address"></Form.Control>
                                    <span className='text-red-500 text-sm'>{nameInput.error_list.email}</span>

                            </div>
                            <div className="mb-3">
                                <Form.Label className='text-white'>Old Password :</Form.Label>
                                <Form.Control
                                    type="password"
                                    name='old_password'
                                    onChange={handleInput}
                                    value={nameInput.old_password}
                                    placeholder="type your password"></Form.Control>
                                    <span className='text-red-500 text-sm'>{nameInput.error_list.old_password}</span>

                            </div>
                            <div className="mb-3">
                                <Form.Label className='text-white'>Confirm_Password :</Form.Label>
                                <Form.Control
                                    type="password"
                                    name='password'
                                    onChange={handleInput}
                                    value={nameInput.password}
                                    placeholder="type your confirm_password"></Form.Control>
                                    <span className='text-red-500 text-sm'>{nameInput.error_list.password}</span>

                            </div>
                            <div className="mb-3">
                                <Button className='btn-sm btn-light text-indigo-900 font-extrabold justify-content-center align-items-center d-flex' type='submit'>Save Changes</Button>
                                <span className='text-red-500 text-sm'>{nameInput.error}</span>
                            </div>


                           
                        </Form>
                    </Row>
                </Row>
                <Footer />
            </div>
        </div>
    )
}

export default ProfileDetail
