import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BookComponent } from './components/book/book.component';
import { UserComponent } from './components/user/user.component';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BookDetailComponent } from './components/book/book-detail/book-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AuthGuard } from '../shared/guard/auth.guard';

@NgModule({
  declarations: [BookComponent, UserComponent, BookDetailComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [BookComponent, UserComponent],
  providers: [ AuthGuard ]
})
export class AdminModule {}
