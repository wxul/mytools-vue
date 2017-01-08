import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';

Vue.use(Router);
Vue.use(Resource);

var router = new Router({

    routes: [{
        path: '/',
        component: (resolve) => {
            require(['../views/index.vue'], resolve)
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
    },{
        path: '/qr',
        component: (resolve) => {
            require(['../views/qrcode/index.vue'], resolve)
        },
        children: [{
            path: 'decode',
            component: (resolve) => {
                require(['../views/qrcode/decode.vue'], resolve)
            }
        },{
            path: 'code',
            component: (resolve) => {
                require(['../views/qrcode/code.vue'], resolve)
            }
        }]
    }]
});

export default router;