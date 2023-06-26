export default class Filter {
  page?: number;
  limit?: number;
  options?: Option;
  searchKey?: string;
  constructor(
    page?: number,
    limit?: number,
    options?: Option,
    searchKey?: string
  ) {
    this.page = page || 1;
    this.limit = limit || 12;
    this.options = options;
    this.searchKey = searchKey;

  }
}

export interface Option {
  key: string;
  value: string[];
}
