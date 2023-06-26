import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../environments/environment';
import type Book from '../models/book.model';
import type BookDetail from '../models/book-detail.model';
import Filter from '../models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private httpClient: HttpClient) {}

  getBook(filter: Filter): Observable<Book[]> {
    console.log('api/getBook ', filter);
    return this.httpClient.get<Book[]>(environment.book.getBooks);
  }

  getBookDetail(id: number): Observable<BookDetail> {
    console.log('api/book/:id', id);
    return this.httpClient.get<BookDetail>(environment.book.getBookDetail);
  }

  postBook(book: BookDetail): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer 1}`,
    });
    console.log('POST api/book/:id', book, headers);
    return this.httpClient.get<any>(environment.book.createBook, {
      headers: headers,
    });
  }

  putBook(book: BookDetail): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer 1}`,
    });
    console.log('PUT api/book/:id', book, headers);
    return this.httpClient.get<any>(environment.book.updateBook, {
      headers: headers,
    });
  }
}
