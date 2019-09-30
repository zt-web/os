import Vue  from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Demo from './views/demos/demo'
import Calendar from './views/calendar/index'

export default new Router({
    routes:[
        {path:'/demo',component:Demo,name:'demo'},
        {path:'/calendar',component:Calendar,name:'calendar' }
    ]
})


