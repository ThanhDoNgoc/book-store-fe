import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    BookDetailComponent,
    BookListComponent
  ],
  imports: [
    MatPaginatorModule,
    CommonModule,
    BookRoutingModule,
    SharedModule,
    RouterModule
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
