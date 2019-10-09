import Vue from 'vue'

import {
    Button,
    ButtonGroup,
    Dialog,
    Input,
    Loading,
    MessageBox,
    Message,
    Notification,
    Row,
    Col,
    Checkbox,
    CheckboxGroup,
} from 'element-ui'

Vue.use(Dialog)
Vue.use(Loading.directive)
Vue.use(Button)
Vue.use(Input)
Vue.use(ButtonGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
