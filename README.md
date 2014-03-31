Description: This code creates a new process per each CPU core. Each of those process listen to localhost:8000.
The balancer takes care of calls to port 8000 and redirects them to one of the available workers. Every worker is
going to process a request during his lifetime. Then, it suicides. It means you can call localhost:8000 as
many times as number of cores you have on your CPU.
Usage: Call localhost:8000 from an http client.
Libraries: All nodeJS native. Avoided external libraries (async, ...) for an easy deploy/usage
*** Attention ***: Calls from browsers also request favicon.ico, so you´ll get two calls