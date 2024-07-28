import React, { useEffect, useState } from 'react'
import { Button, Table, Form } from 'react-bootstrap'
import DashboardHeader from '../components/DashboardHeader'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {

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
  const [fetchList, fetchData] = useState([]);
  // console.log(userdata.name)
  useEffect(() => {
    axios.get(`api/view-task/${userdata.id}`, axiosConfig).then(res => {
      if (res.data.status === 200) {
        console.log(res.data.data)
        fetchData(res.data.data);

      } else {
        const error = (res.data.message);
        console.log(error);
      }


    }).catch(err => console.log(err))
  }, [])


  const deleteTask = (id) => {

    const token = localStorage.getItem('auth_token');
    const userdata = JSON.parse(localStorage.getItem('user_data'));
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    axios.delete(`api/delete-task/${id}`, axiosConfig).then(res => {
      if (res.data.message === 'success') {
          console.log(res.data.message)
          window.location.reload();

      } else {
        const error = (res.data.message);
        console.log(error);
      }
    })
  }
  const status = (id) => {
    const token = localStorage.getItem('auth_token');
    const userdata = JSON.parse(localStorage.getItem('user_data'));
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    axios.get(`api/task-status/${id}`, axiosConfig).then(res => {
      if (res.data.message === 'success') {
        console.log(res.data.message)
        window.location.reload();

      } else {
        const error = (res.data.message);
        console.log(error);
      }
    })
  }


  const filterByDate =(e)=>{
    const token = localStorage.getItem('auth_token');
    const userdata = JSON.parse(localStorage.getItem('user_data'));
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    axios.post(`api/filter-task/duedate`, {filter_dudedate:e.target.value}, axiosConfig).then(res => {
      if (res.data.message === 'success') {
        console.log(res.data.message)
        fetchData(res.data.task)
      }
    })
  }

  const filterTask = (e) => {
    if (e.target.value == 'duedate') {
      const dateForm = document.getElementById('date')
      dateForm.classList.remove('d-none')
     

    }else{
      const dateForm = document.getElementById('date')
      dateForm.classList.add('d-none')
      const token = localStorage.getItem('auth_token');
      const userdata = JSON.parse(localStorage.getItem('user_data'));
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
      axios.post(`api/filter-task/${e.target.value}`, {}, axiosConfig).then(res => {
        if (res.data.message === 'success') {
          console.log(res.data.message)
          fetchData(res.data.task)
        }
      })
    }

  }



  return (
    <div>
      <DashboardHeader />
      <div className='container'>
        <div className='pt-4 text-left'>
          <Button className="btn-sm btn-primary" onClick={() => { navigate('/create_task') }}>Create Task</Button>
        </div>
        <div className='ms-auto text-right col-lg-3 col-md-4 col-sm-1'>
          <Form.Group className="mb-3">
            <Form.Label className='text-indigo-600' >Filter Task</Form.Label>
            <Form.Select id="" onChange={filterTask}>
              <option disabled selected value=''></option>
              <option value={'completed'}>Completed</option>
              <option value={'duedate'}>Duedate</option>
            </Form.Select>
            <Form.Label className='text-white'>Due Date :</Form.Label>
          <Form.Control  className='d-none' onChange={filterByDate}
            type="date"
            id='date'
            name='duedate'
          ></Form.Control>
          </Form.Group>
        </div>

        <div className="ms-auto text-right col-lg-3 col-md-4 col-sm-1">
         

        </div>

        <div className='pt-3'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Task Level</th>
                <th>DueDate</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {

                fetchList.map(item => {
                  return (
                    <tr key={item.id}>
                      <td style={(item.complete) ? {textDecoration:'line-through'}: null}>{item.id}</td>
                      <td style={(item.complete) ? {textDecoration:'line-through'}: null}>{item.title}</td>
                      <td style={(item.complete) ? {textDecoration:'line-through'}: null}>{item.description}</td>
                      <td style={(item.complete) ? {textDecoration:'line-through'}: null}>{item.level}</td>
                      <td style={(item.complete) ? {textDecoration:'line-through'}: null}>{item.duedate}</td>
                      <td onClick={() => status(item.id)}>{item.complete ? <Button className="btn-sm btn-success">Completed</Button> : <Button className="btn-sm btn-warning"> Pending</Button>}</td>

                      <td><Button as={Link} to={`/edit_task/ ${item.id}`} className='btn-sm btn-info'>Edit</Button>  <Button onClick={() => deleteTask(item.id)} className='btn-sm btn-danger'>  Delete</Button></td>
                    </tr>
                  )
                })
              }

            </tbody>
          </Table>
          <Footer />
        </div>

      </div>
    </div>
  )
}

export default Dashboard
