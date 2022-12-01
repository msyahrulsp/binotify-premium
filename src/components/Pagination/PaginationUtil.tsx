import { PaginationUtilProps } from '../../@types/pagination';

function generateArray(start: number, end: number) {
  return [...new Array(end - start)]
    .map((_, index) => start + index)
    .filter((page) => page > 0);
}

export const usePagination = ({
  totalItem,
  page,
  items,
  itemsPerPage
}: PaginationUtilProps) => {
  const currentPage = page;
  const lastPage = Math.ceil(totalItem / itemsPerPage);
  const totalPage = lastPage === 0 ? 1 : lastPage;
  const prevPages =
    currentPage >= 3
      ? lastPage - currentPage > 2
        ? [currentPage - 1]
        : generateArray(lastPage - 4, currentPage)
      : generateArray(1, Math.max(currentPage, 1));

  const nextPages =
    currentPage < 3
      ? generateArray(currentPage + 1, Math.min(6, totalPage + 1))
      : lastPage - currentPage > 2
      ? [currentPage + 1]
      : generateArray(currentPage + 1, lastPage + 1);
  const pageStart = (currentPage - 1) * itemsPerPage;
  const pageEnd = pageStart + itemsPerPage;

  const pageItems = items.slice(pageStart, pageEnd);

  return {
    pageItems,
    totalPage,
    itemsPerPage,
    currentPage,
    lastPage,
    nextPages,
    prevPages
  };
};
