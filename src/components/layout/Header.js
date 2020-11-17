import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={headerStyle}>
            <h1>TodoList</h1>
            <Link 
                style={linkStyle} 
                to="/Modul_4_React_TodoList/"
            >Home</Link> | <Link 
                style={linkStyle} 
                to="/Modul_4_React_TodoList/about"
            >About</Link>
        </header>
    )
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

export default Header;