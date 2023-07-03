import { Component, OnInit } from '@angular/core';
import Book, { Category } from '../../../shared/models/book.model';
import { BookService } from '../../../shared/services/book.services';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailComponent } from './book-detail/book-detail.component';
import Filter, { Option } from '../../../shared/models/filter.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  optionName: string = 'Category';
  optionList: string[] = Object.values(Category);

  displayedColumns: string[] = ['title', 'price', 'category', 'edit'];
  dataSource = new MatTableDataSource<Book>([]);
  dataLength = 0;
  filter: Filter = new Filter(0, 10);

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBooks(this.filter);
  }

  getBooks(filter: Filter) {
    this.bookService
      .getBook(filter)
      .subscribe((result: { books: Book[]; total: number }) => {
        this.dataSource = new MatTableDataSource<Book>(result.books);
        this.dataLength = result.total;
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
    this.getBooks(this.filter);
  }

  loadPage(page: any) {
    this.filter.page = page.pageIndex;
    this.filter.limit = page.pageSize;
    this.getBooks(this.filter);
  }

  editBook(book: Book) {
    this.openDialog(book);
  }

  createBook() {
    this.openDialog();
  }

  openDialog(book?: Book) {
    this.dialog.open(BookDetailComponent, {
      data: book || undefined,
      height: '666px',
      width: '800px',
    });
  }
}
