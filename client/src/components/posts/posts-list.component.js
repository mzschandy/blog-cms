import React, { Component } from 'react'
import api from '../../api'

class UpdatePost extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/posts/update/${this.props.id}`
    }

    render() {
        return <div className="" onClick={this.updateUser}>Update</div>
    }
}

class DeletePost extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the post ${this.props.id} permanently?`,
            )
        ) {
            api.deletePostById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <div className="" onClick={this.deleteUser}>Delete</div>
    }
}

function PostsTable(props) {
    return(
        <tr>
            <td className="title">{props.title}</td>
            <td className="update" ><UpdatePost id={props._id} /></td>
            <td className="delete" ><DeletePost id={props._id} /></td>     
        </tr>
    )
}

class PostsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            //columns: [],
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
                <PostsTable key={index} {...post}/>
            ))
            console.log(allposts)
        }

        return (
            <div className="grid-container tableWrapper">
            <div className="grid-x">
                <h1>Your  Posts</h1>
                <table className="hover postsLister">
                    <thead>
                        <tr>
                            <th>Post</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allposts}
                    </tbody>
                </table>
            </div>
            </div>
        )
    }
}

export default PostsList
