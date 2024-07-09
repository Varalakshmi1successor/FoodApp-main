import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div>
        <div className='navbar'>
          <div className='navbar-left'>
            <h1 className='website-name'>Food App</h1>
          </div>
          <div className='navbar-right'>
            <button className='logout-button' onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <nav className='nav-menu'>
          <ul className='nav-menu-items'>
            {SidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </IconContext.Provider>
  );
}

export default Navbar;
