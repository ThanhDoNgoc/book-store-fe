import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/shared/services/user.service';
import { of } from 'rxjs';
import { Role } from 'src/app/shared/models/user.model';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;

  const users = [
    {
      id: 1,
      name: 'test 1',
      username: 'test1',
      email: 'test@test',
      role: Role.Admin,
    },
    {
      id: 2,
      name: 'test 2',
      username: 'test2',
      email: 'test1@test',
      role: Role.Customer,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUser: () => of(users),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load init data', () => {
    expect(component.dataSource.data).toEqual(users);
  });
});
