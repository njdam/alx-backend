#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """
        Get hypermedia information for a given index and page size.

        Args:
            index (int): The current start index of the return page.
                        Default is None.
            page_size (int): The size of each page. Default is 10.

        Returns:
            dict: A dictionary containing hypermedia information including
            index, next_index, page size, and data.
        """
        assert index is None or 0 <= index < len(self.__indexed_dataset), (
                "Index out of range"
                )
        assert isinstance(page_size, int) and page_size > 0, (
                "page_size must be a positive integer"
                )

        next_index = index + page_size if index is not None else 0
        data = []
        for i in range(index, next_index):
            if i in self.indexed_dataset():
                data.append(self.indexed_dataset()[i])
        # total_pages = math.ceil(len(self.__indexed_dataset) / page_size)

        if next_index >= len(self.__indexed_dataset):
            next_index = None

        return {
            'index': index,
            'data': data,
            'page_size': len(data),
            'next_index': next_index
        }
