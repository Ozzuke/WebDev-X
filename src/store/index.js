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
                const response = await fetch('http://localhost:42069/api/posts', {
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
                const response = await fetch('http://localhost:42069/api/auth/login', {
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
                throw error
            }
        },
        async signup({commit}, credentials) {
            try {
                const response = await fetch('http://localhost:42069/api/auth/signup', {
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
        async logout({commit}) {
            // invalidate the token on the server
            try {
                await fetch('http://localhost:42069/api/auth/logout', {
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
                const response = await fetch('http://localhost:42069/api/posts', {
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
                const response = await fetch(`http://localhost:42069/api/posts/${id}`, {
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
                await fetch(`http://localhost:42069/api/posts/${postId}`, {
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
                await fetch('http://localhost:42069/api/posts', {
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
