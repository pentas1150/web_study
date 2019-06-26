import Vue from 'vue'
import Router from 'vue-router'

import Navigation from '../src/components/Navigation'
import PostList from '../src/components/PostList'
import Content from '../src/components/Content'
import Sidebar from '../src/components/Sidebar'
import Footer from '../src/components/Footer'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: PostList, 
        },
        {
            name: 'Post',
            path: '/post/:id?',
            component: Content,
            props: true,
        },
    ]
})