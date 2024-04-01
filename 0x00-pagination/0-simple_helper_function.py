#!/usr/bin/env python3
""" Simple helper function! """


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
