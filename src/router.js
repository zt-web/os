import Vue  from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Demo from './views/demos/demo'
import Codes from './views/tables/codeTable'

export default new Router({
    routes:[
        {path:'/demo',component:Demo,name:'demo'},
        {path:'/codes',component:Codes,name:'codes'}

    ]
})


