import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Client/Home';
import Menu from './components/Client/Menu';
import EmailVerify from './components/EmailVerify';
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from './components/PasswordReset';
import Dashboard from './components/Adminmain/AdminMainPage';
import Products from './components/Adminmain/Products';
import Users from './components/Adminmain/Users';
import Orders from './components/Adminmain/Orders';
import Summary from './components/Adminmain/Summary';

function App() {
  const user = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <div className="content-container">
          <Routes>
            {user ? (
              userType === 'Admin' ? (
                <Route path="/" element={<Dashboard />}>
                  <Route path="summary" element={<Summary />} />
                  <Route path="products" element={<Products />} />
                  <Route path="users" element={<Users />} />
                  <Route path="orders" element={<Orders />} />
                </Route>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                </>
              )
            ) : (
              <Route path="/" element={<Navigate replace to="/login" />} />
            )}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
