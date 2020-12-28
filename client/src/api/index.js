import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})


export const insertPost = payload => api.post(`/admin/post`, payload)
export const getAllPosts = () => api.get(`/admin`)
export const updatePostById = (id, payload) => api.put(`/admin/post/${id}`, payload)
export const deletePostById = id => api.delete(`/admin/post/${id}`)
export const getPostById = id => api.get(`admin/post/${id}`)
export const getBlogDetail = id => api.get(`/admin/post/${id}`)


const apis = {
    insertPost,
    getAllPosts,
    updatePostById,
    deletePostById,
    getPostById,
    getBlogDetail,
}

export default apis
