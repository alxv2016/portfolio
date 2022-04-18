import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkV2Component} from './work-v2.component';

describe('WorkV2Component', () => {
  let component: WorkV2Component;
  let fixture: ComponentFixture<WorkV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkV2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
