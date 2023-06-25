import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../environments/environment';
import type Book from '../models/book.model';
import type BookDetail from '../models/book-detail.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private httpClient: HttpClient) {}

  getBook(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(environment.book.getBooks)
    
  }

  getBookDetail(): Observable<BookDetail> {
    return this.httpClient.get<BookDetail>(environment.book.getBookDetail)
  }
}
