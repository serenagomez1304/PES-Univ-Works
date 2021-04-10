import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory, withRouter } from "react-router-dom";
import {getCookie} from '../../cookies'

function AddBlogPost(props) {
    const history = useHistory();

    const handleClick = () => {
        console.log("AddBlogPost() - onSubmit");
        history.push({
            pathname: "/newBlog",
            state: {
                isNewBlog: true,
                _id: undefined,
                blogTitle: 'New blog title',
                author: getCookie('id'),
                category: 'Random',
                blogText: '',
                status: 'draft',
            }
        }); 
    }

    return (
        <React.Fragment>
            <div style={toolbarStyle}>
                <Form >
                    <Button variant="primary"
                            size="sm" 
                            onClick={handleClick}>
                        New Blog
                    </Button>
                </Form>
            </div>
        </React.Fragment>
    )
}

const toolbarStyle = {
    float: 'right',
    padding: '5px'
}

const bcStyle = {
    float: 'left',
    padding: '5px'
}

export default withRouter(AddBlogPost);
