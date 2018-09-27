/*
* Primary file for API
*  
*/

//Dependencies
let config=require('./config');
let http=require('http');
let https=require('https');
let url=require('url');
let StringDecoder=require('string_decoder').StringDecoder
let fs=require('fs');

//Instantiate the http server
let httpServer=http.createServer(function(req,res){
    unifiedServer(req,res);
});

//Start the http server and have it listen on port config.port
httpServer.listen(config.httpPort,function(){
    console.log('Server is listening on port '+config.httpPort+' now in '+config.envName+' mode');
});

//Instantiate the https server
let httpsServerOptions={
    'key':fs.readFileSync('./https/key.pem'),
    'cert':fs.readFileSync('./https/cert.pem')
};
let httpsServer=https.createServer(httpsServerOptions,function(req,res){
    unifiedServer(req,res);
});

//Start the https server and have it listen on port config.port
httpsServer.listen(config.httpsPort,function(){
    console.log('Server is listening on port '+config.httpsPort+' now in '+config.envName+' mode');
});

//All the server logic for both the http and https server
var unifiedServer=function(req,res){
    //Get the url and parse it
    let parsedUrl=url.parse(req.url,true);
    
    //Get the path
    let path=parsedUrl.pathname;
    let trimmedPath=path.replace(/^\/+|\/+$/g, '');

    //Get the query string as object
    let queryStringObject=parsedUrl.query;

    //Get the http method
    let method=req.method.toLowerCase();

    //Get the headers as an object
    let headers=req.headers; 

    //Get the payload, if any
    let decoder=new StringDecoder('utf-8');
    let buffer='';
    //data event of the stream
    req.on('data',function(data){
        buffer+=decoder.write(data);
    });
    //end event of the stream
    req.on('end',function(){
        buffer+=decoder.end();

        //Choose the handler this request should go to
        //If one is not found,use the notFound handler
        let chosenHandler=typeof(router[trimmedPath])!=='undefined'?router[trimmedPath]:handlers.notFound; 

        //construct the data object to send to handler
        let data={
            'trimmedPath':trimmedPath,
            'queryStringObject':queryStringObject,
            'method':method,
            'headers':headers,
            'payload':buffer
        }

        //Route the request to handler specified in the router
        chosenHandler(data,function(statusCode,payload){
            //Use the status code called back by the handler or default to 200
            statusCode=typeof(statusCode)=='number'?statusCode:200;

            //Use the payload called back by the handler or default to an empty object
            payload=typeof(payload)=='object'?payload:{};

            //Convert the payload to a string
            let payloadString=JSON.stringify(payload);

            //Return the response
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            
            //Log the payload
            console.log('Returning this response: ',statusCode,payloadString);
        });

        /*
        //Send the response
        res.end('Hello World\n');

        //Log the request path
        console.log('Request received on path: '+trimmedPath+' with method: '+method+' and query parameters: ',queryStringObject);
        console.log('Request received with these Headers',headers);
        */
    });
}

//Define the handlers
let handlers={};

//Define sample handler
handlers.sample=function(data,callback){
    //callback a http status code and a payload object
    callback(406,{'name':'sample handler'});
};

//Define ping handler
handlers.ping=function(data,callback){
    //callback 200
    callback(200);
};

//Define hello handler
handlers.hello=function(data,callback){
    //callback a http status code and a payload object
    callback(406,{'message':'Welcome to hello API.Hope you have a great day :)'});
}

//Not found handler
handlers.notFound=function(data,callback){
    callback(404);
}

//Define a request router
let router={
    'sample' : handlers.sample,
    'ping' : handlers.ping,
    'hello' : handlers.hello 
};