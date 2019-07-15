<template>
  <div id="app">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>申报扣税</span>
      </div>
      <el-form ref="form" :inline="true" size="mini" :model="form" label-width="96px">
        <el-form-item label="征收机关代码" prop="collectingoffice">
          <el-input v-model="form.collectingoffice"></el-input>
        </el-form-item>
        <el-form-item label="纳税人编码" prop="taxpayer">
          <el-input v-model="form.taxpayer"></el-input>
        </el-form-item>
        <el-form-item label="申报序号" prop="declarationid">
          <el-input v-model="form.declarationid"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  size="mini" @click="handleGetTax">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- <el-form ref="resultForm" :inline="true" size="mini" :model="resultForm" label-width="96px">
        <el-form-item label="征收机关名称">
          <el-input v-model="resultForm.txname" disabled></el-input>
        </el-form-item>
        <el-form-item label="总笔数">
          <el-input v-model="resultForm.tCount" disabled></el-input>
        </el-form-item>
        <el-form-item label="总金额">
          <el-input v-model="resultForm.tAmount" disabled></el-input>
        </el-form-item>
      </el-form> -->

      <el-table :data="list" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" class="tableClass" size="mini">
        <el-table-column type="index" width="70px" label="项目序号">
        </el-table-column><el-table-column prop="proofid" label="凭证序号" sortable show-overflow-tooltip>
        </el-table-column><el-table-column prop="prooftype" label="凭证种类" sortable show-overflow-tooltip>
        </el-table-column><el-table-column prop="project" label="征收项目" sortable>
        </el-table-column><el-table-column prop="item" label="征收品目" sortable>
        </el-table-column><el-table-column prop="taxvalue" label="税额" sortable>
        </el-table-column><el-table-column prop="generationdate" label="所属日期 " sortable>
        </el-table-column><el-table-column prop="closingdate" label="截止日期 " sortable>
        </el-table-column><el-table-column prop="durationpayment" label="缴款日期 " sortable>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-button  @click="dialogFormVisible=true" size="mini">发起扣税</el-button>
        <el-button  @click="nodeTest" size="mini">node测试</el-button>
        <!-- <el-pagination
          background
          small
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="5"
          :total="total" style="float:right">
        </el-pagination> -->
      </el-col>
    </el-card>

    <el-dialog title="发起扣税" :visible.sync="dialogFormVisible">
      <el-form ref="payForm" :model="payForm" label-width="96px">
        <el-form-item label="付款账号" prop="pyerac">
          <el-input type="text" v-model="payForm.pyerac"></el-input>
        </el-form-item>
        <el-form-item label="支付密码" prop="pypsd">
          <el-input type="password" v-model="payForm.pypsd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
          <el-button @click="handleCancel('payForm')" >取消</el-button>
          <el-button @click="resetForm('payForm')" >重置</el-button>
          <el-button @click="submitForm('payForm')" :loading="submitting">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getList,taxStatus,save,check } from "../api.js";
