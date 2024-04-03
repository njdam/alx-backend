#!/usr/bin/env python3
""" LIFO Caching """

from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """ A class LIFOCache that inherits from BaseCaching
    and is a caching system using LIFO algarithm
    """
    def __init__(self):
        """ Initialize LIFOCache """
        super().__init__()

    def put(self, key, item):
        """ A function for inserting Cache into cashe data """
        if key is not None and item is not None:
            # Check if cache is full
            if len(self.cache_data) >= self.MAX_ITEMS and (
                    key not in self.cache_data
                    ):
                # Get the last key inserted (based on insertion order)
                last_key = list(self.cache_data.keys())[-1]
                del self.cache_data[last_key]
                print(f"DISCARD: {last_key}")
            self.cache_data[key] = item

    def get(self, key):
        """ A function that retrieve cache from cache data """
        if key is not None and key in self.cache_data:
            return self.cache_data[key]
        return None
