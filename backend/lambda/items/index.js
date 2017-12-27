'use strict';
var aws = require('aws-sdk');
var uuid = require('node-uuid');

// aws.config.update({
//   // ここで指定するリージョンはDynamoDBLocalとあっている必要あり？(未検証)
//   region: "ap-northeast-1",
//   // DynamoDBLocal自体はlocalhostで動くが、SAM Localと一緒に使うなら
//   // ループバックのエイリアスが必要
//   endpoint: "http://192.16.123.1:8000"
// });

var db = new aws.DynamoDB();

exports.handler = (event, context, callback)=> {

  // DynamoDBのAPIに渡す共通のパラメータ
  var params = {
    TableName: "agpy-items"
  };

  // CORS設定用
  var corsHeader={"Access-Control-Allow-Origin" : "*"};

  // これらの変数にHTTPメソッドに応じた値・処理を代入する
  var response = {
    statusCode:null,
    body:null,
    headers: corsHeader
  };

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
              response.statusCode=500;
              response.body=JSON.stringify(err);
              callback(null, response);
            }else{ 
              // TODO すべてstring型とわかっているなら、キー名でループして1行で書けない？
              // TODO 所有者/借りている人はDB上でどう持つ
              // user.id持つならagpy-usersを見に行かないといけない
              // borrowerなどundefinedなことがあり得る属性をそのまま取ろうとすると無い時に失敗する
              // set Allow origin...in the header of response! Do not try to do it on management console
              var item = {
                id: data.Item.id.S,
                category: data.Item.category.S,
                name: data.Item.name.S,
                location: data.Item.location.S,
                place: data.Item.place.S,
                getDate: data.Item.getDate.S,
                owner: data.Item.owner.S,
                borrower: data.Item.borrower.S,
                borrowDate: data.Item.borrowDate.S,
                returnDate: data.Item.returnDate.S
              };
              response.statusCode=200;
              response.body=JSON.stringify(item);
              callback(null, response);
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
              response.statusCode=500;
              response.body=JSON.stringify(err);
              callback(null, response);
            }
            else{ 
              var parsedItemList = {items: []};
              console.log(data);
              data.Items.forEach(function(item){
                console.log(item);
                parsedItemList.items.push({
                  id: item.id.S,
                  category: item.category.S,
                  name: item.name.S,
                  location: item.location.S,
                  place: item.place.S,
                  getDate: item.getDate.S,
                  owner: item.owner.S,
                  borrower: item.borrower.S,
                  borrowDate: item.borrowDate.S,
                  returnDate: item.returnDate.S
                });
              });
              response.statusCode=200;
              response.body=JSON.stringify(parsedItemList);
              callback(null, response);
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
            callback(null, {statusCode: 200, body: "POST"});

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
