import Axios from 'axios'
import React, { Component } from 'react'
import ImageUpload from "./util/image-upload.component"
import NavBar from "../layout/navigation/navbar.component"



export default class EditPost extends Component {
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

        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeBlurb = this.onChangeBlurb.bind(this)
        this.onChangePostBy = this.onChangePostBy.bind(this)
        this.onChangeContent = this.onChangeContent.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount = async () => {
        //const { id } = this.state
        //const post = await api.getPostById(id)

        let path = this.props.match.path
        let id = this.props.match.params.id

        Axios.get("admin/post/" + id).then(post => {
            console.log(post)

            //let post = data.data
            this.setState({
                title: post.data.title,
                blurb: post.data.blurb,
                content: post.data.content,
                imagePath: post.data.imagePath,
                postBy: post.data.postBy,
            })

            console.log("image", this.state.imagePath)
        })

        
    }

    imageHandler = (id, value, isValid) => {
        this.setState({imagePath: value})
        console.log("valyue", value)
        console.log("value name", value.name)
    }

    onChangeContent = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    onChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    onChangeBlurb = (event) => {
        this.setState({
            blurb: event.target.value
        })
    }

    onChangePostBy = (event) => {
        this.setState({
            postBy: event.target.value
        })
    }

    onSubmit = (event) => {
        //console.log
        event.preventDefault()

        let path = this.props.match.path
        let id = this.props.match.params.id
        let date = new Date()

        const { title, blurb, imagePath, content, postBy } = this.state

        let payload

        console.log("image", imagePath)

        if (typeof (this.state.imagePath) === "object") {
            payload = new FormData()
            payload.append("title", title)
            payload.append("blurb", blurb)
            payload.append("image", imagePath)
            payload.append("content", content)
            payload.append("postBy", postBy)
        } else {
            //payload = {title, blurb, imagePath, content, postBy}
            payload = {
                "title": title,
                "blurb": blurb,
                "image": imagePath,
                "content": content,
                "postBy": postBy
            }
        }

        console.log("Form submitted")
        console.log(this.state.title)
        console.log(`Summary: ${this.state.blurb}`)
        console.log(this.state.content)

        Axios.put("/admin/post/" + id, payload).then(data => {
            console.log(data)
            window.alert("Blog post updated!")
        }).catch(error => console.log(error))

        this.setState({
            title: '',
            content: "",
            imagePath: "",
            blurb: '',
            postBy: '',
        })
    }

    

    render() {
        const { title, blurb, imagePath, content, postBy } = this.state
        return (
            <div>
                <NavBar/>
                <div className="actionWrapper">
                <div className="grid-container">
                    <div className="grid-x">
                        <h1>Edit Blog Post</h1>
                    </div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="grid-container">
                        <div className="grid-x">
                        <div className="cell">
                            <input type="text" placeholder="Enter Blog Title" value={title} onChange={this.onChangeTitle} />
                        </div>
                        <div className="cell">
                            <input type="text" placeholder="Enter Article Blurb" value={blurb} onChange={this.onChangeBlurb} />
                        </div>
                        <div className="cell">
                            <input type="text" placeholder="Author Name" value={postBy} onChange={this.onChangePostBy} />
                        </div>
                        <div className="cell">
                            <ImageUpload id="imagePath" name="imagePath" onInput={this.imageHandler} value={this.state.imagePath} errorText="Please provide an image" />
                        </div>
                        <div className="editorWrapper cell">
                            <textarea value={content} placeholder="Write Something!" onChange={this.onChangeContent}></textarea>
                        </div>
                        <div>
                            <input className="button submitButton" type="submit"/>
                            <a className="button alert" href="/posts/list">Cancel</a>
                        </div>
                        </div>
                    </div>
                        
                </form>
            </div>
            </div>
            
            
        )
    }
}

