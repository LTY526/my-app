import { TestBed } from '@angular/core/testing';

import { DotaImageService } from './dota-image.service';

describe('DotaImageService', () => {
  let service: DotaImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DotaImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
