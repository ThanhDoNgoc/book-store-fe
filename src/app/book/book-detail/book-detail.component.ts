import { Component, OnInit, OnDestroy } from '@angular/core';
import BookDetail from '../../shared/models/book-detail.model';
import { BookService } from '../../shared/services/book.services';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  book!: BookDetail;
  id!: number;

  destroy$ = new Subject();
  
  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.id = +params['id'];
      });
  }

  ngOnInit(): void {
    this.getBooks(this.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private async getBooks(id: number) {
    this.bookService.getBookDetail(id).subscribe((book: BookDetail) => {
      this.book = book;
    });
  }
}
