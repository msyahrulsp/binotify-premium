export type PaginationProps = {
  currentPage: number;
  lastPage: number;
  nextPages: number[];
  prevPages: number[];
  onPageChange: (page: number) => void;
};

export type PaginationIconProps = {
  icon: ReactNode;
  page: number;
  onPageChange: (page: number) => void;
};

export type PaginationItemProps = {
  isCurrent?: boolean;
  page: number;
  onPageChange: (page: number) => void;
};

export type PaginationUtilProps = {
  totalItem: number;
  page: number;
  items: any[];
  itemsPerPage: number;
};
