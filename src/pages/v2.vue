<template id="v2">
<el-container class="v2">
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
        <el-form-item label="征收机关代码" prop="collectingoffice" style="marginRight:80px">
          <el-input v-model="form.collectingoffice"  v-on:keyup.enter.native="handleGetTaxName(form.collectingoffice)" v-on:change="handleGetTaxName(form.collectingoffice)"></el-input>
        </el-form-item>
        <el-form-item label="征收机关名称" prop="txname">
          <el-input v-model="form.txname" disabled style="width:305px"></el-input>
        </el-form-item>
        <el-form-item label="纳税人编码" prop="taxpayer" style="marginRight:80px">
          <el-input v-model="form.taxpayer"></el-input>
        </el-form-item>
        <el-form-item label="申报序号" prop="declarationid">
          <el-input v-model="form.declarationid" v-on:keyup.enter.native="handleGetTax('form')"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:20px">
          <el-button  size="medium" @click="handleGetTax('form')" type="primary">查 询</el-button>
        </el-form-item>
      </el-form>
      <br>
      <el-table :data="list" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" class="tableClass" size="medium">
        <el-table-column type="index" width="60px" label="序号">
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
      <el-form :inline="true" size="medium" label-width="110px" label-position="left">
        <el-form-item label=" 总笔数 " style="marginRight:80px">
          <el-input v-model="totalCount" disabled></el-input>
        </el-form-item>
        <el-form-item label=" 总金额 ">
          <el-input v-model="totalAmount" disabled></el-input>
        </el-form-item>
        <el-form-item style="margin-left:20px">
          <el-button  @click="handleSubmit" size="medium" type="primary">缴 税</el-button>
        </el-form-item>
      </el-form>
    </el-card>
<!--  -->
    <el-dialog title="发起扣税" :visible.sync="dialogFormVisible" @close="handleCancel('payForm')">
      <el-form ref="payForm" :model="payForm" label-width="96px" :disabled="submitting" :rules="rules">
        <el-form-item label="付款账号" prop="pyerac">
          <el-input type="text" v-model="payForm.pyerac" v-on:keyup.enter.native="handleGetAccountName(payForm.pyerac)" v-on:change="handleGetAccountName(payForm.pyerac)"></el-input>
        </el-form-item>
        <el-form-item label="账号名称" prop="accountName">
          <el-input type="text" v-model="payForm.accountName" disabled></el-input>
        </el-form-item>
        <el-form-item label="待扣税额">
          <el-input type="text" v-model="totalAmount" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
          <el-button @click="handleCancel('payForm')" :disabled="submitting">取消</el-button>
          <el-button @click="resetForm('payForm')" :disabled="submitting">重置</el-button>
          <el-button @click="submitForm('payForm')" :loading="submitting" type="primary">确定</el-button>
      </div>
    </el-dialog>
