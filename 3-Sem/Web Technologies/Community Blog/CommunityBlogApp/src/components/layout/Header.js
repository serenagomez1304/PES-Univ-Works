import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {getCookie} from '../../cookies'

import 'bootstrap/dist/css/bootstrap.min.css'

function Header(props) {
    let [refresh, setRefresh] = useState(false);
    let [username, setUsername] = useState(getCookie('id'))
    
    return (
        <header style = {headerStyle}>
            <h1>Community Blog</h1>
            <div>
                <Link style={userStyle} to={{
                            pathname:"/logout",
                        }}>
                [Logout]
                </Link> 
            </div>
            <div style={userStyle}> | </div>
            <div>
                <Link style={userStyle} to={{
                            pathname:"/signup",
                        }}>
                [Signup]
                </Link> 
            </div>
            <div style={userStyle}> | </div>
            <div id = "user">
                <Link style={userStyle} to={{
                            pathname:"/login",
                        }}>
                [User: {username}]
                </Link> 
            </div>
            <div style = {subHeaderStyle}>
                <Link style={linkStyle} to={{
                            pathname:"/blogs",
                            state: {
                                category: "Random"
                            }}}> Home </Link> 
                | <Link style={linkStyle} to="/about"> About </Link>
                | <Link style={linkStyle} to={{
                            pathname:"/newBlog",
                            state: {
                                category: "Random",
                                isNewBlog: true
                            }}}> New Blog </Link>
            </div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        </header>
    )
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '5px'
}

const subHeaderStyle = {
    textAlign: 'left',
    padding: '5px'
}

const userStyle = {
    color: '#00ffff',
    float: 'right',
    padding: '5px'
}

const linkStyle = {
    color: '#00ffff',
    textDecoration: 'none'
}

export default Header;