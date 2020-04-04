import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Selector from '@/components/Selector'
import Confirm from '@/components/Confirm'
import Histories from '@/components/Histories'
import History from '@/components/History'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/select',
      name: 'select',
      component: Selector
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm
    },
    {
      path: '/histories',
      name: 'histories',
      component: Histories
    },
    {
      path: '/history/:hash',
      name: 'history',
      component: History
    }
  ]
})
