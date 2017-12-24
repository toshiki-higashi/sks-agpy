'use strict';
var AWS = require('aws-sdk');
var uuid = require('node-uuid');

// AWS.config.update({
//   // ここで指定するリージョンはDynamoDBLocalとあっている必要あり？(未検証)
//   region: "ap-northeast-1",
//   // DynamoDBLocal自体はlocalhostで動くが、SAM Localと一緒に使うなら
//   // ループバックのエイリアスが必要
//   endpoint: "http://192.16.123.1:8000"
// });
var db = new AWS.DynamoDB();

exports.handler = (event, context, callback)=> {

  // DynamoDBのAPIに渡す共通のパラメータ
  var params = {
    TableName: "agpy-items"
  };

  // これらの変数にHTTPメソッドに応じた値・処理を代入する
  var responseBody = null;
  var validator = null;
  var operation = null;

  switch(event.httpMethod){
    case "GET":

      if(event.pathParameters){

        validator = function(){};

        operation = function(){
          // Get an item with the key given
          params.Key = {"id":{"S":event.pathParameters.item}};
          db.getItem(params, function(err,data){
            if(err){

              console.log(err);
              callback(null, {statusCode: 500, body: err});

            }
            else{ 
              console.log(data);
              callback(null, {statusCode: 200, body: data});

            }
          });
        };

      }else{

        validator = function(){};

        // 全てのitemを取得する
        operation = function(){
          db.scan(params, function(err,data){
            if(err){

              console.log(err);
              callback(null, err);
            }
            else{ 

              console.log(data);
              callback(null, {statusCode: 200, body: responseBody});

            }
          });
        };
      }
      break;

    case "POST":
      validator = function(){};

      // 新たにitemを追加する 
      // UUID衝突時は？
      operation = function(){
        params.Item = {
          "id":{"S":uuid.v4()},
          "name":{"S":"foo"}
        };
        db.putItem(params,function(err,data){
            if(err){

              console.log(err);

            }
            else{ 

              console.log(data);
              callback(null, {statusCode: 200, body: responseBody});

            }
        });
      };
      break;  

    case "PUT":
      validator = function(){};

      // 変更箇所に関わらず全ての属性を更新する
      operation = function(){
      };
      break;  

    case "DELETE":
      validator = function(){};

      // 削除した結果は(今のところ)返却しなくてもいい
      operation = function(){
      };
      break;

    default:
      callback(null, {statusCode: 501, body: "Not implemented"});
      return;
  }; 

  // 入力チェック、DB処理を実行する
  validator();
  operation();

}
