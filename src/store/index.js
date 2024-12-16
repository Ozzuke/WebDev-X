// const localurl = 'http://localhost:42069/api'
const hostedurl = 'https://webdev-x.onrender.com:10000/api'
const url = hostedurl

import {createStore} from 'vuex'

export default createStore({
    state: {
        posts: [],
        user: null,
        token: null
    },
    getters: {
        posts: state => state.posts,
        isAuthenticated: state => !!state.token,
        user: state => state.user,
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setUser(state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
            localStorage.setItem('token', token)
        },
        logout(state) {
            state.token = null
            state.user = null
            state.posts = []
            localStorage.removeItem('token')
        },
        addPost(state, post) {
            state.posts.unshift(post)
        },
        updatePost(state, updatedPost) {
            const index = state.posts.findIndex(post => post.id === updatedPost.id)
            if (index !== -1) {
                state.posts.splice(index, 1, updatedPost)
            }
        },
        deletePost(state, postId) {
            state.posts = state.posts.filter(post => post.id !== postId)
        },
        deleteAllPosts(state) {
            state.posts = []
        }
    },
    actions: {
        async fetchPosts({commit}) {
            try {
                const response = await fetch(`${url}/posts`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const posts = await response.json()
                commit('setPosts', posts)
            } catch (error) {
                console.error('Error fetching posts:', error)
            }
        },
        async login({commit}, credentials) {
            try {
                const response = await fetch(`${url}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                })
                const data = await response.json()
                commit('setToken', data.token)
                commit('setUser', data.user)
            } catch (error) {
                console.error('Error during login:', error)
                alert('Invalid credentials')
                throw error
            }
        },
        async signup({commit}, credentials) {
            const userExists = await this.dispatch('checkUserExists')
            if (userExists) {
                console.error('User already exists')
                throw new Error('User already exists')
            }
            try {
                const response = await fetch(`${url}/auth/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                })
                const data = await response.json()
                commit('setToken', data.token)
                commit('setUser', data.user)
            } catch (error) {
                console.error('Error during signup:', error)
                throw error
            }
        },
        async checkUserExists() {
            try {
                await fetch(`${url}/auth/check`, {
                    method: 'GET',
                })
                return true
            } catch (error) {
                return false
            }
        },
        async logout({commit}) {
            // invalidate the token on the server
            try {
                await fetch(`${url}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            } catch (error) {
                console.error('Error during logout:', error)
            } finally {
                commit('logout')
            }
        },
        async addPost({commit}, postData) {
            try {
                const response = await fetch(`${url}/posts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(postData)
                })
                const post = await response.json()
                commit('addPost', post)
            } catch (error) {
                console.error('Error adding post:', error)
                throw error
            }
        },
        async updatePost({commit}, {id, postData}) {
            try {
                const response = await fetch(`${url}/posts/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(postData)
                })
                const post = await response.json()
                commit('updatePost', post)
            } catch (error) {
                console.error('Error updating post:', error)
                throw error
            }

        },
        async deletePost({commit}, postId) {
            try {
                await fetch(`${url}/posts/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                commit('deletePost', postId)
            } catch (error) {
                console.error('Error deleting post:', error)
                throw error
            }
        },
        async deleteAllPosts({commit}) {
            try {
                await fetch(`${url}/posts`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                commit('deleteAllPosts')
            } catch (error) {
                console.error('Error deleting all posts:', error)
                throw error
            }
        },
    }
})
