#!/usr/bin/env python3
""" LRU Caching """

from collections import OrderedDict
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """ A class LRUCache that inherits from BaseCaching
    and is a caching system using LRU algorithm
    """
    def __init__(self):
        """ LRUCache class Initialize """
        super().__init__()
        # This line initializes an ordered dictionary
        # Using in LRU caching to keep track of the order in which items
        # were accessed or added to the cache.
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """ Inserting item in cache data """
        if key is not None and item is not None:
            # Checking if cache is full
            if len(self.cache_data) >= self.MAX_ITEMS and (
                    key not in self.cache_data
                    ):
                # to discard the least recently used item
                lru_key, _ = self.cache_data.popitem(True)
                print("DISCARD:", lru_key)
            self.cache_data[key] = item
            # This line moves the item with the specified `key`
            # to the opposite end of the ordered dictionary
            # from where items are normally added
            self.cache_data.move_to_end(key, last=False)

    def get(self, key):
        """ Retrieving item from cache data """
        if key is not None and key in self.cache_data:
            # This line moves the item with the specified `key`
            # to the opposite end of the ordered dictionary
            # from where items are normally added
            self.cache_data.move_to_end(key, last=False)
            return self.cache_data[key]
        return None
