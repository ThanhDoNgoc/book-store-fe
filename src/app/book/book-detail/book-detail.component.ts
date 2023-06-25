import { Component, OnInit } from '@angular/core';
import BookDetail from '../../shared/models/book-detail.model';
import { BookService } from '../../shared/services/book.services';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book!: BookDetail ;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  private async getBooks() {
    this.bookService.getBookDetail().subscribe((book: BookDetail) => {
      this.book = book;
      console.log(this.book)
    });
  }
}
