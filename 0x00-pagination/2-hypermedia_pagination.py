#!/usr/bin/env python3
""" Simple helper function! """

import csv
import math
from typing import List, Dict, Union, Optional


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Retrieves a page of data from the dataset based on the given page
        and page_size.
        """
        assert isinstance(page, int) and page > 0, (
                "page must be a positive integer"
                )
        assert isinstance(page_size, int) and page_size > 0, (
                "page_size must be a positive integer"
                )
        start_index, end_index = index_range(page, page_size)
        dataset = self.dataset()

        return dataset[start_index:end_index]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[
            str, Union[int, List[List], Optional[int]]
            ]:
        """
        Get hypermedia information for a given page and page size.

        Args:
            page (int): The current page number. Default is 1.
            page_size (int): The size of each page. Default is 10.

        Returns:
            dict: A dictionary containing hypermedia information including
                    page size, page number, dataset page, next page number,
                    previous page number, and total number of pages.
        """
        dataset_page = self.get_page(page, page_size)
        total_pages = math.ceil(len(self.dataset()) / page_size)
        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None

        return {
                'page_size': len(dataset_page),
                'page': page,
                'data': dataset_page,
                'next_page': next_page,
                'prev_page': prev_page,
                'total_pages': total_pages
                }


def index_range(page: int, page_size: int) -> tuple:
    """
    A function named index_range that takes two integer arguments page
    and page_size.

    Args:
        page (int): is a current page number in integer.
        page_size (int): is a page size in integer.

    Returns:
        (tuple): tuple of size two containing start index and an end index
    """
    start_index = (page - 1) * page_size  # If page 1 start index is 0
    end_index = page * page_size

    return start_index, end_index
