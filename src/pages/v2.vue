<template id="v2">
<el-container>
  <el-header style="padding:0;height:80px;">
    <div class="logo">
      <img src="../assets/logo.png"/>
      <span class="name">银行端缴税系统</span>
    </div>
  </el-header>
  <el-main>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>申报扣税</span>
      </div>
      <el-form ref="form" :inline="true" size="medium" :model="form" label-width="110px" :rules="formRules" label-position="left">
        <el-form-item label="征收机关代码" prop="collectingoffice">
          <el-input v-model="form.collectingoffice"></el-input>
        </el-form-item>
        <el-form-item label="征收机关名称">
          <el-input v-model="resultForm.txname" disabled></el-input>
        </el-form-item>
        <el-form-item label="纳税人编码" prop="taxpayer">
          <el-input v-model="form.taxpayer"></el-input>
        </el-form-item>
        <el-form-item label="申报序号" prop="declarationid">
          <el-input v-model="form.declarationid"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:20px">
          <el-button  size="medium" @click="handleGetTax('form')" type="primary">查 询</el-button>
        </el-form-item>
      </el-form>
      <br>
      <el-table :data="list" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" class="tableClass" size="medium">
        <el-table-column type="index" width="80px" label="序号">
        </el-table-column><el-table-column prop="proofid" label="明细序号" sortable show-overflow-tooltip>
        </el-table-column><el-table-column prop="prooftype" label="凭证种类" sortable show-overflow-tooltip>
        </el-table-column><el-table-column prop="project" label="征收项目" sortable>
        </el-table-column><el-table-column prop="item" label="征收品目" sortable>
        </el-table-column><el-table-column prop="taxvalue" label="税额" sortable>
        </el-table-column><el-table-column prop="generationdate" label="所属日期 " sortable>
        </el-table-column><el-table-column prop="closingdate" label="截止日期 " sortable>
        </el-table-column><el-table-column prop="durationpayment" label="缴款日期 " sortable>
        </el-table-column>
      </el-table>
      <br>
      <el-form ref="resultForm" :inline="true" size="medium" :model="resultForm" label-width="110px" label-position="left">
        <el-form-item label=" 总笔数 ">
          <el-input v-model="resultForm.tCount" disabled></el-input>
        </el-form-item>
        <el-form-item label=" 总金额 ">
          <el-input v-model="resultForm.tAmount" disabled></el-input>
        </el-form-item>
        <el-form-item style="margin-left:20px">
          <el-button  @click="handleSubmit" size="medium" type="primary">缴 税</el-button>
        </el-form-item>
      </el-form>
      <!-- <el-col :span="24" class="toolbar">
      </el-col> -->
    </el-card>
    <el-dialog title="发起扣税" :visible.sync="dialogFormVisible" @close="handleCancel('payForm')">
      <el-form ref="payForm" :model="payForm" label-width="96px" :disabled="submitting" :rules="rules">
        <el-form-item label="付款账号" prop="pyerac">
          <el-input type="text" v-model="payForm.pyerac"></el-input>
        </el-form-item>
        <el-form-item label="支付密码" prop="pypsd">
          <el-input type="password" v-model="payForm.pypsd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
          <el-button @click="handleCancel('payForm')" :disabled="submitting">取消</el-button>
          <el-button @click="resetForm('payForm')" :disabled="submitting">重置</el-button>
          <el-button @click="submitForm('payForm')" :loading="submitting" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </el-main>
  <el-footer>
    <span>版权所有：广州银行&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 客户服务电话：96699（广东）、400-83-96699（全国）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址：广州市天河区珠江东路30号广州银行大厦&nbsp;&nbsp;&nbsp;</span>
    <router-link to='/v1' class="item">版本1</router-link>
  </el-footer>