<!--  -->
    <el-dialog title="广州银行银行端缴税凭证" :visible.sync="centerDialogVisible" center @close="resetAll">
      <el-row :span="24" style="fontSize:16px;marginBottom:15px;">
        <el-col :span='11'>缴税日期：<span>{{certificatesForm.date}}</span></el-col>
        <el-col :span='10'>流水号：<span>{{certificatesForm.num}}</span></el-col>
        <el-col :span="3">
          <div class="successTips">缴税成功</div>
        </el-col>
      </el-row>
      <div class="certificates">
        <div>纳税人编码：<span>{{certificatesForm.taxpayer}}</span>（申报扣税）</div>
        <div>付款人全称：<span>{{certificatesForm.accountName}}</span></div>
        <el-row>
          <el-col :span='12'>付款人账号：<span>{{certificatesForm.pyerac}}</span></el-col>
          <el-col :span='12'>征收机关名称：<span>{{certificatesForm.txname}}</span></el-col>
        </el-row>
        <div>小写（合计）金额：￥<span>{{certificatesForm.totalAmount}}</span></div>
        <div>大写（合计）金额：人民币 <span>{{certificatesForm.theAmountInWords}}</span></div>
        <br/>

        <el-row class="row-th">
          <el-col :span="9"><span>征收项目</span></el-col>
          <el-col :span="9"><span>所属日期</span></el-col>
          <el-col :span="6"><span>实缴金额</span></el-col>
        </el-row>
        <el-row v-for="item in list" :key="item.proofid">
          <el-col :span="7"><span>{{item.project}}</span></el-col>
          <el-col :span="11"><span>{{item.generationdate}} ~ {{item.closingdate}}</span></el-col>
          <el-col :span="6"><span>¥{{item.taxvalue}}</span></el-col>
        </el-row>
        <br/>
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
import { getList,taxStatus,save,taxName,accountName,check } from "../api.js";
export default {
  name: 'v2',
  data() {
    return {
      form:{
        "collectingoffice":"",
        "taxpayer":"",
        "declarationid":"",
        "txname":""
      },
      formRules:{
        collectingoffice:[{ required: true, message: '不能为空', trigger: 'blur'}],
        taxpayer:[{ required: true, message: '不能为空', trigger: 'blur'}],
        declarationid:[{ required: true, message: '不能为空', trigger: 'blur'}],
        txname:[{ required: true, message: '请输入正确的征收机关代码', trigger: 'blur'}]
      },
      payForm:{
        "pyerac":"",
        'accountName':""
      },
      rules:{
        pyerac:[{ required: true, message: '不能为空', trigger: 'blur'}],
        accountName:[{ required: true, message: '请输入正确的付款账号', trigger: 'blur'}]
      },
      listLoading:false,
      list:[],
      dialogFormVisible:false,
      submitting:false,
      t1008:false,
      t1009:false,
      t2090:false,
      t2091:false,
      centerDialogVisible:false,
      theAmountInWords:"",
      certificatesForm:{}
    }
  },
  methods: {
    handleGetAccountName(account){
      if(account==""){
        this.payForm.accountName=""
        return false
      }
      let params={
        'data':{
          'accountNo':account
        }
      }
      accountName(params).then(res=>{
        let {msg,code,accountName}=res.data
        if(code==200){
          this.payForm.accountName=accountName
        }else if(code==202){
          this.payForm.accountName=""
          this.$message.error("请输入正确的账号")
        }else{
          this.$message.error(code+" "+msg)
        }
      })
    },
    handleGetTaxName(taxcode){
      if(taxcode==""){
        this.form.txname=""
        return false;
      }
      let params={
        'data':{
          'collectingOffice':taxcode
        }
      }
      taxName(params).then(res=>{
        let {code,msg,collectingOfficeName}=res.data
        if(code==200){
          this.form.txname=collectingOfficeName
        }else if(code==204){
          this.$message.error("请输入正确的机关代码")
          this.form.txname=""
        }else{
          this.form.txname=""
          this.$message.error(code+" "+msg)
        }
      })
    },
    handleGetTax(form){
      this.$refs[form].validate((valid) => {
        if (valid) {
          if(this.form.txname==""){
            this.form.txname=this.taxName
          }
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
              if(list.length<1){
                this.t2091=false
                this.$alert('没有需要缴纳的税款项目', '查询结果', {
                  confirmButtonText: '确定'
                });
              }else{
                this.list=list
                this.handleT1009()
              }
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
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false;
        }
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
            this.handleT1008()

            // if(this.t1008){
            //   this.$message.success("缴税成功")
            //   this.resetForm("form")
            //   this.resetForm(form)
            //   // this.resultForm={}
            //   this.dialogFormVisible = false
            //   this.list=[]
            //   this.t1008=false
            //   this.t1009=false
            //   this.t2090=false
            //   this.t2091=false
            // }
          }else{
            this.submitting=false
            this.$message.error(msg)
          }
        })
      })
    },
    handleT2091(){
      let s2091={
        "data":{
          "protoId": "2091", //4个id
          "data":{
            "fcbpdt": this.getDate(),
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
      let s1009={
        "data":{
          "protoId": "1009", //4个id
          "data":{
            "fcbpdt": this.getDate(),
            "fcbpsq": "",
            "tipssq": this.form.declarationid,
            "tranam": this.totalAmount,
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
      let s2090={
        "data":{
          "protoId": "2090", //4个id
          "data":{
            "fcbpdt": this.getDate(),
            "fcbpsq": "",
            "tipssq": this.form.declarationid,
            "tranam": this.totalAmount,
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
      let s1008={
        "data":{
          "protoId": "1008", //4个id
          "data":{
            "fcbpdt": this.getDate(),
            "fcbpsq": "",
            "tipssq": this.form.declarationid,
            "tranam": this.totalAmount,
            "pyerac": this.list.taxvalue,//账户
            "pyerna": "",//名称
            "txcode": this.form.collectingoffice,//机关编码
            "txutid": this.form.taxpayer,//纳税人编码
          },
          "cg200xpara":{
            "declarationid":this.form.declarationid,
            "accountname":this.payForm.accountName,
            "accountid":this.payForm.pyerac,
            "tranamount":this.totalAmount
          }
        }
      }
      save(s1008).then(res=>{
        let {code,msg,serialNum}=res.data
        if(code==200){
          this.t1008=true
          console.log("1008数据库记录成功")

          // if(this.t1008){
            this.dialogFormVisible = false
            this.submitting=false
            this.centerDialogVisible=true

            this.certificatesForm.date=this.getDate()
            this.certificatesForm.num=serialNum//流水号
            this.certificatesForm.taxpayer=this.form.taxpayer
            this.certificatesForm.accountName=this.payForm.accountName
            this.certificatesForm.pyerac=this.payForm.pyerac
            this.certificatesForm.txname=this.form.txname
            this.certificatesForm.totalAmount=this.totalAmount
            this.certificatesForm.theAmountInWords=this.digitUppercase(this.totalAmount)

          // }
        }else{
          this.t1008=false
          this.$message.error("出错了")
        }
      })
    },
    resetAll(){
      this.resetForm("form")
      this.resetForm("payForm")
      this.list=[]
      this.t1008=false
      this.t1009=false
      this.t2090=false
      this.t2091=false
    },
    digitUppercase(n){
      let fraction = ['角', '分']
      let digit = ['零', '壹', '贰', '叁', '肆','伍', '陆', '柒', '捌', '玖'];
      let unit = [ ['元', '万', '亿'] , ['', '拾', '佰', '仟'] ];
      let head = n < 0 ? '欠' : ''
      n = Math.abs(n)
      let s = ''
      for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(Math.floor(n * 1000 * 10 * Math.pow(10, i)) % (10 * 1000) / 1000)] + fraction[i]).replace(/零./, '')
      }
      s = s || '整'
      n = Math.floor(n)
      for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = ''
        for (let j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p
          n = Math.floor(n / 10)
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
      }
      return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
    },
    getDate(){
      let now=new Date()
      let year=now.getFullYear()
      let month=now.getMonth()+1
      let day=now.getDate()
      if(month<10){
        month="0"+month;
      }
      return year+month+day;
    }
  },
  computed:{
    totalAmount(){
      let res=0
      this.list.forEach(function(item,index){
        res+=item.taxvalue*100
      })
      res=(res / 100).toFixed(2)

      return res
    },
    totalCount(){
      return this.list.length;
    },

  }
}
</script>
<style lang="scss" rel="stylesheet/scss" src="./../style/v2.scss"></style>
