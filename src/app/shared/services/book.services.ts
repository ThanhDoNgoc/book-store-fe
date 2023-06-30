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
  
  getBook(filter: Filter): Observable<{ books: Book[]; total: number }> {
    console.log('api/getBook ', filter);
    let url =
      environment.book.getBooks + `?page=${filter.page}&limit=${filter.limit}`;
    if (filter.search) {
      url += `&search=${filter.search}`;
    }
    if (filter.options) {
      filter.options.value.forEach((value)=>{
        url+= `&${filter.options!.key.toLocaleLowerCase()}=${value}`
      })
    }
    return this.httpClient.get<{ books: Book[]; total: number }>(url);
  }

  getBookDetail(id: string): Observable<BookDetail> {
    const url = environment.book.getBookDetail.replace(':id', id.toString());
    console.log(url);
    return this.httpClient.get<BookDetail>(url);
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
