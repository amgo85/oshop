import { TestBed } from '@angular/core/testing';

import { CookieS } from './cookie.service';

describe('CookieService', () => {
  let service: CookieS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
