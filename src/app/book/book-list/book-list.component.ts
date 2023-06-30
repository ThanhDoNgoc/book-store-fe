import { Component, OnInit } from '@angular/core';
import Book, { Category } from '../../shared/models/book.model';
import { BookService } from '../../shared/services/book.services';
import Filter, { Option } from '../../shared/models/filter.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  optionName: string = 'Category';
  optionList: string[] = Object.values(Category);

  filter: Filter = new Filter(1, 12);

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks(this.filter);
  }

  private async getBooks(filter: Filter) {
    this.bookService
      .getBook(filter)
      .subscribe((result: { books: Book[]; total: number }) => {
        this.books = result.books;
      });
  }

  onFilter(filter: any) {
    const option: Option = {
      key: filter.optionName,
      value: filter.selectOptions,
    };
    this.filter.options = option;
    this.filter.search = filter.search;
    this.filter.page = 0;
    this.filter.limit = 12;

    this.getBooks(this.filter);
  }

  nextPage() {
    this.filter.page = this.filter.page! + 1;
    this.getBooks(this.filter);
  }

  previousPage() {
    this.filter.page = this.filter.page! - 1;
    this.getBooks(this.filter);
  }

  toPage(page: number) {
    this.filter.page = page;
    this.getBooks(this.filter);
  }
}
