import React, {useState} from 'react'
import { BsFillTrashFill, BsPencil } from 'react-icons/bs';
import Card from "react-bootstrap/Card";
import {Row, Col} from 'react-bootstrap';
import {Button, ButtonGroup} from 'react-bootstrap';;

function BlogPostItem(props){

    let [refresh, setRefresh] = useState(false);
    const {_id, blogTitle, blogText, created_at, updated_at, category, status, voteCount, author} = props.blogPost;

    // const getStyle = () => {
    //     return {
    //         background: '#f4f4f4',
    //         padding: '10px',
    //         borderBottom: '1px #ccc dotted',
    //         textDecoration: props.blogPost.completed ? 'line-through':'none'
    //     }
    // }

    const onPlusClick = (e) => {
        e.preventDefault()
        console.log("Clicked plus");
        console.log(e);
        console.log(e.target.attributes['data-key']);
        let id = e.target.attributes['data-key'].value;
        props.upVote(id);
        setRefresh(!refresh);
    }

    const onMinusClick = (e) => {
        e.preventDefault()
        console.log("Clicked minus" + e.target.name)
        let id = e.target.attributes['data-key'].value
        props.downVote(id);
        setRefresh(!refresh);
    }

    const onDeleteClick = (e) => {
        e.preventDefault()
        console.log("Clicked delete")
        console.log(e)
        let key = findIdinEvent(e, 'data-key')
        console.log(key[0]);
        props.delBlogPost(key[0]._id);
        setRefresh(!refresh);
    }

    const onEditClick = (e) => {
        e.preventDefault()
        console.log("Clicked edit")
        console.log(e)
        let key = findIdinEvent(e, 'data-key')
        console.log(key[0])
        props.updateBlogPost({_id, blogTitle, blogText, category, status, voteCount});
        setRefresh(!refresh);
    }

    const findIdinEvent = (obj, key) => {
        var seen = new Set(), active = [obj];
        while (active.length) {
            var new_active = [], found = [];
            for (var i=0; i<active.length; i++) {
                Object.keys(active[i]).forEach(function(k){
                    var x = active[i][k];
                    if (k === key) {
                        found.push(x);
                    } else if (x && typeof x === "object" &&
                                !seen.has(x)) {
                        seen.add(x);
                        new_active.push(x);
                    }
                });
            }
            if (found.length) return found;
            active = new_active;
        }
        return null;
    }

    return (
        <React.Fragment>
        <Card border="primary" style={{ width: '95%' }} key={_id}>
            <Card.Header as="h3">
                <div> 
                <ButtonGroup style={rightStyle}>
                    <Button size="sm" 
                            style={rightStyle} 
                            onClick={onEditClick}
                            >
                        <BsPencil data-key= {props.blogPost} />
                    </Button>
                    <Button size="sm" 
                            style={rightStyle} 
                            onClick={onDeleteClick}
                            >
                        <BsFillTrashFill data-key= {props.blogPost} />
                    </Button>
                </ButtonGroup>
                </div>
                {blogTitle}
            </Card.Header>
            <Card.Body>
                <Card.Text>{blogText}</Card.Text>
                <Row>
                    <Col>
                        <small className="text-muted">
                            <ButtonGroup>
                                <Button 
                                        data-key= {_id}
                                        variant="light" 
                                        onClick={onPlusClick}
                                        size="sm">
                                    {'+'}
                                </Button>
                                <small style={centerStyle}>
                                    {voteCount}
                                </small>
                                <Button 
                                        data-key= {_id}
                                        variant="light" 
                                        onClick={onMinusClick}
                                        size="sm">
                                    {'-'}
                                </Button>
                            </ButtonGroup>
                        </small>
                    </Col>
                    <Col>
                        <small className="text-muted" style={leftStyle}>
                            Category: {category} 
                            <br/>
                            Status: {status} 
                        </small>
                    </Col>
                    <Col>
                        <small className="text-muted" style={leftStyle}>
                            Author: {author}
                        </small>
                    </Col>
                    <Col>
                        <small className="text-muted" style={rightStyle}>
                            Created at: {created_at}
                            <br/>
                            Updated at: {updated_at}
                        </small>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        </React.Fragment>
    )
    
}

const leftStyle = {
    background: 'none',
    color: '#777777',
    border: 'none',
    float: 'left'
}
const rightStyle = {
    background: 'none',
    color: '#777777',
    border: 'none',
    float: 'right'
}
const centerStyle = {
    background: 'none',
    color: '#777777',
    border: 'none',
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

export default BlogPostItem;
