<template>
    <el-dialog
        title="日历排班"
        :close-on-click-modal="false"
        :visible.sync="visible"
    >
    <el-input v-model="data"></el-input>
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
                data:'',
            }
        },
        methods:{
            init(day , data){
                this.visible = true
                this.day = day ;
                this.data = data;
            },
            refresh(){
                this.visible = false;
                this.$emit('refreshData')
            },
        }
    }
</script>

<style scoped>

</style>
