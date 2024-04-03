# CASHING

## Definition
In software engineering, a caching system is a mechanism used to store frequently accessed data in a temporary storage location, known as a cache, to improve the performance and efficiency of data retrieval operations.

## Techniques and Technologies
### FIFO
* FIFO stands for First In, First Out.
* In a caching context, FIFO is a caching replacement algorithm where the oldest cached items are evicted first when the cache reaches its maximum capacity.

### LIFO
* LIFO stands for Last In, First Out.
* In a caching context, LIFO is a caching replacement algorithm where the most recently added items are evicted first when the cache reaches its maximum capacity.

### LRU
* LRU stands for Least Recently Used.
* In a caching context, LRU is a caching replacement algorithm where the least recently accessed items are evicted first when the cache reaches its maximum capacity.

### MRU
* MRU stands for Most Recently Used.
* In a caching context, MRU is a caching replacement algorithm where the most recently accessed items are evicted first when the cache reaches its maximum capacity.

### LFU
* LFU stands for Least Frequently Used.
* In a caching context, LFU is a caching replacement algorithm where the least frequently accessed items are evicted first when the cache reaches its maximum capacity.

## Purpose of a Caching System
* The primary purpose of a caching system is to improve the performance and efficiency of data retrieval operations by reducing the time it takes to access frequently accessed data.
* Caching systems help alleviate the load on backend resources, such as databases or external APIs, by serving frequently accessed data from a faster cache instead of fetching it from the original source every time it's requested.

## Limitations of a Caching System
* Caching systems have finite storage capacity, which limits the amount of data that can be cached at any given time.
* Cache invalidation and cache coherence are challenges in caching systems, as cached data may become stale or outdated if not properly managed.
* Implementing an effective caching strategy requires careful consideration of factors such as cache eviction policies, cache expiration mechanisms, and cache consistency strategies.
