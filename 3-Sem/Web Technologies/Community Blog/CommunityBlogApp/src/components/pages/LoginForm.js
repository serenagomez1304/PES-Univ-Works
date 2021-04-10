import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {getCookie, setCookie} from '../../cookies'

function LoginForm(props) {

    let [initFlag, setInitFlag] = useState(false);
    let [refresh, setRefresh] = useState(false);
    let [errorText, setErrorText] = useState('');
    let [showError, setShowError] = useState(false);
    let [form, setFormValues] = useState(
                                {
                                    username: getCookie('id'),
                                    password: '' 
                                });
    
    const history = useHistory();
    
    // useEffect(() => {
    //     if(!initFlag){
    //         setInitFlag(true);
    //         window.location.reload()
    //     }
    //  }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let email = form.username;
        let password = form.password;
        let data = {email, password};
        console.log("username / password:");
        console.log(data);
        axios({
            method: 'post', 
            url: 'http://localhost:5000/api/authn/login',
            data: {email, password}
          })
        .then(res => res.data)
        .then(res => {
            console.log(res);
            setCookie('id', res.id, { path: '/' })
            setCookie('name', res.name, { path: '/' })
            setCookie('token', res.token, { path: '/' })
            setCookie('refresh_token', res.refresh_token, { path: '/' })
            history.push({
                pathname:  "/blogs",
                category: "Random"                
            });
            console.log("Reading cookie - id: " + getCookie('id'))
            window.location.reload();
        })
        .catch((error) => {
            console.log("Login failed");
            setErrorText("Login failed");
            setShowError(true);
            if (error.response) {
                history.push({
                    pathname:  "/login",
                });
            }
            console.log(error.config);
        })
    }

    const onChange = (e) =>{
        e.preventDefault()
        //console.log([e.target.name] + " : " + e.target.value);
        setFormValues({
            ...form, 
            [e.target.name]: e.target.value
        });
    }

    const renderRefresh = () => {
        if (refresh) {
            refresh=false;
            history.push({
                pathname:  "/blogs"
            });
        }
    }

    return (
        <React.Fragment>
            <h2>User login</h2>
            <Form>
                <Form.Group controlId = "formLogin">
                    <Alert show={showError} variant="danger">
                        {errorText}
                    </Alert>
                    <Form.Label>User name: </Form.Label>
                    <Form.Control 
                        type="input"
                        name="username"
                        value={form.username}
                        // placeholder= "name@abc.com"
                        onChange={onChange}
                        // pattern="{alphanum}+{@}{com||in}"
                    />
                    <Form.Text className="text-muted">
                    Enter your email id.
                    </Form.Text>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control 
                        type="password"
                        name="password"
                        value={form.password}
                        // placeholder= "*******"
                        onChange={onChange}
                    />
                </Form.Group>

                <Button className="mr-1" 
                        variant="primary" 
                        size="sm" 
                        onClick={handleSubmit}
                        >
                    Login
                </Button>
                <NavLink to={{
                            pathname:"/login",
                        }}>
                Cancel </NavLink>
                {renderRefresh()}
            </Form>
        </React.Fragment>
    )

}

export default withRouter(LoginForm);