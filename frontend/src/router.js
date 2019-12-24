import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/views/Home';
import AboutComponent from '@/views/About';
import EditComponent from '@/components/post/Edit';
import CreateComponent from '@/components/post/Create';
import PostComponent from '@/components/post/Post';
import UserRegister from '@/components/user/Register';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: { name: 'home' } },
    { path: '/home', name: 'home', component: HomeComponent },
    { path: '/about', name: 'about', component: AboutComponent },
    { path: '/create', name: 'Create', component: CreateComponent },
    { path: '/edit/:id', name: 'Edit', component: EditComponent },
    { path: '/post/:id', name: 'Post', component: PostComponent },
    { path: '/register', name: 'Register', component: UserRegister }
  ]
});