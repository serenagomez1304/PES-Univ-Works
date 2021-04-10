import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {getCookie} from '../../cookies'

function BlogPostForm(props) {

    let [refresh, setRefresh] = useState(false);
    let [isNewBlog, setNewBlog] = useState(props.location.state.isNewBlog);
    let [form, setFormValues] = useState(
                                {
                                    _id: props.location.state._id,
                                    blogTitle: props.location.state.blogTitle,  //'New blog title',
                                    author: props.location.state.author, //'Annonymous',
                                    category: props.category, //'Random',
                                    blogText: props.location.state.blogText, //'Blog text',
                                    status: props.location.state.status //'draft',
                                });
    let [selectedCategory, setSelectedCategory] = useState(props.category);
    const history = useHistory();

    let submitButtonText = "Post blog";
    if(isNewBlog !== true) {
        submitButtonText = "Update blog";
    } else {
        form.author = getCookie('name');
    }

    // Add blogPosts
    const addBlogPost = (blogTitle, author, category, blogText, status) => {
        console.log("Add Blog Post");
        console.log({blogTitle, author, category, blogText, status});
        if(blogTitle) {
            axios({
                method: 'post', 
                url: 'http://127.0.0.1:5000/api/blogPosts',
                data: {blogTitle, author, category, blogText, status},
                headers: {
                    "x-token": getCookie('token')
                }
              })
            }
    }

    // Update blogPosts
    const updateBlogPost = (id, blogTitle, author, category, blogText, status) => {
        console.log("Update Blog Post");
        console.log({id, blogTitle, author, category, blogText, status});
        if(blogTitle) {
            axios({
                method: 'patch', 
                url: 'http://127.0.0.1:5000/api/blogPosts/' + id,
                data: {blogTitle, author, category, blogText, status},
                headers: {
                    "x-token": getCookie('token')
                }
              })
            .then(setSelectedCategory(category))
            .catch((error) => {
                console.log("Failed to update Blog : " + blogTitle);
                console.log(error.response);
                console.log(error.config);
            })
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        if(isNewBlog) {
            console.log("NewBlog - handleSubmit()");
            addBlogPost(
                form.blogTitle,
                form.author,
                form.category,
                form.blogText,
                form.status
            );
        }
        else {
            console.log("UpdateBlog - handleSubmit()");
            updateBlogPost(
                form._id,
                form.blogTitle,
                form.author,
                form.category,
                form.blogText,
                form.status
            );
        }
        setRefresh(true);
        // renderRefresh();
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
                pathname:  "/blogs",
                category: form.category,
            });
        }
    }

    return (
        <React.Fragment>
            <h1>{form.blogTitle}</h1>
            <Form 
                // onSubmit={handleSubmit()}
                >
                <Form.Group controlId = "formBlogTitle">
                    <Form.Label>Blog title: </Form.Label>
                    <Form.Control 
                        type="input"
                        name="blogTitle"
                        value={form.blogTitle}
                        placeholder= "New Blog.."
                        onChange={onChange}
                    />
                    <Form.Text className="text-muted">
                    Enter your blog title.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId = "formBlogAuthor">
                    <Form.Label>Author: {form.author} </Form.Label>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group controlId="formBlogCategory">
                            <Form.Label>Category: </Form.Label>
                            <Form.Control as="select"
                                onChange={onChange}
                                name="category"
                                defaultValue={selectedCategory} >
                                <option>Random</option>
                                <option>Food</option>
                                <option>Music</option>
                                <option>Movies</option>
                                <option>Politics</option>
                                <option>Travel</option>
                            </Form.Control>
                        </Form.Group>
                    </Col> <Col>
                        <Form.Group controlId="formBlogStatus">
                            <Form.Label>Status: </Form.Label>
                            <Form.Control as="select"
                                onChange={onChange}
                                name="status"
                                defaultValue={form.status} >
                            <option>Draft</option>
                            <option>Published</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="formBlogText">
                    <Form.Label>Your Blog</Form.Label>
                    <Form.Control as="textarea" rows={7} 
                        onChange={onChange}
                        name="blogText"
                        defaultValue={form.blogText}/>
                </Form.Group>
                <Button className="mr-1" 
                        variant="primary" 
                        size="sm" 
                        // type="submit"
                        onClick={handleSubmit}
                        >
                    {submitButtonText}
                </Button>
                <NavLink to={{
                            pathname:"/blogs",
                            category: form.category
                        }}>
                Cancel </NavLink>
                {renderRefresh()}
            </Form>
        </React.Fragment>
    )

}

export default withRouter(BlogPostForm);