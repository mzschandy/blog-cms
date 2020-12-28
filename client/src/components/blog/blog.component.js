import React, {Component} from "react"
import api from "../../api"
import { Link } from 'react-router-dom'
import Image from "react-random-image"

class BlogDetail extends Component {
    blogDetail = event => {
        event.preventDefault()

        //href = `/post`
    }
}

function Post(props) {

    return(
        <div className="cell">
            <Link to={"/post/"+props._id} className="card post">
            <div className="image">
                {/*<img alt="blogPicture" src="https://images.unsplash.com/photo-1607340385476-7f47b5700026?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80"></img>*/}
                <Image width={1500} height={1000}/>
            </div>
            <div className="card-section info">
                <h4 className="title">{props.title}</h4>
                <div className="blurb">{props.blurb}</div>
            </div>
            </Link>
        </div>
        
    )
}

export default class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllPosts().then(posts => {
            this.setState({
                posts: posts.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        //const { posts, isLoading } = this.state

        //let isLoading
        let allposts

        if(this.state.posts) {
            allposts = this.state.posts.map((post,index) => (
                <Post key={index} {...post}/>
            ))
            console.log(allposts)
        }

        return (
            <div>
                <div className="top-bar nav">
                <div className="top-bar-left">
                <ul className="menu">
                    <li className="nav menu-text">Notes.</li>
                    <li className="menu-link"><a href="/blog">Home</a></li>
                </ul>
                </div>
            
                </div>
                <div className="hero">
                    <div className="heroInner">
                        <div className="heroOverlay overlay">
                            <div className="cell">
                                <h2>BlogCMS</h2>
                                <h6>A blog platform</h6>
                            </div>   
                        </div>
                    </div>
                </div>
                
                <div className="wrapper">
                    <div className="grid-container wrapperInner">
                        <div className="grid-x grid-margin-x small-up-2 medium-up-3 cardWrapper">
                            {allposts}
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}