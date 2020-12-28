import React, { Component } from 'react'
import api from '../../api'




export default class AddPost extends Component {
    

    constructor(props) {
        super(props)

        this.state = ({
            title: '',
            content: "",
            blurb: '',
            postBy: '',
        })

        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeBlurb = this.onChangeBlurb.bind(this)
        this.onChangePostBy = this.onChangePostBy.bind(this)
        this.onChangeContent = this.onChangeContent.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChangeContent = async event => {
        this.setState({
            content: event.target.value
        })
    }

    onChangeTitle = async event => {
        this.setState({
            title: event.target.value
        })
    }

    onChangeBlurb = async event => {
        this.setState({
            blurb: event.target.value
        })
    }

    onChangePostBy = async event => {
        this.setState({
            postBy: event.target.value
        })
    }

    onSubmit = async event => {
        //console.log
        event.preventDefault()

        console.log("Form submitted")
        console.log(this.state.title)
        console.log(`Summary: ${this.state.blurb}`)
        console.log(this.state.content)

        

        const { title, blurb, content, postBy } = this.state
        const payload = { title, blurb, content, postBy }

        await api.insertPost(payload).then(res => {''
            console.log(res)
            //window.alert(`Blog post added successfully`)
            window.location.href = "/posts/list"
            this.setState({
                title: '',
                content: "",
                blurb: '',
                postBy: '',
            })
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

