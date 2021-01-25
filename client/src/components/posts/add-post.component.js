import React, { Component } from 'react'
import axios from "axios"
import ImageUpload from "./util/image-upload.component"



export default class AddPost extends Component {
    constructor(props) {
        super(props)

        this.state = ({
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

    componentDidMount() {
        //let path = this.props.match.path
        //let id = this.props.match.params.id
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
        //console.log(event.target.value)
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

        

        //const payload = { title, blurb, content, postBy }

        axios.post("/admin/post", payload).then(data => {
            console.log(data)
            window.alert(`Blog post added successfully`)
            //window.location.href = "/posts/list"
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
        //const { title, rating, content } = this.state
        //const { content } =  this.sta
        return (
            <div>
                <div className="actionWrapper">
                <div className="grid-container">
                    <div className="grid-x">
                        <h1>Create Blog Post</h1>
                    </div>
                </div>
                </div>
                
                <form onSubmit={this.onSubmit}>
                    <div className="grid-container">
                        <div className="grid-x">
                        <div className="cell">
                            <input type="text" placeholder="Enter Blog Title" value={this.state.title} onChange={this.onChangeTitle} />
                        </div>
                        <div className="cell">
                            <input type="text" placeholder="Enter Article Blurb" value={this.state.blurb} onChange={this.onChangeBlurb} />
                        </div>
                        <div className="cell">
                            <input type="text" placeholder="Author Name" value={this.state.postBy} onChange={this.onChangePostBy} />
                        </div>
                        <div className="cell">
                            <ImageUpload id="imagePath" name="imagePath" onInput={this.imageHandler} value={this.state.imagePath} errorText="Please provide an image" />
                        </div>
                        <div className="editorWrapper cell">
                            <textarea value={this.state.content} placeholder="Write Something!" onChange={this.onChangeContent}></textarea>
                        </div>
                        <div>
                        <input className="button primary submitButton" type="submit"/>
                            <a className="button alert" href="/posts/list">Cancel</a>
                        </div>
                        </div>
                    </div>
                        
                </form>
            </div>
        )
    }
}

