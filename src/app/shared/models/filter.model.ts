export default class Filter {
  page: number;
  limit: number;
  options?: Option;
  search?: string;
  constructor(
    page?: number,
    limit?: number,
    options?: Option,
    search?: string
  ) {
    this.page = page || 0;
    this.limit = limit || 12;
    this.options = options;
    this.search = search;

  }
}

export interface Option {
  key: string;
  value: string[];
}
