#!/usr/bin/env python3
""" LFU Caching """

from collections import defaultdict
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """ A class LFUCache that inherits from BaseCaching
    and is a caching system using LFU algorithm
    """
    def __init__(self):
        """ Initialize LFUCache class """
        super().__init__()
        # Track the frequency of access for each key
        self.frequency = defaultdict(int)

    def put(self, key, item):
        """ Adding item in cache data """
        if key is not None and item is not None:
            # Checking if cache data is full
            if len(self.cache_data) >= self.MAX_ITEMS and (
                    key not in self.cache_data
                    ):
                min_freq = min(self.frequency.values())
                lfu_keys = [k for k, v in self.frequency.items() if (
                    v == min_freq
                    )]
                if len(lfu_keys) > 1:
                    # If more than one item has the least frequency,
                    # use LRU to break tie
                    lru_key = min(self.cache_data, key=self.frequency.get)
                    print(f"DISCARD: {lru_key}")
                    del self.cache_data[lru_key]
                    del self.frequency[lru_key]
                else:
                    lfu_key = lfu_keys[0]
                    print(f"DISCARD: {lfu_key}")
                    del self.cache_data[lfu_key]
                    del self.frequency[lfu_key]
            self.cache_data[key] = item
            # Increment the frequency count for the accessed key
            self.frequency[key] += 1

    def get(self, key):
        """ Retrieving item from cache data """
        if key is not None and key in self.cache_data:
            # Increment the frequency count for the accessed key
            self.frequency[key] += 1
            return self.cache_data[key]
        return None
