import {TestBed} from '@angular/core/testing';

import {BottomPaneService} from './bottom-pane.service';

describe('BottomPaneService', () => {
  let service: BottomPaneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BottomPaneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
