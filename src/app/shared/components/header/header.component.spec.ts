import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { StorageService } from '../../services/storage.service';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let storageService: StorageService;

  const name = 'test_name';
  const permission = ['permission_test', 'permission_test_1'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        {
          provide: StorageService,
          useValue: {
            getName: () => of(name),
            getPermissionList: () => of(permission),
            getProperty: () => name,
            getPermission: () => permission,
            clearCookie: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init update username', () => {
    component.ngOnInit();
    expect(component.userName).toBe(name);
  });

  it('should init update permissions', () => {
    component.ngOnInit();
    expect(component.userPermissions).toEqual(permission);
  });

  it('should clear cookie on logout', () => {
    spyOn(storageService, 'clearCookie');

    component.logout();

    expect(storageService.clearCookie).toHaveBeenCalled();
  });
});
