import { TestBed } from '@angular/core/testing';

import { AppinitializerService } from './appinitializer.service';

describe('AppinitializerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppinitializerService = TestBed.get(AppinitializerService);
    expect(service).toBeTruthy();
  });
});
