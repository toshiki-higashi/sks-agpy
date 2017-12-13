'use strict';
var AWS = require('aws-sdk');

// Delete on production environment
AWS.config.update({
  region: "ap-northeast-1",
  endpoint: "http://localhost:8000"
});


var db = AWS.DynamoDB();

db.scan(params,function(err,data){
  if(err){
    console.log("Error",err);
  }else{
    data.Items.forEach(function(element, index, array){
      console.log(element);
    });
  }
});
  
exports.handler = (event, context, callback)=> {

  let id = event.pathParameters?event.pathParameters.item:false;


  switch(event.httpMethod){
    case "GET":
      if(id){
        callback(null, { statusCode: 200, body: "GET with param " + id});
        return;
      };
      callback(null, { statusCode: 200, body: "GET without param" });
      break;  

    case "POST":
      callback(null, { statusCode: 200, body: "POST with param " + id});
      break;  

    case "PUT":
      callback(null, { statusCode: 200, body: "PUT with param " + id});
      break;  

    case "DELETE":
      callback(null, { statusCode: 200, body: "DELETE with param " + id});
      break;

    default:
      callback(null, { statusCode: 501, body: "Not implemented" });
  };
}
