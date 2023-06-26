import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { StorageService } from '../services/storage.service';

class MockStorageService {
  getPermission(): string[] {
    return ['test', 'test2'];
  }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let storageService: MockStorageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: StorageService, useClass: MockStorageService }
      ],
    });

    guard = TestBed.inject(AuthGuard);
    storageService = TestBed.inject(StorageService) as MockStorageService;
    router = TestBed.inject(Router);
  });

  describe('canActivate', () => {
    it('should return true if have permission', () => {
      const permission = 'test';
      const routeSnapshot: any = { data: { permission } };

      const canActivate = guard.canActivate(routeSnapshot);

      expect(canActivate).toBe(true);
    });

    it('should return false if not have permission ', () => {
      const routeSnapshot: any = {
        data: { permission: 'not-right-permission' },
      };

      const canActivate = guard.canActivate(routeSnapshot);
      expect(canActivate).toBe(false);
    });
  });
});
