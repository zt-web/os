import CodeTable from './src/main';
CodeTable.install = function(Vue) {
    Vue.component(CodeTable.name, CodeTable);
};

export default CodeTable;
