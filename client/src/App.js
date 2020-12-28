import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NavBar from "./components/layout/navigation/navbar.component"
import AddPost from "./components/posts/add-post.component"
import EditPost from "./components/posts/edit-post.component"
import PostsList from "./components/posts/posts-list.component"
import Blog from "./components/blog/blog.component"
import BlogDetail from './components/blog/blog-detail.component'


function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/posts/list" exact component={PostsList} />
                <Route path="/posts/create" exact component={AddPost} />
                <Route path="/posts/update/:id" exact component={EditPost} />
                <Route path="/blog" exact component={Blog}/>
                <Route path="/post/:id" exact component={BlogDetail}/>
            </Switch>
        </Router>
    )
}

export default App
