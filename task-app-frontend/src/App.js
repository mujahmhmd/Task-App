import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Footer } from './components/Footer';
import Header from './components/Header';
import DashboardHeader from './components/DashboardHeader';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Error from './pages/Error';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import ProfileDetail from './pages/ProfileDetail';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import EditTask from './pages/EditTask';
import axios from 'axios';




axios.defaults.withCredentials = true;

// axios.interceptors.request.use(function (confiq){
//   const token = localStorage.getItem('auth_token');
//   console.log(token);
//   confiq.headers.Authorization = token ? `Bearer ${token}`: '';
//   return confiq;
// });
axios.defaults.baseURL="http://127.0.0.1:8000/"
axios.defaults.headers.post ['Content-Type'] = 'application/json';
axios.defaults.headers.post ['Accept'] = 'application/json';



// const token = localStorage.getItem('token');
// axios.defaults.headers.post ['Authorization'] = 'Bearer ${token}';





function App() {


  return (
    <div className='App' >
    
  <Router>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register' element={<RegistrationPage/>} />
      <Route path='/loginpage' element={<LoginPage/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/create_task' element={<CreateTask/>} />
      <Route path='/user_profile/:id' element={<ProfileDetail/>} />
      <Route path='/edit_task/:id' element={<EditTask/>} />
      <Route path='*' element={<Error/>} />

    </Routes>
  </Router>
    </div>

  );
}

export default App;
