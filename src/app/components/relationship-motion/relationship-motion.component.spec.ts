import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RelationshipMotionComponent} from './relationship-motion.component';

describe('RelationshipMotionComponent', () => {
  let component: RelationshipMotionComponent;
  let fixture: ComponentFixture<RelationshipMotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelationshipMotionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipMotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
