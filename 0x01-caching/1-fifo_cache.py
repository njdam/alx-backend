#!/usr/bin/env python3
""" FIFO caching """

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ A class FIFOCache that inherits from BaseCaching
    and is a caching system using the FIFO algorithm
    """
    def __init__(self):
        """ Initialize FIFOCache """
        super().__init__()

    def put(self, key, item):
        """ Add an item in the cache """
        if key is not None and item is not None:
            # Check if cache is full
            if len(self.cache_data) >= self.MAX_ITEMS and (
                    key not in self.cache_data
                    ):
                # Get the first key inserted
                first_key = next(iter(self.cache_data))
                del self.cache_data[first_key]
                print(f"DISCARD: {first_key}")
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key """
        if key is not None and key in self.cache_data:
            return self.cache_data[key]
        return None
