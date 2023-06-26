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

  filter: Filter = new Filter(1, 12);

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBooks(this.filter);
  }

  getBooks(filter: Filter) {
    this.bookService.getBook(filter).subscribe((books: Book[]) => {
      this.dataSource = new MatTableDataSource<Book>(books);
    });
  }

  onFilter(filter: any) {
    const option: Option = {
      key: filter.optionName,
      value: filter.selectOptions,
    };
    this.filter.options = option;
    this.filter.searchKey = filter.searchKey;
    this.getBooks(this.filter);
  }

  loadPage(page: any) {
    this.filter.page = page.pageIndex;
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
      height: '600px',
      width: '800px',
    });
  }
}
