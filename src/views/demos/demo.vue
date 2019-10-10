<template>
   <div>
       <el-row>
           <el-col :span="20">
               <CalendarCard :tabList="tabList" :ifEdit="true" @refreshData="refreshData"></CalendarCard>
           </el-col>
<!--           <el-col :span="4">-->
<!--               <el-button type="primary" @click="set()">设置值班</el-button>-->
<!--           </el-col>-->
       </el-row>
       <Calendar-Edit ref="CalendarEdit" @refreshData="refreshData"></Calendar-Edit>
   </div>
</template>

<script>
    import CalendarCard from '../../components/calendar-card/index'
    import CalendarEdit from '../../components/calendar-card/src/calendar-edit'

    export default {
        data(){
            return {
                tabList:[],
            }
        },
        components:{CalendarCard,CalendarEdit},
        methods:{
            refreshData(){
                this.tabList = [] ;
            },
            // set(){
            //     this.$nextTick(()=> {
            //         this.$refs.CalendarEdit.init();
            //     })
            // },
            init(){
                this.tabList = [];
                this.tabList.push({
                    date:'2019-10-26',
                    data:'傻涛'
                    // data:['你三大爷','你四大爷','你五大爷'],
                });
                this.tabList.push({
                    date:'2019-10-27',
                    data:'可可爱爱',
                });
                this.tabList.push({
                    date:'2019-10-05',
                    data:'你二大爷',
                });
            },

        },
        created(){
            this.init();
        }

    }
</script>

<style scoped>

</style>
