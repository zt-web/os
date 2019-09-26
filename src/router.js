import Vue  from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Demo from './views/demos/demo'

export default new Router({
    routes:[
        {path:'/demo',component:Demo,name:'demo'}

    ]
})


