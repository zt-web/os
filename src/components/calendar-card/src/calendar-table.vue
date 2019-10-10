<script>
import fecha from 'element-ui/src/utils/date';
import { range as rangeArr, getFirstDayOfMonth, getPrevMonthLastDays, getMonthDays, getI18nSettings, validateRangeInOneMonth } from 'element-ui/src/utils/date-util';

export default {
  props: {
    selectedDay: String, // formated date yyyy-MM-dd
    range: {
      type: Array,
      validator(val) {
        if (!(val && val.length)) return true;
        const [start, end] = val;
        return validateRangeInOneMonth(start, end);
      }
    },
    tabList:{
        type: Array ,
        default: () => []
    },
    date: Date,
    hideHeader: Boolean,
    firstDayOfWeek: Number
  },

  inject: ['elCalendar'],

  data() {
    return {
      WEEK_DAYS: getI18nSettings().dayNames
    };
  },

  methods: {
    toNestedArr(days) {
      return rangeArr(days.length / 7).map((_, index) => {
        const start = index * 7;
        return days.slice(start, start + 7);
      });
    },

    getFormateDate(day, type) {
      if (!day || ['prev', 'current', 'next'].indexOf(type) === -1) {
        throw new Error('invalid day or type');
      }
      let prefix = this.curMonthDatePrefix;
      if (type === 'prev') {
        prefix = this.prevMonthDatePrefix;
      } else if (type === 'next') {
        prefix = this.nextMonthDatePrefix;
      }
      day = `00${day}`.slice(-2);
      return `${prefix}-${day}`;
    },

    getCellClass({ text, type}) {
      const classes = [type];
      if (type === 'current') {
        const date = this.getFormateDate(text, type);
        if (date === this.selectedDay) {
          classes.push('is-selected');
        }
        if (date === this.formatedToday) {
          classes.push('is-today');
        }
      }
      return classes;
    },

    pickDay({ text, type,data }) {
      const date = this.getFormateDate(text, type);
      this.$emit('pick', date , data);
    },

    cellRenderProxy({ text, type }) {
      let render = this.elCalendar.$scopedSlots.dateCell;
      if (!render) return <span>{ text }</span>;

      const day = this.getFormateDate(text, type);
      const date = new Date(day);
      const data = {
        isSelected: this.selectedDay === day,
        type: `${type}-month`,
        day
      };
      return render({ date, data });
    }
  },

  computed: {
    prevMonthDatePrefix() {
      const temp = new Date(this.date.getTime());
      temp.setDate(0);
      return fecha.format(temp, 'yyyy-MM');
    },

    curMonthDatePrefix() {
      return fecha.format(this.date, 'yyyy-MM');
    },

    nextMonthDatePrefix() {
      const temp = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
      return fecha.format(temp, 'yyyy-MM');
    },

    formatedToday() {
      return this.elCalendar.formatedToday;
    },

    isInRange() {
      return this.range && this.range.length;
    },
    rows() {
      let days = [];
      // if range exists, should render days in range.
     //设置当前年月   匹配日期数据填充
      let current_year = '';
      let current_month = '' ;
      // let that = this ;
      if (this.isInRange) {
        const [start, end] = this.range;
        const currentMonthRange = rangeArr(end.getDate() - start.getDate() + 1).map((_, index) => ({
          text: start.getDate() + index,
          type: 'current',
        }));
        let remaining = currentMonthRange.length % 7;
        remaining = remaining === 0 ? 0 : 7 - remaining;
        const nextMonthRange = rangeArr(remaining).map((_, index) => ({
          text: index + 1,
          type: 'next'
        }));
        days = currentMonthRange.concat(nextMonthRange);
      } else {
        const date = this.date;
        current_year = (date instanceof Date ? fecha.format(date, 'yyyy-MM-dd'): fecha.format(new Date(date), 'yyyy-MM-dd')).split('-')[0];
        current_month = (date instanceof Date ? fecha.format(date, 'yyyy-MM-dd'): fecha.format(new Date(date), 'yyyy-MM-dd')).split('-')[1];
        let firstDay = getFirstDayOfMonth(date);
        firstDay = firstDay === 0 ? 7 : firstDay;
        const firstDayOfWeek = typeof this.firstDayOfWeek === 'number' ? this.firstDayOfWeek : 1;
        let that = this ;

          const prevMonthDays = getPrevMonthLastDays(date, firstDay - firstDayOfWeek).map(function(day) {
              let data = '';
              // let d = ((new Number(current_year) > 1 ? current_year : new Number(current_year) -1) + '-' + (new Number(current_year) > 1 ? (new Number(current_month) -1) : 12 ) + '-' + day) ;
              let d = current_year + '-' + current_month + '-' + day ;
                  try{
                      that.tabList.forEach(function(_d) {
                              if (_d.date === fecha.format(new Date(d), 'yyyy-MM-dd')) {
                                  data =  _d.data;
                                  throw new Error("终止循环_忽略");
                              }
                          }
                      ) ;
                  }catch (e) {
                     if(e.message != "终止循环_忽略") throw e ;
                  }
                  return {
                      text: day,
                      type: 'prev',
                      data : data

                  }
              });
        const currentMonthDays = getMonthDays(date).map(function(day){
            let data = '';
            let d = current_year + '-' + current_month + '-' + day ;
            try{
                that.tabList.forEach(function(_d) {
                        if (_d.date === fecha.format(new Date(d), 'yyyy-MM-dd')) {
                            data =  _d.data;
                            throw new Error("终止循环_忽略");
                        }
                    }
                ) ;
            }catch (e) {
                if(e.message != "终止循环_忽略") throw e ;
            }
          return {
              text: day,
              type: 'current',
              data:data
          }
        });
        days = [...prevMonthDays, ...currentMonthDays];
          const nextMonthDays = rangeArr(42 - days.length).map(function(_, index){
              let data = '';
              // let d =((new Number(current_month) < 12 ? current_year : new Number(current_year) + 1 ) + '-' + (new Number(current_month) < 12 ? new Number(current_month) + 1 : 1) + '-' + (index+1));
              let d = current_year + '-' + current_month + '-' + (index+1) ;
              try{
                  that.tabList.forEach(function(_d) {
                          if (_d.date === fecha.format(new Date(d), 'yyyy-MM-dd')) {
                              data =  _d.data;
                              throw new Error("终止循环_忽略");
                          }
                      }
                  ) ;
              }catch (e) {
                  if(e.message != "终止循环_忽略") throw e ;
              }
              return {
                  text: index + 1,
                  type: 'next',
                  data:data
              }
          });
        days = days.concat(nextMonthDays);
      }
      return this.toNestedArr(days);
    },

    weekDays() {
      const start = this.firstDayOfWeek;
      const { WEEK_DAYS } = this;

      if (typeof start !== 'number' || start === 0) {
        return WEEK_DAYS.slice();
      } else {
        return WEEK_DAYS.slice(start).concat(WEEK_DAYS.slice(0, start));
      }
    }
  },

  render() {
    const thead = this.hideHeader ? null : (<thead>
      {
        this.weekDays.map(day => <th key={day}>{ day }</th>)
      }
    </thead>);
    return (
      <table
        class={{
          'calendar-card-table': true,
          'is-range': this.isInRange
        }}
        cellspacing="0"
        cellpadding="0">
        {
          thead
        }
        <tbody>
          {
            this.rows.map((row, index) => <tr
              class={{
                'calendar-card-table__row': true,
                'calendar-card-table__row--hide-border': index === 0 && this.hideHeader
              }}
              key={index}>
              {
                row.map((cell, key) => <td key={key}
                  class={ this.getCellClass(cell) }
                  onClick={this.pickDay.bind(this, cell,cell.data)}>
                  <div class="calendar-card_td">
                  <div class="calendar-card-day">
                      {
                          this.cellRenderProxy(cell)
                      }
                  </div>
                  <div class="calendar-card-day_data">
                      {
                          cell.data
                      }
                  </div>
                  </div>
                </td>)
              }
            </tr>)
          }
        </tbody>
      </table>);
  }
};
</script>
