/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

var Vue = require('vue')
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');

Vue.use(VueRouter)
Vue.use(VueResource)

import Home from './components/Home.vue'
import CommentBox from './components/CommentBox.vue'

const routes = [
    { path: '/', component: Home },
    {
        path: '/comment',
        component: CommentBox,
        // children: [{
        //     path: 'detail',
        //     component: CommentDetail
        // }]
    }
]
var router = new VueRouter({
    routes: routes,
    //mode: 'history',
})

const app = new Vue({ router }).$mount('#app')