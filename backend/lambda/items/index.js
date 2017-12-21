'use strict';
var AWS = require('aws-sdk');
var uuid = require('node-uuid');

AWS.config.update({
  // Does the region specified here needs to be consistent
  // with the downloaded version of DynamoDB Local?
  region: "ap-northeast-1",

  // Endpoint should be an alias for loopback interface
  // Change to https://dynamodb.aws-region.amazonaws.com
  // (replace aws-region with the region you use)
  endpoint: "http://192.16.123.1:8000"
});
var db = new AWS.DynamoDB();

exports.handler = (event, context, callback)=> {

  // common parameters to call DynamoDB API
  var params = {
    TableName: "agpy-items"
  };

  // Get path parameter, set false if not given
  let id = event.pathParameters?event.pathParameters.item:false;

  // Set validation function and database operation
  var responseBody = null;
  var validator = null;
  var operation = null;

  switch(event.httpMethod){
    case "GET":

      if(id){

        validator = function(){};

        operation = function(){
          // Get an item with the key given
          params.Key = {"id":{"S":id}};
          db.getItem(params, function(err,data){
            if(err){

              console.log(err);

            }
            else{ console.log(data);

              callback(null, {statusCode: 200, body: "get id"});

            }
          });
        };

      }else{

        validator = function(){};

        operation = function(){
          // Get all items in agpy-item
          db.scan(params, function(err,data){
            if(err){

              console.log(err);

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

      // Create a new item in apgy-items
      // What if a generated uuid collide with any of existing uuids?
      operation = function(){
        params.Item = {
          "id":{"S":uuid.v4()},
          "name":{"S":"foo"}};
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
      // What attributes should be required? Only changed or all of them?
      validator = function(){};

      // Update an item with the given id
      operation = function(){
      };
      break;  

    case "DELETE":
      validator = function(){};

      operation = function(){
        // Delete an item with the given id
      };
      break;

    default:
      callback(null, {statusCode: 501, body: "Not implemented"});
      return;
  }; 

  // Apply validation and execute CRUD
  validator();
  operation();

}
