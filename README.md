[core](#Core)
[core_search](#Core)
  
This is just random code I´ve created to play with nodeJS. Don´t take it too seriously.

<a name="core"/>
# Core

This application creates a new process per CPU core. Each of those process are http web servers that listen to localhost:8000. The balancer takes care of calls to port 8000 and redirects them to one of the available workers. Every worker is going to process a request during his lifetime. Then, it suicides. It means you can call localhost:8000 as many times as number of cores you have on your CPU.

There are two versions of the same app, one with console logs, and the second lines with no logs to fit the 50 lines of code specs.

## Usage
```
$node core
```
Then, call localhost:8000 from an http client. Calls from browsers also request favicon.ico, so you´ll get two (or more) calls

<a name="core_search"/>
# Core Search
# Core Search

What it does:
- Runs a matrix recursive word search algorithm in the parent process 
- Creates a forked process per CPU core
- Runs the same recursive algorithm on each child process
- Default search word: 'hola'
- Random array size: 5000

## Usage
```
$word=adios node core_search
```
