import {TestBed} from '@angular/core/testing';

import {WorkResolver} from './work.resolver';

describe('WorkResolver', () => {
  let resolver: WorkResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(WorkResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
