import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkDiscoveryComponent} from './work-discovery.component';

describe('WorkDiscoveryComponent', () => {
  let component: WorkDiscoveryComponent;
  let fixture: ComponentFixture<WorkDiscoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkDiscoveryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkDiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
