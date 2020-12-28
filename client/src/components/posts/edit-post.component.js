import React, { Component } from 'react'
import api from '../../api'

export default class EditPost extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            id: this.props.match.params.id,
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

        await api.updatePostById(this.state.id, payload).then(res => {''
            console.log(res)
            window.location.href = "/posts/list"
            //window.alert(`Blog post updated successfully`)
            this.setState({
                title: '',
                content: "",
                blurb: '',
                postBy: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const post = await api.getPostById(id)

        this.setState({
            title: post.data.data.title,
            blurb: post.data.data.blurb,
            content: post.data.data.content,
            postBy: post.data.data.postBy,
        })
    }

    render() {
        const { title, blurb, content, postBy } = this.state
        return (
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
            
        )
    }
}

