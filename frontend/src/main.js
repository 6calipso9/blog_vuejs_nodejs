import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from "vue-resource"

Vue.config.productionTip = false
Vue.use(VueResource);
Vue.http.headers.common['Authorization'] = localStorage.getItem('jwt');
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
