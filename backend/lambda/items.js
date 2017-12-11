'use strict';

exports.handler = (event, context, callback)=> {
  let id = event.pathParameters.items || false;
  switch(event.httpMethod){
    case "GET":
      if(id){
        callback(null,{statusCode: 200,body:"item function id"+id});
        return;
      };
      callback(null,{statusCode: 200,body:"items function"});
      break;  

    case "POST":
      callback(null,{statusCode: 200,body:"items function"});
      break;  

    case "DELETE":
      callback(null,{statusCode: 200,body:"item function id"+id});
      break;
    default:
      callback(null,{statusCode: 501});
  };
}
