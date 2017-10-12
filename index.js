#! /usr/bin/env node
const fs              = require('fs');
const Aerospike       = require('aerospike')
const commander       = require('commander');

let config = {
  hosts: [ { addr: '172.28.128.3', port: 3000 } ],
  policies:
  { apply: { totalTimeout: 1000 },
    batch: { totalTimeout: 1000 },
    info: { totalTimeout: 1000 },
    operate: { totalTimeout: 1000 },
    query: { totalTimeout: 1000 },
    read: { totalTimeout: 1000 },
    remove: { totalTimeout: 1000 },
    scan: { totalTimeout: 1000 },
    write: { totalTimeout: 1000 } }
}

let meta = { ttl: 10000 }
let policy = new Aerospike.WritePolicy({
  exists: Aerospike.policy.exists.CREATE_OR_REPLACE
})

console.log('Welcome to Aerospike CLI');

commander
  .version(require('./package').version)
  .option('-H, --host <host>', 'hostname or adress')
  .option('-u, --username <username>', 'username for authentication')
  .option('-p, --password <password>', 'password for authentication')
  .option('-a, --admin', 'enable authentication as admin')
  .option('-n, --namespace <namespace>', 'namespace in aql')
  .option('--set <set>', 'Set name in aql')
  .option('--port <port>', 'listen on specified port')
.parse(process.argv);


var cmd = process.argv[2];
switch (cmd) {
case 'config':    return getConfig();
case 'ls':        return ls();
case 'start':     return start();
case 'stop':      return stop(process.argv[3], process.argv[4] == '--log');
case 'log':       return log(process.argv[3], process.argv.splice(4).join(''));
case 'running':   return running();
case 'resolve':   return resolve(process.argv[3]);
case 'reopen':    return reopen(process.argv[3]);
case 'close':     return close(process.argv[3]);
case 'needinfo':  return needInfo(process.argv[3]);
case 'get':       return get(process.argv[3],process.argv[4],process.argv[5]);
case 'describe':  return describe(process.argv[3]);
case 'comments':  return comments(process.argv[3], process.argv[4] == '--reverse');
case 'subtasks':  return subtasks(process.argv[3]);
case 'comment':   return comment(process.argv[3], process.argv.slice(4));
case 'user':      return user(process.argv.slice(3));
case 'assign':    return assign(process.argv[3], process.argv.slice(4));
case 'status':    return setStatus(process.argv[3], process.argv[4]);
}

function getConfig(){
  return config;
}

var client=null;

function start(){
 let client=Aerospike.client(config);
  //client.connect();
 client.connect(function (error) {
    if (error) {
     // handle failure
     dbStatusCode = error.code;
     console.log('Connection to Aerospike cluster failed!');
    } else {
     // handle success
     console.log('Connecting to aerospike....Connection to Aerospike cluster succeeded!');
     return client;
    }
    }   
  );
 return client;
}


function stop(){
  let client = start();
  console.log(client.config);
    if(client.connected){
      client.close();
      console.log("Aql client disconnected....");
    }
      else
      console.log("Aql client not connected...");
  }
  


  function get(pk,namespace,set){
   let client = start();
   //console.log(client);
    let key = new Aerospike.Key(pk, namespace, set);
    client.get(key).then(record=>
      {
        console.log("printing record bins:  %j",record.bins);})
      .catch(function(err) {
        if(err)
      {console.log('Either reocrd not found or error occured while reading record \n'+ err);}
    });


  }

console.log(commander.port);

if(commander.host && commander.port){
  config.hosts[0].addr=commander.host;
  config.hosts[0].port=3000;
}
 client=Aerospike.client(config);
console.log(client);
client.connect();

client.connect(function (error) {
  if (error) {
   // handle failure
   dbStatusCode = error.code;
   console.log('Connection to Aerospike cluster failed!');
  } else {
   // handle success
   console.log('Connection to Aerospike cluster succeeded!');
  }
  }

);
let key = new Aerospike.Key('test','testset', 'xy1');

client.get(key).then(record=>
  {
    console.log("printing record bins "+record.bins['a'])})
  .catch(function(err) {
    if(err)
  {console.log('error123 occured: ');}
});


/* let key2 = new Aerospike.Key('test','testset', 'xyz');
 client.put(key2, bins, meta, policy)
.then(result => {
  console.log("put result "+result.bins)   // => { c: 4, i: 124, m: null } 
})
.catch(error => {
  //client.close()
  return Promise.reject(error)
});  */

let key2 = new Aerospike.Key('test','testset', 'xy2');
let bins={z:'abcd'};
let ops = [
  Aerospike.operations.incr('b', 1),
  Aerospike.operations.read('a'),
  Aerospike.operations.read('b'),
  Aerospike.lists.append('l', 'z'),
//  Aerospike.maps.removeByKey('m', 'bar')
];

client.operate(key2, ops, function (error, record) {
       if (error) {
       console.log("error in operate"+error);
    } else {
      console.log('b', record.bins) // value of 'b' returned by the `read` operation
     }
    });

/*.catch(function(err) {
  if(err)
{console.log('error get occured: ');}
}).then(() => client.close())x
/* client.get(key, function (error, record) {
  // Check for errors
  if (error) {
    // An error occurred
    console.log('error occured: '+error)
  } else {
    console.log("getting bins");
    let bins = record.bins
     console.log( 'xyz' + ' ' + bins.greet);
  }
 }); */

/* let record=client.get(key) ;
let bins=record.bins;
console.log(bins); */


/* client.connect(function (error) {
  if (error) {
   // handle failure
   dbStatusCode = error.code
   console.log('Connection to Aerospike cluster failed!')
  } else {
   // handle success
   console.log('Connection to Aerospike cluster succeeded!')
  }
  }); */
//   Aerospike.client(config,function(error,client){
//     if (error) {
//       console.console.log('in error loop');
//  // handle failure
//  dbStatusCode = error.code
//  console.log('Connection to Aerospike cluster failed!')
// } else {
//  // handle success
//  console.log('Connection to Aerospike cluster succeeded!')
// }
//   });
