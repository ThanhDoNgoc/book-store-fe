import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Book, { Category } from '../../../../shared/models/book.model';
import { BookService } from '../../../../shared/services/book.services';
import BookDetail from '../../../../shared/models/book-detail.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  bookDetail: BookDetail = {
    title: '',
    price: 0,
    quantity: 0,
    image: '',
    description: '',
    category: Category.Drama,
  };
  categoryOptions: string[] = Object.values(Category);

  constructor(
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public book?: Book,
    public dialogRef?: MatDialogRef<BookDetailComponent>
  ) {}

  ngOnInit(): void {
    if (this.book) {
      this.bookService.getBookDetail(this.book._id).subscribe((book) => {
        this.bookDetail = book;
      });
    }
  }

  submitForm() {
    console.log(this.bookDetail);
    if (this.book) {
      this.bookService.putBook(this.bookDetail).subscribe((res) => {
        this.dialogRef?.close();
      });
    } else {
      this.bookService.postBook(this.bookDetail).subscribe((res) => {
        this.dialogRef?.close();
      });
    }
  }
}
