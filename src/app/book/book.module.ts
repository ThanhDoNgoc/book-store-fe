import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BookDetailComponent,
    BookListComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule,
  ],
  providers: [
    SharedModule,
  ],
  exports: [
    BookDetailComponent,
    BookListComponent
  ]
})
export class BookModule { }
