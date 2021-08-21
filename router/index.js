import VueRouter from "vue-router"

import App from '../src/App.vue'
import bar from '../src/components/bar.vue'
import table from '../src/components/bar.vue'
import menu from '../src/components/menu.vue'

export default new VueRouter({
    routes: [
        {
          path: '/',
          name: 'App',
          component: App
        },
        {
          path: '/table',
          name: 'bar',
          component: bar
        },
        {
          path: '/table/:id',
          name: 'table',
          component: table
        },
        {
          path: '/menu',
          name: 'Menu',
          component: menu
        },
    ]
  })