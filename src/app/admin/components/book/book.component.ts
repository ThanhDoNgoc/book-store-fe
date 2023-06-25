import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import Book, { Category } from '../../../shared/models/book.model';
import { BookService } from '../../../shared/services/book.services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailComponent } from './book-detail/book-detail.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit, AfterViewInit {
  optionName: string = 'Category';
  optionList: string[] = Object.values(Category);

  displayedColumns: string[] = ['title', 'price', 'category', 'edit'];
  dataSource = new MatTableDataSource<Book>([]);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBooks();
    this.dataSource.paginator = this.paginator;
  }

  private async getBooks() {
    this.bookService.getBook().subscribe((books: Book[]) => {
      this.dataSource = new MatTableDataSource<Book>(books);
    });
  }

  onFilter(filter: any) {
    console.log(filter);
  }

  edit(book: Book) {
    this.dialog.open(BookDetailComponent, {
      data: book,
      height: '600px',
      width: '800px',
    });
  }
}
