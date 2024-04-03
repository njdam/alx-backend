#!/usr/bin/env python3
""" LRU Caching """

from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """ A class LRUCache that inherits from BaseCaching
    and is a caching system using LRU algorithm
    """
    def __init__(self):
        """ LRUCache class Initialize """
        super().__init__()
        self.order = []

    def put(self, key, item):
        """ Inserting item in cache data """
        if key is not None and item is not None:
            # Checking if cache is full
            if len(self.cache_data) >= self.MAX_ITEMS and (
                    key not in self.cache_data and self.order
                    ):
                # If key not in cache_data, discard the least recently used
                lru_key = self.order.pop(0)
                del self.cache_data[lru_key]
                print("DISCARD:", lru_key)
            else:
                # If key is already in cache_data,
                # move it to the end of the order
                if key in self.cache_data:
                    self.order.remove(key)
                self.order.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """ Retrieving item from cache data """
        if key is not None and key in self.cache_data:
            # Move the key to the end of the order to mark it as
            # the most recently used
            self.order.remove(key)
            self.order.append(key)
            return self.cache_data[key]
        return None
