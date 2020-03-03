<template>
    <div>
        <!--<el-dialog-->
                <!--class="dialog-con"-->
                <!--title="入库"-->
                <!--:close-on-press-escape="false"-->
                <!--:close-on-click-modal="false"-->
                <!--width="70%"-->
                <!--:before-close="handleClose"-->
                <!--:visible.sync="visible">-->



            <div>
                <div class="stock-title">
                    <div>操作人：<span>{{this.dataForm.createUserAccount}}-{{this.dataForm.createUserName}}</span></div>
                    <div>入库原因：<span>生产入库</span></div>
                    <div>开始时间：<span>{{startTime}}</span></div>
                </div>
                <div class="stock-alert">
                    <span>入库明细</span>
                    <span class="red"><i class="el-icon-info"></i>请扫描即开票非游戏面的条形码以及游戏面的二维码开始入库</span>
                </div>
                <CodeTable @barcodeInfo="barcodeInfo" @callBackRequestForm="callBackRequestForm" ref="codeTable"></CodeTable>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFormData()" >入库并打印</el-button>
            </span>



        <!--</el-dialog>-->
    </div>

</template>
<script>
    import CodeTable from '../../components/code-table/index'
    export default {
        components: {CodeTable},
        data(){
            return {
                visible:false,
                startTime:'',
                endTime:'',
                dataForm:{
                    createUserId:sessionStorage.getItem('userId'),
                    createUserName:sessionStorage.getItem('name'),
                    createUserAccount:sessionStorage.getItem('account'),
                    type:1,
                    submitStartDate:this.startTime,
                    submitEndDate:this.endTime,
                    prodItemList:[]
                },
                isValidate : false ,//数据是否合法
            }
        },
        methods:{
            /**
             * 根据条形螨获取数据
             */
            barcodeInfo(barcode , callback){
                if(null != barcode && '' != barcode) {
                    let res =  {
                        name:'张涛',
                        barcode:'',
                        qrCode:'',
                        code:'1',
                        faceValue:'1000',
                        saleAmount:'0.01',
                        unitDict:'万元',
                        number:'2'
                    } ;
                    callback(res) ;
                }else{
                    callback(null)
                }
            },
            /**
             * 封装请求数据
             * 请求子组件方法
             */
            requestForm(){
                this.$refs.codeTable.reqForm();
            },
            /**
             * 接受请求数据
             * 子组件调用
             */
            callBackRequestForm(req){
                if(null != req) {
                    if(null != req.prodItemList && req.prodItemList.length >0 ) {
                        this.dataForm.totalTypeNumber = req.totalTypeNumber;
                        this.dataForm.totalUnitNumber  = req.totalUnitNumber;
                        this.dataForm.totalAmount  = req.totalAmount;
                        this.dataForm.prodItemList  = req.prodItemList;
                        this.isValidate = true ;
                    }
                }
            },
            /**
             * 提交请求
             */
            submitFormData(){
                //获取请求数据
                this.requestForm() ;
                if(this.isValidate) {
                    /**
                     * 后续提交请求操作
                     */
                    this.getEndTime();
                    console.log(this.dataForm)
                }else{
                    this.$message({
                        message: '数据合法性校验失败，请核查!',
                        type: 'error'
                    });
                }
            },
            handleClose(){
                this.$confirm(`离开该页面后，当前页面的数据将不会被保存，您确定要离开当前页面吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                }).then(() => {
                    this.visible = false;
                    this.$emit('refreshDataList');
                }).catch(() => {

                })
            },
            // 辅助工具方法
            appendzero(obj) {
                return (obj<10) ?  "0" +""+ obj : obj ;
            },
            getTime(){
                let now = new Date();
                let year = now.getFullYear();
                let month = now.getMonth() +1;
                let date = now.getDate();
                let hour = now.getHours();
                let minute = now.getMinutes();
                let seconds = now.getSeconds();
                this.startTime = year + "年" + this.appendzero(month)  + "月" + this.appendzero(date) + "日 " + this.appendzero(hour) + ':' + this.appendzero(minute) + ":" + this.appendzero(seconds);
            },
            getEndTime(){
                let now = new Date();
                let year = now.getFullYear();
                let month = now.getMonth() +1;
                let date = now.getDate();
                let hour = now.getHours();
                let minute = now.getMinutes();
                let seconds = now.getSeconds();
                this.endTime = year + "年" + this.appendzero(month)  + "月" + this.appendzero(date) + "日 " + this.appendzero(hour) + ':' + this.appendzero(minute) + ":" + this.appendzero(seconds);
            },
        }
    }

</script>
<style scoped>
    .stock-title div{
        display: inline-block;
        font-size: 16px;
        margin-right:30px;
        height:40px;
    }
    .stock-title div span{
        color:#000;
    }
    .stock-alert{
        height:40px;
    }
    .stock-alert{
        color:#000;
        font-size: 16px;
    }
    .stock-alert span{
        margin-right:30px;
    }
</style>
