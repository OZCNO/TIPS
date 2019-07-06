var Mock = require('mockjs');
var list = [
    {
      "id":"233",
      "name":"32",
      "beginTime":"1999.12.2",
      "overTime":"1999.12.29",
      "type":"23",
      'amount':"131"
    },{
      'id':"233",
      'name':"32",
      'beginTime':"1999.12.2",
      'overTime':"1999.12.29",
      'type':"23",
      'amount':"131"
    },
    {
      "id":"233",
      "name":"32",
      "beginTime":"1999.12.2",
      "overTime":"1999.12.29",
      "type":"23",
      'amount':"131"
    },{
      'id':"233",
      'name':"32",
      'beginTime':"1999.12.2",
      'overTime':"1999.12.29",
      'type':"23",
      'amount':"131"
    },
    {
      "id":"233",
      "name":"32",
      "beginTime":"1999.12.2",
      "overTime":"1999.12.29",
      "type":"23",
      'amount':"131"
    }
];
Mock.mock("http://127.0.0.1:8083/list",function(data){
  let result={
    "code":200,
    "msg":"success",
    "data":{
      "totalCount":10,
      "form":{
        "txname":"呵呵呵呵",
        "tCount":"10",
        "tAmount":"13153" 
      },
      "list":list,
    }
  }
  return result
});
Mock.mock("http://127.0.0.1:8083/tax",function(data){
  console.log(data.body);
  let result={
    "code":200,
    "msg":"success",
    "data":""
  }
  return result
});