"use strict";

console.log("Loading function");

exports.handler = (event, context, callback) => {
  return callback(null, {
    statusCode: 200,
    body: "Hello " + event.name 
  });
};

