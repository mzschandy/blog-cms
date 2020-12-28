import React, {Component} from "react"
import api from "../../api"

export default class BlogDetail extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            id: this.props.match.params.id,
            title: '',
            content: "",
            blurb: '',
            postBy: '',
        })

    }

    componentDidMount = async () => {
        //const { id } = this.state
        const post = await api.getPostById(this.state.id)
        //console.log("post", post)
        //console.log("id", id)

        //this.setState({isLoading: true})

        this.setState({
            title: post.data.data.title,
            blurb: post.data.data.blurb,
            content: post.data.data.content,
            postBy: post.data.data.postBy,
        })

        //console.log
    }

    render() {
        
        const { title, blurb, content, postBy } = this.state
        console.log(title)
        console.log(this.state.title)
        return(
            <div>
                <div className="top-bar nav">
                    <div className="top-bar-left">
                        <ul className="menu">
                            <li className=" menu-text">Notes.</li>
                            <li className="menu-link"><a href="/blog">Home</a></li>
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
                            <div>{content}</div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}