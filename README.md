# aerospike-cli
A simple aerospike cli written in Node.js with basic functionalities like connecting to a remote db, disconnecting, querying, altering records. It is compatible with various operating systems supporting aerospike node.js client like Mac OS X 10.8 or greater, CentOS/RHEL 6/7, Debian 7/8, Ubuntu 12.04/14.04/16.04. 


## PreRequistites:

The Aerospike client depends on the Aerospike C client library, which gets downloaded during package installation. Package has the following compile/runtime dependecies.

Library Name | Package Name
------------ | -------------
libssl | openssl
libcrypto | openssl

### MAC OS X
To install openssl in mac os x 10.8 or later:
    
    $ brew install openssl

On mac to aerospike [`Vagrant`](https://www.aerospike.com/docs/operations/install/vagrant/mac/using-vagrant.html) is required.

### UBUNTU 12.04+
To install openssl library via apt-get:

    $ sudo apt-get install g++ libssl1.0.0 libssl-dev


## Usage:

* To connect to a remote aerospike database:
```
    $ aql-cli start -H <aqlDBHost> -P <aqlDBPort>
```    

* To do a read operation 
```    
    $ aql-cli get <pk> <namespace> <set>  -H <aqlDBHost> -P <dbPort>
```    

* To do a write operation:
```    
    $ aql-cli put <pk> <namespace> <set> --bins {\"binName\":\"value\"}  -H <aqlDBHost> -P <dbPort>
```    

This write operation will first remove all bins wrt primary key and then write new bin and its value.

* To do multiple operations like read, incrementing value and appending bins:
```    
    $ aql-cli alter <pk> <namespace> <set> --read  {\"add1\":234} --increment {\"put\":1} --append {\"newbin\":\"value\"} -H <aqlDBHost> -P <dbPort>
```
 In above example we are reading value corresponding to bin named "add1" (Pass any value while querying in json to complete the json format), incrementing value of bin named "put" by 1 and appending bin named "newbin" and its value at the end of record corresponding to pk provided.
 
 ## Options

You can modify the test with various options:

    --host, -H       Aerospike database address.  [default: "172.28.128.3"]
    --port           Aerospike database port.     [default: 3000]
    --namespace, -n  Namespace for the keys.      
    --set, -s        Set for the keys.            
    --bins           Bin value for records.
    --append, -A     Append bins in existing record.
    --increment, -I  Increment Integer bin value.
    --read, -R       Read a bin value.
    
