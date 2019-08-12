import { TestBed } from '@angular/core/testing';

import { AmbientService } from './ambient.service';

describe('AmbientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmbientService = TestBed.get(AmbientService);
    expect(service).toBeTruthy();
  });
});
