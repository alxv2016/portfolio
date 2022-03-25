import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConsiderMotionComponent} from './consider-motion.component';

describe('ConsiderMotionComponent', () => {
  let component: ConsiderMotionComponent;
  let fixture: ComponentFixture<ConsiderMotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsiderMotionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsiderMotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
