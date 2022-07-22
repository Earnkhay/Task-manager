//path module
// import path from 'path'
const path = require('path');
const fs = require('fs');
const os = require('os');
const url = require('url');
const EventEmitter = require('events');
const http = require('http');

//base file name
console.log(path.basename(__filename));

//directory name
console.log(path.dirname(__filename));

//file extension
console.log(path.extname(__filename));

// create path object
console.log(path.parse(__filename).base);

//concatenate paths
console.log(path.join(__dirname, 'test', 'hello.html'));


// file system module
//create a folder
// fs.mkdir(path.join(__dirname, '/test'), {}, err => {
//     if(err) throw err;
//     console.log('Folder created....');
// })

//create and write to file
// fs.writeFile(path.join(__dirname, '/test', 'hello.txt'), 'Hello World!!', err => {
//     if(err) throw err;
//     console.log('File written to....');

//     //file append
//     fs.appendFile(path.join(__dirname, '/test', 'hello.txt'), 'I love Node.js', err => {
//         if(err) throw err;
//         console.log('File written to....');
//     })
// })

//read file
// fs.readFile(path.join(__dirname, '/test', 'hello.txt'), 'utf8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// })

//rename file
// fs.rename(path.join(__dirname, '/test', 'hello.txt'), path.join(__dirname, '/test', 'helloworld.txt'), (err) => {
//     if(err) throw err;
//     console.log('File renamed....');
// })



//operating system module
//platform
console.log(os.platform());

//cpu arch
console.log(os.arch());

//cpu core info
console.log(os.cpus());

//free memory
console.log(os.freemem());

//total memory
console.log(os.totalmem());

//home dir
console.log(os.homedir());

//uptime
console.log(os.uptime());


//url modules
const myUrl = new URL('http://mywebsite.com/hello.html?id=100&status=active');

//serialized URL
console.log(myUrl.href);
console.log(myUrl.toString());
//host(root domain)
console.log(myUrl.host);
//hostname (doesnot get port)
console.log(myUrl.hostname);
//pathname
console.log(myUrl.pathname);
//serialized query
console.log(myUrl.search);
//params object
console.log(myUrl.searchParams);
//add param
myUrl.searchParams.append('abc', '123');
console.log(myUrl.searchParams);
//loop through params
myUrl.searchParams.forEach((value, name) => console.log(`${name}: ${value}`));



//Events using event emitter
//create class
class MyEmitter extends EventEmitter {}
//init object
const myEmitter = new MyEmitter();
//event listener
myEmitter.on('event', () => console.log('Event Fired!'));

//init event
myEmitter.emit('event');
myEmitter.emit('event');


//http module
//create server object
http.createServer((req,res) => {
    //write response
    res.write('Hello World');
    res.end()
}).listen(5000, () => console.log('Server running....'));