import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { UserComponent } from './components/user/user.component';
import { Permission } from '../shared/enum/permission.enum';

const routes: Routes = [
  {
    path: 'book',
    component: BookComponent,
    //canActivate: [AuthGuard],
    data: { permission: Permission.Book_Permission },
  },
  {
    path: 'user',
    component: UserComponent,
    //canActivate: [AuthGuard],
    data: { permission: Permission.User_Permission },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
