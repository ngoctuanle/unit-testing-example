export interface People {
  id: number;
  name: string;
}

export interface PaginationPeople extends Pagination {
  total: number;
  peoples: People[];
}

export interface Pagination {
  page: number;
  pageSize: number;
}

export interface UploadResult {
  result: 'success' | 'failure'
}
