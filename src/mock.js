var Mock = require('mockjs');
var list = [
    {
      "proofid":"233",
      "prooftype":"32",
      "project":"dsfdsf",
      "item":"1gdsfsd",
      "taxvalue":"23",
      'generationdate':"1999.11.1",
      "closingdate":"1999.12.2",
      "durationpayment":"1999.12.1",
    },
    {
      "proofid":"233",
      "prooftype":"32",
      "project":"dsfdsf",
      "item":"1gdsfsd",
      "taxvalue":"23",
      'generationdate':"1999.11.1",
      "closingdate":"1999.12.2",
      "durationpayment":"1999.12.1",
    }
];
Mock.mock("http://127.0.0.1:8083/TipsServer/checkTax",function(data){
  console.log(1);
  console.log(data)
  let result={
    "code":200,
    "msg":"success",
    "data":{
      // "totalCount":10,
      // "form":{
      //   "txname":"呵呵呵呵",
      //   "tCount":"10",
      //   "tAmount":"13153"
      // },
      "list":list,
      }
    }
    return result
});
Mock.mock("http://127.0.0.1:8083/payTax",function(data){
  console.log(data.body);
  let result={
    "code":200,
    "msg":"success",
    "data":""
  }
  return result
});
