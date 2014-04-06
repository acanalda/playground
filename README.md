<<<<<<< HEAD
[core](#Core)
[core_search](#Core)
  
<a name="core"/>
# Core

This application creates a new process per CPU core. Each of those process are http web servers that listen to localhost:8000. The balancer takes care of calls to port 8000 and redirects them to one of the available workers. Every worker is going to process a request during his lifetime. Then, it suicides. It means you can call localhost:8000 as many times as number of cores you have on your CPU.

There are two versions of the same app, one with console logs, and the second lines with no logs to fit the 50 lines of code specs.
=======
# Multi core test
This code creates a new process per CPU core. Each of those process are http web servers that listen to localhost:8000. The balancer takes care of calls to port 8000 and redirects them to one of the available workers. Every worker is going to process a request during his lifetime. Then, it suicides. It means you can call localhost:8000 as many times as number of cores you have on your CPU.
>>>>>>> 49c09c954792a077717729446dcc8a5b6edc96ae

There are two versions of the same application, one with console logs, and the second with no logs to fit the 50 lines 
## Usage
```
$node core
```
Then, call localhost:8000 from an http client. Calls from browsers also request favicon.ico, so you´ll get two (or more) calls

## Libraries
All nodeJS native. Avoided external libraries (async, ...) for an easy deploy/usage

<a name="core_search"/>
# Core Search
