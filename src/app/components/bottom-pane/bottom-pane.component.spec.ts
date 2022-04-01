import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BottomPaneComponent} from './bottom-pane.component';

describe('BottomPaneComponent', () => {
  let component: BottomPaneComponent;
  let fixture: ComponentFixture<BottomPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomPaneComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
