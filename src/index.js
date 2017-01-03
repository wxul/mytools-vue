import Vue from 'vue';
import router from './router/router';
import App from './views/app';
import EUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'

Vue.use(EUI);
Vue.config.debug = true;

const app = new Vue({
    router:router,
    render: h => h(App)
}).$mount("#app");

console.log("app start!");