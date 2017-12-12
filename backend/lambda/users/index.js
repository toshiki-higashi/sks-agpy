'use strict';

exports.handler = (event, context, callback) => {
  callback(null,{
    statusCode: 200,
    body: "Lorem ipsum"
  });
  // let id = event.pathParameters.users || false;
  // switch(event.httpMethod){
  //   case "GET":
  //     if(id){
  //       callback(null,{statusCode: 200,body:"user get function id"+id});
  //       return;
  //     };
  //     callback(null,{statusCode: 200,body:"users function"});
  //     break;  

  //   case "POST":
  //     callback(null,{statusCode: 200,body:"users function"});
  //     break;  

  //   case "DELETE":
  //     callback(null,{statusCode: 200,body:"user function id"+id});
  //     break;
  //   default:
  //     callback(null,{statusCode: 501});
  // };
}
