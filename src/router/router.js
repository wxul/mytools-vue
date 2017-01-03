import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';

Vue.use(Router);
Vue.use(Resource);

var router = new Router({

    routes: [{
        path: '/',
        component: (resolve) => {
            require(['../views/other/404.vue'], resolve)
        }
    }, {
        path: '/hash',
        component: (resolve) => {
            require(['../views/hash/index.vue'], resolve)
        },
        children: [{
            path: 'txt',
            component: (resolve) => {
                require(['../views/hash/txt.vue'], resolve)
            }
        }]
    },{
        path: '/js',
        component: (resolve) => {
            require(['../views/js/index.vue'], resolve)
        },
        children: [{
            path: 'txt',
            component: (resolve) => {
                require(['../views/js/txt.vue'], resolve)
            }
        },{
            path: 'file',
            component: (resolve) => {
                require(['../views/js/file.vue'], resolve)
            }
        }]
    }]
});

export default router;