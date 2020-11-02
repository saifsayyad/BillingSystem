import { TestBed } from '@angular/core/testing';

import { CreateBillService } from './create-bill.service';

describe('CreateBillService', () => {
  let service: CreateBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
