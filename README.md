# Hello World API

Hello World API RESTful JSON API that listens on a port 3000.

  - When someone posts anything to the route /hello, you should return a welcome message, in JSON format
  - Health monitoring of this API can be done by making call to route /ping
  - Incase of any other route being called, a 404 response will be returned

### Tech

Hello World API uses following open source projects to work properly:

* [node.js] - evented I/O for the backend

Hello World API is open source with a [public repository][hello] on GitHub.

### Installation

Hello World API requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd 
$ node index.js
```

### Calling API

Following cURL can be used to make request to Hello World API hello route:
```
curl -X GET \
  http://localhost:3000/hello \
  -H 'Postman-Token: 623bfb41-1084-4ec6-8d6a-702355a42505' \
  -H 'cache-control: no-cache'
```

### Todos

 - Create a public github repo for this assignment
 - It should be a RESTful JSON API that listens on a port of your choice. 
 - When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want. 

License
----

MIT

   [hello]: <https://github.com/RishiGhosh92/Node-MasterClass/tree/assignment-1>
   [node.js]: <http://nodejs.org>