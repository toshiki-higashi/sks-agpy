'use strict';

exports.handler = (event, context, callback)=> {
  console.log(event);
  let id = event.pathParameters?event.pathParameters.item:false;
  switch(event.httpMethod){
    case "GET":
      if(id){
        callback(null, { statusCode: 200, body: "GET with param" + id});
        return;
      };
      callback(null, { statusCode: 200, body: "GET without param" });
      break;  

    case "POST":
      callback(null, { statusCode: 200, body: "POST" });
      break;  

    case "DELETE":
      callback(null, { statusCode: 200, body: "DELETE" });
      break;

    default:
      callback(null, { statusCode: 200, body: "default" });
  };
}
