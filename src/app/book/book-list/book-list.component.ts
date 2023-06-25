import { Component, OnInit } from '@angular/core';
import Book, { Category } from '../../shared/models/book.model';
import { BookService } from '../../shared/services/book.services';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  optionName: string = 'Category';
  optionList: string[] = Object.values(Category);

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  private async getBooks() {
    this.bookService.getBook().subscribe((books: Book[]) => {
      this.books = books;
    });
  }

  onFilter(filter: any){
    console.log(filter)
  }
}
