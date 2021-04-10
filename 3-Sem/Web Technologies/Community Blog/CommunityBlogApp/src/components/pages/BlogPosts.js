import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import BlogPostItem from './BlogPostItem';
import axios from 'axios';
import {getCookie} from '../../cookies'

function BlogPosts(props){

    const [refresh, setRefresh] = useState(false);
    const [blogPosts, setBlogPosts] = useState([]);
    const history = useHistory();    

    useEffect(() => {
        refreshBlogPost(props.selectedCategory)
    }, []);
    
    // Refresh posts
    const refreshBlogPost = (category) => {
         axios({
            method: 'get', 
            url: 'http://127.0.0.1:5000/api/blogPosts?category='+ category,
            headers: {
                "x-token": getCookie('token')
            }
        })
        .then(res => res.data)
        .then(res => {
            console.log(res);
            setBlogPosts(res);
        })
        .catch((error) => {
            console.log("Failed to get Blogs for category : " + category);
            console.log(error.response);
            console.log("reading cookie - " + getCookie('id') + "/" + getCookie('token'));
        })
    }

    const findArrayElementById = (array, id) => {
        return array.find((element) => {
            console.log(element);
            return element._id === id;
        })
      }
    // Up Vote blogPosts
    const upVoteBlogPost = (id) => {
        console.log("Up vote blog post for id: " + id); 
        let post = findArrayElementById(blogPosts, id);
        let upVote = post["voteCount"] + 1;
        post["voteCount"] = upVote;
        axios({
            method: 'patch', 
            url: 'http://127.0.0.1:5000/api/blogPosts/'+ id,
            data: {voteCount: upVote},
            headers: {
                "x-token": getCookie('token')
            }
          })
        .then(setRefresh(true))
        .catch((error) => {
            console.log("Failed to upVote Blog : " + post.blogTitle);
            console.log(error.response);
            console.log("reading cookie - " + getCookie('id') + "/" + getCookie('token'));
        })
    }

    // Down Vote blogPosts
    const downVoteBlogPost = (id) => {
        console.log("Down vote blog post for id: " + id); 
        let post = findArrayElementById(blogPosts, id);
        let downVote = post["voteCount"] - 1;
        if(downVote < 0) downVote = 0;
        post["voteCount"] = downVote;
        axios({
            method: 'patch', 
            url: 'http://127.0.0.1:5000/api/blogPosts/'+ id,
            data: {voteCount: downVote},
            headers: {
                "x-token": getCookie('token')
            }
          })
        .then(setRefresh(true))
        .catch((error) => {
            console.log("Failed to downVote Blog : " + post.blogTitle);
            console.log(error.response);
            console.log("reading cookie - " + getCookie('id') + "/" + getCookie('token'));
        })

    }
    
    // Delete blogPosts
    const delBlogPost = (id) => {
        axios({
            method: 'delete', 
            url: 'http://127.0.0.1:5000/api/blogPosts/'+ id,
            headers: {
                "x-token": getCookie('token')
            }
          })
        .then(setRefresh(true))
        .then(res => setBlogPosts([...blogPosts.filter(blogPost => blogPost._id !== id)]))
        .catch((error) => {
            console.log("Failed to delete Blog : " + id);
            console.log(error.response);
            console.log("reading cookie - " + getCookie('id') + "/" + getCookie('token'));
        })

    }

    const updateBlogPost = ({_id, blogTitle, blogText, category, status, voteCount}) => {
        console.log("UpdateBlogPost() - onSubmit");
        history.push({
            pathname: "/newBlog",
            category: category,
            state: {
                redirect: false,
                isNewBlog: false,
                _id: _id,
                blogTitle: blogTitle,
                category: category,
                blogText: blogText,
                status: status,
                voteCount: voteCount
            }
        }); 
    }

    return blogPosts.map((blogPost) => (
        <BlogPostItem key={blogPost._id} 
                        blogPost={blogPost} 
                        upVote={upVoteBlogPost}
                        downVote={downVoteBlogPost}
                        updateBlogPost={updateBlogPost} 
                        delBlogPost={delBlogPost} 
                        />
    ));
}

export default withRouter(BlogPosts);