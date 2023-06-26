import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import User, { Role } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  optionName: string = 'Role';
  optionList: string[] = Object.values(Role);

  displayedColumns: string[] = ['name', 'username', 'email', 'role'];

  dataSource = new MatTableDataSource<User>([]);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private async getUsers() {
    this.userService.getUser().subscribe((users: User[]) => {
      this.dataSource = new MatTableDataSource<User>(users);
    });
  }

  onFilter(filter: any){
    console.log(filter)
  }
}
