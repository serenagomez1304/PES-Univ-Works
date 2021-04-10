import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {getCookie, setCookie} from '../../cookies'

function SignupForm(props) {

    let [initFlag, setInitFlag] = useState(false);
    let [refresh, setRefresh] = useState(false);
    let [errorText, setErrorText] = useState('');
    let [showError, setShowError] = useState(false);
    let [form, setFormValues] = useState(
                                {
                                    name: '',
                                    email: '',
                                    password: '',
                                    confirmPass: '' 
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
        let name = form.name;
        let email = form.email;
        let password = form.password;
        let confirmPass = form.password;
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if(form.name.trim().length == 0 
                || form.email.trim().length == 0 
                || form.password.trim().length == 0 
                ||form.name.trim().length == 0) {
            console.log("All fields are required");
            setErrorText("All fields are required");
            setShowError(true);
            history.push({
                pathname:  "/signup",
            });
        } else if (!pattern.test(form.email)) {
            console.log("Invalid email address");
            setErrorText("Invalid email address");
            setShowError(true);
            history.push({
                pathname:  "/signup",
            });
        } else if (form.confirmPass !== form.password){
            console.log("Incorrect password");
            setErrorText("Incorrect Password");
            setShowError(true);
            history.push({
                pathname:  "/signup",
            });
        } else {
            let data = {name, email, password};
            console.log("name / email/ password:");
            console.log(data);
            var status="active";
            axios({
                method: 'post', 
                url: 'http://localhost:5000/api/users',
                data: {name, email, password, status}
            })
            .then(res => res.data)
            .then(res => {
                console.log(res);
                history.push({
                    pathname:  "/login"                
                });
                window.location.reload();
            })
            .catch((error) => {
                console.log("Signup failed");
                console.log(error.response);
                if(error.response.status == 409){
                    setErrorText("Email already registered");
                    setShowError(true);
                }
                if (error.response) {
                    history.push({
                        pathname:  "/signup",
                    });
                }
                console.log(error.config);
            })
        }
    }

    const onChange = (e) =>{
        e.preventDefault()
        //console.log([e.target.name] + " : " + e.target.value);
        setFormValues({
            ...form, 
            [e.target.name]: e.target.value
        });
    }

    return (
        <React.Fragment>
            <h2>User Signup</h2>
            <Form>
                <Form.Group controlId = "formSignup">
                    <Alert show={showError} variant="danger">
                        {errorText}
                    </Alert>
                    <Form.Label style={reqStyle}>*</Form.Label>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control
                        required
                        type="input"
                        name="name"
                        onChange={onChange}
                        value={form.name}
                    />
                    <Form.Label style={reqStyle}>*</Form.Label>
                    <Form.Label>Email ID: </Form.Label>
                    <Form.Control 
                        required
                        type="email"
                        name="email"
                        value={form.username}
                        // placeholder= "name@abc.com"
                        onChange={onChange}
                    />
                    <Form.Label style={reqStyle}>*</Form.Label>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control 
                        required
                        type="password"
                        name="password"
                        value={form.password}
                        // placeholder= "*******"
                        onChange={onChange}
                    />
                    <Form.Label style={reqStyle}>*</Form.Label>
                    <Form.Label>Confirm Password: </Form.Label>
                    <Form.Control 
                        required
                        type="password"
                        name="confirmPass"
                        value={form.confirmPass}
                        // placeholder= "*******"
                        onChange={onChange}
                    />
                </Form.Group>

                <Button className="mr-1" 
                        variant="primary" 
                        size="sm" 
                        onClick={handleSubmit}
                        >
                    Sign up
                </Button>
                <NavLink to={{
                            pathname:"/signup",
                        }}>
                Cancel </NavLink>
            </Form>
        </React.Fragment>
    )

}

const reqStyle = {
    color:"red"
}

export default withRouter(SignupForm);