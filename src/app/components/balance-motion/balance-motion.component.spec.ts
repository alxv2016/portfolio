import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BalanceMotionComponent} from './balance-motion.component';

describe('RelationshipMotionComponent', () => {
  let component: BalanceMotionComponent;
  let fixture: ComponentFixture<BalanceMotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BalanceMotionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceMotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
