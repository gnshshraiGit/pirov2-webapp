import { TestBed } from '@angular/core/testing';

import { AvstreamerService } from './avstreamer.service';

describe('AvstreamerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvstreamerService = TestBed.get(AvstreamerService);
    expect(service).toBeTruthy();
  });
});
