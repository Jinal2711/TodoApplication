import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Navigation from '@/components/navigation'

import TodoApp from '@/components/todoApp'
import Calculator from '@/components/calculator'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'navigation',
      component: Navigation
    },
    {
      path: '/todo',
      name: 'todo-app',
      component: TodoApp
    },
    {
      path: '/calculator',
      name: 'calcy',
      component: Calculator
    }
  ]
})
