import {AfterViewInit, Component, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnDestroy, AfterViewInit {
  // We declare the child component being inserted can be any component and not a specific component
  childComponentType!: Type<any>;
  onClose$: Subject<boolean> = new Subject();
  // Capture the element template where the child component will be inserted we let Angular know that it's a ViewContainerRef
  @ViewChild('componentPortal', {read: ViewContainerRef, static: true}) componentPortal!: ViewContainerRef;

  ngAfterViewInit(): void {
    // We use the element template to create and insert the child component
    this.componentPortal.clear();
    this.componentPortal.createComponent(this.childComponentType);
  }

  ngOnDestroy(): void {
    if (this.componentPortal) {
      this.componentPortal.clear();
    }
  }

  onClose() {
    // pass subscrition to service
    this.componentPortal.clear();
    this.onClose$.next(true);
  }
}
