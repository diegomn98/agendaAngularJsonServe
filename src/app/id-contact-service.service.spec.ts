import { TestBed } from '@angular/core/testing';

import { IdContactServiceService } from './id-contact-service.service';

describe('IdContactServiceService', () => {
  let service: IdContactServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdContactServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
