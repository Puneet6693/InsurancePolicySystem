import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css'; // Optional: Add custom styles for the navbar

const AdminNavbar = () => {
    return (
        <nav className="admin-navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/manage-policy">Manage Policy</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/manage-claim">Manage Claim</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/manage-customers">Manage Customers</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/manage-agent">Manage Agent</Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNavbar;