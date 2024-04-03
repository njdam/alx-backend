#!/usr/bin/env python3
""" MRU Caching """

from collections import OrderedDict
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """ A class MRUCache that inherits from BaseCaching
    and is a caching system using MRU algorithm
    """
    def __init__(self):
        """ Initialize MRUCache class """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """ Add an item to the cache. """
        if key is not None and item is not None:
            if len(self.cache_data) >= self.MAX_ITEMS and (
                    key not in self.cache_data
                    ):
                mru_key = next(reversed(self.cache_data))
                print(f"DISCARD: {mru_key}")
                del self.cache_data[mru_key]
            self.cache_data[key] = item

    def get(self, key):
        """ Retrieve an item from the cache."""
        if key is not None and key in self.cache_data:
            # Move the key to the end to indicate it was recently used
            self.cache_data.move_to_end(key)
            return self.cache_data[key]
        return None
