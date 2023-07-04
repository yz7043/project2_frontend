import { TestBed } from '@angular/core/testing';

import { RefreshChildService } from './refresh-child.service';

describe('RefreshChildService', () => {
  let service: RefreshChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshChildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
