import CalendarCard from './src/main';
CalendarCard.install = function(Vue) {
    Vue.component(CalendarCard.name, CalendarCard);
};

export default CalendarCard;
