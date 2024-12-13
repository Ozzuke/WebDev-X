import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import AddPost from '../views/AddPost.vue'
import Signup from "../views/Signup.vue"
import SinglePostView from "../views/SinglePostView.vue";
import Contact from "@/views/Contact.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'WebDev-X',
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: 'Login | WebDev-X'
        }
    },
    {
        path: '/add-post',
        name: 'AddPost',
        component: AddPost,
        meta: {
            title: 'Add Post | WebDev-X',
            requiresAuth: true
        }
    },
    {
        path: '/post/:id',
        name: 'Post',
        component: SinglePostView,
        meta: {
            title: 'Post | WebDev-X',
            requiresAuth: true
        }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        meta: {
            title: 'Sign Up | WebDev-X'
        }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
        meta: {
            title: 'Contact | WebDev-X'
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'WebDev-X'

    // Check if the route requires authentication
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token')
        if (!token) {
            // Redirect to login page if the user is not authenticated
            next('/login')
            return
        }
    }
    // Otherwise continue to the next route as usual
    next()
})

export default router
