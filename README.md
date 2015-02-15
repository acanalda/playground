This is just a test lab repository. Just some random code I´ve created to play with nodeJS. Don´t take it too serious.

<a name="core"/>
# Core

This application creates a new process per CPU core. Each of those process are http web servers that listen to localhost:8000. The balancer takes care of calls to port 8000 and redirects them to one of the available workers. Every worker is going to process a request during his lifetime. Then, it suicides. It means you can call localhost:8000 as many times as number of cores you have on your CPU.

## Usage
```
$node core
```
Then, call localhost:8000 from an http client. Calls from browsers also request favicon.ico, so you´ll get two (or more) calls

<a name="core_search"/>
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
