import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  { path: 'book', loadChildren: () => BookModule },
  { path: 'auth', loadChildren: () => AuthModule },
  { path: 'admin', loadChildren: () => AdminModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
