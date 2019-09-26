<template>
    <CalendarCard :tabList="tabList" :ifEdit="false" @refreshData="refreshData"></CalendarCard>
</template>

<script>
    import CalendarCard from '../../components/calendar-card/index'
    export default {
        components:{CalendarCard},
        data(){
            return {
                tabList:[],
            }
        },
        methods:{
            refreshData(){
                this.tabList = [] ;
            },
            init(){
                this.tabList = [];
                this.tabList.push({
                    date:'2019-08-26',
                    data:'你三大爷',
                });
                this.tabList.push({
                    date:'2019-09-19',
                    data:'你大爷',
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
