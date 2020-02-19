
require('./bootstrap');

window.Vue = require('vue');
//
import vuetify from "./vuetify"
import router from "./router"
// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

//Vue.component('example-component', require('./components/ExampleComponent.vue').default);
import App from './components/AppComponent';
new Vue({
  el:'#app',
  router,
  vuetify,
  components:{
    'App':App
  }

});
