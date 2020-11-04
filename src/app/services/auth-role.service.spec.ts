import { TestBed } from '@angular/core/testing';

import { AuthRoleService } from './auth-role.service';

describe('AuthRoleService', () => {
  let service: AuthRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
