import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import AddPost from '../views/AddPost.vue'
import Signup from "../views/Signup.vue"
import SinglePostView from "../views/SinglePostView.vue";
import Contact from "../views/Contact.vue";
import { jwtDecode } from 'jwt-decode';




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
        path: '/posts/:id',
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

router.beforeEach(async (to, from, next) => {
    // Check if the route requires authentication
    const token = localStorage.getItem('token')

    const publicPaths = ['/login', '/signup', '/contact'];

    if (to.meta.requiresAuth) {
        if (!token) {
            // If the user is not authenticated, allow only public paths
            if (publicPaths.includes(to.path)) {
                next();
            } else {
                next('/login'); // Redirect unauthenticated users to login
            }
            return;
        }

        if (to.path === '/login' || to.path === '/signup') {
            next('/'); // Redirect authenticated users to the home page
            return;
        }
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                // Token expired
                localStorage.removeItem('token');
                next('/login');
                return;
            }
        } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem('token');
            next('/login');
            return;
        }
    }
    next()
})

export default router