</el-container>
</template>
<script>
import { getList,taxStatus,save,check } from "../api.js";
export default {
  name: 'v2',
  data() {
    return {
      activeName: 'first',
      form:{
          "collectingoffice":"",
          "taxpayer":"",
          "declarationid":"",
      },
      formRules:{
        collectingoffice:[{ required: true, message: '不能为空', trigger: 'blur'}],
        taxpayer:[{ required: true, message: '不能为空', trigger: 'blur'}],
        declarationid:[{ required: true, message: '不能为空', trigger: 'blur'}]
      },
      rules:{
        pyerac:[{ required: true, message: '不能为空', trigger: 'blur'}],
        pypsd:[{ required: true, message: '不能为空', trigger: 'blur'}]
      },
      resultForm:{},
      listLoading:false,
      list:[],
      dialogFormVisible:false,
      payForm:{
        "pyerac":"",
        "pypsd":""
      },
      submitting:false,
      t1008:false,
      t1009:false,
      t2090:false,
      t2091:false
    }
  },
  methods: {
    handleGetTax(form){
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.handleT2091()
          let params={
            "data":{
              "protoId": "2091",
              "declarationInfo":this.form
            }
          }
          this.listLoading=true

          getList(params).then(res=>{
            let {msg,code,list}=res.data
            if(code==200){
              this.list=list
              // this.resultForm=data.form
              this.handleT1009()
            }else{
              this.$message.error(msg)
            }
            this.listLoading=false
          })
        }
      })
    },
    handleSubmit(){
      if(this.t2091&&this.t1009){
        this.dialogFormVisible=true
      }else{
        this.$message("请先查询")
      }
    },
    handleCancel(form){
      if(this.submitting){
        this.$message.warning("正在扣税，请勿做其他操作")
        this.dialogFormVisible=true
      }else{
        this.resetForm(form)
        this.dialogFormVisible=false
      }
    },
    resetForm(form){
      this.$refs[form].resetFields()
    },
    submitForm(form){
      this.handleT2090()
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
        if(code==200){
          this.submitting=false
          this.handleT1008()

          // console.log(this.t1008)

          if(this.t1008){
            this.$message.success("缴税成功")
            this.resetForm("form")
            this.resetForm(form)
            // this.resultForm={}
            this.dialogFormVisible = false
            this.list=[]
            t1008=false
            t1009=false
            t2090=false
            t2091=false
          }
        }else{
          this.submitting=false
          this.$message.error(msg)
        }
      })
    },
    totalAmount(){
      let res=0
      this.list.forEach(function(item,index){
        res+=item.taxvalue
      })
      return res
    },
    handleT2091(){
      let date=new Date();
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
      // java储存
      save(s2091).then(res=>{
        let {code,msg,data}=res.data
          if(code==200){
            this.t2091=true
            console.log("2091数据库记录成功")
          }else{
            this.t2091=false
            this.$message.error("出错了")
          }
      })
      // node存储
      // check(s2091).then(res=>{
      //   console.log(res.data);
      // })
    },
    handleT1009(){
      let date=new Date()
      let s1009={
        "data":{
          "protoId": "1009", //4个id
          "data":{
            "fcbpdt": date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
            "fcbpsq": "",
            "tipssq": this.form.declarationid,
            "tranam": this.totalAmount(),
            "pyerac": this.list.taxvalue,//账户
            "pyerna": "",//名称
            "txcode": this.form.collectingoffice,//机关编码
            "txutid": this.form.taxpayer,//纳税人编码
          }
        }
      }
      save(s1009).then(res=>{
        let {code,msg,data}=res.data
        if(code==200){
          this.t1009=true;
          console.log("1009数据库记录成功")
        }else{
          this.t1009=false;
          this.$message.error("出错了")
        }
      })
    },
    handleT2090(){
      let date=new Date();
      let s2090={
        "data":{
          "protoId": "2090", //4个id
          "data":{
            "fcbpdt": date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
            "fcbpsq": "",
            "tipssq": this.form.declarationid,
            "tranam": this.totalAmount(),
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
          this.t2090=true
          console.log("2090数据库记录成功")
        }else{
          this.t2090=false
          this.$message.error("出错了")
        }
      })
    },
    handleT1008(){
      let date=new Date();
      let s1008={
        "data":{
          "protoId": "1008", //4个id
          "data":{
            "fcbpdt": date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
            "fcbpsq": "",
            "tipssq": this.form.declarationid,
            "tranam": this.totalAmount(),
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
          this.t1008=true
          console.log("1008数据库记录成功")
        }else{
          this.t1008=false
          this.$message.error("出错了")
        }
      })
    },
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" src="./../style/v2.scss"></style>
