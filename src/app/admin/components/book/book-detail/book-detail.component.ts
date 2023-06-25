import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import Book, { Category } from '../../../../shared/models/book.model';
import { BookService } from '../../../../shared/services/book.services';
import BookDetail from '../../../../shared/models/book-detail.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  bookDetail!: BookDetail;
  categoryOptions : string[] = Object.values(Category)
  
  constructor(@Inject(MAT_DIALOG_DATA) public book: Book, private bookService : BookService) { }

  ngOnInit(): void {
    this.bookService.getBookDetail().subscribe((book)=>{
      this.bookDetail = book
    })
  }

  submitForm(){
    console.log(this.bookDetail)
  }

}


