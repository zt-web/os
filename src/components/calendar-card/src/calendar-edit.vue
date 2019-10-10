<template>
    <el-dialog
        title="日历排班"
        :close-on-click-modal="false"
        :visible.sync="visible"
        width="30%"
    >
        <el-checkbox-group v-model="nameCheck">
            <el-checkbox v-for="item in checkList" :key="item.id" :label="item.name" @change="changeCheck">{{item.name}}</el-checkbox>
        </el-checkbox-group>
    <el-button @click="refresh()">设置</el-button>
    </el-dialog>
</template>

<script>
    export default {
        name: "calendar-edit",
        data(){
            return {
                visible:false,
                day:'',
                nameCheck:[],
                checkList: [
                    {id:1,name:'田丽姝'},
                    {id:2,name:'田大妞'},
                    {id:3,name:'田二妞'},
                    {id:4,name:'小可爱'},
                    {id:5,name:'可可爱爱'},
                    {id:6,name:'傻涛'}
                ],
            }
        },
        methods:{
            init(day , data){
                console.log(day,data);
                this.visible = true;
                this.day = day ;
                this.nameCheck = data;
            },
            refresh(){
                this.visible = false;
                this.$emit('refreshData')
            },
            changeCheck(){
                console.log(this.nameCheck);
            },
        }
    }
</script>

<style scoped>

</style>
