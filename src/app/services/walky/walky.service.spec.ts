import { TestBed } from '@angular/core/testing';

import { WalkyService } from './walky.service';

describe('WalkyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WalkyService = TestBed.get(WalkyService);
    expect(service).toBeTruthy();
  });
});
