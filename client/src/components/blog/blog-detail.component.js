import React, {Component} from "react"
//import api from "../../api"
import axios from "axios"

export default class BlogDetail extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            id: this.props.match.params.id,
            title: '',
            content: "",
            imagePath: "",
            blurb: '',
            postBy: '',
        })

    }

    componentDidMount() {
        //const { id } = this.state
        //const post = await api.getPostById(this.state.id)
        //console.log("post", post)
        //console.log("id", id)

        //this.setState({isLoading: true})

        axios.get("/admin/post/" + this.state.id).then(post => {
            console.log(post)
            this.setState({
                title: post.data.title,
                blurb: post.data.blurb,
                imagePath: post.data.imagePath,
                content: post.data.content,
                postBy: post.data.postBy,
            })
        }).catch(error => {
            console.log(error)
        })

        

        //console.log
    }

    render() {
        
        const { title, blurb, imagePath, content, postBy } = this.state

        return(
            <div>
                <div className="top-bar nav">
                    <div className="top-bar-left">
                        <ul className="menu">
                            <li className="nav menu-text">Notes.</li>
                            <li className="menu-link"><a href="/blog">Home</a></li>
                            <li className="menu-link"><a href="/posts/list">Dashboard</a></li>
                        </ul>
                    </div>
                </div>

                <div className="wrapper">
                    <div className="grid-container content">
                        <div className="grid-x detailInfo">
                            <h1>{title}</h1>
                            <p>By <b>{postBy}</b></p>
                        </div>
                        <div className="grid-x">
                            <img className="cell img" src={imagePath} alt="post"/>
                            <div className="cell text">{content}</div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}