import { TestBed } from '@angular/core/testing';

import { HttprequestService } from './httprequest.service';

describe('HttprequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttprequestService = TestBed.get(HttprequestService);
    expect(service).toBeTruthy();
  });
});
