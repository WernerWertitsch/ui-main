import { TestBed } from '@angular/core/testing';

import { PersonClientService } from './person-client.service';

describe('PersonClientService', () => {
  let service: PersonClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
