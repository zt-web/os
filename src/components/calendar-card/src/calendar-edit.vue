<template>
    <el-dialog
        title="日历排班"
        :close-on-click-modal="false"
        :visible.sync="visible"
    >
        <el-input v-model="data"></el-input>
        <el-checkbox-group v-model="checkList1">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="禁用" disabled></el-checkbox>
            <el-checkbox label="选中且禁用" disabled></el-checkbox>
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
                data:'',
                checkList1: ['选中且禁用','复选框 A'],
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
