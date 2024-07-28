import React, {useEffect, useState}from 'react'
import { Form, Control, Row, Button, } from 'react-bootstrap'
import Footer from '../components/Footer'
import DashboardHeader from '../components/DashboardHeader'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const EditTask = (props) => {
    const { id } = useParams();

    const token = localStorage.getItem('auth_token');
    const userdata = JSON.parse(localStorage.getItem('user_data'));
const axiosConfig = {
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
  },

};
// console.log(userdata.id);
    const navigate = useNavigate();
    const [taskInput,setTask] = useState({
        title: '',
        description: '',
        level: '',
        duedate: '',
    });
    const[error,setError] = useState({
        error_list:[]
    })

    const handleInput =(e) => {
        e.persist();
        setTask({...taskInput, [e.target.name]: e.target.value})
    }

   useEffect (() => {

    const token = localStorage.getItem('auth_token');
    const userdata = JSON.parse(localStorage.getItem('user_data'));
   const axiosConfig = {
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
  },

};
       axios.get(`api/task/${id}`,axiosConfig).then(res => {
        if (res.data.message === 'Success') {
            setTask(res.data.task)
    
            
        }else{
            setTask({...taskInput, error_list: res.data.errors});
            
        }
       })
   },[])



    const taskSubmit = (e) => {
        e.preventDefault();

        const data = {
            title: taskInput.title,
            description: taskInput.description,
            level: taskInput.level,
            duedate: taskInput.duedate,

        }
        axios.post(`api/update-task/${id}`, data, axiosConfig).then(res => {
            if (res.data.status === 200) {
                alert('Task Successfully updated')
                navigate('/dashboard');
                
            }else{
                setError({...error, error_list: res.data.errors});
                 navigate(`/edit_task/${id}`);
            }
    
        });
        

    }

    return (
        <div> <DashboardHeader/>
        <div className='container' >
        
            <Row className='d-flex align-items-center justify-content-center pt-3 font-bold text-lg text-indigo-600 '> Edit Task
                <Row className='d-flex align-items-center justify-content-center pt-1'>
                    <Form className='bg-indigo-900 col-md-6 mx-auto col-lg-8 text-left' onSubmit={taskSubmit}>
                        <div className="mb-3">
                            <Form.Label className='text-white'>Title :</Form.Label>
                            <Form.Control 
                                type="text"
                                name='title'
                                onChange={handleInput}
                                value={taskInput.title}
                                placeholder="type task title"></Form.Control>
                                <span className='text-danger text-sm'>{error.error_list.title}</span>

                        </div>
                        <div className="mb-3">
                            <Form.Label className='text-white'>Description :</Form.Label>
                            <Form.Control 
                                as="textarea"
                                name='description'
                                onChange={handleInput}
                                value={taskInput.description}
                                rows={3}
                                placeholder="type task description"></Form.Control>
                                <span className='text-danger text-sm'>{error.error_list.description}</span>

                        </div>
                        <div className="mb-3">
                            <Form.Label className='text-white'>Select Task Level :</Form.Label>
                            <Form.Control as="select" 
                              name='level'
                            
                              onChange={handleInput}
                              value={taskInput.level}>
                                 <option disabled selected value="">Select Level</option>
                                <option>Low level</option>
                                <option>Medium Level</option>
                                <option>High Level</option>

                            </Form.Control>
                            <span className='text-danger text-sm'>{error.error_list.level}</span>

                        </div>
                        <div className="mb-3">
                            <Form.Label className='text-white'>Due Date :</Form.Label>
                            <Form.Control
                                type="date"
                                name='duedate'
                                onChange={handleInput}
                                value={taskInput.duedate}></Form.Control>
                                <span className='text-danger text-sm'>{error.error_list.duedate}</span>

                        </div>

                        <div className="mb-3">
                            <Button className='btn-sm btn-light text-indigo-900 font-extrabold justify-content-center align-items-center d-flex' type='submit'>Edit</Button>
                        </div>



                    </Form>
                </Row>
            </Row>
            <Footer/>
        </div>
        </div>
    )
}

export default EditTask
