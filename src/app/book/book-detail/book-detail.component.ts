import { Component, OnInit } from '@angular/core';
import BookDetail from '../../shared/models/book-detail.model';
import { BookService } from '../../shared/services/book.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book!: BookDetail;
  id!: number;
  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
    });
  }

  ngOnInit(): void {
    this.getBooks(1);
  }

  private async getBooks(id: number) {
    this.bookService.getBookDetail(id).subscribe((book: BookDetail) => {
      this.book = book;
    });
  }
}