export default {
  name: 'page1',
  data() {
    return {
      activeName: 'first',
      form:{
          "collectingoffice":"",
          "taxpayer":"",
          "declarationid":"",
      },
      // resultForm:{},
      listLoading:false,
      list:[],
      // page:1,
      // total:0,
      dialogFormVisible:false,
      payForm:{
        "pyerac":"",
        "pypsd":""
      },
      submitting:false,
    }
  },
  create(){
  },
  methods: {
    nodeTest(){
      let date=new Date();
      let s2091={
        "data":{
          "protoId": "2091", //4个id
          "data":{
            "fcbpdt": "nodetest",
            "fcbpsq": "nodetest",
            "tipssq": "nodetest",
            "tranam": "nodetest",
            "pyerac": "nodetest",
            "pyerna": "nodetest",
            "txcode": "nodetest",
            "txutid": "nodetest",
          }
        }
      }
      check().then(res=>{
        console.log(res);
      })
    },
    handleGetTax(){
      let date=new Date();
      //
      let s2091={
        "data":{
          "protoId": "2091", //4个id
          "data":{
            "fcbpdt": date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
            "fcbpsq": "",//流水
            "tipssq": this.form.declarationid,//申报序号
            "tranam": "",//金额
            "pyerac": "",//账户
            "pyerna": "",//名称
            "txcode": this.form.collectingoffice,//机关编码
            "txutid": this.form.taxpayer,//纳税人编码
          }
        }
      }
      save(s2091).then(res=>{
        let {code,msg,data}=res.data
          if(code==200){
            console.log("2091数据库记录成功")
          }
      })

      let params={
        "data":{
          "protoId": "2091",
          "declarationInfo":{
            "collectingoffice":this.form.collectingoffice,
            "taxpayer":this.form.taxpayer,
            "declarationid" :this.form.declarationid
          }
        }
      }
      this.listLoading=true

      getList(params).then(res=>{
        let {msg,code,list}=res.data
        if(code==200){
          this.list=list
          // this.total=data.totalCount
          // this.resultForm=data.form
          // 录入数据库
          let s1009={
            "data":{
              "protoId": "1009", //4个id
              "data":{
                "fcbpdt": date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
                "fcbpsq": "",
                "tipssq": this.form.declarationid,
                "tranam": list.taxvalue,
                "pyerac": "",//账户
                "pyerna": "",//名称
                "txcode": this.form.collectingoffice,//机关编码
                "txutid": this.form.taxpayer,//纳税人编码
              }
            }
          }
          save(s1009).then(res=>{
            let {code,msg,data}=res.data
            if(code==200){
              console.log("1009数据库记录成功")
            }
          })

        }else{
          this.$message.error(msg)
        }
        this.listLoading=false
      })
    },
    // handleCurrentChange(val){
    //   this.page=val
    // },
    handleCancel(form){
      this.resetForm(form)
      this.dialogFormVisible=false
    },
    resetForm(form){
      this.$refs[form].resetFields()
    },
    submitForm(form){
      let date=new Date();
      //
      let s2090={
        "data":{
          "protoId": "2090", //4个id
          "data":{
            "fcbpdt": date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
            "fcbpsq": "",
            "tipssq": this.form.declarationid,
            "tranam": this.list.taxvalue,
            "pyerac": this.list.taxvalue,//账户
            "pyerna": "",//名称
            "txcode": this.form.collectingoffice,//机关编码
            "txutid": this.form.taxpayer,//纳税人编码
          }
        }
      }
      save(s2090).then(res=>{
        let {code,msg,data}=res.data
        if(code==200){
          console.log("2090数据库记录成功")
        }
      })
      //
      let params={
        "data":{
          "protoId": "2090",
          "personaldt":{
              "pyerac": "",
              "pypsd": "",
          }
        }
      }
      this.submitting = true
      taxStatus(params).then(res=>{
        let {msg,code,data}=res.data
        // let data=res.data.data
        if(code==200){
          this.submitting=false
          this.$message.success("缴税成功")
          this.resetForm("form")
          // this.resultForm={}
          this.resetForm(form)
          this.dialogFormVisible = false
          //清空列表
          this.list=[]
          //this.total=0
          //录入数据库
          let s1008={
            "data":{
              "protoId": "1008", //4个id
              "data":{
                "fcbpdt": date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
                "fcbpsq": "",
                "tipssq": this.form.declarationid,
                "tranam": this.list.taxvalue,
                "pyerac": this.list.taxvalue,//账户
                "pyerna": "",//名称
                "txcode": this.form.collectingoffice,//机关编码
                "txutid": this.form.taxpayer,//纳税人编码
              }
            }
          }
          save(s1008).then(res=>{
            let {code,msg,data}=res.data
            if(code==200){
              console.log("1008数据库记录成功")
            }
          })
        }else{
          this.submitting=false
          this.$message.error(msg)
        }
      })
    },
  }
}
</script>

<style>
/*.el-input.is-disabled .el-input__inner{
  background-color: #f2f2f2 !important;
}*/
.el-table th{
  background-color:#f5f7fa;
}
.tableClass{
  border:1px solid #ebeef5;
}
.toolbar {
  background: #f2f2f2;
  padding: 10px 0 0 10px;
  height:44px;
  margin: 10px 0px;
}
.toolbar .el-form-item {
  margin-bottom: 10px;
}
/*.el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: #ddd !important;
}
.el-table--enable-row-hover .el-table__body .el-table__row .current-row{
 background-color: #fdf6ec;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  color: #E6A23C;
  background: #fdf6ec;
  border-color: #f5dab1;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover{
  color: #E6A23C;
}*/
</style>
