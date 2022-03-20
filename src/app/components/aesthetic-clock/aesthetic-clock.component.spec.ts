import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AestheticClockComponent} from './aesthetic-clock.component';

describe('AestheticClockComponent', () => {
  let component: AestheticClockComponent;
  let fixture: ComponentFixture<AestheticClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AestheticClockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AestheticClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
