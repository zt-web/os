<template>
    <div>
        <div class="table">
            <el-form :rules="rules" ref="dataForm" :model="dataForm">
                <el-table
                        border
                        style="width:100%"
                        :data="dataForm.tableList">
                    <el-table-column
                            type="index"
                            header-align="center"
                            align="center"
                            width="60"
                            label="序号">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            header-align="center"
                            align="center"
                            label="名称">
                    </el-table-column>
                    <el-table-column
                            prop="barcode"
                            header-align="center"
                            align="center"
                            width="180"
                            label="条形码">
                        <template slot-scope="scope">
                            <el-form-item :prop="`tableList.${scope.$index}.barcode`" :rules="rules.barcode" class="ml0">
                                <el-input v-model="scope.row.barcode" placeholder="扫码或输入" @blur="addRow(scope.row.barcode,scope.row.qrCode , scope.$index)" @change="onBarcodeInfo(scope.row.barcode,scope.row.qrCode , scope.$index)"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="qrCode"
                            header-align="center"
                            align="center"
                            width="180"
                            label="二维码">
                        <template slot-scope="scope">
                            <el-form-item :prop="`tableList.${scope.$index}.qrCode`" :rules="rules.qrCode" class="ml0">
                                <el-input v-model="scope.row.qrCode" placeholder="扫码或输入" @blur="addRow(scope.row.barcode,scope.row.qrCode , scope.$index)"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            header-align="center"
                            align="center"
                            label="编号">
                    </el-table-column>
                    <el-table-column
                            prop="faceValue"
                            header-align="center"
                            align="center"
                            label="面值">
                    </el-table-column>
                    <el-table-column
                            prop="saleAmount"
                            header-align="center"
                            align="center"
                            width="180"
                            label="价格(元/本)">
                    </el-table-column>
                    <el-table-column
                            prop="unitDict"
                            header-align="center"
                            align="center"
                            label="单位">
                    </el-table-column>
                    <el-table-column
                            prop="number"
                            header-align="center"
                            align="center"
                            label="数量">
                    </el-table-column>
                </el-table>
            </el-form>
        </div>
        <div class="stock-total">
            <span>合计种类(种)：{{this.dataForm.totalTypeNumber}}</span>
            <span>合计数量(本)：{{this.dataForm.totalUnitNumber}}</span>
            <span>合计金额(元)：{{this.dataForm.totalAmount}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'CustomTable',
        data(){
            /**
             * 二维码重复校验
             */
            const qrCodeRepeatvVlidate = (rule,value,callback) => {
                (! this.repeatvVlidate(value))?callback("二维码重复"):callback() ;
            };
            return {
                props:{
                    /**
                     * barcode 获取数据函数
                     */
                    // barcodeInfo:Function
                },
                /**
                 * 验证
                 */
                rules:{
                    barcode:[{required: true, message: '条形码必填',trigger: 'blur'}],
                    qrCode:[{required: true, message: '二维码必填',trigger: 'blur'}, {validator:qrCodeRepeatvVlidate, trigger: 'blur'}],
                },
                dataForm:{
                    createUserId:sessionStorage.getItem('userId'),
                    createUserName:sessionStorage.getItem('name'),
                    createUserAccount:sessionStorage.getItem('account'),
                    type:1,
                    totalTypeNumber:0,
                    totalUnitNumber:0,
                    totalAmount:0.00,
                    tableList:[
                        {
                            barcode:'',
                            qrCode:'',
                        }
                    ],
                },
            }
        },
        methods:{
            /**
             * 根据条形码获取数据信息
             * @param barcode
             * @param qrCode
             * @param index
             */
            onBarcodeInfo(barcode , qrCode , index){
                if(null === barcode || '' === barcode) {
                    if(index != this.dataForm.tableList.length -1) {
                        let _last = this.dataForm.tableList[this.dataForm.tableList.length -1];
                        if((null == _last.barcode || '' == _last.barcode) &&
                            (null == _last.qrCode || '' == _last.qrCode)) {
                            this.dataForm.tableList.pop();
                        }
                    }
                }
                /**
                 * barCode信息返回值
                 */
                let res ;
                this.$emit('barcodeInfo',barcode , val => {res = val});
                // this.dataForm.tableList.splice(index,1);
                if(res && null != res && '' != res) {
                    if(null != qrCode && '' != qrCode) {
                        res.qrCode = qrCode ;
                    }
                    res.barcode = barcode ;
                    this.dataForm.tableList.splice(index,1,res);
                }else{
                    res ={
                        barcode:barcode,
                        qrCode:qrCode,
                    };
                    this.dataForm.tableList.splice(index,1,res);
                }
                let price = 0;
                let hash ={};
                const temp = this.dataForm.tableList.reduce((perVal,curVal) => {
                    hash[curVal.id] ? '' :hash[curVal.id] = true && perVal.push(curVal);
                    return perVal;
                },[]);
                this.dataForm.totalTypeNumber = temp.length;
                //确定数量事列表数据数？
                this.dataForm.totalUnitNumber = this.dataForm.tableList.length;
                for(var i = 0;i < this.dataForm.tableList.length;i++){
                    price += Number(this.dataForm.tableList[i].saleAmount);
                }
                this.dataForm.totalAmount = price.toFixed(2);
            },
            /**
             * 添加新行
             * @param barcode
             * @param qrCode
             * @param index
             */
            addRow(barcode , qrCode , index){
                //判断当前是否为最后一行
                if(index == this.dataForm.tableList.length -1) {
                    //验证数据合法性
                    if(this.validate(barcode , qrCode)) {
                        this.dataForm.tableList.push({
                            barcode:'',
                            qrCode:''
                        }) ;
                    }
                }
            },
            /**
             * 封装请求数据
             */
            reqForm(){
                let _list = [] ;
                this.dataForm.tableList.forEach((n) => {
                   if(n.barcode != null && n.barcode != '' && n.qrCode != null && n.qrCode != '') {
                       _list.push(n) ;
                   }
                });
                let req = {
                    totalTypeNumber: this.dataForm.totalTypeNumber,
                    totalUnitNumber: this.dataForm.totalUnitNumber,
                    totalAmount: this.dataForm.totalAmount,
                    prodItemList: _list
                } ;
                this.$emit('callBackRequestForm',req);
            },
            /**
             * 数据合法性校验
             * @param rowData
             */
            validate(barcode,qrcode){
                //校验数据完整性
                if(barcode == null || barcode == ''
                    || qrcode == null || qrcode == ''){
                    return false ;
                }
                //校验二维码是否重复
                if(!this.repeatvVlidate(qrcode)) {
                    return false ;
                }

                return true ;
            },
            /**
             * 二维码重复校验
             * @param qrCode
             */
            repeatvVlidate(qrCode){
                let count = 0 ;
                this.dataForm.tableList.forEach((n) => {
                    if(qrCode === n.qrCode) {
                        count++ ;
                    }
                });
                return (count > 1)?false:true ;
            },

        },
        created(){
            if(this.dataForm.tableList.length <= 0 ){
                this.dataForm.tableList = [
                    {
                        barcode:'',
                        qrCode:''
                    }
                ] ;
            }
        }
    }
</script>
<style>
    .table .el-table .el-form-item.ml0{
        margin-bottom:0!important;
        height: 60px;
    }
</style>
<style scoped>
    .table .el-table{
        height:454px;
        overflow-y: overlay;
    }
    .table .el-table .el-form-item{
        margin-bottom:16px;
    }
    .stock-total{
        height:50px;
        line-height: 50px;
        border:1px solid #EBEEF5;
        border-top:none;
        text-align: right;
        color:#000;
        font-size:16px;
    }
    .stock-total span{
        margin-left:80px;
        margin-right:20px;
    }
</style>
