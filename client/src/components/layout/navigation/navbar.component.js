import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class NavBar extends Component {
    render() {
        return (
            <div className="top-bar utilityBar">
                <div className="top-bar-left">
                    <ul className="menu">
                        <li className="menu-text">BlogCMS</li>
                    </ul>
                </div>
                <div className="top-bar-right">
                    <ul className="menu">
                        <li className="">
                            <Link to="/posts/list" className="menu-link">
                                Dashboard
                            </Link>
                        </li>
                        <li >
                        <Link to="/blog" className="menu-link">
                                View Site
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/posts/create" className="hollow button alert">
                                Create Post
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

