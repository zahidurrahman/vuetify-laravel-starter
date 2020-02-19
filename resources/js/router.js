import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import AdminComponent from './components/AdminComponent';
import RolesComponent from './components/RolesComponent';

// const foo={template:"<v-alert type='error'>I am  Foo component</v-alert>"}
// const bar={template:"<v-alert type='error'>I am  Bar component</v-alert>"}
// const user={template:"<v-alert type='info'>I am  Bar {{$route.params.name}}</v-alert>"}
Vue.use(VueRouter)
const routes=[
  //  { path: '/user', component: require('./components/User.vue') }
  {path:'/',
  redirect:'/login',
},
{
  path:'/login',
  component:LoginComponent,
  name:'Login'
},
{
  path:'/register',
  component:RegisterComponent,
  name:'Register'
},
{
  path:'/admin',
  component:AdminComponent,
  name:'Admin',
  children:[
    {
      path:'roles',
      component:RolesComponent,
      name:'Roles',
    }
  ],
  beforeEnter:(to,from,next)=>{
    if(localStorage.getItem('token')){
      next();
    }else{
      next('/login');
    }

  }//end of beforeEnter
}

]
const router=new VueRouter({routes})
router.beforeEach((to,from,next)=>{
  const token=localStorage.getItem('token')|| null
  window.axios.defaults.headers['Authorization'] = "Bearer " + token;
  next();

})

export default router
