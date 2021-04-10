import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Header from './components/layout/Header'
import AddBlogPost from './components/pages/AddBlogPost';
import CategoryTabs from './components/pages/CategoryTabs';
import About from './components/pages/About';
import BlogPostForm from './components/pages/BlogPostForm';
import LoginForm from './components/pages/LoginForm';
import {getCookie, removeCookie} from './cookies'
import SignupForm from './components/pages/SignupForm';

function App(props) {

  let [selectedCategory, setSelectedCategory] = useState(props.category);
  let [userLogin, setUserLogin] = useState(getCookie('id'));

  // Select category
  const setCategory = (key) => {
    setSelectedCategory(key);
  }

  return (
    <Router>
      <div className="App">
        <div className='container'>
        <div>
            <Header/>
            <Route exact path="/"
                render={() => {
                    return (
                      (userLogin === undefined || userLogin === '') ?
                      <Redirect to="/login" /> : <Redirect to="/blogs" /> 
                    )
                }}
              />
            <Route exact path="/login" 
                render={props => (
                  <React.Fragment>
                    <LoginForm />
                  </React.Fragment>
                )} />
            <Route exact path="/signup" 
            render={props => (
              <React.Fragment>
                <SignupForm />
              </React.Fragment>
            )} />
            <Route exact path="/logout" 
                render={() => {
                  removeCookie('id');
                  removeCookie('token');
                  removeCookie('refresh_token');
                  setUserLogin('');
                  console.log(document.getElementById("user").lastChild.childNodes[1])
                  return (
                    <Redirect to="/login"/>
                  )
              }} />
            <Route path="/blogs" 
              render={props => (
                <React.Fragment>
                  <AddBlogPost /> 
                  <CategoryTabs 
                          category={selectedCategory}
                          setCategory={setCategory}
                          />
                </React.Fragment>
              )} />
              <Route path="/newBlog" 
                render={props => (
                  <React.Fragment>
                    <BlogPostForm submitButtonText="Post Blog"
                              category={selectedCategory}/>
                  </React.Fragment>
                )} />
            <Route path="/about" component={About} />
          </div>
          </div>
      </div>
    </Router>
  );
}

export default App;
