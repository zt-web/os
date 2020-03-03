<template>
    <div>
        <calendar
                height="800px"
                width="800px"
                :show-festival="false"
                :show-term="false"
                :show-lunar="false"
                :tabList="tabList"
                @date-click="dataClick"

        />
    </div>
</template>

<script>
    import Calendar from 'himmas-vue-calendar'
    export default {
        name: 'App',
        data(){
            return{
                tabList:[],
            }
        },
        components:{Calendar},
        methods:{
            dataClick(date){
                console.log(date);
            },
            renderContent(h, data) {
                console.log(h,data)
                // var {isToday,isWeekend,isOtherMonthDay, year, day, month, renderYear, renderMonth, lunar, weekDay, festival, term} = data;
                //
                // // lunar对象中存有农历数据
                // this.lunarDayChiness = lunar;
                //
                // //第二行展示的数据的优先级为 节日>节气>农历日
                // var secondInfo = festival ? festival : (term ? term : (this.lunarDayChiness || ''));
                //
                // var dateStr = `${year}-${this.twoDigit(month)}-${this.twoDigit(day)}`;
                //
                // var isHoliday = (!!~this.holiday.indexOf(dateStr)) || isWeekend;
                //
                // return h('div', {
                //     class: {
                //         'date-box': true,
                //         'today':isToday,
                //         'weekend':isWeekend,
                //         'holiday':isHoliday,
                //         'other-month':isOtherMonthDay,
                //         'renderMonth':renderMonth
                //     }
                // }, [h('div',{
                //     class: {
                //         'first-info': true
                //     }
                // },day),h('div',{
                //     class: {
                //         'second-info': true,
                //         'festival':festival
                //     }
                // },secondInfo),h('div',{
                //     class: {
                //         'sign': true
                //     }
                // },'休')])
            },
            beforeRender(year,month,next){
                console.log('before-render',year,month);
                next()
            },
            changeHandle(year,month){
                console.log('change',year,month)
            }
        }
    }
</script>

<style scoped>

</style>