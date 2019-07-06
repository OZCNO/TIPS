<template>
  <div id="app">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>申报扣税</span>
      </div>
      <el-form ref="form" :inline="true" size="mini" :model="form" label-width="96px">
        <el-form-item label="征收机关代码" prop="txcode">
          <el-input v-model="form.txcode"></el-input>
        </el-form-item>
        <el-form-item label="纳税人编码" prop="rxutid">
          <el-input v-model="form.rxutid"></el-input>
        </el-form-item>
        <el-form-item label="申报序号" prop="tipssq">
          <el-input v-model="form.tipssq"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  size="mini" @click="handleGetTax">查询</el-button>
        </el-form-item>
      </el-form>
      <el-form ref="resultForm" :inline="true" size="mini" :model="resultForm" label-width="96px">
        <el-form-item label="征收机关名称">
          <el-input v-model="resultForm.txname" disabled></el-input>
        </el-form-item>
        <el-form-item label="总笔数">
          <el-input v-model="resultForm.tCount" disabled></el-input>
        </el-form-item>
        <el-form-item label="总金额">
          <el-input v-model="resultForm.tAmount" disabled></el-input>
        </el-form-item>
      </el-form>

      <el-table :data="list" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" class="tableClass" size="mini">
        <el-table-column type="index" width="70px" label="项目序号">
        </el-table-column><el-table-column prop="id" label="税种代码" sortable show-overflow-tooltip> 
        </el-table-column><el-table-column prop="name" label="税种名称" sortable show-overflow-tooltip>
        </el-table-column><el-table-column prop="beginTime" label="税款所属日期起" sortable>
        </el-table-column><el-table-column prop="overTime" label="税款所属日期止" sortable>
        </el-table-column><el-table-column prop="type" label="税款类型" sortable>
        </el-table-column><el-table-column prop="amount" label="税款数" sortable>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-button  @click="dialogFormVisible=true" size="mini">发起扣税</el-button>
        <el-pagination
          background
          small
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="5"  
          :total="total" style="float:right">
        </el-pagination>
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
// import { getList,taxStatus,test } from "../api.js";
import { getList } from "../api.js";
import { taxStatus } from "../api.js";
export default {
  name: 'page1',
  data() {
    return {
      activeName: 'first',
      form:{
          "txcode":"",
          "rxutid":"",
          "tipssq":"",
      },
      resultForm:{},
      listLoading:false,
      list:[],
      page:1,
      total:0,
      dialogFormVisible:false,
      payForm:{
        "pyerac":"",
        "pypsd":""
      },
      submitting:false,
    }
  },
  methods: {
    handleGetTax(){
      this.listLoading=true
      // 暂时不传递数据
      // 把请求的页码输进去
      getList().then(res=>{
      // getList(this.form).then(res=>{
        console.log(res)
        let {msg,code,data}=res.data
        if(code==200){
          this.list=data.list
          this.total=data.totalCount
          this.resultForm=data.form
        }else{
          this.$message.error(msg)
        }
        this.listLoading=false
      }).catch(res=>{
        this.listLoading=false
        this.$message.error(msg)
      })
    },
    handleCurrentChange(val){
      this.page=val
      // this.handleGetTax()
    },
    handleCancel(form){
      this.resetForm(form)
      this.dialogFormVisible=false
    },
    resetForm(form){
      this.$refs[form].resetFields()      
    },
    submitForm(form){
      this.submitting = true
      taxStatus().then(res=>{
        let {msg,code,data}=res.data
        if(code==200){
          this.submitting=false
          this.$message.success("缴税成功")
          this.resetForm("form")
          this.resultForm={}
          this.resetForm(form)
          this.dialogFormVisible = false
          //清空列表
          this.list=[]
          this.total=0
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
